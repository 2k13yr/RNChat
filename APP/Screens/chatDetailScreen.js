/*
    与联系人的聊天详情页面
    要用FlatList：
        FlatList 用于替代ListView，支持下拉刷新和上拉加载，性能较高。
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    DeviceEventEmitter,
    KeyboardAvoidingView,
    ScrollView,
    PixelRatio
} from 'react-native';
import ChatKeyboard from '../Components/chatKeyboard';
import ChatBackBar from '../Components/chatBackBar';
import MyTurn from '../Components/myTurn';
import OthersTurn from '../Components/othersTurn'
import _init from '../Action/_init'
import store from '../Store/store';
import { observer,inject } from 'mobx-react/native';
import storage from '../Storage/storage';
import cutPrefix from '../util/cutPrefix';
import { observable,decorate,action } from 'mobx';
import Action from '../Action/INIT';
import toArray from '../util/toArray'

 
export default ChatDetailScreen = observer(class ChatDetailScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        };
        this._Back = this._Back.bind(this);  
        this._pickPictrue = this._pickPictrue.bind(this);
        this._scan = this._scan.bind(this);
        this._shop = this._shop.bind(this);
        this._renderItem = this._renderItem.bind(this)
        this.getLocalMsgsDone = this.getLocalMsgsDone.bind(this)
        this._scrollToEnd = this._scrollToEnd.bind(this);
        this._toMore = this._toMore.bind(this)
    }   
    

    componentWillMount() {  
        _init().getLocalMsgs({
            sessionId: this.props.navigation.state.params.msgId,
            limit: 12,
            desc: false,
            done: this.getLocalMsgsDone
        })     
    } 


    componentDidMount() {
        DeviceEventEmitter.addListener('have deleted localMsgs',param => {
            _init().getLocalMsgs({
                sessionId: this.props.navigation.state.params.msgId,
                limit: 12,
                desc: false,
                done: this.getLocalMsgsDone
            }) 
        })
    }
    

    getLocalMsgsDone(error, obj) {
        if(!error) store.msgs = obj.msgs;
    }

    _scrollToEnd(){
        setTimeout(() => {
            this.refs.flatList.scrollToEnd({animated: false});
        }, 0); 
    }
    _shop(){
        this.props.navigation.navigate('Shopping');
    }
    _pickPictrue(){
        this.props.navigation.navigate('PickPictrue');
    }
    _scan(){   
        this.props.navigation.navigate('Scan')
    }
    _Back(){
        this.props.navigation.goBack();
    }
    _toMore(){
        this.props.navigation.navigate('FriendMore',{
            name : this.props.navigation.state.params.name
        })
    }
    _renderItem(data){
        return(
            data.item.flow == 'out'?
            <MyTurn
                content={data.item.text} 
                avatar={require('../../assets/images/myAvatar.jpg')} 
            />
            :
            <OthersTurn 
                content={data.item.text} 
                avatar={require('../../assets/images/myAvatar.jpg')} 
            />
        )
    }
    //为每一行提供一个不重复的关键属性，不然的话会有黄字警告
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    render(){
        return(                
                <View style={styles.container} >
                <ChatBackBar
                    goBack={this._Back} 
                    name={this.props.navigation.state.params.name}
                    needMore={true} 
                    more={this._toMore}          
                />
                <FlatList
                    style={styles.list}
                    data={store.msgs==null?[]:store.msgs.slice()}
                    renderItem={this._renderItem}  
                    keyExtractor = {this._extraUniqueKey}
                    ref="flatList"
                    onContentSizeChange={()=>this._scrollToEnd()}
                    removeClippedSubviews={false}
                />
                <ChatKeyboard 
                    pickPictrue={this._pickPictrue} 
                    scan={this._scan} 
                    shop={this._shop} 
                    toName={this.props.navigation.state.params.name}
                /> 
            </View> 
            
        )
    }
}) 


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ECECEC',
    },
    list:{
        flex: 1,
        borderTopColor: '#ECECEC' ,
        borderTopWidth: 1/PixelRatio.get(),
    },
});
