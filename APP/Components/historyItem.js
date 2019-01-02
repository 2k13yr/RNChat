/**
 * 每一条历史记录的样式
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class NewFriendsRequest extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            friends : []
        };

    }    
    
    render(){
        return(
            <TouchableOpacity onPress={this.props.handleClick} >
                <View style={styles.container} >
                    <Image 
                        source={this.props.avatar} 
                        style={styles.avatar}
                    />
                    <View style={styles.info}>
                        <View>
                            <Text style={styles.name}>
                                {this.props.name}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.remark}>
                                {this.props.item}
                            </Text>
                        </View>
                    </View>                   
                    <View>
                        <Text>
                            {this.props.time}
                        </Text>
                    </View>                         
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',   //沿水平轴排序
        padding: 5,     
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        height: 70,
        backgroundColor:'#fff'
    },
    avatar:{
        height:55,
        width:55,
    },
    info:{
        flex: 3,
        paddingLeft: 10,
    },
    name:{
        fontSize: 20,
        fontWeight: '400',
        overflow:'hidden',
        height: 25,
        marginBottom: 6,
    },
    remark:{
        fontSize:15,
        color: '#696969',
        overflow:'hidden',
        height:20
    },
    button1:{
        height :10,
        marginRight: 15,
    },
    button2:{
        height :10,
        marginLeft: 15,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
