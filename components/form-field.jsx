import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}
      </Text>

      <View className={`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl ${isFocused ? 'border-secondary-100' : 'border-black-100'} items-center flex-row`}>
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            // The secureTextEntry property in React Native's TextInput component is used to mask the entered text, typically for sensitive fields like passwords...
            secureTextEntry={title === 'Password' && !showPassword}
            // onFocus and onBlur for truning on and off the border-secondary...
            onFocus={() => setIsFocused(true)}
            onBlur={()=> setIsFocused(false)}
        />

        {title === 'Password' && (
            <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image
                    source={!showPassword ? icons.eye : icons.eyeHide} 
                    className="w-6 h-6"
                    resizeMode='contain'
                />

            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField