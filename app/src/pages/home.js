import React from 'react';
import { StyleSheet, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Text, Button, Content, Toast } from 'native-base';
import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'
import {_storeData, _getData} from '../config/persiste'
import { _getFetch } from '../config/fetch'
import { shuffleArray, addIndex } from '../config/services'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            langue: '',
            cat: [],
            favorites: []
        }
    }
    
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: null
        }
    }

    componentDidMount(){
        this._savePreferences = this._savePreferences.bind(this)
        this._saveFavorites = this._saveFavorites.bind(this)
        //this._logIn = this._logIn.bind(this)
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
                    duration: 2000,
                    style: { backgroundColor: "#26BCAD" }
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
                }, () => {
                    this._getData();
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

    _getData() {
        const params = `categories/${this.state.cat.join('-')}/${this.state.langue}`

        _getFetch(params).then( data => {
            console.log('home', data)
        });
    }

    // _renderArrayData( _arrayFavorites, json ){
    //     _array = []
        
    //     json.data.map((item, i) => {
    //         _array.push({
    //             id: item._id,
    //             favorite: _arrayFavorites.indexOf(item._id) !== -1 && true,
    //             category: item.category,
    //             text: item.data[0].question
    //         })
    //     })

    //     return this._shuffleArray( _array)
    // }

    // async _logIn() {
    //     console.log('login facebook')
    //     try {
    //       const {
    //         type,
    //         token,
    //         expires,
    //         permissions,
    //         declinedPermissions,
    //       } = await Expo.Facebook.logInWithReadPermissionsAsync('538134860047118', {
    //         permissions: ['public_profile'],
    //       });
    //       if (type === 'success') {
    //         // Get the user's name using Facebook's Graph API
    //         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    //         Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    //       } else {
    //         // type === 'cancel'
    //       }
    //     } catch ({ message }) {
    //       alert(`Facebook Login Error: ${message}`);
    //     }
    // }   

    render() {
        
        return (
            <Container style={ styles.container }>

                <Content contentContainerStyle={styles.content}>
                    <Image source={require('../../assets/img/logo-app.png')}/>

                    <View style={ styles.container_button }>

                        <TouchableOpacity 
                            style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('Main', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites
                            })} >
                            <View style={styles.view}>
                                <Text style={ styles.label }>{ locales.home.btn_main }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_dark_vert.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('Settings', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                updateValue: this._savePreferences
                            })}>
                            <View style={styles.view}>
                                <Text style={ styles.label }>{ locales.home.btn_settings }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_jaune.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('Favorites', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites
                            })}>
                            <View style={styles.view}>
                                <Text style={ styles.label }>{ locales.home.btn_favorites }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_rouge.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('ApiMain', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites
                            })}>
                            <View style={styles.view}>
                                <Text style={ styles.label }>{ locales.home.btn_api }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_blue.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>

                        {/* <Button large bordered
                            style={ styles.button } 
                            title="Facebook"
                            onPress={() => this._logIn()} >
                            <Text style={ styles.button_text }>{ 'Facebook' }</Text>
                        </Button> */}

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
   
    view: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        zIndex: 5
    },
    label: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }

});