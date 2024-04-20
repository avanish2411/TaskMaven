import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    navigation.navigate("Main"); // Navigate to Main if token exists
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        if (!email || !password) {
            // Check if email and password are provided
            console.log("Email and password are required");
            return;
        }

        const user = {
            email: email,
            password: password,
        };

        axios
            .post("http://162.16.2.190:3000/login", user)
            .then((response) => {
                const token = response.data.token;
                console.log("token", token);
                AsyncStorage.setItem("authToken", token);
                navigation.navigate("Main"); // Navigate to Main upon successful login
            })
            .catch((error) => {
                console.log("Login failed", error);
            });
    };

    return (
        <SafeAreaView style={{ padding: 25, marginTop: 60 }}>
            <Text style={{ fontSize: 40, color: 'black', fontWeight: 'bold', paddingVertical: 5, textAlign: 'center' }}>Welcome back</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'red', paddingHorizontal: 8 }}>
                <Email name='email-outline' size={28} color='black' />
                <TextInput
                    placeholder='Write Your Email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <TextInput
                placeholder='Write Your Password'
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                style={{ backgroundColor: 'grey', marginVertical: 10, paddingVertical: 10, paddingHorizontal: 15, borderRadius: 16, fontSize: 16 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15 }}>
                <TouchableOpacity>
                    <Text>keep me login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>forget password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLogin()} style={{ backgroundColor: 'blue', paddingVertical: 8, marginHorizontal: 60, marginVertical: 8, borderRadius: 25 }}>
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                <Text style={{color:'black',fontWeight:500}}>Don't have a account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: 'blue', paddingLeft: 8 ,fontWeight:600}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'grey', height: 2, marginTop: 8 }} />
        </SafeAreaView>
    )
}