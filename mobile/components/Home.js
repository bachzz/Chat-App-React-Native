import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, TouchableOpacity, Alert, Image, Text, DrawerLayoutAndroid } from 'react-native';
import { GiftedChat, Bubble, Composer, InputToolbar } from 'react-native-gifted-chat'
import io from 'socket.io-client';
//import Header from './Header';
import { DrawerNavigator, createDrawerNavigator } from 'react-navigation';
import axios from 'axios';
import './creds.js';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
YellowBox.ignoreWarnings(['Setting a timer']);

axios.defaults.baseURL = "https://ict-chatapp.herokuapp.com/";
//axios.defaults.baseURL = "http://b50ac020.ngrok.io";//"https://ict-chatapp.herokuapp.com/";//"http://192.168.46.129:5000";

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      onIndex: 0,
      onChannelId: "0",
      listChannels: [ // DUMMY SAMPLEs
        {
          "title": "general",
          "onPress": this.channelOnPress.bind(this, "general", 0),
          "msgs": [
            {
              _id: "asdfasd",
              text: '',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
              },
            },
          ],
        },
      ],
      channelName: '',
    }

  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    // header: navigation => ({
    //   style: {
    //     backgroundColor: '#1e2124',
    //   }
    // });

    return {
      title: navigation.getParam('Title', '#general'),
      headerStyle: {
        backgroundColor: '#1e2124',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    }
  }

  async sendChannel(channelName) {
    try {
      let header = {
        headers: {
          Authorization: 'Bearer ' + global.jwt,
        }
      }
      const result = await axios.post("/channel", {
        title: channelName,
      }, header);
    } catch (error) {
      console.error(error);
    }
  }

  async joinChannel(channelId) {
    try {
      let header = {
        headers: {
          Authorization: 'Bearer ' + global.jwt,
        }
      }
      const result = await axios.post("/channel/join", {
        channel_id: channelId,
      }, header);
      this.setState({ onChannelId: channelId.toString() });
    } catch (error) {
      console.error(error);
    }
  }

  async getChannelList() {
    /* get list of channel */
    try {
      let header = {
        headers: {
          Authorization: 'Bearer ' + global.jwt,
        }
      }
      const result = await axios.get("/channel", header);
      const channels = result.data.channels;
      return channels;
    } catch (error) {
      console.error(error);
    }
  }

  async getMessages() {
    /* get list of channel */
    try {
      let header = {
        headers: {
          Authorization: 'Bearer ' + global.jwt,
        }
      }
      const result = await axios.get("/message?channel_id=" + this.state.onChannelId, header);
      const messages = result.data.messages;
      return messages;
    } catch (error) {
      console.error(error);
    }
  }

  async reloadMessages() {
    /* Get all messages in current channel */
    let messages = await this.getMessages();
    messages = messages.map((message) => {
      let user_name = message.sender;
      let user_tmp = {
        _id: user_name == global.username ? 1 : 2,
        name: user_name,
      };

      let msg = {
        _id: message.id,
        text: message.text,
        created_at: message.created_at,
        user: user_tmp,
      }
      return msg;
    })

    messages = messages.reverse();

    /* Set messages in current state's channel to messages retrieved */
    this.setState(previousState => {
      const newList = previousState.listChannels.map((channel, index) => {
        if (index == this.state.onIndex) {
          channel.msgs = messages;
          return channel;
        }
        else {
          return channel;
        }
      });

      return { listChannels: newList };
    })
  }

  async updateNewChannel(channel) {
    await this.reloadChannels();
    this.reloadMessages();
  }

  async reloadChannels() {
    /* get list of channel */
    let channels = await this.getChannelList();

    /* if channels list in server is empty*/
    if (channels.length == 0) {
      await this.sendChannel(this.state.listChannels[0].title);
      channels = await this.getChannelList();
    }

    /* create new list of channels (without messages) */
    const new_channels = channels.map((channel, index) => {
      let new_channel = {
        "id": channel.id,
        "title": channel.title,
        "onPress": this.channelOnPress.bind(this, channel.title, index),
        "msgs": [],
      }
      return new_channel;
    });
    this.setState({ listChannels: new_channels });
  }

  async componentDidMount() {
    /* Reload channels */
    await this.reloadChannels();

    /* Join 1st channel */
    await this.joinChannel(this.state.listChannels[0].id);

    /* Reload messages in current channel */
    this.reloadMessages();

    /* Listen to socket for incoming messages */
    this.socket = io("https://ict-chatapp.herokuapp.com/", { transports: ['websocket'], forceNew: true, pingTimeout: 30000 });//io("http://192.168.46.129:5000"); // 10.0.2.2 is localhost of main machine for emulator
    //this.socket = io("http://b50ac020.ngrok.io", { transports: ['websocket'], forceNew: true, pingTimeout: 30000 });
    this.socket.on("new_message", msg => {
      this.reloadMessages();
    });

    this.socket.on("new_channel", msg => {
      this.updateNewChannel(msg);
    });
  }

  async sendMessage(message) {
    try {
      //Alert.alert("debug", JSON.stringify(message));
      let header = {
        headers: {
          Authorization: 'Bearer ' + global.jwt,
        }
      }
      const result = await axios.post("/message", {
        msg: message.text,
      }, header);
    } catch (error) {
      console.error(error);
    }
  }

  onSend(messages = []) {
    this.sendMessage(messages[0]);
    this.reloadMessages();
  }

  async channelOnPress(channelName, index) {
    this.props.navigation.setParams({ Title: "#" + channelName });

    /* Join channel */
    await this.joinChannel(this.state.listChannels[index].id);
    this.setState({ onIndex: index });

    /* Reload messages in current channel */
    this.reloadMessages();
  }

  async addChannel(channelName) {
    /* send channel to server */
    await this.sendChannel(channelName);

    /* reload channels */
    await this.reloadChannels();
    const index = this.state.listChannels.length;

    /* Join new channel */
    await this.joinChannel(this.state.listChannels[index - 1].id);
    this.setState({ onIndex: index - 1 });
    this.props.navigation.setParams({ Title: "#" + channelName });

    /* Reload messages in current channel */
    this.reloadMessages();
  }

  renderComposer(props) {
    return (
        <Composer
        textInputStyle={{backgroundColor: '#41393E', color: 'white'}}
          {...props}
          placeholder={'Type a message...'}
        />);
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar 
      {...props} 
      containerStyle={{backgroundColor: '#41393E'}} />
    )
  }

  render() {

    /* DRAWER */
    const navigationView = (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#1e2124' }}>
        <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', }}>
          <TextInput
            style={{ height: 40, width: 260, backgroundColor: 'grey' }}
            placeholder="Enter channel name"
            onChangeText={(channelName) => this.setState({ channelName })}
          />
          <TouchableOpacity
            style={{ width: 40, height: 40 }}
            onPress={this.addChannel.bind(this, this.state.channelName)}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/add-box-insert-button-plus-31695.png' }}
            />
          </TouchableOpacity>

        </View>
        <View style={{}}>
          {
            this.state.listChannels.map((channel, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={this.state.onIndex == index ? styles.buttonOn : styles.buttonOff}
                  onPress={channel.onPress}
                >
                  <Text style={this.state.onIndex == index ? styles.textOn : styles.textOff}> #{channel.title} </Text>
                </TouchableOpacity>
              )
            }
            )
          }
        </View>
      </View>
    );

    return (
      <View style={{ flex: 1, backgroundColor: '#36393e' }}>
        <DrawerLayoutAndroid
          drawerBackgroundColor='#1e2124'
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>

          <GiftedChat
            messages={this.state.listChannels[this.state.onIndex].msgs}
            renderInputToolbar={props => this.renderInputToolbar(props)}
            renderComposer={props => this.renderComposer(props)}
            onSend={messages => this.onSend(messages)}
            style={styles.chat}
            user={{
              _id: 1,
              name: global.username,
            }}
          />
        </DrawerLayoutAndroid>
      </View>
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
  },
  buttonOn: {
    alignItems: 'center',
    backgroundColor: '#36393e',
    padding: 10
  },
  buttonOff: {
    alignItems: 'center',
    backgroundColor: '#1e2124',
    padding: 10
  },
  textOn: {
    color: 'white',
  },
  textOff: {
    color: 'grey',
  },
});

export default HomeScreen;
