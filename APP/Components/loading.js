import React, { Component } from 'react';
import {
    View,
    Text,
    ProgressBarAndroid,
    Modal,
    StyleSheet
} from 'react-native';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render(){

        return( 
            <Modal
                transparent = {true}
                onRequestClose={()=> {}} 
            > 
                <View style={styles.loadingBox}>
                    <ProgressBarAndroid styleAttr='Inverse' color='gray' />
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    loadingBox: { 
        flex:1,
        alignItems:'center', 
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)',
    }

})