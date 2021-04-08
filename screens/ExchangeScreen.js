import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class ExchangeScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      itemName: "",
      itemDescription: "",
      /*requestItemName: '',
      exchangeId: '',
      itemStatus: '',
      docId: '',
      isExchangeRequestActive: false*/
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addItem = (itemName, itemDescription) => {
    var userId = this.state.userId;
    var exchangeId = this.createUniqueId();
    db.collection("exchange_requests").add({
      "user_id": userId,
      "item_name": itemName,
      "item_description": itemDescription,
      "exchange_id": exchangeId,
     // "item_status": "requested",
      //"date": firebase.firestore.FieldValue.serverTimestamp()
    });

    /*await this.getExchangedRequest()
    db.collection("users")
      .where('user_id','==',userId)
      .get()
      .then()
      .then((snap)=>{
        snap.forEach((doc)=>{
          db.collection('users').doc(doc.id).update({
            isExchangeRequestActive: true
          })
        })
      })*/

    this.setState({
      itemName: "",
      itemDescription: "",
    });

    return Alert.alert("Item ready to Exchange");
  };

  render() {
    return (
      <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <MyHeader title="Exchange Items" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter item name"}
            onChangeText={(text) => {
              this.setState({
                itemName: text,
              });
            }}
            value={this.state.itemName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            multiline
            numberOfLines={8}
            placeholder={"Describe the item"}
            onChangeText={(text) => {
              this.setState({
                itemDescription: text,
              });
            }}
            value={this.state.itemDescription}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addItem(this.state.itemName, this.state.itemDescription);
            }}
          >
            <Text>Add Item</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
