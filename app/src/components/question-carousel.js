import React, { Component } from 'react';
import { Alert, StyleSheet, CameraRoll, Platform, Share, ImageBackground, TouchableOpacity, Image  } from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Right, Toast, View, Button } from 'native-base';
import { Constants, takeSnapshotAsync } from 'expo';

export default class QuestionsCarousel extends Component {
    constructor(props){
        super(props)
        this.background = [
            require('../../assets/img/colors-background/1.png'),
            require('../../assets/img/colors-background/2.png'),
            require('../../assets/img/colors-background/3.png'),
            require('../../assets/img/colors-background/4.png'),
            require('../../assets/img/colors-background/5.png')
        ]
        
        this.state = {
            favorite : ''
        }
        
    }
    
    componentDidMount(){
        this._addFavorite = this._addFavorite.bind(this)
        this._snapShot = this._snapShot.bind(this)
    }
    
    _addFavorite(id, star, favorite){
        //star.style(favorite ? styles.favoriteON : styles.favoriteOFF);
        this.props.favorites(id)
    }
  
    share(file){
        try {
            Share.share({
                //url:'https://toolkit.danparis.fr/jaser/',
                title:"Jaser App",
                message:"Alors... que pensez vous sur ...",
                url: "data:image/png;base64,"+file
            }).then(() => {
    
            })
        } catch (err) {
            console.log(err)
        }
    }

    _snapShot = async (view, save) => {
        const options = {
            format: 'jpg',
            quality: 0.8,
            result: save ? 'file' : 'base64',
            width: 600,
            height: 600,
        };

        try {
            const file = await takeSnapshotAsync(view, options);
            if(save){
                this.saveToCameraRoll(file)
            } else {
                this.share(file)
            }
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
                    duration: 1200,
                    style: { backgroundColor: "#26BCAD" }
                })
              )
              .catch(err => console.log('err:', err))
          })
        } else {
          CameraRoll.saveToCameraRoll(image)
            .then(
                Toast.show({
                    text: "Image enregistrée",
                    duration: 1200,
                    style: { backgroundColor: "#26BCAD" }
                })
            )
        }
    }

    render() {
        return (
            <View style={{height:600}} >
            <DeckSwiper
                ref={(c) => {this._deckSwiper = c}}
                dataSource={this.props.data}
                renderItem={(item) =>
                <Card style={{ elevation: 3, backgroundColor: '#FFFFFF' }}>
                    
                    <CardItem style={ styles.cardHeader }>
                        <Left>
                            {/* <Thumbnail square small source={item.icon} /> */}
                            <Body>
                                <Text note style={ styles.note }>Category</Text>
                                <Text style={ styles.category }>{item.category}</Text>
                            </Body>
                        </Left>
                        <ImageBackground source={ require('../../assets/img/bg_index.png') } style={ styles.index }>
                            <Text style={ styles.indexText }>{item.index} / {this.props.data.length}</Text>
                        </ImageBackground >
                        <Right>
                            <TouchableOpacity onPress={ () => this._addFavorite(item.id, this._start, item.favorite) }>
                                { item.favorite ? <Image source={ require('../../assets/img/icons/star-on.png')} /> 
                                : <Image source={ require('../../assets/img/icons/star-off.png')} /> }
                            </TouchableOpacity>
                        </Right>
                    </CardItem>

                    <CardItem cardBody style={ styles.cardBody } >
                        <ImageBackground resizeMode='contain' ref={(c) => { this._cardItem = c }} source={ this.background[(item.index + 5) % 5]} style={ styles.imageBackground }>
                           <Text style={ styles.question }>{item.text}</Text>
                        </ImageBackground>
                    </CardItem>
                    
                    
                    <CardItem style={ styles.cardFooter }>
                        <Left>
                            <TouchableOpacity onPress={ () => this._snapShot(this._cardItem, true) }>
                                <Image source={require('../../assets/img/icons/save.png')} />
                            </TouchableOpacity>
                        </Left>
                        <Right>
                            <TouchableOpacity  onPress={() => this._snapShot(this._cardItem, false) }>
                                <Image source={require('../../assets/img/icons/share.png')} />
                            </TouchableOpacity>
                        </Right>
                    </CardItem>
                </Card>
            }/></View>
        );
    }
}

const styles = StyleSheet.create({
    cardHeader :{
        
    },
    category: {
        textTransform: 'capitalize',
        fontSize: 12
    },
    note: {
        fontSize: 10
    },
    cardBody: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        padding: 20,
        
    },
    cardFooter:{
       
    },
    favoriteON: {
        color:'#ED4A6A'
    },
    favoriteOFF: {
        color:'#C6C6C6'
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    question: {
        fontSize: 25,
        textAlign: 'center',
        color: '#FFFFFF',
        padding: 5
    },
    index :{
       
        maxWidth: 42,
        width: 42,
        height: 42,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indexText: {
        color: '#070707',
        fontWeight: 'bold',
        fontSize: 10
    }
});