import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

class HomeScreen extends Component {
  state = {
    messages: [],
  }
  static navigationOptions = {
    title: '#general',
  };
  /*render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.bottom}>
          <TextInput
            placeholder = "Chat"
          />
          <Button
            title="Send"
            onPress={() => navigate('Register')}
          />
        </View>
      </View>
    );
  }*/
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello world!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      /*<View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('https://cdn4.iconfinder.com/data/icons/yellow-commerce/100/.svg-19-512.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>*/
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center'
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'flex-end',
    marginBottom: 0,
    //alignItems: 'stretch',
  }
});

export default HomeScreen;
