/*
    群聊显示页面
    里面的组件还是复用之前写好的option组件
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';
import Item from '../Components/item'
import ChatBackBar from '../Components/chatBackBar';
import storage from '../Storage/storage';
import global from '../Global/global';
import store from '../Store/store'

export default class GroupChat extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
        this._Back = this._Back.bind(this)
    }
    componentWillMount() {
        let teamName = []
        if(store.teams){
            store.teams.forEach(element=>{
                teamName.push(element.name)
            })
            this.setState({
                data : teamName
            })
        }        
    }   
    _listEmptyComponent(){
        return(
            <View style={styles.empty} >
                <Text style={styles.emptyText}>暂无群聊</Text>               
            </View>
        )
    }
    _Back(){
        this.props.navigation.goBack();
    }
    _renderItem(data){
        return(
            <Item
                tagName={data.item}
                imgName={require('../../assets/images/icon/c_groupChat.png')} 
                handleClick={()=>{
                    this.props.navigation.navigate('ChatDetailScreen',{
                        name : data.item,
                        msgId : 'team-'+data.item
                    })
                }}
            />
        )
    }
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    } 
    render(){
        return(
            <View style={styles.container}>
            <ChatBackBar name='群聊' goBack={this._Back} />
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor = {this._extraUniqueKey.bind(this)}
                    ListEmptyComponent={this._listEmptyComponent.bind(this)}
                /> 
            </View>  
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#ebebeb',
        paddingBottom: 10,
    },
    text:{
        paddingLeft: 8,
        height:20,
        fontSize: 12, 
        backgroundColor:'#ebebeb', 
        justifyContent:'center' ,
        alignItems: 'center',     
    },
    empty:{
        flex: 1,
        marginTop: Dimensions.get('window').height*0.4
    },
    emptyText:{
        textAlign:'center'
    }
});