import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Container, Content, Toast } from 'native-base';
import Questions from '../components/question-carousel'
import global from '../config/global'

//Questions Locales
// import _personality from '../../assets/locales/questions/personality.json'
// import _experience from '../../assets/locales/questions/experience.json'
// import _opinions from '../../assets/locales/questions/opinions.json'
// import _preferences from '../../assets/locales/questions/preferences.json'

export default class ApiMain extends Component {
    constructor(props){
        super(props)

        this.state = {
            data : [],
            ren: false,
            favorites: this.props.navigation.getParam('favorites')
        }
    }

    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state
        return {
            headerTitle:(<View style={ styles.headerNav }>
                            <Text>Game</Text>
                            <Image style={ styles.headerImg } source={require('../../assets/img/icons/main.png')} />
                        </View>)
        }
    }

    async _getQuestions () {
        const   language = this.props.navigation.getParam('langue'),
                category = this.props.navigation.getParam('cat').join('-'),
                url = 'http://localhost:3000/jaser-api/categories/'
       
        return await fetch(`${url + category}/${language}`)
            .then(response => response.json())
    }

    componentWillMount() {
        this._getQuestions().then( data => {
            this.setState({
                render: true, 
                data :this._renderData(this.props.navigation.getParam('favorites'), data)
            })
        });
    }

    componentDidMount() {
        this._addFavorite = this._addFavorite.bind(this)
    }

    _renderData( _arrayFavorites, json ){
        _array = []
        
        json.data.map((item, i) => {
            _array.push({
                id: item._id,
                favorite: _arrayFavorites.indexOf(item._id) !== -1 && true,
                category: item.category,
                text: item.data[0].question
            })
        })

        return this._shuffleArray( _array)
    }

    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return this._addIndex(array);
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
                    { this.state.render && 
                    <Questions data={this.state.data} 
                    favorites={ this._addFavorite.bind(this) } /> }
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