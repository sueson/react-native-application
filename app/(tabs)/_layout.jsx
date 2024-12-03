import { View, Text, Image } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { icons } from "../../constants";


const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className="items-center justify-center gap-2 w-24">
			<Image
				source={icon}
				resizeMode='contain'
				tintColor={color}
				className = "w-6 h-6"
			/>
			{/* Based on active tab the font changes */}
			<Text 
				className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
				style={{ color : color }}
			>
				{name}
			</Text>
		</View>
	)
}

// For bottom tabs e.g. Home, create, profile..etc...
const TabsLayout = () => {
  return (
    <>
	{/* Tabs will bring all the (tabs) screens dynamically in the bottom of the every page */}
      <Tabs
	  	screenOptions={{
			tabBarShowLabel: false, // option to hide labels
			tabBarActiveTintColor : '#FFA001',
			tabBarInactiveTintColor : '#CDCDE0',
			tabBarStyle : {
				backgroundColor : '#161622',
				borderTopWidth : 0,
				borderTopColor : '#232533',
				height : 80,
				paddingTop : 10
			}
		}}
	  >
		<Tabs.Screen 
			name = 'home'
			options={{
				title : 'Home',
				headerShown : false,
				// To modify the tab icons with destructured,,.
				tabBarIcon : ({ color, focused }) => (
					<TabIcon
						icon={icons.home} 
						color={color}
						name='Home'
						focused={focused}
					/>
				)
			}}
		/>

		<Tabs.Screen 
			name = "create"
			options={{
				title : 'Create',
				headerShown : false,
				// To modify the tab icons with destructured,,.
				tabBarIcon : ({ color, focused }) => (
					<TabIcon
						icon={icons.plus} 
						color={color}
						name="Create"
						focused={focused}
					/>
				)
			}}
		/>

		<Tabs.Screen 
			name = "profile"
			options={{
				title : 'Profile',
				headerShown : false,
				// To modify the tab icons with destructured,,.
				tabBarIcon : ({ color, focused }) => (
					<TabIcon
						icon={icons.profile} 
						color={color}
						name="Profile"
						focused={focused}
					/>
				)
			}}
		/>
	  </Tabs>
    </>
  )
}

export default TabsLayout