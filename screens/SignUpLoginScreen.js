import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class SignUpLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      address: "",
      contact: "",
      isModalVisible: "false",
    };
  }

  toLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  toSignIn = (emailId, password, confirmPassword) => {
    if (confirmPassword !== password) {
      return Alert.alert(
        "Password does not match./n Please check your password"
      );
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then((response) => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email_Id: this.state.emailId,
            contact: this.state.contact,
            address: this.state.address,
          });
          return Alert.alert("User added succesfully", "", [
            {
              text: "OK",
              onPress: () => {
                this.setState({
                  isModalVisible: false,
                });
              },
            },
          ]);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  toShowModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <KeyboardAvoidingView style={styles.view}>
          <ScrollView style={{ width: "100%" }}>
            <Text style={styles.title}>Registration</Text>
            <TextInput
              style={styles.input2}
              placeholder={"First Name"}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Last Name"}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Contact No."}
              maxLength={10}
              keyboardType={"numeric"}
              onChangeText={(text) => {
                this.setState({
                  contact: text,
                });
              }}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Email Id"}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TextInput
              style={styles.input2}
              placeholder={"Confirm Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            <View>
              <TouchableOpacity
                style={[styles.button, { marginTop: 70 }]}
                onPress={() =>
                  this.toSignIn(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { marginTop: 50 }]}
                onPress={() => this.setState({ isModalVisible: false })}
              >
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView style={styles.container}>
          {this.toShowModal()}
          <Header
            backgroundColor={"rgb(225, 185, 135)"}
            centerComponent={{
              text: "Barter App",
              style: { color: "#fff", fontSize: 40, fontWeight: "bold" },
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email Id"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Enter password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.toLogin(this.state.emailId, this.state.password);
            }}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginBottom: 250 }]}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.text}>SignUp</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D7C49E",
    alignItems: "center",
    //flex: 1,
  },
  input: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 100,
    fontSize: 22,
    width: 300,
    height: 40,
    backgroundColor: "#ded7ba",
  },
  button: {
    justifyContent: "space-around",
    backgroundColor: "#e0cc92",
    marginTop: 100,
    width: 200,
    height: 30,
    borderRadius: 6,
    textAlign: "center",
    alignSelf: "center",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7C49E",
  },
  title: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "white",
    margin: 50,
  },
  input2: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    fontSize: 20,
    width: 300,
    height: 40,
    backgroundColor: "#ded7ba",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});
