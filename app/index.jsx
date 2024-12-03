// it works as a home page e.g. ("/")


import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

import { images } from '../constants';
import CustomButton from '../components/custom-button';
import { useGlobalContext } from '../context/global-provider';


// It's an onboarding page...
export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  // It allows user to redirect from onboarding page to the home page if already logged in...
  if(!isLoading && isLoggedIn) return <Redirect href='/home' />


  return (
    // SafeAreaView correctly to ensure the content stays within the safe area of the device screen, preventing overlap with notches, status bars, or device-specific UI elements...
    <SafeAreaView className="bg-primary h-full">
      {/* The content might be larger for mobile devices, so using this */}
      <ScrollView contentContainerStyle={{ height : '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain' 
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{' '}
              {/* like span tag */}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode='contain' 
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <CustomButton
            title = "Continue with Email"
            handlePress = {() => router.push('/sign-in')}
            containerStyles="w-full mt-7" 
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>

  );
}





