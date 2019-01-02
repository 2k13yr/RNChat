/*
    当点击某项要加载的按钮时，显示正在加载的组件
*/

import React, { Component } from 'react';
import {
    View,
    Modal,
    ActivityIndicator,
    StyleSheet,
    Text
} from 'react-native';

export default class LoadingView extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        let loadingText = this.props.loadingText?this.props.loadingText:'加载中...';
        return(
            <Modal
                transparent={true}
                onRequestClose={this.props.cancel}
            >
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color='#fff' />
                    <Text style={styles.loadingText}>
                        {loadingText}
                    </Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#FFFFFF'
      }
});