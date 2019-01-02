/**
 * 修改昵称和个性签名的页面
 * 
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Button,
    DeviceEventEmitter
} from 'react-native';
import ChatBackBar from '../Components/chatBackBar';
import _init from '../Action/_init';
import Action from '../Action/INIT'

export default class UpdateNick extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nick : '',
            sign : '',
        }
        this._Back = this._Back.bind(this)
        this.updateMyInfoDone = this.updateMyInfoDone.bind(this)
    }
    _Back(){
        this.props.navigation.goBack();
    }
    saveNick(){
        _init().updateMyInfo({
            nick : this.state.nick,
            done : this.updateMyInfoDone
        });
    }
    saveSign(){
        _init().updateMyInfo({
            sign : this.state.sign,
            done : this.updateMyInfoDone
        });
    }
    updateMyInfoDone(error, user) {
        if(!error){
            Action.onUpdateMyInfo(user)
            DeviceEventEmitter.emit('refreshInfo',()=>{})
        }
        this._Back()
    }
    render(){
        return(
            this.props.navigation.state.params.nick?
            <View style={styles.container}>            
                <ChatBackBar
                    name='昵称'
                    goBack={this._Back} 
                    needSave={true}
                    save={this.saveNick.bind(this)} 
                />
                <TextInput 
                    autoFocus={true}
                    defaultValue={this.props.navigation.state.params.nick}
                    enablesReturnKeyAutomatically={true}
                    style={styles.textinput}
                    maxLength={10}
                    onChangeText={(text)=>this.setState({nick : text})}
                />
            </View>
            :
            <View style={styles.container}>            
                <ChatBackBar
                    name='个性签名'
                    goBack={this._Back}
                    needSave={true} 
                    save={this.saveSign.bind(this)}
                />
                <TextInput 
                    autoFocus={true}
                    defaultValue={this.props.navigation.state.params.sign}
                    enablesReturnKeyAutomatically={true}
                    style={styles.textinput}
                    maxLength={30}
                    onChangeText={(text)=>this.setState({sign : text})}
                />
            </View>          
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex : 1
    },
    textinput:{
        borderBottomColor:'#00d205',
        borderBottomWidth:1,
        margin: 20,
        fontSize: 15,
        paddingBottom: 0,
    }
})