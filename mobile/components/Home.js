import React, {Component} from 'react';
import { View, StyleSheet, Button, TextInput, TouchableOpacity, Alert, Image, Text, DrawerLayoutAndroid } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
//import Header from './Header';
import {DrawerNavigator, createDrawerNavigator} from 'react-navigation';

class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      onIndex: 0,
      listChannels: [
        {
          "title":"#general",
          "onPress": this.channelOnPress.bind(this, "#general", 0),
          "msgs": [
            {
              _id: 1,
              text: 'Hello world!',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                //avatar: 'https://placeimg.com/140/140/any',
              },
            },
            {
              _id: 2,
              text: 'Hello world!',
              createdAt: new Date(),
              user: {
                _id: 1,
                name: 'Bach Nguyen',
                //avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        }
      ],
      channelName: '',
    }

  }

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    //Alert.alert("debug", params);
    return {
         //headerTitle: 'yoyo',//navigation.state.params.title,
         title: navigation.getParam('Title', '#general'),
    }
  }


  onSend(messages = []) {
    //Alert.alert("DEBUG", JSON.stringify(messages));

    /*this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))*/

    //const channel = previousState.listChannels[this.state.onIndex];
    this.setState(previousState => {
      const newList = previousState.listChannels.map((channel, index) => {
        if (index == this.state.onIndex){
          channel.msgs = GiftedChat.append(channel.msgs, messages);
          return channel;
        }
        else {
          return channel;
        }
      });

      return {listChannels: newList};
    })

    //Alert.alert("DEBUG", JSON.stringify(this.state.messages));
  }

  channelOnPress(channelName, index){
    //Alert.alert(channelName);
    this.props.navigation.setParams({Title: channelName});
    this.setState({onIndex: index});
  }

  addChannel(channelName) {
    const index = this.state.listChannels.length;
    //Alert.alert(index.toString());
    let btn = {
      'title': '#'+channelName,
      'onPress': this.channelOnPress.bind(this, '#'+ channelName, index),
      'msgs': [],
    };
    this.setState({
      listChannels: this.state.listChannels.concat(btn),
    });
  }



  render() {

    /* DRAWER */
    const navigationView = (
        <View style={{ flex:1, flexDirection: 'column',backgroundColor: '#fff'}}>
          <View style={{height: 40, flexDirection: 'row',  justifyContent: 'space-between',}}>
            <TextInput
              style={{height: 40, width: 260}}
              placeholder="Enter channel name"
              onChangeText={(channelName) => this.setState({channelName})}
            />
            <TouchableOpacity
              style={{width: 40, height: 40}}
              onPress = {this.addChannel.bind(this, this.state.channelName)}
            >
              <Image
                style={{width: 40, height: 40}}
                source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/add-box-insert-button-plus-31695.png'}}
              />
            </TouchableOpacity>

          </View>
          <View style={{}}>
          {
            this.state.listChannels.map( (channel, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={this.state.onIndex == index ? styles.buttonOn : styles.buttonOff}
                    onPress = {channel.onPress}
                  >
                    <Text> {channel.title} </Text>
                  </TouchableOpacity>
                )
              }
            )
          }
          </View>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>

          <GiftedChat
            messages={this.state.listChannels[this.state.onIndex].msgs}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
              name: 'Bach Nguyen',
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
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  buttonOff: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10
  },
});

export default HomeScreen;
