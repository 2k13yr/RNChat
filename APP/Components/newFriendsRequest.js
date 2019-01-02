/*
    组件
    该组件表示：每一条好友请求
    包含头像、名字、备注、请求按钮
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    TouchableOpacity,
    Dimensions,
    Button,
    DeviceEventEmitter
} from 'react-native';
import _init from '../Action/_init'
import storage from '../Storage/storage';
import global from '../Global/global';
import Toast,{DURATION} from 'react-native-easy-toast';
import { observable,action,decorate } from 'mobx';
import { observer } from 'mobx-react';
import store from '../Store/store';
import Action from '../Action/INIT'

export default NewFriendsRequest = observer(class NewFriendsRequest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            friends : []
        };
        const height = Dimensions.get('screen').height;
        const width = Dimensions.get('screen').width;
        // Nexus 5/6.0.0/1080x1920  的像素密度为640x360
        this._passFriendApply = this._passFriendApply.bind(this);
        this._rejectFriendApply = this._rejectFriendApply.bind(this);
        this._passFriendApplyDone = this._passFriendApplyDone.bind(this);
        this._rejectFriendApplyDone = this._rejectFriendApplyDone.bind(this)
    }    
    componentWillMount(){
        //好友列表
        let friends = []
        store.sysMsgs.forEach(element=>{
            if(element.type=='applyFriend'){
                friends.push({
                    'from' : element.from,
                    'ps' : element.ps,
                    'idServer' : element.idServer
                })
            }
        })
        this.setState({ friends : friends })
    }  
    _passFriendApply(){
        /**
         * 这一步是防止点击user1的 “接受” / “拒绝” 时触发其他用户的按钮事件
         * 思路如下：
         *      将好友列表取出来遍历一遍，当这个组件的名字等于请求方发过来
         *      的from，即可确保不会错误地反馈信息
         */
        this.state.friends.forEach(element=>{
            if(this.props.name==element.from){
                _init().passFriendApply({
                    idServer: element.idServer,
                    account: element.from,
                    ps: '对方已通过你的好友请求',
                    done: this._passFriendApplyDone
                });             
            }
        })          
    }
    _passFriendApplyDone(error, obj) {
        //由于组件内没有定义Toast，所以需要发送
        //一个广播到newFriend页面
        if (!error) {
            Action.onAddFriend(obj.friend);
        }
        // let param='';
        // error?param='err':param='noerr';
        // DeviceEventEmitter.emit('passFriendApplyDone',param);
        //往请求方发送一个信息
        // let msg = _init().sendText({
        //     scene: 'p2p',
        //     to: this.props.name,
        //     text: '我们已是好友，开始聊天吧',
        //     done: this.sendMsgDone
        // });
        // Action.pushMsg(msg);
    }
    sendMsgDone(error, msg) {
        //alert('发送' + msg.scene + ' ' + msg.type + '消息' + (!error?'成功':'失败') + ', id=' + msg.idClient, error, msg);
    }
    _rejectFriendApply(){
        this.state.friends.forEach(element=>{
            if(this.props.name==element.from){
                _init().rejectFriendApply({
                    idServer: element.idServer,
                    account: element.from,
                    ps: '对方已拒绝你的好友请求',
                    done: this._rejectFriendApplyDone
                });
            }           
        })
    }
    _rejectFriendApplyDone(error, obj) {
        alert(JSON.stringify(obj))
        let param='';
        error?param='err':param='noerr'
        DeviceEventEmitter.emit('rejectFriendApplyDone',param)
    }
    render(){
        return(
            <TouchableOpacity onPress={this.props.handleClick} >
                <View style={styles.container} >
                    <Image 
                        source={this.props.avatar} 
                        style={styles.avatar}
                    />
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.name}>
                                {this.props.name}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.remark}>
                                {this.props.remark}
                            </Text>
                        </View>
                    </View>                   
                        {
                            
                            (this.props.type == 'passFriendApply' || this.props.type == 'rejectFriendApply' ) ?
                            null:(
                                this.props.state == 'rejected' ?
                                <View style={styles.buttonContainer}>
                                    <Text>已拒绝</Text>
                                </View>
                                :
                                (
                                    this.props.state == 'passed'?
                                    <View style={styles.buttonContainer}>
                                        <Text>已通过</Text>
                                    </View>
                                    :
                                    <View style={styles.buttonContainer}>
                                        <Button 
                                            title='接受'
                                            style={styles.button1}
                                            color='#00d205'
                                            onPress={this._passFriendApply}
                                        />
                                        <Button
                                            title='拒绝'
                                            style={styles.button2}
                                            color='#ebebeb'
                                            onPress={this._rejectFriendApply}
                                        />
                                    </View>
                                )
                            )
                        }                                      
                </View>
            </TouchableOpacity>
        )
    }
}) 
decorate(NewFriendsRequest,{
    _passFriendApply : action,
    _rejectFriendApply : action
})


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',   //沿水平轴排序
        padding: 5,     
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        height: 70,
        backgroundColor:'#fff'
    },
    avatar:{
        height:55,
        width:55,
    },
    info:{
        flex: 3,
        paddingLeft: 10,
    },
    name:{
        fontSize: 20,
        fontWeight: '400',
        overflow:'hidden',
        height: 25,
        marginBottom: 6,
    },
    remark:{
        fontSize:15,
        color: '#696969',
        overflow:'hidden',
        height:20
    },
    button1:{
        height :10,
        marginRight: 15,
    },
    button2:{
        height :10,
        marginLeft: 15,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
