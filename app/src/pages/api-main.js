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
        // this.state = {
        //     data: [],
        //     favorites: this.props.navigation.getParam('favorites'),
        //     langue: this.props.navigation.getParam('langue'),
        //     cat: this.props.navigation.getParam('cat')
        // }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitle:(<View style={ styles.headerNav }>
                            <Text>Game</Text>
                            <Image style={ styles.headerImg } source={require('../../assets/img/icons/main.png')} />
                        </View>)
        }
    }

    async _getQuestions () {
        const   language = this.props.navigation.getParam('langue'),
                category = this.props.navigation.getParam('cat').join('-')

          
        

        try {
            let response = await fetch(
              `http://localhost:3000/jaser-api/categories/${category}/${language}`,
            );
            let responseJson = await response.json();
            console.log(responseJson);
          } catch (error) {
            console.error(error);
          }
        
        
    }

    componentWillMount() {
        // this._renderData(this.props.navigation.getParam('favorites'))
        this._getQuestions()
    }

    componentDidMount() {
        // this._addFavorite = this._addFavorite.bind(this)
    }

    _renderData( _arrayFavorites ){
        _array = []
        
        if(this.state.cat.indexOf(global.cat.pers) !== -1){
            _personality.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            id: item._id,
                            favorite: _arrayFavorites.indexOf(item._id) !== -1 && true,
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
                            id: item._id,
                            favorite: _arrayFavorites.indexOf(item._id) !== -1 && true,
                            category: global.cat.expe,
                            icon: require('../../assets/img/icons/experience.png'),
                            text: question.question
                        })
                    }
                })
            })
        }

        if (this.state.cat.indexOf(global.cat.opin) !== -1){
            _opinions.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            id: item._id,
                            favorite: _arrayFavorites.indexOf(item._id) !== -1 && true,
                            category: global.cat.opin,
                            icon: require('../../assets/img/icons/opinion.png'),
                            text: question.question
                        })
                    }
                })
            })
        }

        if (this.state.cat.indexOf(global.cat.pref) !== -1){
            _preferences.map((item) => {
                item.data.map((question) => {
                    if(question.langue === this.state.langue){
                        _array.push({
                            id: item._id,                            
                            favorite: _arrayFavorites.indexOf(item._id) !== -1 && true,
                            category: global.cat.pref,
                            icon: require('../../assets/img/icons/preference.png'),
                            text: question.question
                        })
                    }
                })
            })
        }
        
        this.setState({
            data: this._shuffleArray( _array)
        })
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
                    {/* <Questions 
                        data={this.state.data} 
                        favorites={ this._addFavorite.bind(this) } />                     */}
                        <Text>API Main</Text>
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