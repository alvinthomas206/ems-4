import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import UpdateMedicine from '../screens/UpdateMedicines'
import AddMedicines from '../screens/AddMedicines';


export const AppTabNavigator2 = createBottomTabNavigator({
 
  UpdateMedicine : {
    screen: UpdateMedicine,
    navigationOptions :{
      tabBarIcon :   <Image source={require("../assets/home.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Update Medicine",
      
    }
  },
  AddMedicines: {
    screen: AddMedicines,
    navigationOptions :{
      tabBarIcon :<Image source={require("../assets/ads-icon.png")} style={{width:20, height:20,}} />,
      tabBarLabel : "Add Medicines",
    }
  }
});
