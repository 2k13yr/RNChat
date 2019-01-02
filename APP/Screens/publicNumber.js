/*
    公众号页面，暂未实现
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import Options from '../Components/options';
import ChatBackBar from '../Components/chatBackBar'

export default class GroupChat extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
        this._Back = this._Back.bind(this)
    }
    _Back(){
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
            <ChatBackBar name='公众号' goBack={this._Back} />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        暂未实现
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#ebebeb',
        paddingBottom: 10,
    },
    textContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 15,
    }
});