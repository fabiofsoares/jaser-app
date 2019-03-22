import React from 'react';
import { StyleSheet, View , Image, Button, TouchableHighlight } from 'react-native';
import { Container, Radio, Content, ListItem, Card, CardItem, Text, Body, Left, Right, Thumbnail, Icon, Toast } from "native-base";
import { HeaderBackButton } from 'react-navigation';

import global from '../config/global'
import locales from '../../assets/locales/en/locales.json'
import { _storeData, _getData } from '../config/persiste'

export default class Settings extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
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
                <Card>
                    <CardItem header bordered>
                        <Text>{locales.settings.title_language}</Text>
                    </CardItem>
                    <CardItem bordered>
                        <Body style={styles.languagesBody}>

                            <View style={[this.state.langue === 'fr' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight 
                                    onPress={() => this._changeLanguage('fr')}>
                                    <Image source={require('../../assets/img/icons/ln-fr.png')} />
                                </TouchableHighlight >
                                <Text>{locales.settings.french}</Text>
                            </View>

                            <View style={[this.state.langue === 'pt' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight 
                                    onPress={() => this._changeLanguage('pt')}>
                                    <Image source={require('../../assets/img/icons/ln-pt.png')} />
                                </TouchableHighlight>
                                <Text>{locales.settings.portugues}</Text>
                            </View>

                            <View style={[this.state.langue === 'en' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight 
                                    onPress={() => this._changeLanguage('en')}>
                                    <Image source={require('../../assets/img/icons/ln-en.png')} />
                                </TouchableHighlight>
                                <Text>{locales.settings.english}</Text>
                            </View>

                            <View style={[this.state.langue === 'es' && styles.activeLN, styles.contentLanguage]}>
                                <TouchableHighlight  
                                    onPress={() => this._changeLanguage('es')}>
                                    <Image source={require('../../assets/img/icons/ln-es.png')} />
                                </TouchableHighlight >
                                <Text>{locales.settings.spanish}</Text>
                            </View>

                        </Body>
                    </CardItem>
                    </Card>

                    <Card>
                    <CardItem footer bordered>
                        <Text>{locales.settings.title_category}</Text>
                    </CardItem>

                    <CardItem bordered>
                        <Body>
                            <ListItem  selected={this.state.cat.indexOf(global.cat.pers) !== -1 && true} 
                                        onPress={() => this._selectCategory(global.cat.pers)}>
                                <View style={styles.contentCategory} >
                                    <Left>
                                        <Thumbnail square small source={require('../../assets/img/icons/personality.png')} />
                                        <Text style={styles.labelCategory}>{locales.settings.personality}</Text>
                                    </Left>
                                    <Right>
                                        <Radio
                                            color={"#f0ad4e"}
                                            selectedColor={"#5cb85c"}
                                            selected={this.state.cat.indexOf(global.cat.pers) !== -1 && true}
                                        />
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
                                        <Radio
                                            color={"#f0ad4e"}
                                            selectedColor={"#5cb85c"}
                                            selected={this.state.cat.indexOf(global.cat.expe) !== -1 && true}
                                        />
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
                                        <Radio
                                            color={"#f0ad4e"}
                                            selectedColor={"#5cb85c"}
                                            selected={this.state.cat.indexOf(global.cat.pref) !== -1 && true}
                                        />
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
                                        <Radio
                                            color={"#f0ad4e"}
                                            selectedColor={"#5cb85c"}
                                            selected={this.state.cat.indexOf(global.cat.opin) !== -1 && true}
                                        />
                                    </Right>
                                </View>
                            </ListItem>
                        </Body>
                    </CardItem>
                    </Card>
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
    languagesBody: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    activeLN: {
        borderWidth: 1,
        borderColor: "#5cb85c"
    },
    contentCategory:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentLanguage:{
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelCategory:{
        marginLeft: 20
    }
});