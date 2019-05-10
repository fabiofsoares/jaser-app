import React from 'react';
import { StyleSheet, Image, View, Alert, TouchableOpacity } from 'react-native';
import { Container, Text, Button, Content, Toast } from 'native-base';
import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'
import {_storeData, _getData} from '../config/persiste'
import { _getFetch } from '../config/fetch'
import { shuffleArray } from '../config/services'

export default class Home extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            questions: [],
            langue: '',
            cat: [],
            favorites: []
        }
    }
    
    static navigationOptions = () => { return { header: null } }

    componentDidMount(){
        this._savePreferences = this._savePreferences.bind(this)
        this._saveFavorites = this._saveFavorites.bind(this)
    }

    componentWillMount(){

        this._getAllData()

        _getData(global.KEYS.PREF).then((json)=>{
            if(json !== null){
                const data = JSON.parse(json);
                this.setState({
                    langue: data.langue ? data.langue : global.DEFAULT_PREF.langue,
                    cat: data.cat ? data.cat : global.DEFAULT_PREF.category
                }, () => {
                    this._getApiData();
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
                
                this._getApiData()
                
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

    _getAllData() {
        const params = `questions/`
        try {
            _getFetch(params).then( data => {
                _storeData(global.KEYS.QUES, data.data)
            });
        } catch (err) {
            console.error(err)
        }
    }

    _getLocalData() {
        _getData(global.KEYS.QUES).then((json)=>{
                if(json !== null) {
                    this.setState({ 
                        questions: this._renderLocalData(JSON.parse(json))
                    })
                }
        })
    }

    _renderLocalData(data) {
        const _array = [];
        
        data.map(item => {
            if(this.state.cat.indexOf(item.category) !== -1){
                item.data.map(question => {
                    if(question.langue === this.state.langue){ 
                        _array.push({
                            id: item._id,
                            favorite: this.state.favorites.indexOf(item._id) !== -1 && true,
                            category: item.category,
                            text: question.question
                        })
                    }
                })
            }
        })
        
        return _array;
    }

    _getApiData() {
        const params = `categories/${this.state.cat.join('-')}/${this.state.langue}`

        try {
            _getFetch(params).then( data => {
                if(data !== false){
                    console.log('API')
                    this.setState({
                        questions : this._renderArrayData(data)
                    })
                } else {
                    console.log('LOCAL')
                    this._getLocalData()
                }
            });

        } catch(err){
            console.log(err)
            this._getLocalData()
        }
    }

    _renderArrayData(json) {
        _array = []

        json.data.map((item, i) => {
            _array.push({
                id: item._id,
                favorite: this.state.favorites.indexOf(item._id) !== -1 && true,
                category: item.category,
                text: item.data[0].question
            })
        })

        return shuffleArray( _array)
    }

    render() {
        
        return (
            <Container style={ styles.container }>

                <Content contentContainerStyle={styles.content}>

                    <Image source={ require('../../assets/img/logo-app.png') }/>

                    <View style={ styles.container_button }>

                        {/* <TouchableOpacity 
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
                        </TouchableOpacity> */}

                        <TouchableOpacity style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('ApiMain', {
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites,
                                questions: this.state.questions
                            })}>
                            <View style={styles.view}>
                                <Text style={ styles.label }>{ locales.home.btn_main }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_blue.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>

                        <TouchableOpacity style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('Settings', {
                                langue: this.state.langue,
                                cat: this.state.cat,
                                updateValue: this._savePreferences
                            })}>
                            <View style={ styles.view }>
                                <Text style={ styles.label }>{ locales.home.btn_settings }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_jaune.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={ styles.touchable } 
                            onPress={() => this.props.navigation.navigate('Favorites', {
                                favorites: this.state.favorites,
                                updateFavorites: this._saveFavorites,
                                questions: this.state.questions
                            })}>
                            <View style={ styles.view }>
                                <Text style={ styles.label }>{ locales.home.btn_favorites }</Text>
                            </View>
                            <Image source={require('../../assets/img/btn_main_rouge.png')}  style={ styles.btn_background } />
                        </TouchableOpacity>

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