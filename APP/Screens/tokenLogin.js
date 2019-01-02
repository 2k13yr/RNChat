/*
    使用token登录的页面，区别于普通登陆
    登录页面
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import ChatBackBar from '../Components/chatBackBar';
import Login from './login';

export default class TokenLogin extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
        this._Back = this._Back.bind(this);
        this._toLogin = this._toLogin.bind(this)
    }
    _Back(){
        this.props.navigation.goBack();
    }
    _toLogin(){
        this.props.navigation.navigate('Login')
    }
    render(){
        return(
            <View style={styles.container}>
            <ChatBackBar name='登录' goBack={this._Back} />
                <Image 
                    source={require('../../assets/images/myAvatar.jpg')}
                    style={styles.img}
                />
                <Text>xsc</Text>
                <View style={styles.inputContainer}>
                    <Text>密码：</Text>
                    <TextInput style={styles.input} />
                </View>      
                <View style={styles.btnContainer}>
                    <Button 
                        title='登录'
                        color='#00d205'
                        onPress={()=>alert('登录')}
                    />
                </View>
                <TouchableOpacity
                    onPress={this._toLogin}
                >
                    <Text style={styles.text}>
                        切换账号
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#ebebeb',
        //justifyContent:'center',
        alignItems: 'center',
    },
    img:{
        marginTop: 100,
        height: 100,
        width: 100,
        marginBottom: 30,
    },
    btnContainer:{
        marginTop:30,
        width:Dimensions.get('screen').width*0.8,
    },
    inputContainer:{
        height: 45,
        borderColor: '#00d205',
        borderBottomWidth: 1,
        flexDirection: 'row',     
        alignItems: 'center',      
        width:Dimensions.get('screen').width*0.8,        
    },
    input:{
        flex:1
    },
    text:{
        marginTop:100,
        color:'#00d205'
    }
});