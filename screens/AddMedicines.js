import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class AddMedicines extends Component {
  constructor() {
    super();
    this.state = {
      userName: firebase.auth().currentUser.email,
      itemName: '',
      description: '',
      nickName: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addItem = (itemName, description) => {
    var userName = this.state.userName;
    var nickName = this.state.nickName;
    var exchangeId = this.createUniqueId();
    db.collection('medicine').add({
      "medicine_status": 'Yes',
      "username": userName,
      "medicinename": itemName,
      "description": description,
      "nickName": nickName,
      "exchangeId": exchangeId,
      "item_value": this.state.itemValue,
      "date": firebase.firestore.FieldValue.serverTimestamp(),
    });
    this.setState({
      itemName: '',
      description: '',
      nickName: '',
    });

    return Alert.alert('Medicine Added ', '', [
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('UpdateMedicines');
        },
      },
    ]);
  };

  getDonorDetails = (userName) => {
    db.collection('users')
      .where('username', '==', userName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userType: doc.data().userType,
          });
        });
      });
  };

  componentDidMount() {
    this.getDonorDetails(this.state.userName);
  
  }
  render() {
    if (this.state.userType === 'user') {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader navigation={this.props.navigation} title="Add Medicine" />
          <View style={styles.subtitle}>
            <Text style={{ fontSize: 20 }}>You are not a shop owner</Text>
          </View>
        </View>
      );
    }
     else {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader title="Add Medicine" navigation={this.props.navigation} />
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Item Name'}
                            onChangeText={(text) => {
                this.setState({
                  itemName: text,
                });
              }}
              value={this.state.itemName}
            />
            <TextInput
              style={[styles.formTextInput, { height: 100 }]}
              multiline
              numberOfLines={4}
              placeholder={'Description'}
              onChangeText={(text) => {
                this.setState({
                  description: text,
                });
              }}
              value={this.state.description}
            />

            <TextInput
              maxLength={3}
              style={styles.formTextInput}
              placeholder={'Nick Name of medicine'}
              onChangeText={(text) => {
                this.setState({
                  nickName: text,
                });
              }}
              value={this.state.nickName}
            />
            <TextInput
              style={styles.formTextInput}
              keyboardType={'numeric'}
              placeholder={'Item Value'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  itemValue: text,
                });
              }}
              value={this.state.itemValue}
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => {
                this.addItem(this.state.itemName, this.state.description);
              }}>
              <Text
                style={{ color: '#ffff', fontSize: 18, fontWeight: 'bold' }}>
                Add Item
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#1200F4',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
    subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1200F4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
