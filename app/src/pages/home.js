import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Container, Text, Button, Content, Toast } from 'native-base';
import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'
import {_storeData, _getData} from '../config/persiste'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            langue: '',
            cat: [],
            favorites: []
        }
    }

    componentDidMount(){
        this._savePreferences = this._savePreferences.bind(this)
        this._saveFavorites = this._saveFavorites.bind(this)
    }

    _savePreferences(data){
        let difference = this.state.cat
                 .filter(x => !data.cat.includes(x))
                 .concat(data.cat.filter(x => !this.state.cat.includes(x)));
        
        if((data.langue !== this.state.langue) || (difference.length > 0)) {
            this.setState({
                langue : data.langue,
                cat: data.cat
            }, () => {
                _storeData(global.KEYS.PREF, data)
                Toast.show({
                    text: "Enregistrées",
                    duration: 2000
                })
            })
        } 
    }

    _saveFavorites(data){
        this.setState({
            favorites: data
        }, () => {
            _storeData(global.KEYS.FAV, this.state.favorites)
        })
    }

    componentWillMount(){
        _getData(global.KEYS.PREF).then((json)=>{
            if(json !== null){
                const data = JSON.parse(json);
                this.setState({
                    langue: data.langue ? data.langue : global.DEFAULT_PREF.langue,
                    cat: data.cat ? data.cat : global.DEFAULT_PREF.category
                })
            }
        })

        _getData(global.KEYS.FAV).then((json)=>{
            if(json !== null){
                const data = JSON.parse(json);
                this.setState({
                    favorites: data
                })
            }
        })
    }   

    render() {
        
        return (
            <Container style={ styles.container }>

                <Content contentContainerStyle={styles.content}>
                    <Image source={require('../../assets/img/logo-app.png')}/>

                    <View style={ styles.container_button }>
                        <Button large bordered 
                            style={ styles.button }
                            title="Main"
                            onPress={() => this.props.navigation.navigate('Main', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites
                            })} >
                            <Text style={ styles.button_text }>{ locales.home.btn_main }</Text>
                        </Button>

                        <Button large bordered
                            style={ styles.button } 
                            title="Settings"
                            onPress={() => this.props.navigation.navigate('Settings', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                updateValue: this._savePreferences
                            })} >
                            <Text style={ styles.button_text }>{ locales.home.btn_settings }</Text>
                        </Button>

                        <Button large bordered
                            style={ styles.button } 
                            title="Favorites"
                            onPress={() => this.props.navigation.navigate('Favorites', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites
                            })} >
                            <Text style={ styles.button_text }>{ locales.home.btn_favorites }</Text>
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