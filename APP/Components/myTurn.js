/*
    聊天详情页中我发的每一条信息
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,TextInput,
    Dimensions
} from 'react-native';

export default class MyTurn extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){  
        return( 
            <View style={styles.out} >
            <View style={styles.container} >
                <View style={styles.content} >
                    <Text style={styles.text}>
                        {this.props.content}
                    </Text>
                </View>
                <Image 
                    source={this.props.avatar}
                    style={styles.avatar}
                />      
            </View> 
            </View>
        ) 
    } 
}

const styles = StyleSheet.create({
    out:{
        justifyContent:'center',
        alignItems: 'center',
    },
    container:{
        width:Dimensions.get('window').width*0.95,
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginTop: 10,
        marginBottom: 10,
    },
    avatar:{
        height:40,
        width:40
    },
    text:{
        backgroundColor:'#A0E759',
        fontSize: 20,
        marginRight: 7,
        padding: 8,
        borderRadius: 5,
        flex:1
    },
    content:{
        maxWidth:Dimensions.get('window').width*0.6,
        minWidth: 40,     
    },
});
