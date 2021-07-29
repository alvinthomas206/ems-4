import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class ShopDetials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: '',
      receiverId: this.props.navigation.getParam('details')['username'],
      exchangeId: this.props.navigation.getParam('details')['exchangeId'],
      medicinename: this.props.navigation.getParam('details')['medicinename'],
      available: this.props.navigation.getParam('details')['medicine_status'],
      nickName: this.props.navigation.getParam('details')['nickName'],
      storeName: '',
      price: '',
      mobile_number: '',
      shopPhoneNumber: '',
      receiverAddress: '',
      receiverRequestDocId: '',
      ownerName: '',
      map: '',
      upi: '',
    };
  }

  getUserDetails = (userId) => {
    db.collection('users')
      .where('username', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().first_name);
          this.setState({
            fullName: doc.data().first_name + ' ' + doc.data().last_name,
          });
        });
      });
  };

  getreceiverDetails() {
    db.collection('users')
      .where('username', '==', this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            storeName: doc.data().storeName,
            ownerName: doc.data().ownerName,
            mobile_number: doc.data().mobile_number,
            receiverAddress: doc.data().address,
            shopPhoneNumber: doc.data().shopPhoneNumber,
            map: doc.data().map,
            upi: doc.data().upi,
          });
        });
      });

    db.collection('medicine')
      .where('exchangeId', '==', this.state.exchangeId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ receiverRequestDocId: doc.id });
        });
      });
  }

  updateBarterStatus = () => {
    db.collection('all_Barters').add({
      medicinename: this.state.medicinename,
      exchange_id: this.state.exchangeId,
      requested_by: this.state.receiverName,
      donor_id: this.state.userId,
      request_status: 'Donor Interested',
    });
  };

  addNotification = () => {
    console.log('in the function ', this.state.rec);
    var message =
      this.state.userName + ' has shown interest in exchanging the item';
    db.collection('all_notifications').add({
      targeted_user_id: this.state.receiverId,
      donor_id: this.state.userId,
      exchangeId: this.state.exchangeId,
      item_name: this.state.itemName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  };

  componentDidMount() {
    this.getreceiverDetails();
    this.getUserDetails(this.state.userId);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <Icon
                  name="arrow-left"
                  type="feather"
                  color="#ffff"
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              centerComponent={{
                text: 'ShopDetials',
                style: { color: '#ffff', fontSize: 20, fontWeight: 'bold' },
              }}
              backgroundColor="#1200F4"
            />
          </View>

          <View style={{ flex: 0.3, marginTop: RFValue(20) }}>
            <Card title={'Medicine Information'} titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Name : {this.state.medicinename}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Nick Name : {this.state.nickName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Is Medicine Available : {this.state.available}
                </Text>
              </Card>
            </Card>
          </View>

          <View style={{ flex: 0.3 }}>
            <Card title={'Shop Information'} titleStyle={{ fontSize: 30 }}>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Shop Name: {this.state.storeName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Owner Name: {this.state.ownerName}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Shop Phone Number: {this.state.shopPhoneNumber}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Phone Number 2: {this.state.mobile_number}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Address: {this.state.receiverAddress}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }} onPress={{}}>
                  Google Map Link: {this.state.map}
                </Text>
              </Card>

              <Card>
                <Text style={{ fontWeight: 'bold' }}>
                  Upi: {this.state.upi}
                </Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {this.state.receiverId !== this.state.userId ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.updateBarterStatus();
                  this.addNotification();
                  this.props.navigation.navigate('MyDonationScreen');
                }}>
                <Text style={{ color: '#ffff' }}>I want to Buy</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(30),
  },
  button: {
    width: 200,
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
    elevation: 16,
  },
});
