/*
    该组件将所有的跳转处理抽取处理统一在此组件处理
    微信->聊天详情页、发现->朋友圈....
*/
import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { createStackNavigator,createSwitchNavigator } from 'react-navigation';
import TitleBar from './titleBar';
import ChatDetailScreen from '../Screens/chatDetailScreen';
import RootTabNavigator from './tabNavigator';
import NewFriends from '../Screens/newFriends';
import GroupChat from '../Screens/groupChat';
import Tag from '../Screens/tag';
import PublicNumber from '../Screens/publicNumber';
import FriendsDetailInfo from '../Screens/friendsDetailInfo';
import Scan from '../Screens/scan';
import Shopping from '../Screens/shopping';
import Setting from '../Screens/setting';
import FirstPage from '../Screens/firstPage';
import Register from '../Screens/register';
import TokenLogin from '../Screens/tokenLogin';
import Login from '../Screens/login';
import PickPictrue from '../Screens/pickPictrue';
import ChatKeyBoarMore from './chatKeyboard_more';
import FriendMore from '../Screens/friendMore'
import ChatHistory from '../Screens/chatHistory';
import MyInfo from '../Screens/myInfo';
import UpdateNick from '../Screens/updateNick'


export default StackNavigator = createStackNavigator({
        RootTabNavigator:{
            screen : RootTabNavigator,
            navigationOptions:()=>({
                header:()=>{
                    return(                        
                        <TitleBar />                   
                    )
                }, 
            })
        },
        FriendsDetailInfo:{
            screen : FriendsDetailInfo,
            navigationOptions:()=>({
                header:null
            })
        },
        ChatKeyBoarMore:{
            screen : ChatKeyBoarMore,
            navigationOptions:()=>({
                header:null
            })
        },
        ChatDetailScreen : {
            screen : ChatDetailScreen,
            navigationOptions:()=>({
                header:null              
            })
        },
        FriendMore:{
            screen : FriendMore,
            navigationOptions:()=>({
                header :null
            })
        },
        ChatHistory:{
            screen : ChatHistory,
            navigationOptions:()=>({
                header :null
            })
        },
        // PickPictrue:{
        //     screen: PickPictrue,
        //     navigationOptions:()=>({
        //         header:null              
        //     })
        // },
        NewFriends:{
            screen : NewFriends,
            navigationOptions:()=>({
                header:null
            })
        },
        GroupChat:{
            screen : GroupChat,
            navigationOptions:()=>({
                header:null
            }) 
        },
        Tag:{
            screen : Tag,
            navigationOptions:()=>({
                header:null
            }) 
        },
        PublicNumber:{
            screen : PublicNumber,
            navigationOptions:()=>({
                header:null
            }) 
        },
        
        Scan:{
            screen : Scan,
            navigationOptions:()=>({
                header:null
            })
        },
        Shopping:{
            screen : Shopping,
            navigationOptions:()=>({
                header:null
            })
        },
        Setting:{
            screen : Setting,
            navigationOptions:()=>({
                header:null
            })
        },  
        MyInfo:{
            screen : MyInfo,
            navigationOptions:()=>({
                header:null
            })
        },
        UpdateNick:{
            screen : UpdateNick,
            navigationOptions:()=>({
                header:null
            })
        },          
})




















//下面是经过修改的原生的返回标题栏
                // headerTitle:()=>{
                //     return(
                //         <Text style={{color:'#fff',fontSize:18}}>
                //             {this.props.navigation.state.params.data}
                //         </Text>
                //     )
                // }, 
                // //标题栏样式
                // headerStyle:{   
                //     backgroundColor: 'rgba(0,0,0,0.9)',
                //     height:50,
                //     color: '#fff'
                // },
                // headerBackTitleStyle:{
                //     color: '#fff'
                // },
                // headerBackImage:()=>{
                //     return(
                //         <Icon name='arrow-left' size={25} color='#fff' />
                //     )
                // }