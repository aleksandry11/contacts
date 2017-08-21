import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Contacts  from './js/app';
import AddContact from './js/containers/AddContact';
import Contact from './js/containers/Contact';

const App = StackNavigator({
    Home: { screen: Contacts },
    AddContact: { screen: AddContact },
    Contact: {
        screen: Contact,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name} ${navigation.state.params.surname}`
        })
    }
});

AppRegistry.registerComponent('contacts', () => App);
