import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Container, Text, Button, Content } from 'native-base';
import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'

export default class Home extends React.Component {

  render() {

    return (
        <Container style={ styles.container }>

            <Content contentContainerStyle={styles.content}>
                <Image source={require('../../assets/img/logo-app.png')}/>

                <View style={ styles.container_button }>
                    <Button large bordered 
                        style={ styles.button }
                        title="Main"
                        onPress={() => this.props.navigation.navigate('Main')} >
                        <Text style={ styles.button_text }>{ locales.home.btn_main }</Text>
                    </Button>

                    <Button large bordered
                        style={ styles.button } 
                        title="Settings"
                        onPress={() => this.props.navigation.navigate('Settings')} >
                        <Text style={ styles.button_text }>{ locales.home.btn_settings }</Text>
                    </Button>
                </View>
            </Content>
            
        </Container>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        backgroundColor: global.color.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_button: {
        marginTop: 20
    },
    button: {
        width: 200,
        marginTop: 15,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    button_text: {
        //textAlign: 'center'
    }

});