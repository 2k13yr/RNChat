/*
    我 页面中上方的个人信息入口
    该组件包括 头像、 微信号、 昵称、 二维码
*/

import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import Options from '../Components/options';

class myInfoEntry extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <TouchableNativeFeedback onPress={this.props.myInfo}>
                <View style={styles.container}>
                    <Image
                        source={this.props.avatarName}
                        style={styles.img}
                        
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>
                            {this.props.name}
                        </Text>
                        <Text style={styles.id}>
                            微信号：{this.props.id}
                        </Text>
                    </View>
                    <Image
                        source={this.props.qrCodeName}
                        style={styles.qrCode}
                        resizeMode='contain'
                    />
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 90,
        padding: 8,
    },
    img:{
        height: 70,
        width: 70
    },
    textContainer:{
        flex: 4,
        paddingLeft: 10,
        //justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    qrCode:{
        height: 20,
        width: 20,
        marginRight: 10,
    },
    name:{
        fontSize: 18,
        overflow: 'hidden',
        marginBottom: 5,
    },
    id:{
        fontSize: 15,
        color: 'lightgray',
        fontWeight: '100',
    }
})

module.exports = myInfoEntry;