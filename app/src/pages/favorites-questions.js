import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Toast } from 'native-base';
import Questions from '../components/question-carousel'
import global from '../config/global'

//Questions Locales
import _personality from '../../assets/locales/questions/personality.json'
import _experience from '../../assets/locales/questions/experience.json'
import _opinions from '../../assets/locales/questions/opinions.json'
import _preferences from '../../assets/locales/questions/preferences.json'

export default class FavoritesQuestions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            favorites: this.props.navigation.getParam('favorites')
        }
    }

    componentWillMount() {
        this._renderData(this.props.navigation.getParam('data'))
    }

    componentDidMount() {
        //this._addFavorite = this._addFavorite.bind(this)
    }

    _renderData( data ){
        this.setState({
            data: this._addIndex(data)
        })
    }

    _addIndex(array) {
        for(let i = 0; i < array.length; i++){
            array[i].index = i + 1;
        }
        return array;
    }

    _addFavorite(id){
        const index = this.state.favorites.indexOf(id);
        if( index === -1){
            this.setState(prevState => ({
                favorites: [...prevState.favorites, id]
            }), () => {
                this.props.navigation.state.params.updateFavorites(this.state.favorites)
            })
            Toast.show({
                text: "Rajouté sur favoris",
                duration: 1200
            })
        } else {
            let array = [...this.state.favorites];
            array.splice(index, 1);
            this.setState({favorites: array}, () => {
                this.props.navigation.state.params.updateFavorites(this.state.favorites)
            });
            Toast.show({
                text: "Supprimé sur favoris",
                duration: 1200
            })
        }
    }

    render() {
        return (
            <Container style={ styles.container }>
                <Content >
                    <Questions data={ this.state.data } favorites={ this._addFavorite.bind(this) }/>                    
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