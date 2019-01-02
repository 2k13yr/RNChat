/*
    发送按钮
*/

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from 'react-native';

export default class SendButton extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <TouchableNativeFeedback
                onPress={this.props.handleSend}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>
                        发送 
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        height:30,
        width:40,
        borderRadius: 5,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#00d205'        
    },
    text:{
        color:'#fff',
        textAlign:'center',
    }
})