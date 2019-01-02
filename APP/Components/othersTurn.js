/*
    聊天详情页中每个人发的每一条信息
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,TextInput,
    Dimensions
} from 'react-native';

export default class OthersTurn extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){  
        return( 
            <View style={styles.out} >
            <View style={styles.container} >
                <Image 
                    source={this.props.avatar}
                    style={styles.avatar}
                />  
                <View style={styles.content} >
                    <Text style={styles.text}>
                        {this.props.content}
                    </Text>
                </View>
                    
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
        justifyContent:'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    avatar:{
        height:40,
        width:40
    },
    text:{
        backgroundColor:'#FFFFFF',
        fontSize: 20,
        marginRight: 7,
        padding: 8,
        borderRadius: 5,
        flex:1
    },
    content:{
        maxWidth:Dimensions.get('window').width*0.6,
        minWidth: 40,    
        marginLeft: 8,
    },
});
