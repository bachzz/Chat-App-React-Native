import React, {Component} from 'react';
import { StyleSheet, Button } from 'react-native';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Register"
        onPress={() => navigate('Register')}
      />
    );
  }
}

//const styles = StyleSheet.create({});

export default HomeScreen;
