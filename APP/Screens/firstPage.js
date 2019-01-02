/*
    初次进入微信，或者重新登录时展示的页面，
    由两个按钮和一张图组成
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Image,
    Dimensions
} from 'react-native';
import TokenLogin from './tokenLogin'
import Register from './register';
import RootStackNavigator from '../Components/stackNavigator';

export default class FirstPage extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
        this._toRegister = this._toRegister.bind(this)
        this._toTokenLogin = this._toTokenLogin.bind(this)
    }

    //
    _toTokenLogin(){
        this.props.navigation.navigate('TokenLogin')
    }
    _toRegister(){
        this.props.navigation.navigate('Register')
    }
    //
    render(){
        return(
            <View style={styles.container}>
                <Image 
                    source={require('../../assets/images/splash.jpg')}
                    resizeMode='contain'
                    style={styles.img}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={this._toTokenLogin}
                    >
                        <View style={styles.btn1}>
                            <Text style={{color:'gray',fontSize:16,fontWeight:'300'}}>
                                登录
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._toRegister}
                    >
                        <View style={styles.btn2}>
                            <Text style={{color:'#fff',fontSize:16,fontWeight:'300'}}>
                                注册
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#000'
    },
    btnContainer:{
        height: 40,
        backgroundColor:'transparent',
        justifyContent:'space-around',
        alignContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        position:"absolute",
        bottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    btn1:{
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width*0.4,
        height: 40,
        borderRadius: 3,
        justifyContent:'center',
        alignItems: 'center',
        flex:1,
        marginRight: 30,
    },
    btn2:{
        backgroundColor: '#00d205',
        width: Dimensions.get('screen').width*0.4,
        height: 40,
        borderRadius: 3,
        justifyContent:'center',
        alignItems: 'center',
        flex:1
    },
    img:{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
    }
})