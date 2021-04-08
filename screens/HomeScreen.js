import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allRequests: [],
    };
    this.listRef = null;
  }

  getExchangedItemsList = () => {
    this.listRef = db.collection("exchange_requests").onSnapshot((snapshot) => {
      var allRequests = snapshot.docs.map((doc) => doc.data());
      this.setState({
        allRequests: allRequests,
      });
    });
  };

  componentDidMount() {
    this.getExchangedItemsList();
  }

  componentWillUnmount() {
    this.listRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.item_description}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("ReceiverDetails", {
                "details": item,
              });
            }}
          >
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <MyHeader title="Home Page" />
          <View style={{ flex: 1 }}>
            {this.state.allRequests.length === 0 ? (
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20 }}>
                  List Of All Exchanged items
                </Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
