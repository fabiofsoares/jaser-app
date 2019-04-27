import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Badge } from 'native-base';

import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'

//Questions Locales
import _personality from '../../assets/locales/questions/personality.json'
import _experience from '../../assets/locales/questions/experience.json'
import _opinions from '../../assets/locales/questions/opinions.json'
import _preferences from '../../assets/locales/questions/preferences.json'

export default class Favorites extends Component { 
    constructor(props){
        super(props)
        this.state = {
            data: {},
            favorites: this.props.navigation.getParam('favorites'),
            langue: this.props.navigation.getParam('langue'),
            cat: this.props.navigation.getParam('cat')
        }
    }

    componentWillMount(){
        this._renderData()
    }

    _renderData( ){
        _arrayPersonality = []
        _arrayOpinions = []
        _arrayPreferences = []
        _arrayExperiences = []
        
        if(this.state.cat.indexOf(global.cat.pers) !== -1){
            _personality.map((item) => {
                if(this.state.favorites.indexOf(item._id) !== -1){
                    item.data.map((question) => {
                        if(question.langue === this.state.langue){
                            _arrayPersonality.push({
                                id: item._id,
                                favorite: true,
                                category: global.cat.pers,
                                icon: require('../../assets/img/icons/personality.png'),
                                text: question.question
                            })
                        }
                    })
                }
            })
        }
        
        if (this.state.cat.indexOf(global.cat.expe) !== -1){
            _experience.map((item) => {
                if(this.state.favorites.indexOf(item._id) !== -1){
                    item.data.map((question) => {
                        if(question.langue === this.state.langue){
                            _arrayExperiences.push({
                                id: item._id,
                                favorite: true,
                                category: global.cat.expe,
                                icon: require('../../assets/img/icons/experience.png'),
                                text: question.question
                            })
                        }
                    })
                }
            })
        }

        if (this.state.cat.indexOf(global.cat.opin) !== -1){
            _opinions.map((item) => {
                if(this.state.favorites.indexOf(item._id) !== -1){
                    item.data.map((question) => {
                        if(question.langue === this.state.langue){
                            _arrayOpinions.push({
                                id: item._id,
                                favorite: true,
                                category: global.cat.opin,
                                icon: require('../../assets/img/icons/opinion.png'),
                                text: question.question
                            })
                        }
                    })
                }
            })
        }

        if (this.state.cat.indexOf(global.cat.pref) !== -1){
            _preferences.map((item) => {
                if(this.state.favorites.indexOf(item._id) !== -1){
                    item.data.map((question) => {
                        if(question.langue === this.state.langue){
                            _arrayPreferences.push({
                                id: item._id,                            
                                favorite: true,
                                category: global.cat.pref,
                                icon: require('../../assets/img/icons/preference.png'),
                                text: question.question
                            })
                        }
                    })
                }
            })
        }
        
        this.setState({
            data: {
                experience: _arrayExperiences,
                opinions: _arrayOpinions,
                personality: _arrayPersonality,
                preferences: _arrayPreferences
            }
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
                                <Button transparent>
                                    <Badge success>
                                        <Text>{ this.state.data.personality.length }</Text>
                                    </Badge>
                                    <Icon name="arrow-forward" />
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
                                <Button transparent>
                                    <Badge success>
                                        <Text>{ this.state.data.experience.length }</Text>
                                    </Badge> 
                                    <Icon name="arrow-forward" />
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
                                <Button transparent>
                                    <Badge success>
                                        <Text>{ this.state.data.opinions.length }</Text>
                                    </Badge>
                                    <Icon name="arrow-forward" />
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
                                <Button transparent>
                                    <Badge success>
                                        <Text>{ this.state.data.preferences.length }</Text>
                                    </Badge> 
                                    <Icon name="arrow-forward" />
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
    
});