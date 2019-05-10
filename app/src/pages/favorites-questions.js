import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Toast } from 'native-base';
import Questions from '../components/question-carousel'
import global from '../config/global'



export default class FavoritesQuestions extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.navigation.getParam('data'),
            favorites: this.props.navigation.getParam('favorites')
        }
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        //this._addFavorite = this._addFavorite.bind(this)
    }


    _removeFavorite = (id) => {
        const index = this.state.favorites.indexOf(id);
        let array = [...this.state.favorites];
            array.splice(index, 1);
            this.setState({favorites: array}, () => {
                //console.log('removed : ', this.props.navigation.state.params)
                console.log(this)
                //probleme avec le context... il faut garder le this de cette classe
                //this.props.navigation.state.params.updateFavorites(this.state.favorites)
            });
            Toast.show({
                text: "Supprimé sur favoris",
                duration: 1200,
                style: { backgroundColor: "#FE7567" }
        })
    }

    render() {
        return (
            <Container style={ styles.container }>
                <Content >
                    <Questions data={ this.state.data } favorites={ this._removeFavorite.bind(this) }/>                    
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        padding: 10
    }
})