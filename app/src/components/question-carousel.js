import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Right, Toast } from 'native-base';

export default class QuestionsCarousel extends Component {
    constructor(props){
        super(props)
    }
    
    // componentDidMount(){
    //     this._addFavorite = this._addFavorite.bind(this)
    // }
    
    // _addFavorite(){

    // }

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

                    <CardItem cardBody style={ styles.cardBody }>
                        <Text style={ styles.question }>{item.text}</Text>
                    </CardItem>
                    
                    <CardItem style={ styles.cardFooter }>
                        <Icon name="share" style={{ color: '#ED4A6A' }} />
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