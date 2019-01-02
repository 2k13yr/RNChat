/**
 * 在和好友聊天时，点击右上角的更多所显示出来的页面
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Switch,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlight,
    YellowBox,
    DeviceEventEmitter,
    Alert
} from 'react-native';
import Options from '../Components/options';
import ChatBackBar from '../Components/chatBackBar';
import Toast from 'react-native-easy-toast';
import _init from '../Action/_init';
import Action from '../Action/INIT'
import store from '../Store/store';
console.disableYellowBox = true;
//因为提示警告说onTintColor已经被废弃，要用trackColor，但是trackColor并没有生效，因此禁了
//该页面的警告

export default class FriendMore extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bl: [],
            isBlack : false,
            isMute : false
        }
        this.markInBlacklistDone = this.markInBlacklistDone.bind(this)
        this.markInMutelistDone = this.markInMutelistDone.bind(this)
        this.deleteLocalMsgsBySessionDone = this.deleteLocalMsgsBySessionDone.bind(this)
        this._ifdeleteFriend = this._ifdeleteFriend.bind(this)
        this._deleteFriend = this._deleteFriend.bind(this)
        this.deleteFriendDone = this.deleteFriendDone.bind(this)
    }

    componentWillMount() {
        if(store.blacklist.length){
            for(let i=0;i<store.blacklist.length;i++){
                if(this.props.navigation.state.params.name == store.blacklist[i].account){
                    this.setState({ isBlack : true })
                }
            }
        }
        if(store.mutelist.length){
            for(let i=0;i<store.mutelist.length;i++){
                if(this.props.navigation.state.params.name == store.mutelist[i].account){
                    this.setState({ isMute : true })
                }
            }
        }
    }
    //黑名单
    _blacklist(){
        this.state.isBlack==true?
        _init().markInBlacklist({
            account: this.props.navigation.state.params.name,
            // `true`表示加入黑名单, `false`表示从黑名单移除
            isAdd: false,
            done: this.markInBlacklistDone
        })
        :
        _init().markInBlacklist({
            account: this.props.navigation.state.params.name,
            // `true`表示加入黑名单, `false`表示从黑名单移除
            isAdd: true,
            done: this.markInBlacklistDone
        })
    }
    markInBlacklistDone(error, obj){
        if(!error){
            if(this.state.isBlack==true){
                this.setState({ isBlack:false })
                for(let i=0;i<store.blacklist.length;i++){
                    if(store.blacklist[i].account == obj.account){
                        store.blacklist.splice(i,1)
                    }
                }
            }else{
                this.setState({ isBlack:true })     
                store.blacklist.push(obj)
            } 
        }   
    }
    //静音
    _mutelist(){
        this.state.isMute==true?
        _init().markInMutelist({
            account: this.props.navigation.state.params.name,
            isAdd: false,
            done: this.markInMutelistDone
        })
        :
        _init().markInMutelist({
            account: this.props.navigation.state.params.name,
            isAdd: true,
            done: this.markInMutelistDone
        })
    }
    markInMutelistDone(error, obj) {
        if(!error){
            if(this.state.isMute==true){
                this.setState({ isMute:false })
                for(let i=0;i<store.mutelist.length;i++){
                    if(store.mutelist[i].account == obj.account){
                        store.mutelist.splice(i,1)
                    }
                }
            }else{
                this.setState({ isMute:true })     
                store.mutelist.push(obj)
            } 
        }   
    }
    _Back(){
        this.props.navigation.goBack()
    }
    _toFriendDetail(){
        this.props.navigation.navigate('FriendsDetailInfo',{
            name : this.props.navigation.state.params.name
        })
    }
    _chatHistory(){
        this.props.navigation.navigate('ChatHistory',{
            name : this.props.navigation.state.params.name
        })
    }
    _deleteHistory(){
        _init().deleteLocalMsgsBySession({
            scene: 'p2p',
            to: this.props.navigation.state.params.name,
            done: this.deleteLocalMsgsBySessionDone
        });
    }
    deleteLocalMsgsBySessionDone(error, obj) {
        error?this.refs.toast.show('删除聊天记录失败...'):this.refs.toast.show('成功删除聊天记录')
        DeviceEventEmitter.emit('have deleted localMsgs','flag')
    }

    //删除好友
    _ifdeleteFriend(){
        Alert.alert(
            '警告',
            '确定要删除该好友吗',
            [
                {text: '确定', onPress: this._deleteFriend},
                {text: '取消', onPress: () => {}, style: 'cancel'}
            ],
            { cancelable: false }
        );
        
    }
    //
    _deleteFriend(){
        _init().deleteFriend({
            account: this.props.navigation.state.params.name,
            done: this.deleteFriendDone
        });
    }
    deleteFriendDone(error, obj) {
        //及时刷新联系人列表
        DeviceEventEmitter.emit('deleteFriend',()=>{})
        this.refs.toast.show('删除好友' + (!error?'成功':'失败'), error, obj);
        if (!error) {
            Action.onDeleteFriend(obj.account);
            // //删除好友之后发送一个事件到newFriends，将该id的通知删除(因为需要idServer)
            // DeviceEventEmitter.emit('deleteSysMsg',this.props.navigation.state.params.name)
            //删除本地聊天记录
            _init().deleteLocalMsgsBySession({
                scene: 'p2p',
                to: this.props.navigation.state.params.name,
                done: this.deleteLocalMsgsBySessionDone
            });
            //删除本地会话
            _init().deleteLocalSession({
                id: 'p2p-'+this.props.navigation.state.params.name,
                done: this.deleteLocalSessionDone
            });
            //删除通知 
            let _idServer = [];
            if(store.sysMsgs!=null){
                for(let i=0;i<store.sysMsgs.length;i++){
                        if(store.sysMsgs[i].from == this.props.navigation.state.params.name){
                        _idServer =store.sysMsgs[i].idServer;
                        break;
                    }
                }
                if(_idServer.length){
                    _init().deleteLocalSysMsg({
                       idServer: _idServer,
                       done: this.deleteLocalSysMsgDone
                   });
               }
            }             
        }   
        this.props.navigation.navigate('Home')     
    }
    /**---------------------------------- */
    deleteLocalSysMsgDone(error, obj) {
    }
    deleteLocalSessionDone(error, obj) {
        DeviceEventEmitter.emit('deleteSession',()=>{})
        this.props.navigation.navigate('Home');
    }
    deleteLocalMsgsBySession(error, obj) {
    }
    /**---------------------------------- */
    render(){
        return(
            <View style={styles.container}>
            <ChatBackBar 
                name={this.props.navigation.state.params.name}
                goBack={this._Back.bind(this)}
            />
                <ScrollView>
                    <View style={styles.itemContainer}>
                        <TouchableHighlight onPress={()=>{}} onPressIn={this._toFriendDetail.bind(this)}>
                            <View style={styles.avatar}>
                                <View style={styles.imgContainer}>
                                    <Image 
                                        source={require('../../assets/images/myAvatar.jpg')}
                                        style={styles.img} 
                                    />    
                                    <Text style={{textAlign:'center'}}>
                                        {this.props.navigation.state.params.name}
                                    </Text>
                                </View>
                            </View> 
                        </TouchableHighlight>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={this._chatHistory.bind(this)}>
                            <View style={styles.item}>
                                <Text>查看聊天记录</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <TouchableOpacity>
                            <View style={styles.switch}>
                                <Text>黑名单</Text> 
                                <Switch 
                                    value={this.state.isBlack}
                                    thumbColor='#fff'
                                    onTintColor={'#00d205'}
                                    onValueChange={this._blacklist.bind(this)}
                                />    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.switch}>
                                <Text>静音</Text> 
                                <Switch 
                                    value={this.state.isMute}
                                    thumbColor='#fff'
                                    onTintColor={'#00d205'}
                                    onValueChange={this._mutelist.bind(this)}
                                />   
                            </View> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <TouchableOpacity onPress={this._deleteHistory.bind(this)}>
                            <View style={styles.item}>
                                <Text>清空聊天记录</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <TouchableNativeFeedback onPress={this._ifdeleteFriend.bind(this)}>
                            <View style={styles.delete}>
                                <Text 
                                    style={{fontSize:20,color:'red',textAlign:'center'}}
                                >
                                    删除好友
                                </Text>    
                            </View> 
                        </TouchableNativeFeedback>
                    </View>
                </ScrollView>
                <Toast
                    ref="toast"
                    opacity={0.7}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    itemContainer:{
        marginTop: 15,
    },
    avatar:{
        backgroundColor:'#fff',
        justifyContent:'center',
        padding:13,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        alignItems: 'flex-start',
    },
    imgContainer:{
        width:60,
    },
    img:{
        height:60,
        width:60,
    },
    item:{
        height: 45,
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
    },
    switch:{
        height: 45,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    delete:{
        backgroundColor:'#fff',
        justifyContent:'center',
        padding:13,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
        alignItems: 'center',
    }
})