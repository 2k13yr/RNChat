/*
    在联系人页面顶部有：新的朋友、群聊、标签、公众号四个选项
    该封装组件最后暴露出的组件属性可由编写者自定义

    作为所有功能入口组件
    例如：发现页面中的“扫一扫”、“朋友圈”，个人页面中的“钱包”、“设置”等
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    PixelRatio,
    TouchableOpacity
} from 'react-native';

// const imgURI = {
//     newFriends:require('../../android/app/src/main/assets/images/icon/c_newFriends.png'),
//     groupChat:require('../../android/app/src/main/assets/images/icon/c_groupChat.png'),
//     tag:require('../../android/app/src/main/assets/images/icon/c_tag.png'),
//     publicNumber:require('../../android/app/src/main/assets/images/icon/c_publicNumber.png')
// }

class options extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.handleClick} >
                <View style={styles.container}>
                    <Image 
                        source={this.props.imgName}
                        style={styles.img}
                    />
                    <Text style={styles.text}>
                        {this.props.tagName}
                    </Text>
                    {
                        this.props.show?
                        <View style={styles.remind}>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:12}}>
                                {this.props.num}
                            </Text>
                        </View>
                        :null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 45,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',

    },
    img:{
        height: 30,
        width: 30,

        
    },
    text:{
        fontSize: 15,
        marginLeft: 10,
    },
    remind:{
        height:20,
        width:20,
        borderRadius: 50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginLeft: 15,
    },
})

module.exports = options;