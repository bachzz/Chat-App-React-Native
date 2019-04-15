import React, {Component} from 'react';
import { StyleSheet, Button } from 'react-native';

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Login"
        onPress={() => navigate('Login')}
      />
    );
  }
}

//const styles = StyleSheet.create({});

export default RegisterScreen;
