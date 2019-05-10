import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Container, Content, Toast } from 'native-base';
import Questions from '../components/question-carousel'
import global from '../config/global'

export default class ApiMain extends Component {
    constructor(props){
        super(props)

        this.state = {
            data : [],
            favorites: this.props.navigation.getParam('favorites')
        }
    }

    static navigationOptions = () => {
        return {
            headerTitle:(<View style={ styles.headerNav }>
                            <Text>Game</Text>
                            <Image style={ styles.headerImg } source={ require('../../assets/img/icons/main.png') } />
                        </View>)
        }
    }

    componentWillMount() {
        this._renderData(
            this.props.navigation.getParam('favorites'), 
            this.props.navigation.getParam('questions'))
    }

    componentDidMount() {
        this._addFavorite = this._addFavorite.bind(this)
    }

    _renderData( _arrayFavorites, json ){
        
        for(let i = 0; i < json.length; i++) {
            if(_arrayFavorites.indexOf(json[i].id) !== -1 ){
                json[i].favorite = true
            }
        }

        this.setState({ data: json })
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
                duration: 1200,
                style: { backgroundColor: "#26BCAD" }
            })

        } else {
            let array = [...this.state.favorites];

            array.splice(index, 1);

            this.setState({favorites: array}, () => {
                this.props.navigation.state.params.updateFavorites(this.state.favorites)
            });

            Toast.show({
                text: "Supprimé sur favoris",
                duration: 1200,
                style: { backgroundColor: "#FE7567" }
            })
        }
    }

    render() {
        
        return (
             <Container style={ styles.container } >
                <Content>
                    <Questions 
                        data={this.state.data} 
                        favorites={ this._addFavorite.bind(this) } 
                    /> 
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({ 
    container: {
        padding: 15
    },
    headerNav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImg: {
        position: 'relative',
        left: 10
    }
})