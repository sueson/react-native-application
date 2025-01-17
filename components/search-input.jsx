import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';

import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({ initialQuery }) => {
    // It will return the current path of the screen...
    const pathname = usePathname();

    const [query, setQuery] = useState(initialQuery || '');
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl ${isFocused ? 'border-secondary-100' : 'border-black-100'} items-center flex-row space-x-4`}>
        <TextInput
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={query}
            placeholder="Search for a video topic"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
            // onFocus and onBlur for truning on and off the border-secondary...
            onFocus={() => setIsFocused(true)}
            onBlur={()=> setIsFocused(false)}
        />

        <TouchableOpacity
            onPress={() => {
                if(!query) {
                    return Alert.alert('Missing query', 'Please input something to search')
                }

                if(pathname.startsWith('/search')) router.setParams({ query })
                
                else router.push(`/search/${query}`)
            }}
        >
            <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode='contain' 
            />
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput;