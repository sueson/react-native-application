import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Reason for using seperate layout for not to have the footer tab e.g. home, search..etc, only for the auth screen layout...
// The main layout in the app folder used for all the pages, but this layout only for auth screens...
const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name = "sign-in"
          options={{headerShown : false}}  
        />

        <Stack.Screen
          name = "sign-up"
          options={{headerShown : false}}  
        />
        <StatusBar backgroundColor='#161622' style='light' />
      </Stack>
    </>
  )
}

export default AuthLayout