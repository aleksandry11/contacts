import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native';
import { realm } from '../app';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            editing: false,
            name: '',
            surname: '',
            phone: '',
            color: ''
        }
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        const contacts = realm.objects('Contact');
        const currentContact = contacts.filtered(`name = "${params.name}" AND surname = "${params.surname}"`);
        this.setState({
            contact: currentContact,
            name: currentContact[0].name,
            surname: currentContact[0].surname,
            phone: currentContact[0].phone,
            color: currentContact[0].color
        })
    }
    onDelete() {
        const { navigate } = this.props.navigation;
        realm.write(() => {
            realm.delete(this.state.contact[0]);
            navigate('Home');
        });
    }
    onEdit() {
        this.setState({editing: true});
    }
    submitEdit() {
        const { navigate } = this.props.navigation;
        realm.write(() => {
            let contact = this.state.contact[0];
            contact.name = this.state.name;
            contact.surname = this.state.surname;
            contact.phone = this.state.phone;
            contact.color = this.state.color;
        });
        navigate('Home');
    }
    render() {
        console.log(this.state.contact);
        return (
            <View style={[styles.container, {backgroundColor: this.state.contact[0].color}]}>
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        {this.state.editing ?
                            <TextInput onChangeText={(text) => this.setState({name: text})} style={styles.input} value={this.state.name} />
                            :
                            <Text style={styles.infoText}>Name: {this.state.contact[0].name}</Text>
                        }
                    </View>
                    <View style={styles.infoItem}>
                        {this.state.editing ?
                            <TextInput onChangeText={(text) => this.setState({surname: text})} style={styles.input} value={this.state.surname}/>
                            :
                            <Text style={styles.infoText}>Surname: {this.state.contact[0].surname}</Text>
                        }
                    </View>
                    <View style={styles.infoItem}>
                        {this.state.editing ?
                            <TextInput onChangeText={(text) => this.setState({phone: text})} style={styles.input} value={this.state.phone} />
                            :
                            <Text style={styles.infoText}>Phone: {this.state.contact[0].phone}</Text>
                        }
                    </View>
                    <View style={styles.infoItem}>
                        {this.state.editing ?
                            <Picker
                                style={{marginBottom: 20}}
                                selectedValue={this.state.color}
                                onValueChange={(itemValue, itemIndex) => this.setState({color: itemValue})}>
                                <Picker.Item label="Sun flower" value="#f1c40f" />
                                <Picker.Item label="Amethyst" value="#9b59b6" />
                                <Picker.Item label="Emerald" value="#2ecc71" />
                                <Picker.Item label="Alizarin" value="#e74c3c" />
                            </Picker>
                            :
                            null
                        }
                    </View>
                </View>
                <View style={styles.buttons}>
                    {this.state.editing ?
                        <TouchableOpacity style={styles.editContact} onPress={this.submitEdit.bind(this)}>
                            <Text style={{color: '#fff'}}>Submit</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.editContact} onPress={this.onEdit.bind(this)}>
                            <Text style={{color: '#fff'}}>Edit</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.deleteContact} onPress={this.onDelete.bind(this)}>
                        <Text style={{color: '#fff'}}>Delete contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    info: {
        flex: 1,
        padding: 15,
    },
    infoItem: {
        marginBottom: 5,
        padding: 10,
    },
    infoText: {
        fontSize: 18,
        color: '#2c3e50'
    },
    buttons: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    editContact: {
        backgroundColor: '#34495e',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    deleteContact: {
        backgroundColor: '#2c3e50',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    input: {
        margin: 0,
    }
})