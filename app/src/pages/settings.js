import React from 'react';
import { StyleSheet, View , Image, Button, TouchableHighlight } from 'react-native';
import { Container, Radio, Content, ListItem, Card, CardItem, Text, Body, Left, Right, Thumbnail } from "native-base";
import { HeaderBackButton } from 'react-navigation';

import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'
import { _storeData, _getData } from '../config/persiste'

export default class Settings extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerTitle:(<View style={ styles.headerNav }>
                            <Text>Settings</Text>
                            <Image style={ styles.headerImg } source={require('../../assets/img/icons/settings.png')} />
                        </View>),
            headerLeft:(<HeaderBackButton onPress={()=>{ params.saveSettings() }}/>)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            langue: this.props.navigation.getParam('langue'),
            cat: this.props.navigation.getParam('cat')
        }
    }
    
    componentDidMount(){
        this._changeLanguage = this._changeLanguage.bind(this);
        this._selectCategory = this._selectCategory.bind(this);
        this._onSaveSettings = this._onSaveSettings.bind(this)

        this.props.navigation.setParams({ saveSettings: this._onSaveSettings })
    }

    _onSaveSettings() {
        this.props.navigation.state.params.updateValue(this.state)
        this.props.navigation.navigate('Home')
    }

    _changeLanguage(value){
        this.setState({
            langue: value
        })
    }

    _selectCategory(value){
        const index = this.state.cat.indexOf(value);
        if( index === -1){
            this.setState(prevState => ({
                cat: [...prevState.cat, value]
            }))

        } else {
            let array = [...this.state.cat];
            array.splice(index, 1);
            this.setState({cat: array});
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content padder>
                <View style={ styles.card }>
                    <CardItem header style={styles.headerLanguage}>
                        <Text style={styles.headerText}>{locales.settings.title_language}</Text>
                    </CardItem>
                    <CardItem>
                        <Body style={styles.languagesBody}>

                            <View style={[this.state.langue === 'fr' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight 
                                    onPress={() => this._changeLanguage('fr')}>
                                    <Image source={require('../../assets/img/icons/ln-fr.png')} />
                                </TouchableHighlight >
                                {/* <Text>{locales.settings.french}</Text> */}
                            </View>

                            <View style={[this.state.langue === 'pt' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight 
                                    onPress={() => this._changeLanguage('pt')}>
                                    <Image source={require('../../assets/img/icons/ln-pt.png')} />
                                </TouchableHighlight>
                                {/* <Text>{locales.settings.portugues}</Text> */}
                            </View>

                            <View style={[this.state.langue === 'en' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight 
                                    onPress={() => this._changeLanguage('en')}>
                                    <Image source={require('../../assets/img/icons/ln-en.png')} />
                                </TouchableHighlight>
                                {/* <Text>{locales.settings.english}</Text> */}
                            </View>

                            <View style={[this.state.langue === 'es' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight  
                                    onPress={() => this._changeLanguage('es')}>
                                    <Image source={require('../../assets/img/icons/ln-es.png')} />
                                </TouchableHighlight >
                                {/* <Text>{locales.settings.spanish}</Text> */}
                            </View>

                        </Body>
                    </CardItem>
                    </View>

                    <View style={[styles.card, styles.category]}>
                    <CardItem header style={styles.headerCategory}>
                        <Text style={styles.headerText}>{locales.settings.title_category}</Text>
                    </CardItem>

                    <CardItem >
                        <Body>
                            <ListItem  selected={this.state.cat.indexOf(global.cat.pers) !== -1 && true} 
                                        onPress={() => this._selectCategory(global.cat.pers)}>
                                <View style={styles.contentCategory} >
                                    <Left>
                                        <Thumbnail square small source={require('../../assets/img/icons/personality.png')} />
                                        <Text style={styles.labelCategory}>{locales.settings.personality}</Text>
                                    </Left>
                                    <Right>
                                        { this.state.cat.indexOf(global.cat.pers) !== -1 && <Image source={ require('../../assets/img/icons/checked.png')} />}
                                    </Right>
                                </View>
                            </ListItem>

                            <ListItem selected={this.state.cat.indexOf(global.cat.expe) !== -1 && true} 
                                        onPress={() => this._selectCategory(global.cat.expe)}>
                                <View style={styles.contentCategory}>
                                    <Left>
                                        <Thumbnail square small source={require('../../assets/img/icons/experience.png')} />
                                        <Text style={styles.labelCategory}>{locales.settings.experiences}</Text>
                                    </Left>
                                    <Right>
                                        { this.state.cat.indexOf(global.cat.expe) !== -1 && <Image source={ require('../../assets/img/icons/checked.png')} />}
                                    </Right>
                                </View>
                            </ListItem>

                            <ListItem selected={this.state.cat.indexOf(global.cat.pref) !== -1 && true} 
                                        onPress={() => this._selectCategory(global.cat.pref)}>
                                <View style={styles.contentCategory}>
                                    <Left>
                                        <Thumbnail square small source={require('../../assets/img/icons/preference.png')} />
                                        <Text style={styles.labelCategory}>{locales.settings.preferences}</Text>
                                    </Left>
                                    <Right>
                                        { this.state.cat.indexOf(global.cat.pref) !== -1 && <Image source={ require('../../assets/img/icons/checked.png')} />}
                                    </Right>
                                </View>
                            </ListItem>

                            <ListItem selected={this.state.cat.indexOf(global.cat.opin) !== -1 && true} 
                                        onPress={() => this._selectCategory(global.cat.opin)}>
                                <View style={styles.contentCategory}>
                                    <Left>
                                        <Thumbnail square small source={require('../../assets/img/icons/opinion.png')} />
                                        <Text style={styles.labelCategory}>{locales.settings.opinions}</Text>
                                    </Left>
                                    <Right>
                                        { this.state.cat.indexOf(global.cat.opin) !== -1 && <Image source={ require('../../assets/img/icons/checked.png')} />}
                                    </Right>
                                </View>
                            </ListItem>
                        </Body>
                    </CardItem>
                    </View>
                </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
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
    card: {
        borderWidth: 2,
        padding: 4,
        borderColor: '#070707'
    },
    category: {
        marginTop: 15
    },
    headerText : {
        color: '#070707'
    },
    headerLanguage:{
        backgroundColor: '#F2D443'
    },
    headerCategory:{
        backgroundColor: '#F2D443'
    },
    languagesBody: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    activeLN: {
        borderWidth: 2,
        //borderStyle: 'dotted',
        borderColor: "#070707",
        backgroundColor: '#26BCAD'
    },   
    contentCategory:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    listItem: {
        borderWidth: 2,
        borderColor: '#070707'
    },
    contentLanguage:{
        width: '25%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelCategory:{
        marginLeft: 20
    }
});