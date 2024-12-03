import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

import SearchInput from '../../components/search-input';
import EmptyState from '../../components/empty-state';
import { searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/use-appwrite';
import VideoCard from '../../components/video-card';
import { useLocalSearchParams } from 'expo-router';


const Search = () => {
  const { query } = useLocalSearchParams();

  // if passing data inside a function should be a callback function... 
  const { data : posts, refetch } = useAppwrite(
    () => searchPosts(query)
  );

  useEffect(() => {
    refetch();
  },[query]);

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
          <View className="my-6 px-4">
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>

                <Text className="text-2xl font-psemibold text-white">
                  { query }
                </Text>

                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={query} />
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

export default Search