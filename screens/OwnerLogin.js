import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import BarterAnimation from '../components/BarterAnimationScreen.js';
import { RFValue } from "react-native-responsive-fontsize";

import db from '../config';
import firebase from 'firebase';

export default class OwnerLogin extends Component {
  constructor(){
    super()
    this.state={
      username : '',
      password: '',  
      confirmPassword : "",  
      ownerName: "",
      storeName : "",
      mobileNumber:"",
      shopPhoneNumber:'',
      address : "",       
      upi:'',
      map:'',
      
      isVisible : false,
    }
  }

  userLogin = (username, password)=>{
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(()=>{
      this.props.navigation.navigate('HomeScreen')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (username, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((response)=>{
        db.collection('users').add({
          userType: "Owner",
          username:this.state.username,
          ownerName:this.state.ownerName,
          storeName:this.state.storeName,
          mobile_number:this.state.mobileNumber,
          shopPhoneNumber:this.state.shopPhoneNumber,          
          address:this.state.address,
          upi:this.state.upi,
          map:this.state.map,
   
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
             ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }

  }

  showModal = ()=>(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={{flex: 1,backgroundColor: "#fff"}}>
        <ScrollView style={{width:'100%'}}>
        <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:RFValue(20),fontWeight:"bold",color:"#1200F4"}}> User Sing Up </Text>
          </View>
          <View style={{flex:0.95}}>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Owner Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                ownerName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Store Name"}
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                storeName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: text
              })
            }}
          />
            <TextInput
            style={styles.formTextInput}
            placeholder ={"Shop Phone Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                shopPhoneNumber: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />     
          
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Google Map Link"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                map: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Upi Link (Google Pay, Paytm ect)"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                upi: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Email Address"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
          />
          
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
         
        </View>
        <View style={{flex:0.2,alignItems:'center'}}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.username, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
         
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{  fontSize : RFValue(20),
                fontWeight:'bold',
                color: "#1200F4",
                marginTop:RFValue(10)
                }}>
                  Cancel
                </Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </View>
    </Modal>
  )


  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
        </View>
        <View style={styles.profileContainer}>
          <BarterAnimation/> 
          <Text style={styles.title}>Shop Owner Login</Text>
         
        </View>
        <View style={styles.buttonContainer}>
          <Text style={{color:'#EEEEEE', fontSize:18, fontWeight:'bold',marginLeft:55}}>Email Address</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
            style={styles.loginBox}
            keyboardType ={'email-address'}
              onChangeText={(text)=>{
              
              this.setState({
                username: text
              })
            }}
            />
          </View>
          <Text style={{color:'#EEEEEE', fontSize:18, fontWeight:'bold',marginLeft:55}}>Password</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.loginBox}
            
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
              >
              <Text style={{color:'#32867d', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({"isVisible":true})
              }}
              >
                <Text style={{color:'#32867d', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1200F4'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:60,
    fontWeight:'300',
     fontFamily:'AvenirNext-Heavy',
    color : '#EEEEEE',
    textAlign:"center",
    marginTop:-70
    
  },
  loginBox:{
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor:'#32867d',
    fontSize: 20,
    marginBottom:20,
    marginTop:5,
  
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ffff",
    elevation:10
  },
  buttonContainer:{
    flex:1,
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth:1,
      borderRadius:2,
      borderColor:"grey",
      paddingBottom:RFValue(10),
      marginLeft:RFValue(20),
      marginBottom:RFValue(14)
  },
  registerButton: {
    width: "85%",
    height: RFValue(50),
    marginTop:RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#1200F4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
})
