import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, View, Text, Dimensions, TouchableHighlight } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';
import axios from 'axios';
import { TextInputLayout } from 'rn-textinputlayout';

axios.defaults.baseURL = "http://192.168.46.129:5000";//"http://10.0.2.2:4000";
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
      signupEmail: "",
    }
  }

  async handleLogin() {
    try {
      const { name, password } = this.state;
      const formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);

      const result = await axios.post("/login", formData);//{name, password});
      //Alert.alert("Email=" + result.data.email + " Password=" + result.data.password + " Token=" + result.data.token);
    } catch (error) {
      console.error(error);
    }
  }

  async handleRegister() {
    try {
      const { username, password } = this.state;//Alert.alert("HELLO!");
      const formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      const result = await axios.post("/users/register", formData);//{username, password});
      //Alert.alert("HELLO!");
      Alert.alert(JSON.stringify(result.data));
      //Alert.alert("Email=" + result.data.name + " Password=" + result.data.password + " Token=" + result.data.token);
    } catch (error) {
      console.error(error);
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
            value={this.state.name}
            //keyboardType = "email-address"
            placeholder="Username"
            placeholderTextColor="grey"
            autoCapitalize="none"
            autoCorrect={false}
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={nameInput => {
              this.setState({ name: nameInput });
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
              this.setState({ password: passInput });
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
            value={this.state.name}
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
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={passInput => {
              this.setState({ signupConfirm: passInput });
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
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            //onSubmitEditing = {() => this.submitChatMessage()}
            onChangeText={emailInput => {
              this.setState({ signupEmail: emailInput });
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
