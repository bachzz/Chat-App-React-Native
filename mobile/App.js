// Import the screens
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import HomeScreen from './components/Home';

// Import React Navigation
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Create the navigator
const RootStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  //Register: { screen: RegisterScreen },
});

// Export it as the root component
const App = createAppContainer(RootStack);

export default App;



// CLIENT - SOCKET

/*
import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View, Alert} from 'react-native';
import io from 'socket.io-client';

export default class App extends Component<> {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      chatMessage: "",
      chatMessages: []
    };
    this.state.username = "John Smith";
  }

  componentDidMount(){
    this.socket = io("http://10.0.2.2:3000"); // 10.0.2.2 is localhost of main machine for emulator
    this.socket.emit("login", this.state.username);
    this.socket.on("chat-message", msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
    //this.setState({chatMessage: "HAHA"});
    Alert.alert("HAHAHA");
  }

  submitChatMessage(){
    this.socket.emit("chat-message", this.state.chatMessage);
    this.setState({chatMessage: ""});
  }

  render() {
    const history = this.state.chatMessages.map(msg => (
      <Text key={msg}>{msg}</Text>
    ));
    return (
      <View style={styles.container}>
        <TextInput
          style = {{height: 40, borderWidth: 2}}
          value = {this.state.chatMessage}
          autoCorrect  = {false}
          onSubmitEditing = {() => this.submitChatMessage()}
          onChangeText ={chatMessage => {
            this.setState({chatMessage: chatMessage});

          }}
        />
        {history}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
*/
