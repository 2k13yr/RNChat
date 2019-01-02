/*
    注册页面
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    Dimensions,
    Button,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import ChatBackBar from '../Components/chatBackBar';
import Toast , { DURATION } from 'react-native-easy-toast';
import Login from './login';

export default class Register extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            username: '',
            password:'', 
            confirmpwd:'',
            button:false
        }
        this._Back = this._Back.bind(this);
        this._checkInput = this._checkInput.bind(this)
        this._register = this._register.bind(this)
    }
    //
    //注册
    //检测输入合法性
    _checkInput(){
        id = this.state.id;
        username = this.state.username;
        password = this.state.password;
        confirmpwd = this.state.confirmpwd;
        if(id==''||id==null || username==''||username==null || password==''||password==null || confirmpwd==''||confirmpwd==null){
            this.refs.toast.show('请输入完整信息!', 1000);
            return;
        }
        else if(id.length>10){
            this.refs.toast.show('不允许长度超过10的微信号!')
            return;
        }else if(username.length>10){
            this.refs.toast.show('不允许长度超过10的用户名!');
            return;
        }else if(password != confirmpwd){
            this.refs.toast.show('两次输入的密码不一样!')
        }
        else{
            this._register(id,username,password)
        }

    }
    _Back(){
        this.props.navigation.goBack();
    }
    _register(id,username,password){ 
        //连接APP服务器进行注册
        let url = 'http://120.78.223.192/register';
        fetch(url,{
            method:'POST', 
            headers:{  
                'Content-Type':'application/json;charset=UTF-8'
            },      
            body:'{"id":"'+id+'","username":"'+username+'","password":"'+password+'"}'
        }).then((res)=>{  
            let result = JSON.stringify(res)
            if(res._bodyText=='该微信号已被注册'){
                this.refs.toast.show('该微信号已被注册')
                return;
            }else if(res._bodyText=='注册成功'){
                this.refs.toast.show('注册成功')
                setTimeout(() => {
                    this.props.navigation.navigate('Login')
                }, 1*1000);
            }
        }).catch((err)=>{
            this.refs.toast.show('注册错误！');
        }) 
    }
    
    //
    render(){
        return(
            <KeyboardAvoidingView>
            <ScrollView>                   
            <View style={styles.container}>
            <ChatBackBar name='注册' goBack={this._Back} />
                <Image 
                    source={require('../../assets/images/launcher.png')}
                    style={styles.img}
                    resizeMode='contain'
                />
                <View style={styles.allInput}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>微信号:</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(data)=>this.setState({id:data})}
                            placeholder='请输入长度不超过10的微信号'
                            clearButtonMode='while-editing'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>用户名：</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(data)=>this.setState({username:data})}
                            placeholder='请输入用户名'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>密码：</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(data)=>this.setState({password:data})}
                            placeholder='请输入密码'
                            password={true}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text>重复密码：</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={(data)=>this.setState({confirmpwd:data})}
                            password={true}
                            secureTextEntry={true}
                            placeholder='再次输入密码'
                        />
                    </View>
                </View>   
                <View style={styles.btnContainer}>
                        <Button 
                            title='注册'
                            color='#00d205'
                            style={styles.btn}
                            onPress={this._checkInput}
                            disabled={this.state.button}
                        /> 
                    </View>    
                                                         
            </View>
            </ScrollView>
            <Toast 
                    ref='toast'
                    style={styles.toast} 
                    opacity={0.7}
                    /> 
            </KeyboardAvoidingView>
            
             
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
    inputContainer:{
        height: 45,
        borderColor: '#00d205',
        borderBottomWidth: 1,
        flexDirection: 'row',     
        alignItems: 'center',      
        width:Dimensions.get('screen').width*0.8,        
    },
    allInput:{
        marginBottom:20
    },
    input:{
        flex:1
    },
    btnContainer:{
        marginTop:30,
        width:Dimensions.get('screen').width*0.8,
    },
});

