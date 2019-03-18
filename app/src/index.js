import React from 'react';
import { Root } from "native-base";
import { AppContainer } from './config/router'


export default class JaserApp extends React.Component {
    render() {
        return (
            <Root>
                <AppContainer />
            </Root>
        );
    }
}
