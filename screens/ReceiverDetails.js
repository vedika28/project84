import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";

export default class ReceiverDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      receiverId: this.props.navigation.getParam("details")["user_id"],
      exchangeId: this.props.navigation.getParam("details")["exchange_id"],
      itemName: this.props.navigation.getParam("details")["item_name"],
      description: this.props.navigation.getParam("details")[
        "item_description"
      ],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverRequestDocId: "",
    };
  }

  getReceiverDetails() {
    //console.log("receiver ", this.state.receiverId);
    db.collection("users")
      .where("email_Id", "==", this.state.receiverId)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name,
            receiverContact: doc.data().contact,
            receiverAddress: doc.data().address,
          });
        });
      });

    db.collection("exchange_requests")
      .where("exchange_id", "==", this.state.exchangeId)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.setState({ receiverRequestDocId: doc.id });
        });
      });
  }

  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_Id", "==", userId)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.setState({
            userName: doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

  updateItemStatus = () => {
    db.collection("all_barters").add({
      item_name: this.state.itemName,
      exchange_id: this.state.exchangeId,
      requested_by: this.state.receiverName,
      user_id: this.state.userId,
      exchange_status: "User Interested",
    });
  };

  addNotification = () => {
    var message = this.state.userName + " has shown interest in exchanging the item";
    db.collection("all_notifications").add({
      targeted_user_id: this.state.receiverId,
      user_id: this.state.userId,
      exchange_id: this.state.exchangeId,
      item_name: this.state.itemName,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: message,
    });
  };

  componentDidMount() {
    this.getReceiverDetails();
    this.getUserDetails(this.state.userId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#696969"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: "Exchanged Items",
            style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
          }}
          backgroundColor="#eaf8fe"
        />

        <View style={{ flex: 0.3 }}>
          <Card title={"Item Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name : {this.state.itemName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Description : {this.state.description}
              </Text>
            </Card>
          </Card>

          <Card title={"Reciever Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name: {this.state.recieverName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Contact: {this.state.recieverContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Address: {this.state.recieverAddress}
              </Text>
            </Card>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          {this.state.receiverId !== this.state.userId ? (
            <TouchableOpacity
              style={[styles.button,{backgroundColor: '#eaf8fe'}]}
              onPress={() => {
                this.updateItemStatus();
                this.addNotification();
                this.props.navigation.navigate("MyBarters");
              }}
            >
              <Text>I want to Exchange</Text>
            </TouchableOpacity>
          ) : null}
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
