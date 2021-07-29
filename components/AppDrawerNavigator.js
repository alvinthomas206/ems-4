import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSidebarMenu  from './CustomSidebarMenu';
import MyBartersScreen from '../screens/MyBartersScreen';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import MedicalShop from '../screens/MedicalShop'
import {Icon,Image} from 'react-native-elements';
import {AppStackNavigator2} from './AppStackNavigator2';
import { AppTabNavigator2 } from './AppTabNavigator2';


export const AppDrawerNavigator = createDrawerNavigator({
   
    MedicalShop : {
    screen : AppStackNavigator2,
    navigationOptions:{
      drawerIcon :  <Image source={require("../assets/home.png")} style={{width:30, height:30}}/>,
    }
    },

  Donate : {
    screen : AppTabNavigator,
    navigationOptions:{
      drawerIcon : <Image source={require("../assets/hand.png")} style={{width:30, height:30}} />
    }
    },
    
  MyDonation:{
      screen : MyBartersScreen,
      navigationOptions:{
      drawerIcon :<Image source={require("../assets/heart.png")} style={{width:30, height:30}} />
      }
    },

    ShopOwner:{
         screen : AppTabNavigator2,
      navigationOptions:{
      drawerIcon :<Image source={require("../assets/heart.png")} style={{width:30, height:30}} />
      }
    },
  Notifications :{
    screen : NotificationScreen,
    navigationOptions:{
      drawerIcon : <Icon name="bell" type ="font-awesome" />,
      drawerLabel : "Notifications"
    }
  },
    Setting : {
      screen : SettingScreen,
      navigationOptions:{
        drawerIcon : <Icon name="settings" type ="fontawesome5" />,
        drawerLabel : "Setting"
      }
    }
},
  {
    contentComponent:CustomSidebarMenu
  },
  {
    initialRouteName : 'MedicalShop'
  })


