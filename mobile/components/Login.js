import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, View, Text, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import { TextInputLayout } from 'rn-textinputlayout';

import axios from 'axios';
import './creds.js';

axios.defaults.baseURL = "https://ict-chatapp.herokuapp.com/";//"http://192.168.46.129:5000";//"http://10.0.2.2:4000";
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
    }
  }

  async handleLogin() {
    try {
      const result = await axios.post("/user/login", {
        "username": this.state.loginName,
        "password": this.state.loginPassword
      });
      //Alert.alert("response",JSON.stringify(result.data));
      global.jwt = result.data.jwt;
      global.username = this.state.loginName;
      //Alert.alert("jwt",global.jwt);
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
        <TextInputLayout
          style={styles.inputFieldLayout}
          focusColor="#ff0266"
        >
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
        </TextInputLayout>
        <TextInputLayout
          style={styles.inputFieldLayout}
          focusColor="#ff0266"
        >
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
        </TextInputLayout>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={() => this.handleLogin()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableHighlight>

      </View>
    )
  }

  renderSignUp() {
    return (
      <View>
        <TextInputLayout
          style={styles.inputFieldLayout}
          focusColor="#ff0266"
        >
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
        </TextInputLayout>

        <TextInputLayout
          style={styles.inputFieldLayout}
          focusColor="#ff0266"
        >
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
        </TextInputLayout>

        <TextInputLayout
          style={styles.inputFieldLayout}
          focusColor="#ff0266"
        >
          <TextInput
            style={styles.inputField}
            value={this.state.password}
            placeholderTextColor="grey"
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            onSubmitEditing = {() => {
              if (this.state.signupPassword !== this.state.signupConfirm)
                Alert.alert("Warning", "Comfirmed password not matched!");
            }}
            onChangeText={passInput => {
              this.setState({ signupConfirm: passInput });
            }}
          />
        </TextInputLayout>



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
  },
  indicatorText: {
    fontSize: 20,
    color: 'black',

  },
  indicatorSelectedText: {
    fontSize: 20,
    color: 'white',
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
    fontSize: 12,
    color: 'white',
  },
  loginButton: {
    borderRadius: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 5,
    backgroundColor: 'grey',
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
    color: 'black',
  }
});

export default LoginScreen;
