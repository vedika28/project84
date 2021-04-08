import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Icon, ListItem } from "react-native-elements";
import MyHeader from "../components/MyHeader.js";
import firebase from "firebase";
import db from "../config.js";

export default class MyBarters extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      allBarters: [],
    };
    this.exchangeRef = null;
  }

  static navigationOptions = { header: null };

  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_Id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            "userName": doc.data().first_name + " " + doc.data().last_name,
          });
        });
      });
  };

  getAllBarters = () => {
    this.exchangeRef = db
      .collection("all_barters")
      .where("user_id", "==", this.state.userId)
      .onSnapshot((snap) => {
        var allBarters = [];
        snap.docs.map((doc) => {
          var barter = doc.data();
          barter["doc_id"] = doc.id;
          allBarters.push(barter);
        });
        this.setState({
          allBarters: allBarters,
        });
      });
  };

  sendItem = (itemDetails) => {
    if (itemDetails.exchange_status === "Item Sent") {
      db.collection("all_barters").doc(itemDetails.doc_id).update({
        'exchange_status': "User Interested",
      });
      this.sendNotification(itemDetails, exchangeStatus);
    } else {
      var exchangeStatus = "Item Sent";
      db.collection("all_barters").doc(itemDetails.doc_id).update({
        'exchange_status': "Item Sent",
      });
      this.sendNotification(itemDetails, exchangeStatus);
    }
  };

  sendNotification = (itemDetails, exchangeStatus) => {
    var exchangeId = itemDetails.exchange_id;
    var userId = itemDetails.user_id;
    db.collection("all_notifications")
      .where("exchange_id", "===", exchangeId)
      .where("user_id", "===", userId)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var message = "";
          if (exchangeStatus === "Item Sent") {
            message = this.state.userName + " sent you the item";
          } else {
            message =
              this.state.userName +
              " has shown interest in exchanging the item with you";
          }
          db.collection("all_notifications").doc(doc.id).update({
            'message': message,
            'notifiaction_status': "unread",
            'date': firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem
      key={i}
      title={item.item_name}
      subtitle={
        "Requested by: " +
        item.requested_by +
        "\nStatus: " +
        item.exchange_status
      }
      leftElement={<Icon name="Item" type="font-awesome" color="#696969" />}
      titleStyle={{ fontWeight: "bold" }}
      rightElement={
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                item.exchange_status === "Item Sent" ? "green" : "#ff5722",
            },
          ]}
          onPress={() => {
            this.sendItem(item);
          }}
        >
          <Text style={{ color: "#ffff" }}>
            {item.exchange_status === "Item Sent" ? "Item Sent" : "Send Item"}
          </Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  );

  componentDidMount() {
    this.getUserDetails(this.state.userId);
    this.getAllBarters();
  }
  componentWillUnmount() {
    this.exchangeRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader navigation={this.props.navigation} title="My Barters" />
        {
          this.state.allBarters.length === 0 
          ?(
            <View style={styles.subtitle}>
              <Text style={{ fontSize: 22 }}>List of all Barters</Text>
            </View>
          )
          :(
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allBarters}
              renderItem={this.renderItem}
            />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
