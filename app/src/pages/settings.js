import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Button, Header, Icon } from 'native-base';

export default class Settings extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container >
                <Content contentContainerStyle={styles.container}>
                <Text>
                    Settings Screen
                </Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});