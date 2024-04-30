import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/Feather';
import Password from 'react-native-vector-icons/Feather';
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
            .post("http://162.16.2.55:3000/register", userData)
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
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../Assets/Images/register.png')}
                style={{ flex: 1 }}
            />
            <Text style={{ position: 'absolute', fontSize: 50, color: 'white', fontWeight: 'bold', top: 150, left: 25 }}>Welcome</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', top: 380, left: 25, borderColor: 'black', borderWidth: 2, width: 350, paddingVertical: 2, borderRadius: 16 }}>
                <User name='user' size={28} color='black' style={{ paddingLeft: 10, paddingRight: 10 }} />
                <TextInput
                    placeholder='Name'
                    placeholderTextColor='black'
                    value={name}
                    onChangeText={(text) => setName(text)} // Update the state with email input
                    style={{ color: 'black', fontSize: 16, fontWeight: '400' }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', top: 445, left: 25, borderColor: 'black', borderWidth: 2, width: 350, paddingVertical: 2, borderRadius: 16 }}>
                <Email name='email-outline' size={28} color='black' style={{ paddingLeft: 10, paddingRight: 10 }} />
                <TextInput
                    placeholder='Email'
                    placeholderTextColor='black'
                    value={email}
                    onChangeText={(text) => setEmail(text)} // Update the state with email input
                    style={{ color: 'black', fontSize: 16, fontWeight: '400' }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', top: 510, left: 25, borderColor: 'black', borderWidth: 2, width: 350, paddingVertical: 2, borderRadius: 16 }}>
                <Password name='lock' size={28} color='black' style={{ paddingLeft: 10, paddingRight: 10 }} />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='black'
                    value={password}
                    onChangeText={(text) => setPassword(text)} // Update the state with password input
                    style={{ color: 'black', fontSize: 16, fontWeight: '400' }}
                />
            </View>
            <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: 'blue', borderRadius: 25, top: 580, position: 'absolute', left: '15%', paddingHorizontal: 90, paddingVertical: 10 }}>
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Register</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 645, left: 92 }}>
                <Text style={{ color: 'black', fontWeight: 700 }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'blue', paddingLeft: 8, fontWeight: 600 }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{ position: 'absolute', top: 675, left: 25, backgroundColor: 'grey', height: 2, width: 350 }} />
        </SafeAreaView>
    );
}
