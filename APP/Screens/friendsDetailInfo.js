/**
 * 展示朋友的详情信息页面
 * 
 */

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Button,
    DeviceEventEmitter
} from 'react-native';
import MyInfoEntry from '../Components/myInfoEntry';
import ChatDetailScreen from '../Screens/chatDetailScreen'
import ChatBackBar from '../Components/chatBackBar';
import DrawMenu from '../Components/drawMenu';
import _init from '../Action/_init';
import Action from '../Action/INIT'
import store from '../Store/store';
import { decorate,action } from 'mobx';
import Toast,{DURATION} from 'react-native-easy-toast'

export default class FriendsDetailInfo extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            show : false,
            nick : ''
        }
        this._Back = this._Back.bind(this);
        this._toChatDetailScreen = this._toChatDetailScreen.bind(this);
        this._more = this._more.bind(this);
        this._hide = this._hide.bind(this);
        this._deleteFriend = this._deleteFriend.bind(this);
        this.deleteFriendDone = this.deleteFriendDone.bind(this);
        this.getUserDone = this.getUserDone.bind(this)
    }
    
    
    componentWillMount() {
        _init().getUser({
            account: this.props.navigation.state.params.name,
            done: this.getUserDone
        });
    }
    getUserDone(error, user) {
        if (!error && user) {
            this.setState({
                nick : user.nick
            })
        }
    }
    
    _Back(){
        this.props.navigation.goBack();
    }
    _toChatDetailScreen(){
        this.props.navigation.navigate('ChatDetailScreen',{
            name : this.props.navigation.state.params.name,
            msgId : 'p2p-'+this.props.navigation.state.params.name
        })  
    }
    _more(){
        this.setState({ show:true })
    }
    _hide(){
        this.setState({ show:false })
    }
    _deleteFriend(){
        _init().deleteFriend({
            account: this.props.navigation.state.params.name,
            done: this.deleteFriendDone
        });
    }
    //删除好友
    deleteFriendDone(error, obj) {
        this.setState({ show:false })
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
        this._Back();
    }
    /**---------------------------------- */
    deleteLocalSysMsgDone(error, obj) {
        //alert('删除本地系统通知' + (!error?'成功':'失败'));   
    }
    deleteLocalSessionDone(error, obj) {
        //alert(JSON.stringify(obj))
        DeviceEventEmitter.emit('deleteSession',()=>{})
    }
    deleteLocalMsgsBySession(error, obj) {
    }
    /**---------------------------------- */
    render(){
        return(
            <View style={styles.container}>
            {
                this.state.show == true?
                <DrawMenu
                    hide={this._hide}
                    action2={this._deleteFriend}
                    itemCount={2} 
                /> : null
            }
            <ChatBackBar
                goBack={this._Back}
                name={this.props.navigation.state.params.name} 
                more={this._more}
                needMore={true}
            />
                <View style={styles.itemContainer}>
                    <MyInfoEntry 
                        avatarName={require('../../assets/images/myAvatar.jpg')}
                        name={this.state.nick}
                        id={this.props.navigation.state.params.name}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Text>
                                设置备注和标签
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.left}>
                                <Text>
                                    地区
                                </Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{color:'lightgray'}}>
                                    广东  广州
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.gallery}>
                            <View style={styles.left}> 
                                <Text>个人相册</Text>
                            </View>
                            <View style={styles.right}>
                                <Image 
                                    style={styles.img}
                                    source={require('../../assets/images/test.png')}
                                />
                                <Image 
                                    style={styles.img}
                                    source={require('../../assets/images/avatar1.jpg')}
                                />
                                <Image 
                                    style={styles.img}
                                    source={require('../../assets/images/avatar2.jpg')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Text>
                                更多
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <Button 
                        title='发信息'
                        color='#00d205'
                        style={styles.btn}
                        onPress={this._toChatDetailScreen}
                    />
                </View>
                <Toast
                    ref='toast'
                    opacity={0.7}
                />
            </View>
        )
    }
}
decorate(FriendsDetailInfo,{
    deleteFriendDone : action
})


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ebebeb',
        flex: 1,
    },
    itemContainer:{
        marginTop: 15,
    },
    item:{
        height: 40,
        backgroundColor:'#fff',
        //justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
    },
    gallery:{
        height: 70,
        backgroundColor:'#fff',
        //justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ebebeb',
    },
    left:{
        flex:1
    },
    right:{
        flex:3,
        flexDirection:'row'
    },
    img:{
        height: 60,
        width: 60,
        marginRight: 3,
    },
    btn:{
        height:50,
        
    },
    btnContainer:{
        marginTop: 15,
        paddingLeft:15,
        paddingRight: 15,
    },
})