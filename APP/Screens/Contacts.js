/*
    联系人页面
    //点击每个联系人跳转至相应的页面尚未实现，
    renderItem={this._renderItem}
    this._toFriendsDetailInfo
    估计是两个this指向出现了问题，后面再改
*/
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SectionList,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';
import TitleBar from "../Components/titleBar";
import Options from '../Components/options';
import NewFriends from './newFriends';
import GroupChat from './groupChat';
import Tag from './tag';
import PublicNumber from './publicNumber';
import FriendsDetailInfo from './friendsDetailInfo';
import storage from '../Storage/storage';
import global from '../Global/global';
import comparator from '../util/comparator';
import Toast,{DURATION} from 'react-native-easy-toast';
import _init from '../Action/_init';
import store from '../Store/store';
import { observer,inject } from 'mobx-react/native';
import refreshContact from '../util/refreshContact';
import Action from '../Action/INIT'

export default Contacts = (observer( class Contacts extends React.Component{
    constructor(props){
        super(props);
        this.state = {   
            sections: null,   
            show:false,  //决定红点点显不显示
            num:0
        };  
        this._toNewFriends = this._toNewFriends.bind(this);
        this._toGroupChat = this._toGroupChat.bind(this);  
        this._toTag = this._toTag.bind(this);
        this._toPublicNumber = this._toPublicNumber.bind(this);
        this._renderItem = this._renderItem.bind(this)
    }  
    componentWillMount() {
        // _init().getFriends({
        //     done: this.getFriendsDone
        // });
        
        // 渲染红点通知
        if(store.sysMsgUnread!=null && store.sysMsgUnread.applyFriend != 0){
            this.setState({
                show : true,
                num : store.sysMsgUnread.applyFriend
            })
        }
    }
    // getFriendsDone(error, friends) {
    //     if (!error) { 
    //         alert(JSON.stringify(friends))
    //          store.friends = friends
    //         // Action.onFriends(friends);
    //     }
    // }
    //渲染每一条数据   
    _renderItem(data){
        return(
            <Options
                tagName={data.item}
                imgName={require('../../assets/images/myAvatar.jpg')} 
                handleClick={()=>{
                    this.props.navigation.navigate('FriendsDetailInfo',{
                        name : data.item,
                    })
                }}
            />
        )
    }
    //渲染每一个section头的文本
    _renderSectionHeader(data){
            return(
                <Text style={styles.sectionHeader}>
                    {data.section.key}
                </Text>
            )
    } 
    //为每一行提供一个不重复的关键属性，不然的话会有黄字警告
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }  
    //////处理跳转函数
    _toNewFriends(){
        this.setState({show:false})
        this.props.navigation.navigate('NewFriends') 
    }
    _toGroupChat(){
        this.props.navigation.navigate('GroupChat')
    }
    _toTag(){
        this.props.navigation.navigate('Tag')
    }
    _toPublicNumber(){
        this.props.navigation.navigate('PublicNumber')
    }

    /////
    render(){
        return(   
            <ScrollView>       
            <View style={styles.container}>
                    <Options
                        tagName='新的朋友'
                        imgName={require('../../assets/images/icon/c_newFriends.png')}
                        handleClick={this._toNewFriends}
                        show={this.state.show}
                        num={this.state.num}
                    />
                    
                    
                    <Options 
                        tagName='群聊'
                        imgName={require('../../assets/images/icon/c_groupChat.png')}
                        handleClick={this._toGroupChat} 
                    />
                    <Options 
                        tagName='黑名单'
                        imgName={require('../../assets/images/icon/c_tag.png')} 
                        handleClick={this._toTag}
                    />
                    <Options 
                        tagName='公众号'
                        imgName={require('../../assets/images/icon/c_publicNumber.png')} 
                        handleClick={this._toPublicNumber}
                    />
                    <SectionList  
                        sections={refreshContact(store.friends)} 
                        renderItem={this._renderItem}
                        renderSectionHeader={this._renderSectionHeader}
                        keyExtractor={this._extraUniqueKey}
                    />         
                    <Toast 
                        ref='toast'
                        opacity={0.7}
                    />
            </View>
            </ScrollView> 
        )
    }
}))
const styles = StyleSheet.create({
    container:{
        flex: 1,  
        backgroundColor: '#EBEBEB',
    },
    sectionHeader:{
        height: 18,
        textAlign: 'center',
        //textAlignVertical: 'center',
        backgroundColor: '#E1E1E1',
        color: '#708090',
        fontSize: 15
    },
})
