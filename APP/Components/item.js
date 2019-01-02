/*
    黑名单，禁言列表的item大小
    跟options组件基本一样，只是样式不同，
    为了节省时间暂时复制过来
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



class item extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
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
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 55,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff'
    },
    img:{
        height: 40,
        width: 40
    },
    text:{
        fontSize: 15,
        marginLeft: 10,
    }
})

module.exports = item;