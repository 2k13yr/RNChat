/*
    设置页面
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Options from '../Components/options';
import ChatBackBar from '../Components/chatBackBar';
import store from '../Store/store'

export default class Setting extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
        this._Back = this._Back.bind(this)
        this._loginOut = this._loginOut.bind(this)
    }
    _loginOut(){
        store.reset();
        this.props.navigation.navigate('FirstPage');
    }
    _Back(){
        this.props.navigation.goBack();
    }
    render(){
        return(
            <View style={styles.container}>
            <ChatBackBar name='设置' goBack={this._Back} />
                <ScrollView>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>账号与安全</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>新消息提醒</Text>    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>勿扰模式</Text>    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>聊天</Text>    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>隐私</Text>    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>通用</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>关于微信</Text>    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>联系开发者</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>插件</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemContainer}>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Text>切换账号</Text>    
                            </View> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._loginOut}>
                            <View style={styles.item}>
                                <Text>退出</Text>    
                            </View> 
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    item:{
        height: 45,
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#ebebeb',
        borderBottomWidth: 1,
    }
})