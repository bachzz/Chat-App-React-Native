import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, TouchableHighlight, Alert, ActivityIndicator } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'; ``
//import { TextInputLayout } from 'rn-textinputlayout';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import './creds.js';

axios.defaults.baseURL = "https://ict-chatapp.herokuapp.com/";
//axios.defaults.baseURL = "http://b50ac020.ngrok.io";//"https://ict-chatapp.herokuapp.com/";//"http://192.168.46.129:5000";//"http://10.0.2.2:4000";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      loginPassword: "",

      signupName: "",
      signupPassword: "",
      signupConfirm: "",

      viewPager: "",
      isLoginLoading: false,
    }
  }

  async handleLogin() {
    this.setState({ isLoginLoading: true });
    try {
      const result = await axios.post("/user/login", {
        "username": this.state.loginName,
        "password": this.state.loginPassword
      });
      //Alert.alert("response",JSON.stringify(result.data));
      global.jwt = result.data.jwt;
      global.username = this.state.loginName;
      //Alert.alert("jwt",global.jwt);
      this.setState({ isLoginLoading: false });
      this.props.navigation.navigate('Home');
    } catch (error) {
      //Alert.alert("error",error.response.data);
      //console.log(error);
      Alert.alert("ErrorLogin", error.response.data.message);
    }
  }

  async handleRegister() {
    try {
      //Alert.alert("HELLO!");
      const result = await axios.post("/user/register", {
        "username": this.state.signupName,
        "password": this.state.signupPassword
      });
      //Alert.alert("HELLO!");
      this.viewPager.setPage(0);
    } catch (error) {
      //console.error(error);
      Alert.alert("Error", error.response.data.message);
    }
  }

  renderTitleIndicator() {
    return <PagerTitleIndicator
      titles={['LOGIN', 'SIGN UP']}
      itemStyle={styles.indicatorItem}
      selectedItemStyle={styles.indicatorSelectedItem}
      itemTextStyle={styles.indicatorText}
      selectedItemTextStyle={styles.indicatorSelectedText}
      selectedBorderStyle={styles.selectedBorderStyle}
      trackScroll={true}
    />;
  }

  renderLogin() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user-o"
            size={24}
            color="white"
            style={{ alignSelf: 'flex-end' }}
          />
          <TextInput
            style={styles.inputField}
            value={this.state.loginName}
            //keyboardType = "email-address"
            placeholder="Username"
            placeholderTextColor="grey"
            autoCapitalize="none"
            autoCorrect={false}
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={nameInput => {
              this.setState({ loginName: nameInput });
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather
            name="key"
            size={24}
            color="white"
            style={{ alignSelf: 'flex-end' }}
          />
          <TextInput
            style={styles.inputField}
            value={this.state.password}
            placeholderTextColor="grey"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={passInput => {
              this.setState({ loginPassword: passInput });
            }}
          />
        </View>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => this.handleLogin()}>
          {this.state.isLoginLoading === true
            ? <ActivityIndicator size="large" color="#0000ff" />
            : <Text style={styles.loginText}>LOGIN</Text>}
        </TouchableHighlight>

      </View>
    )
  }

  renderSignUp() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user-o"
            size={24}
            color="white"
            style={{ alignSelf: 'flex-end' }}
          />
          <TextInput
            style={styles.inputField}
            value={this.state.signupName}
            //keyboardType = "email-address"
            placeholder="Username"
            placeholderTextColor="grey"
            autoCapitalize="none"
            autoCorrect={false}
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={nameInput => {
              this.setState({ signupName: nameInput });
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather
            name="key"
            size={24}
            color="white"
            style={{ alignSelf: 'flex-end' }}
          />
          <TextInput
            style={styles.inputField}
            value={this.state.password}
            placeholderTextColor="grey"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={passInput => {
              this.setState({ signupPassword: passInput });
            }}
          />
        </View> 
        <View style={styles.inputContainer}>
          <FontAwesome
            name="key"
            size={24}
            color="white"
            style={{ alignSelf: 'flex-end' }}
          />
          <TextInput
            style={styles.inputField}
            value={this.state.password}
            placeholderTextColor="grey"
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            onSubmitEditing={() => {
              if (this.state.signupPassword !== this.state.signupConfirm)
                Alert.alert("Warning", "Comfirmed password not matched!");
            }}
            onChangeText={passInput => {
              this.setState({ signupConfirm: passInput });
            }}
          />
        </View>
        {/* </TextInputLayout> */}


        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => this.handleRegister()}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <IndicatorViewPager
          style={{ flex: 1, flexDirection: 'column-reverse' }}
          indicator={this.renderTitleIndicator()}
          ref={viewPager => { this.viewPager = viewPager; }}
        >

          {this.renderLogin()}
          {this.renderSignUp()}

        </IndicatorViewPager>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: windowHeight / 8,
    backgroundColor: '#1e2124',
  },
  indicatorItem: {
    width: windowWidth / 2,
    backgroundColor: '#1e2124',

  },
  indicatorSelectedItem: {
    width: windowWidth / 2,
    backgroundColor: '#1e2124',
    borderBottomWidth: 2,
    borderBottomColor: "#199187",
  },
  indicatorText: {
    fontSize: 20,
    color: 'grey',

  },
  indicatorSelectedText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "bold",
  },
  selectedBorderStyle: {
    backgroundColor: '#1e2124',
  },
  inputFieldLayout: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  inputField: {
    padding: 5,
    height: 40,
    fontSize: 14,
    color: 'white',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginVertical: 16,
    marginHorizontal: 32,
    padding: 5,
    height: 40,
    color: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  loginButton: {
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 24,
    marginHorizontal: 32,
    padding: 5,
    backgroundColor: '#59cbbd',
    paddingVertical: 8,
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: 'black',
  }
});

export default LoginScreen;
