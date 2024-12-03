import { useEffect, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';

import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from 'expo';


const zoomIn = {
  0 : {
    scale : 0.9
  },
  1 : {
    scale : 1.1
  }
}

const zoomOut = {
  0 : {
    scale : 1
  },
  1 : {
    scale : 0.9
  }
}


const TrendingItem = ({ activeItem, item }) => {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // State to track whether the video is playing
  
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = true; // Loop video
  });

  // Using useEvent to track the playing status of the video
  const { isPlaying: playerIsPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  // Update isPlaying state based on playerIsPlaying
  useEffect(() => {
    setIsPlaying(playerIsPlaying);
  }, [playerIsPlaying]);

  // Stop other videos when a new video is activated
  useEffect(() => {
    if (activeItem !== item.$id && isPlaying) {
      player.pause();
      setIsPlaying(false);
    }
  }, [activeItem, item.$id, isPlaying, player]);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    // it's a view which allows to do animations...
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <VideoView
          ref={ref}
          style={{ width: 220, height: 250 }}  // Adjust size as needed
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={togglePlay}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}


const Trending = ({ posts }) => {
  // for animation when scrolling from left to right...
  const [activeItem, setActiveItem] = useState(posts[1]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if(viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem
              activeItem = {activeItem}
              item = {item} 
            />
        )}
        // used to track which item is visible on the screen during scrolling...
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold : 70
        }}
        // It tells the current scrolling position, so using x works as horizontal start of scrolling...
        contentOffset={{ x : 170 }}
        // it will change the list into horizontal...
        horizontal
    />
  )
}

export default Trending;