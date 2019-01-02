/*
    标签页面
*/

import React, { PureComponent } from 'react';
import{
    StyleSheet,
    Text,
    View,
    ScrollView,
    SectionList
} from 'react-native';
import Item from '../Components/item'
import ChatBackBar from '../Components/chatBackBar';
import storage from '../Storage/storage';
import global from '../Global/global';
import store from '../Store/store'

export default class Tag extends React.PureComponent{
    constructor(props){
        super(props)
        this.state ={
            sections:[
            ]
        }
        this._Back = this._Back.bind(this)
        this._toFriendsDetailInfo = this._toFriendsDetailInfo.bind(this)
    }
    componentWillMount() {
        let bl = [];
        let ml = [];
        store.blacklist.forEach(element => {
            bl.push(element.account)
        });
        store.mutelist.forEach(element => {
            ml.push(element.account)
        });
        this.setState({
            sections :[{key:'黑名单',data:bl},
                      {key:'静音列表',data:ml}]
        })
    }
    _toFriendsDetailInfo(){
        this.props.navigation.navigate('FriendsDetailInfo')
    }
    _Back(){
        this.props.navigation.goBack();
    }
    //为每一行提供一个不重复的关键属性，不然的话会有黄字警告
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    } 
    //渲染每一个section头的文本
    _renderSectionHeader(data){
        return(
            <Text style={{marginLeft:15}}>
                {data.section.key}
            </Text>
        )
    } 
    _renderItem(data){
        return(
            <Item
                    tagName={data.item}
                    imgName={require('../../assets/images/myAvatar.jpg')} 
                    handleClick={this._toFriendsDetailInfo}
                />
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <ChatBackBar name='黑名单' goBack={this._Back} />
                <SectionList
                    renderItem={this._renderItem}
                    keyExtractor = {this._extraUniqueKey}
                    sections={this.state.sections}
                    renderSectionHeader={this._renderSectionHeader}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#ebebeb'
    },
    textContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 15,
    },
})







// componentWillMount() {
//     storage.load({
//         key : global.id
//     }).then((ret)=>{  
//         let blacklistArr = [];      //用来存取出来的列表中的用户名
//         let mutelistArr = []
//         if(ret.blacklist.length){         //判空  
//             ret.blacklist.forEach(element => {  
//                 blacklistArr.push(element.account)
//             });
//         } 
//         if(ret.muteList.length){
//             ret.muteList.forEach(element=>{
//                 mutelistArr.push(element.account)
//             }) 
//         }
//         this.setState({
//             sections:[
//                 {key:'黑名单',data:blacklistArr},
//                 {key:'禁言列表',data:mutelistArr} 
//             ]
//         })
//     }).catch((err)=>{
//         if(err) alert(JSON.stringify(err))
//     })
// } 