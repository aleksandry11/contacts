import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Picker,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { realm } from '../app';

export default class AddContact extends Component {
    static navigationOptions = {
        title: 'Add contact',
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            phone: '',
            color: '#f1c40f',
            key: 0,
        }
    }
    submitContact() {
        const { navigate } = this.props.navigation;
        realm.write(() => {
            realm.create('Contact', {
                name: this.state.name,
                surname: this.state.surname,
                phone: this.state.phone,
                color: this.state.color
            });
        });
        navigate('Home');
    }
    render() {
        return (
            <View style={styles.container} key={this.state.key}>
                {this.submitContact}
                <Text>{this.state.realm}</Text>
                <View>
                    <TextInput onChangeText={(text) => this.setState({name: text})} style={styles.input} placeholder="name" />
                    <TextInput onChangeText={(text) => this.setState({surname: text})} style={styles.input} placeholder="surname" />
                    <TextInput onChangeText={(text) => this.setState({phone: text})} style={styles.input} placeholder="phone"/>
                    <Text>Pick a color: </Text>
                    <Picker
                        style={{marginBottom: 20}}
                        selectedValue={this.state.color}
                        onValueChange={(itemValue, itemIndex) => this.setState({color: itemValue})}>
                        <Picker.Item color="#f1c40f" label="Sun flower" value="#f1c40f" />
                        <Picker.Item color="#9b59b6" label="Amethyst" value="#9b59b6" />
                        <Picker.Item color="#2ecc71" label="Emerald" value="#2ecc71" />
                        <Picker.Item color="#e74c3c" label="Alizarin" value="#e74c3c" />
                    </Picker>
                    <TouchableOpacity style={styles.addContact} onPress={this.submitContact.bind(this)}>
                        <Text style={styles.addText}>Add contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#2c3e50',
        padding: 20
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        color: '#3498db'
    },
    addContact: {
        paddingVertical: 20,
        backgroundColor: '#2980b9'
    },
    addText: {
        textAlign: 'center',
        color: '#fff'
    }
});
