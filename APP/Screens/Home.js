/*
    微信主页面

        因为stackNavigator会有一个标题栏，因此可以不用特地引用自定义的titleBar
        直接将titleBar作为stackNavigator的标题栏返回出去即可
    BTW：如果要让源页面和目标页面的标题栏，标题等参数不同，可以分开设定
*/
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    PixelRatio,
    Dimensions,
    ScrollView,
    Button,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';
import { createStackNavigator } from 'react-navigation';   
import ChatRecord from "../Components/chatRecord";  //自定义组件首字母一定要大写
import TitleBar from "../Components/titleBar";
import ChatDetailScreen from './chatDetailScreen';  //聊天详情页面 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigator from '../Components/stackNavigator';
import NewFriends from './newFriends';
import storage from '../Storage/storage';
import global from '../Global/global';
import INIT from '../Action/INIT';
import _init from '../Action/_init';
import store from '../Store/store';
import timestampToTime from '../util/timestampToTime';
import Action from '../Action/INIT';
import { observer,inject } from 'mobx-react/native';
import removeNotFriendSession from '../util/removeNotFriendSession';


export default Home = observer(class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            test:0,
            id:'',
            data:[],
        };
        this._renderItem = this._renderItem.bind(this)

    };
    
    
    componentWillMount() {
        _init().getLocalSessions({
            //lastSessionId: lastSessionId,
            limit: 100,
            done: this.getLocalSessionsDone
        });
    }
    getLocalSessionsDone(error, obj) {
        if (!error) {
            store.sessions = removeNotFriendSession(store.friends,obj.sessions);
        }
    }
    componentDidMount() {
        DeviceEventEmitter.addListener('deleteSession',param => {
            _init().getLocalSessions({
                //lastSessionId: lastSessionId,
                limit: 100,
                done: this.getLocalSessionsDone
            });
        })
    }


    _keyExtractor(item ,index){
        return "index"+index+item;  
    } 
    _renderItem(data){
        return(
            <ChatRecord 
                name={data.item.to}
                newRecord={data.item.lastMsg.text}
                time={timestampToTime(data.item.updateTime)}
                unread={data.item.unread}
                avatar={require('../../assets/images/myAvatar.jpg')}
                handleClick={()=>{
                    this.props.navigation.navigate('ChatDetailScreen',{
                        name:data.item.to,
                        msgId:data.item.id
                    })
                }} 
            />
        )
    }

    render(){ 
        return(  
            <View style={styles.container}>    
            <ChatRecord 
                name='徐斯超' 
                newRecord='你好，欢迎使用RN微信' 
                avatar={require('../../assets/images/myAvatar.jpg')} 
                handleClick={()=>{
                    this.props.navigation.navigate('ChatDetailScreen',{name:'徐斯超'})
                }} 
            />   
                <FlatList 
                    data={store.sessions!=null?store["sessions"].slice():[]} 
                    renderItem={this._renderItem} 
                    keyExtractor={this._keyExtractor} 
                />                     
            </View>       
        )
    }
}) 


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#EBEBEB',
    },
    recordContainer:{    
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
        borderWidth: 1/PixelRatio.get(),
    }
})
