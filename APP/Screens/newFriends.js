import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    ScrollView,
    DeviceEventEmitter,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatBackBar from '../Components/chatBackBar';
import NewFriendsRequest from '../Components/newFriendsRequest';
import SendButton from '../Components/sendButton';
//import SDK from '../SDK/NIM_Web_SDK_rn_v5.6.0';
import Toast , { DURATION } from 'react-native-easy-toast';
import _init from '../Action/_init';
import storage from '../Storage/storage';
import global from '../Global/global';
import Action from '../Action/INIT';
import store from '../Store/store';
import { observable,action,decorate } from 'mobx';
import { observer } from 'mobx-react';
import removeDuplicate from '../util/removeDuplicate';
import removeNotFriendSession from '../util/removeNotFriendSession'


export default NewFriends = observer(class NewFriends extends React.Component{
    constructor(props){ 
        super(props)
        this.state = { 
            fid:'',
            data:[],
        }
        this._Back = this._Back.bind(this)
        this._sendRequest = this._sendRequest.bind(this)
        this._applyFriendDone = this._applyFriendDone.bind(this);
        this._keyExtractor = this._keyExtractor.bind(this);
        //this._receiveEvent = this._receiveEvent.bind(this)
    } 
    
    
    _sendRequest(){
        //先判断被请求的账号是否已是好友
        
        //还需要添加一层判断该账号是否存在
        if(this.state.fid==''){
            this.refs.toast.show('微信号不允许为空');
            return;
        }if(this.state.fid==store.account){
            this.refs.toast.show('不允许添加自己！');
            return;
        }else{   
            if(!store.friends.length){
                //如果好友列表为空，直接发送请求
                _init().applyFriend({
                    account: this.state.fid,
                    ps: '你好，我是'+store.account,
                    done: this._applyFriendDone    
                });
            }else if(store.friends.length){
                //如果好友列表不为空了，需要先将请求的好友名称与当前好友列表对比一次
                //以确保不会重复请求好友
                let friendsName = [];
                store.friends.forEach(element => {
                    friendsName.push(element.account)
                })
                for(let i=0;i<friendsName.length;i++){
                    if(this.state.fid==friendsName[i]){
                        this.refs.toast.show('该用户已是您的好友');
                        return;
                    }else if(this.state.fid!=friendsName[i] && i==friendsName.length-1){
                        //循环到最后一个元素都不存在相同，
                        //允许发送好友请求
                        _init().applyFriend({
                            account: this.state.fid,
                            ps: '你好，我是'+store.account,
                            done: this._applyFriendDone    
                        });
                    }
                }  
            }        
        }                      
    }

    getLocalSysMsgsDone(error, obj) {
        if (!error) {
            store.sysMsgs = obj.sysMsgs;
        }
    }
    componentWillMount() {
        _init().getLocalSysMsgs({
            limit: 100,
            done: this.getLocalSysMsgsDone
        });
        
    }

    // _receiveEvent(){
    //     //接收来自newFriendRequest的广播
    //     DeviceEventEmitter.addListener('passFriendApplyDone',(param)=>{ 
    //         param=='noerr'?       
    //         this.refs.toast.show('成功通过该好友请求')
    //         :this.refs.toast.show('无法通过好友请求');
    //     });
    //     DeviceEventEmitter.addListener('rejectFriendApplyDone',(param)=>{
    //         param=='noerr'?
    //         this.refs.toast.show('成功拒绝好友申请')
    //         :this.refs.toast.show('拒绝好友申请失败')            
    //     })
    // }

    // componentDidMount() {
    //     this._receiveEvent()
    // }
    // componentWillUnmount() {
    //     DeviceEventEmitter.removeListener('passFriendApplyDone');
    //     DeviceEventEmitter.removeListener('rejectFriendApplyDone');
    // }

    _applyFriendDone(error, obj) {
        if(error){
            this.refs.toast.show('该用户不存在');
        }else{
            this.refs.toast.show('成功发送好友请求');
        }
        
    }
    _Back(){
        this.props.navigation.goBack();
    }
    _keyExtractor(item ,index){
        return "index"+index+item;  
    } 
    _renderItem(data){  
        if(data.item.type != 'deleteFriend'){
            return(
                <NewFriendsRequest
                    avatar={require('../../assets/images/icon/c_tag.png')}
                    name={data.item.from}
                    remark={data.item.ps}
                    state={data.item.state}
                    type={data.item.type}
                />
            )
        }
    }

    
    //
    render(){ 

        return(  
            <View style={styles.container}>
                <ChatBackBar 
                    name='新的朋友' 
                    goBack={this._Back} 
                    needMore={true}
                    
                />
                <ScrollView style={styles.scroll}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchbar_icon}>
                            <Icon name='search' size={23} color='gray' />
                            <TextInput
                                style={styles.textinput}
                                placeholder='微信号/手机号/QQ号'
                                placeholderTextColor='gray'
                                onChangeText={(text)=>this.setState({fid:text})}
                            />
                            <SendButton handleSend={this._sendRequest} />
                        </View>                   
                    </View>
                    <Text style={styles.text}>新的朋友</Text>
                    <FlatList
                        data={store.sysMsgs?removeDuplicate(store.sysMsgs.slice()):[]}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </ScrollView>
                <Toast 
                    ref='toast'
                    opacity={0.7}
                />
            </View>
        )
    }
}) 

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    scroll:{
        backgroundColor:'#ebebeb',
    },
    searchContainer:{
        height: 80,
        backgroundColor:'#ebebeb',
        justifyContent:'center'
    },
    searchbar_icon:{
        backgroundColor:'#fff',
        height: 40,
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
    },
    textinput:{
        flex: 1,
    },
    text:{
        fontSize: 12,
        backgroundColor:'#ebebeb',
        marginLeft: 15,
    }
});






