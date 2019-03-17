import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import Questions from '../components/question-carousel'
import global from '../config/global'

//Questions Locales
import _personality from '../../assets/locales/questions/personality.json'
import _experience from '../../assets/locales/questions/experience.json'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            langue: this.props.navigation.getParam('langue'),
            cat: this.props.navigation.getParam('cat')
        }
    }

    componentWillMount(){
        this._renderData()
    }

    _renderData(){
        _array = []
        
        if(this.state.cat.indexOf(global.cat.pers) !== -1){
            _personality.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            category: global.cat.pers,
                            icon: require('../../assets/img/icons/personality.png'),
                            text: question.question
                        })
                    }
                })
            })
        }
        
        if (this.state.cat.indexOf(global.cat.expe) !== -1){
            _experience.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            category: global.cat.expe,
                            icon: require('../../assets/img/icons/experience.png'),
                            text: question.question
                        })
                    }
                })
            })
        }

        if (this.state.cat.indexOf(global.cat.opin) !== -1){
            _experience.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            category: global.cat.opin,
                            icon: require('../../assets/img/icons/opinion.png'),
                            text: question.question
                        })
                    }
                })
            })
        }

        if (this.state.cat.indexOf(global.cat.pref) !== -1){
            _experience.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            category: global.cat.pref,
                            icon: require('../../assets/img/icons/preference.png'),
                            text: question.question
                        })
                    }
                })
            })
        }

        this.setState({
            data: this.shuffleArray( _array)
        })
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {
        return (
            <Container style={ styles.container }>
                <Content >
                    <Questions data={this.state.data} />                    
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