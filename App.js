
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import{
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import StackNavigator from './APP/Components/stackNavigator';
import AuthNavigator from './APP/Components/authNavigator'
import FirstPage from './APP/Screens/firstPage';
import { createSwitchNavigator } from 'react-navigation';
import storage from './APP/Storage/storage';
import Action from './APP/Action/INIT';
import global from './APP/Global/global';
import LoadingView from './APP/Components/loadingView';
import store from './APP/Store/store'

class AuthLoading extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        show:true
      }
      this.loadWhichScreen() 
    }

    _onRequestClose(){
      this.setState({show:false})
    }

    loadWhichScreen(){
      
      storage.load({
        key : 'autoLogin'
      }).then((ret)=>{
        Action.INIT(ret._id,ret._password,()=>{
          this._onRequestClose()
          store.account = ret._id;
          store.token = ret._password;
          global.id = ret._id;
          global.password = ret._password;
          this.props.navigation.navigate('RootTabNavigator')
        })          
      }).catch(()=>{
        this.props.navigation.navigate('FirstPage')
      })
    }

    render() {
      return (
        <View style={styles.container}>
        {
          this.state.show == true?
          <LoadingView
            loadingText='自动登录中...'
            cancel={this._onRequestClose.bind(this)} 
          />
          :null
        }
          <Image 
              source={require('./assets/images/splash.jpg')}
              resizeMode='contain'
              style={styles.img}
          />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#000'
    },
    img:{
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width
    }
  });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);













