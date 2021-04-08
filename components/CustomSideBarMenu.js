import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";
//import { Avatar } from "react-native-elements";
//import db from "../config";
//import * as ImagePicker from "expo-image-picker";

export default class CustomSideBarMenu extends Component {
  /*state = {
    image: "#",
    userId: firebase.auth().currentUser.email,
    name: "",
    docId: "",
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.ALL,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!cancelled) {
      this.uploadImage(uri.this.state.userId);
    }
  };

  uploadImage = async (uri, name) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + name);

    return ref.put(blob).then((response) => {
      this.fetchImage(name);
    });
  };

  fetchImage = async (name) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("userProfiles/" + name);
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: uri });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfiles() {
    db.collection("users")
      .where("email_Id", "==", this.state.userId)
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.getUserProfiles();
    this.fetchImage(this.state.userId);
  }*/

  render() {
    return (
      <View style={{ flex: 1 }}>

        <DrawerItems {...this.props} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("SignUpLoginScreen");
            firebase.auth().signOut();
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    padding: 15,
  },
  conatiner: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 25,
    borderRadius: 43,
  },
});
