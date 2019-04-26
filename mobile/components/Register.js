import React, {Component} from 'react';
import { StyleSheet, Button, Alert, TextInput, View } from 'react-native';
import axios from 'axios';

axios.defaults.baseURL = "http://192.168.46.132:5000"//"http://192.168.46.129:5000";

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }

  async handleRegister(){
    try {
      const {username , password} = this.state;//Alert.alert("HELLO!");
      const formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      const result = await axios.post("/users/register", formData);//{username, password});
      //Alert.alert("HELLO!");
      Alert.alert(result.data);
      //Alert.alert("Email=" + result.data.name + " Password=" + result.data.password + " Token=" + result.data.token);
    } catch (error){
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style = {{height: 40, borderWidth: 2}}
          value = {this.state.username}
          //keyboardType = "email-address"
          placeholder = "Name"
          autoCapitalize = "none"
          autoCorrect  = {false}
          //onSubmitEditing = {() => this.submitChatMessage()}
          onChangeText ={nameInput => {
            this.setState({username: nameInput});
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
          title = "Register"
          onPress = {() => this.handleRegister()}
        />
        <Button
          color = '#008000'
          title = "Login"
          onPress = {() => this.props.navigation.navigate('Login')}
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

export default RegisterScreen;
