import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { images } from '../../constants';
import SearchInput from '../../components/search-input';
import Trending from '../../components/trending';
import EmptyState from '../../components/empty-state';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/use-appwrite';
import VideoCard from '../../components/video-card';
import { useGlobalContext } from '../../context/global-provider';


const Home = () => {
  const { user } = useGlobalContext();

  // getAllPosts pass as a prop to useAppWrite method and fetch the data...
  const { data : posts, refetch } = useAppwrite(getAllPosts);

  const { data : latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);

    // re-call videos -> if any new videos appeared...
    await refetch();
    setRefreshing(false);
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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome back,
                </Text>

                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending videos
              </Text>

              {/* ?? says if the data doesn't exists */}
              <Trending posts={latestPosts ?? []}/>
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title = "No videos found"
            subtitle = "Be the first one to upload the video"
          />
        )}

        // work as refreshing the content and start loading new data...
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home