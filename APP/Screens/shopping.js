/*
    购物页面，通过Webview跳转到淘宝或者京东页面
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';
import ChatBackBar from '../Components/chatBackBar'

export default class Shopping extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {};
        this._Back = this._Back.bind(this)
    }
    _Back(){
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View style={styles.container}>
                <ChatBackBar name='购物' goBack={this._Back} />
                <WebView 
                    source={{uri:'https://www.taobao.com/'}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
});