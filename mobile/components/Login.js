import React, {Component} from 'react';
import { StyleSheet, Button, Alert, TextInput, View } from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://10.0.2.2:4000";

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  async handleLogin(){
    try {
      const {email , password} = this.state;
      const result = await axios.post("/auth/login", {email, password});
      Alert.alert("Email=" + result.data.email + " Password=" + result.data.password + " Token=" + result.data.token);
    } catch (error){
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style = {{height: 40, borderWidth: 2}}
          value = {this.state.email}
          keyboardType = "email-address"
          placeholder = "your@email.com"
          autoCapitalize = "none"
          autoCorrect  = {false}
          //onSubmitEditing = {() => this.submitChatMessage()}
          onChangeText ={emailInput => {
            this.setState({email: emailInput});
          }}
        />
        <TextInput
          style = {{height: 40, borderWidth: 2}}
          value = {this.state.password}
          placeholder = "password"
          autoCapitalize = "none"
          autoCorrect  = {false}
          secureTextEntry
          //onSubmitEditing = {() => this.submitChatMessage()}
          onChangeText ={passInput => {
            this.setState({password: passInput});
          }}
        />
        <Button
          //color = '#841584'
          title = "login"
          onPress = {() => this.handleLogin()}
        />
        <Button
          color = '#008000'
          title = "register"
          onPress = {() => this.props.navigation.navigate('Register')}
        />
      </View>
    );
  }
}

//const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default LoginScreen;
