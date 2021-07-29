import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import BarterAnimation from '../components/BarterAnimationScreen.js';
import { RFValue } from 'react-native-responsive-fontsize';

import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <BarterAnimation />
          <Text style={styles.title}>EMS App</Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1, marginTop:50 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('CoustomerLogin');
            }}>
            <Text
              style={{ color: '#32867d', fontSize: 23, fontWeight: 'bold' }}>
              User Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('OwnerLogin');
            }}>
            <Text
              style={{ color: '#32867d', fontSize: 23, fontWeight: 'bold' }}>
              Shop Owner Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1200F4',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '300',
    fontFamily: 'AvenirNext-Heavy',
    color: '#EEEEEE',
    marginBottom: 30,
  },

  button: {
    marginTop: 20,
    width: '75%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffff',
    elevation: 20,
  },
  buttonContainer: {
    flex: 1,
  },
});
