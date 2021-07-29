import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MedicalShop from '../screens/MedicalShop';
import ShopDetials  from '../screens/ShopDetials';
import NotificationScreen from '../screens/NotificationsScreen'



export const AppStackNavigator2 = createStackNavigator({
  MedicalShop : {
    screen : MedicalShop,
    navigationOptions:{
      headerShown : false
    }
  },

  ShopDetials : {
    screen : ShopDetials,
    navigationOptions:{
      headerShown : false
    }
  },
  Notification : {
     screen : NotificationScreen,
     navigationOptions:{
       headerShown : false
     }
   }
 },


  {
    initialRouteName: 'MedicalShop'
  }
);
