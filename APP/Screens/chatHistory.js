/**
 * 当获取云端聊天记录时，显示该页面
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,Dimensions
} from 'react-native';
import ChatBackBar from '../Components/chatBackBar';
import _init from '../Action/_init';
import HistoryItem from '../Components/historyItem'

export default class ChatHistory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            historyMsgs : []
        }
        this.getLocalMsgsDone = this.getLocalMsgsDone.bind(this)
    }

    componentWillMount() {      
        _init().getLocalMsgs({
            sessionId: 'p2p-'+this.props.navigation.state.params.name,
            limit: 50,
            done: this.getLocalMsgsDone
          })
    }
    getLocalMsgsDone(error, obj) {
        if (!error) {
            this.setState({ historyMsgs:obj.msgs })
        }
    }
    _Back(){
        this.props.navigation.goBack()
    }
    timeStampToTime(timestamp){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '年';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        var D = date.getDate() + '日';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D;
    }
    emptyComponent(){
        return(
            <View style={styles.empty}>
                <Text style={styles.emptyText}>
                    暂无聊天记录
                </Text>
            </View>
        )
    }
    _renderItem(data){
        return(
            <HistoryItem 
                avatar={require('../../assets/images/icon/c_tag.png')}
                name={data.item.from}
                item={data.item.text}
                time={this.timeStampToTime(data.item.time)}
            />
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <ChatBackBar 
                    name='聊天记录'
                    goBack={this._Back.bind(this)}
                    needMore={true}
                />
                <FlatList
                    data={this.state.historyMsgs}
                    renderItem={this._renderItem.bind(this)}
                    ListEmptyComponent={this.emptyComponent}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    empty:{
        flex: 1,
        marginTop: Dimensions.get('window').height*0.4
    },
    emptyText:{
        textAlign:'center'
    }
});