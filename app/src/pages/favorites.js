import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'

//Questions Locales

export default class Favorites extends Component { 
    constructor(props){
        super(props)
        this.state = {
            data: {},
            favorites: this.props.navigation.getParam('favorites')
        }
    }

    static navigationOptions = () => {
        return {
            headerTitle:(<View style={ styles.headerNav }>
                            <Text>Favorites</Text>
                            <Image style={ styles.headerImg } source={require('../../assets/img/icons/star.png')} />
                        </View>)
        }
    }

    componentWillMount(){
        this._renderData()
    }

    _renderData() {

        const questions = this.props.navigation.getParam('questions')

        _arrayPersonality = []
        _arrayOpinions = []
        _arrayPreferences = []
        _arrayExperiences = []

        questions.map((item) => {
            
            switch (item.category) {
                case 'opinions':
                    if(this.state.favorites.indexOf(item.id) !== -1) {
                        item.favorite = true
                        _arrayOpinions.push(item)
                    }
                  break;
                case 'personality':
                    if(this.state.favorites.indexOf(item.id) !== -1) {
                        item.favorite = true
                        _arrayPersonality.push(item)
                    }
                    break;
                case 'preferences':
                    if(this.state.favorites.indexOf(item.id) !== -1) {
                        item.favorite = true
                        _arrayPreferences.push(item)
                    }
                    break;
                default:
                    if(this.state.favorites.indexOf(item.id) !== -1) {
                        item.favorite = true
                        _arrayExperiences.push(item)
                    }
            }
            
        })

        this.setState({
            data: {
                experience: _arrayExperiences,
                opinions: _arrayOpinions,
                personality: _arrayPersonality,
                preferences: _arrayPreferences
            }
        })
    }

    _removeFavorites(){
        let array = [...this.state.favorites];

        array.splice(index, 1);

        this.setState({favorites: array}, () => {
            this.props.navigation.state.params.updateFavorites(this.state.favorites)
        });

        Toast.show({
            text: "Supprimé sur favoris",
            duration: 1200,
            style: { backgroundColor: global.color.red }
        })
    }

    render(){
        
        return (
            <Container>
                <Content>
                    <List>
                        
                        <ListItem>
                            <Left>
                                <Thumbnail style={{marginRight: 15}} small square source={require('../../assets/img/icons/personality.png')} />
                                <Text>{locales.settings.personality}</Text>
                            </Left>
                            <Right>
                                { this.state.data.personality.length > 0 &&
                                <Button transparent 
                                    onPress={() => this.props.navigation.navigate('Game', {
                                        questions: this.state.data.personality,
                                        favorites: this.state.favorites,
                                        self: this.props.navigation
                                    })} >
                                   
                                    <ImageBackground source={ require('../../assets/img/bg_favorites.png') } style={ styles.badge }>
                                        <Text style={ styles.badgeText }>{ this.state.data.personality.length }</Text>
                                    </ImageBackground > 

                                    <Image source={require('../../assets/img/icons/arrow-right.png')} /> 
                                </Button>
                                }
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Thumbnail style={{marginRight: 15}} small square source={require('../../assets/img/icons/experience.png')} />
                                <Text>{locales.settings.experiences}</Text>
                            </Left>
                            <Right>
                                { this.state.data.experience.length > 0 &&
                                <Button transparent 
                                    onPress={() => this.props.navigation.navigate('Game', {
                                        questions: this.state.data.experience,
                                        favorites: this.state.favorites,
                                        self: this.props.navigation
                                    })} >

                                    <ImageBackground source={ require('../../assets/img/bg_favorites.png') } style={ styles.badge }>
                                        <Text style={ styles.badgeText }>{ this.state.data.experience.length  }</Text>
                                    </ImageBackground > 

                                    <Image source={require('../../assets/img/icons/arrow-right.png')} /> 
                                </Button>
                                }
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Thumbnail style={{marginRight: 15}} small square source={require('../../assets/img/icons/opinion.png')} />
                                <Text>{locales.settings.opinions}</Text>
                            </Left>
                            <Right>
                                { this.state.data.opinions.length > 0 &&
                                <Button transparent 
                                    onPress={() => this.props.navigation.navigate('Game', {
                                        questions: this.state.data.opinions,
                                        favorites: this.state.favorites,
                                        self: this.props.navigation
                                    })} >
                                    <ImageBackground source={ require('../../assets/img/bg_favorites.png') } style={ styles.badge }>
                                        <Text style={ styles.badgeText }>{ this.state.data.opinions.length }</Text>
                                    </ImageBackground >
                                    <Image source={require('../../assets/img/icons/arrow-right.png')} /> 
                                </Button>
                                }
                            </Right>
                        </ListItem>

                        <ListItem>
                            <Left>
                                <Thumbnail style={{marginRight: 15}} small square source={require('../../assets/img/icons/preference.png')} />
                                <Text>{locales.settings.preferences}</Text>
                            </Left>
                            <Right>
                                { this.state.data.preferences.length > 0 &&
                                <Button transparent
                                    onPress={() => this.props.navigation.navigate('Game', {
                                        questions: this.state.data.preferences,
                                        favorites: this.state.favorites,
                                        self: this.props.navigation
                                    })} >
                                    <ImageBackground source={ require('../../assets/img/bg_favorites.png') } style={ styles.badge }>
                                        <Text style={ styles.badgeText }>{ this.state.data.preferences.length }</Text>
                                    </ImageBackground >
                                    <Image source={require('../../assets/img/icons/arrow-right.png')} /> 
                                </Button> 
                                }
                            </Right>
                        </ListItem>

                    </List>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    badge :{
        maxWidth: 35,
        width: 35,
        height: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        textAlign: 'center'
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
    }, 
});