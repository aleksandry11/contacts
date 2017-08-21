import React, { Component } from 'react';
import AddContact from './containers/AddContact';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Realm from 'realm';
import { ContactSchema } from "./ContactSchema";

export const realm = new Realm({Schema: [ContactSchema]});

export default class Contacts extends Component {
    static navigationOptions = {
        title: 'Contacts',
    }
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            key: 0
        }
    }
    componentWillMount() {
        const contacts = realm.objects('Contact');
        for (let i = 0; i < contacts.length; i++) {
            this.state.contacts.push(contacts[i]);
        }
    }
    toCapital (string) {
        return string.slice(0,1).toUpperCase() + string.slice(1);
    }
    render() {
        console.log(this.state.contacts);
        const { navigate } = this.props.navigation;
        const contactsList = this.state.contacts.map((item, key) => {
            return (
                <TouchableOpacity
                    key={key}
                    style={styles.contactItem}
                    onPress={() => navigate('Contact', {
                        name: item.name,
                        surname: item.surname
                    })}>
                    <View style={[styles.capitalWrap, {backgroundColor: item.color}]}>
                        <Text style={styles.capital}>{item.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <Text>{this.toCapital(item.name)} {this.toCapital(item.surname)}</Text>
                </TouchableOpacity>
            )
        });
        return (
            <View style={styles.container} key={this.state.key}>
                <ScrollView style={{padding: 15}}>
                    <View style={styles.itemsContainer}>
                        {contactsList}
                    </View>
                </ScrollView>
                <View style={styles.addContact}>
                    <TouchableOpacity
                        onPress={()=>navigate('AddContact')}>
                        <Text style={styles.addText}>Add contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#2c3e50'
    },
    itemsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    contactItem: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        padding: 20,
        backgroundColor: '#34495e'
    },
    capitalWrap: {
        borderRadius: 50,
        paddingVertical: 9,
        paddingHorizontal: 18,
        marginRight: 15
    },
    capital: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white'
    },
    addContact: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    addText: {
        textAlign: 'center',
        color: '#fff'
    }
});