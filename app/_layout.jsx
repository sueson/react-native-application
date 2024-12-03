// It is a root layout....


import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import '../global.css'
import { useEffect } from 'react';

import GlobalProvider from '../context/global-provider';


// This will prevent the splash screen from auto hidding before the asses loading complete...
SplashScreen.preventAutoHideAsync();


const RootLayout = () => {
  // For using all the fonts, which returns boolen value if fonts loaded or it should show error if fonts met with any error...
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if(error) throw error;

    // SplashScreen used to works as loader, but may our content should be ready once the screen loads, or it should show a blank screen...
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;


  return (
    // Using this global provider all the screens have the access of user functionalities...
    <GlobalProvider>
      <Stack>
        <Stack.Screen name = "index" options={{ headerShown : false }} />
        <Stack.Screen name = "(auth)" options={{ headerShown : false }} />
        <Stack.Screen name = "(tabs)" options={{ headerShown : false }} />
        <Stack.Screen name = "search/[query]" options={{ headerShown : false }} />
      </Stack>
      <StatusBar style="light" />
    </GlobalProvider>
    
  );
};

export default RootLayout;
