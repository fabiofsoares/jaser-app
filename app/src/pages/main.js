import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import Questions from '../components/question-carousel'

//Questions Locales
import _personality from '../../assets/locales/questions/personality.json'
import _experience from '../../assets/locales/questions/experience.json'

const data = [
    {
        category: 'experience',
        icon: require('../../assets/img/icons/experience.png'),
        text: 'Como voce imagina sua vida daqui 10 anos ?'
    },
    {
        category: 'experience',
        icon: require('../../assets/img/icons/experience.png'),
        text: 'O que ja te embaraçou ?'
    },
    {
        category: 'personality',
        icon: require('../../assets/img/icons/personality.png'),
        text: 'Existe algo de que voce se arrependa ?'
    },
    {
        category: 'personality',
        icon: require('../../assets/img/icons/personality.png'),
        text: 'Voce é passado, presente ou futuro ?'
    }
    
  ];

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            langue: 'fr',
            cat: ["opinions", "personality"]
        }
    }

    componentWillMount(){

    }

    _renderData(){
        
    }

    render() {
        return (
            <Container style={ styles.container }>
                <Content >
                    <Questions data={data} />                    
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        marginTop: 50,
        padding: 15
    }
})