import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';

export default class UpdateMedicines extends Component {
  constructor() {
    super();
    this.state = {
      donorId: firebase.auth().currentUser.email,
      donorName: '',
      allDonations: [],
    };
    this.exchangeRef = null;
  }

  static navigationOptions = { header: null };

  getDonorDetails = (donorId) => {
    db.collection('users')
      .where('username', '==', donorId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userType: doc.data().userType,
          });
        });
      });
  };

  getAllDonations = () => {
    this.exchangeRef = db
      .collection('medicine')
      .where('username', '==', this.state.donorId)
      .onSnapshot((snapshot) => {
        var allDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation['doc_id'] = doc.id;
          allDonations.push(donation);
        });
        this.setState({
          allDonations: allDonations,
        });
      });
  };

  senditem = (itemDetails) => {
    if (itemDetails.medicine_status === 'Yes') {
      var medicinestatus = 'No';
      db.collection('medicine').doc(itemDetails.doc_id).update({
        medicine_status: 'No',
      });
    } else {
      var medicinestatus = 'Yes';
      db.collection('medicine').doc(itemDetails.doc_id).update({
        medicine_status: 'Yes',
      });
   
    }
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.medicinename}
      subtitle={item.item_value}
      leftElement={<Icon name="capsules" type="font-awesome" color="#696969" />}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.medicine_status === 'Yes' ? 'green' : '#ff5722',
            },
          ]}
          onPress={() => {
            this.senditem(item);
          }}>
          <Text style={{ color: '#ffff' }}>
            {item.medicine_status === 'Yes' ?  'Stock Left': 'No Stock'}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.getDonorDetails(this.state.donorId);
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.exchangeRef();
  }

  render() {
    if (this.state.userType === 'user') {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader navigation={this.props.navigation} title="Update Medicine" />
          <View style={styles.subtitle}>
            <Text style={{ fontSize: 20 }}>You are not a shop owner</Text>
          </View>
        </View>
      );
    } 
    else {
      return (
        <View style={{ flex: 1 }}>
          <MyHeader navigation={this.props.navigation} title="My Donations" />
          <View style={{ flex: 1 }}>
            {this.state.allDonations.length === 0 ? (
              <View style={styles.subtitle}>
                <Text style={{ fontSize: 20 }}>List of all Medicine</Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1200F4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
