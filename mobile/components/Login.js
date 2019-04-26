import React, {Component} from 'react';
import { StyleSheet, Button, Alert, TextInput, View } from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://192.168.46.129:5000";//"http://10.0.2.2:4000";

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props){
    super(props);
    this.state = {
      name: "",
      password: "",
    }
  }

  async handleLogin(){
    try {
      const {name , password} = this.state;
      const formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);

      const result = await axios.post("/login", formData);//{name, password});
      //Alert.alert("Email=" + result.data.email + " Password=" + result.data.password + " Token=" + result.data.token);
    } catch (error){
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style = {{height: 40, borderWidth: 2}}
          value = {this.state.name}
          //keyboardType = "email-address"
          placeholder = "Name"
          autoCapitalize = "none"
          autoCorrect  = {false}
          //onSubmitEditing = {() => this.submitChatMessage()}
          onChangeText ={nameInput => {
            this.setState({name: nameInput});
          }}
        />
        <TextInput
          style = {{height: 40, borderWidth: 2}}
          value = {this.state.password}
          placeholder = "Password"
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
