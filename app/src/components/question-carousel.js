import React, { Component } from 'react';
import { Alert, StyleSheet, CameraRoll, Platform } from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Right, Toast, View } from 'native-base';
import { Constants, takeSnapshotAsync } from 'expo';

export default class QuestionsCarousel extends Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        //this._addFavorite = this._addFavorite.bind(this)
        this._snapShot = this._snapShot.bind(this)
    }
    
    // _addFavorite(){

    // }

    _snapShot = async (view) => {
        const options = {
            format: 'jpg',
            quality: 0.8,
            result: 'file',
            width: 600,
            height: 600,
        };

        try {
            const file = await takeSnapshotAsync(view, options);
            this.saveToCameraRoll(file)
        } catch (e) {
            console.log(e);
            Alert.alert('Error', e)
        }
    }
    
    saveToCameraRoll = (image) => {
        if (Platform.OS === 'android') {
          RNFetchBlob
          .config({
            fileCache : true,
            appendExt : 'jpg'
          })
          .fetch('GET', image.urls.small)
          .then((res) => {
            CameraRoll.saveToCameraRoll(res.path())
              .then(
                Toast.show({
                    text: "Image enregistrée",
                    duration: 1200
                })
              )
              .catch(err => console.log('err:', err))
          })
        } else {
          CameraRoll.saveToCameraRoll(image)
            .then(
                Toast.show({
                    text: "Image enregistrée",
                    duration: 1200
                })
            )
        }
    }

    render() {
        return (
            <DeckSwiper
                ref={(c) => {this._deckSwiper = c}}
                dataSource={this.props.data}
                renderItem={(item) =>
                <Card style={{ elevation: 3 }}>
                    
                    <CardItem style={ styles.cardHeader }>
                        <Left>
                            <Thumbnail square small source={item.icon} />
                            <Body>
                                <Text note>Category</Text>
                                <Text style={ styles.category }>{item.category}</Text>
                            </Body>
                        </Left>
                        <Text>{item.index} / {this.props.data.length}</Text>
                        <Right>
                            <Icon name="star" 
                                style={item.favorite ? styles.favoriteON : styles.favoriteOFF} 
                                onPress={ () => this.props.favorites(item.id)}/>
                                
                        </Right>
                    </CardItem>

                    <CardItem cardBody style={ styles.cardBody } ref={(c) => {this._cardItem = c}}>
                        <Text style={ styles.question }>{item.text}</Text>
                    </CardItem>
                    
                    
                    <CardItem style={ styles.cardFooter }>
                        <Icon name="share" style={{ color: '#ED4A6A' }} onPress={ () => this._snapShot(this._cardItem) }/>
                    </CardItem>
                </Card>
            }/>
        );
    }
}

const styles = StyleSheet.create({
    cardHeader :{
        borderBottomColor: '#C6C6C6',
        borderBottomWidth: 1,
        backgroundColor: "#FFFFFF"
    },
    category: {
        textTransform: 'capitalize'
    },
    cardBody: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        padding: 15,
        backgroundColor: "#C6C6C6"
    },
    question: {
        fontSize: 30,
        textAlign: 'center'
    },
    cardFooter:{
        borderTopColor: '#C6C6C6',
        borderTopWidth: 1,
        backgroundColor: "#FFFFFF"
    },
    favoriteON: {
        color:'#ED4A6A'
    },
    favoriteOFF: {
        color:'#C6C6C6'
    }
});