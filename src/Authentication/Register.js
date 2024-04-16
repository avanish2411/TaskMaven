import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Register({ navigation }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        const userData = {
            name: name,
            email: email,
            password: password
        }
        axios
            .post("http://162.16.2.190:3000/register", userData)
            .then((res) => {
                console.log(res.data);
                Alert.alert("Login success", "You have been logged in successfully");
                setEmail("");
                setPassword("");
                setName("");
            })
            .catch((error) => {
                Alert.alert("Login failed", "An error occurred during login");
                console.log("error", error);
            });
    };

    return (
        <SafeAreaView style={{ padding: 25, marginTop: 60 }}>
            <Text style={{ fontSize: 40, color: 'black', fontWeight: 'bold', paddingVertical: 5, textAlign: 'center' }}>Welcome</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'red', paddingHorizontal: 8 }}>
                <Email name='email-outline' size={28} color='black' />
                <TextInput
                    placeholder='Write Your Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)} // Update the state with email input
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'green', paddingHorizontal: 8 }}>
                <Email name='email-outline' size={28} color='red' />
                <TextInput
                    placeholder='Write Your Name'
                    value={name}
                    onChangeText={(text) => setName(text)} // Update the state with name input
                />
            </View>
            <TextInput
                placeholder='Write Your Password'
                value={password}
                onChangeText={(text) => setPassword(text)} // Update the state with password input
                style={{ backgroundColor: 'grey', marginVertical: 10, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 16, fontSize: 16 }}
            />
            <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: 'blue', paddingVertical: 8, marginHorizontal: 60, marginVertical: 8, borderRadius: 25 }}>
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Register</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'blue', paddingLeft: 8 }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'grey', height: 2, marginTop: 8 }} />
        </SafeAreaView>
    );
}
