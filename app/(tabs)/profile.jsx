import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../../components/empty-state';
import { getUserPosts, signOut } from '../../lib/appwrite';
import useAppwrite from '../../lib/use-appwrite';
import VideoCard from '../../components/video-card';
import { useGlobalContext } from '../../context/global-provider';
import { icons } from '../../constants';
import InfoBox from '../../components/info-box';
import { router } from 'expo-router';


const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  // if passing data inside a function should be a callback function... 
  const { data : posts } = useAppwrite(
    () => getUserPosts(user.$id)
  );

  const logout = async () => {
    await signOut();

    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* used to render a list of elements */}
      <FlatList
        // data needs to have an array...
        data={posts}
        // like a key which should be unique...
        keyExtractor={(item) => item.$id}
        // it tells how to render each item in list...
        renderItem={({ item }) => (
          <VideoCard
            video = {item}
          />
        )}
        // Work as header of this list...
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity 
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6" 
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri : user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover' 
              />
            </View>

            <InfoBox 
              title = {user?.username}
              containerStyles = "mt-5"
              titleStyles = "text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox 
                title = {posts.length || 0}
                subtitle = "Posts"
                containerStyles = "mr-10"
                titleStyles = "text-xl"
              />

              <InfoBox 
              title = "10.2K"
              subtitle = "Followers"
              titleStyles = "text-xl"
            />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title = "No videos found"
            subtitle = "No videos found for this search results"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile