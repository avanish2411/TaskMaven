import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Password from 'react-native-vector-icons/Feather';
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
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../Assets/Images/login.png')}
                style={{ flex: 1 }}

            />
            <Text style={{ position: 'absolute', fontSize: 50, color: 'white', fontWeight: 'bold', top: 110, left: 35 }}>Welcome</Text>
            <Text style={{ position: 'absolute', fontSize: 50, color: 'white', fontWeight: 'bold', top: 157, left: 35 }}>Back</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', top: 380, left: 35, borderColor: 'black', borderWidth: 2, width: 330, paddingVertical: 2, borderRadius: 16 }}>
                <Email name='email-outline' size={28} color='black' style={{ paddingLeft: 10, paddingRight: 10 }} />
                <TextInput
                    placeholder='Write Your Email'
                    placeholderTextColor='black'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ color: 'black', fontSize: 16, fontWeight: '400' }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', top: 445, left: 35, borderColor: 'black', borderWidth: 2, width: 330, paddingVertical: 2, borderRadius: 16 }}>
                <Password name='lock' size={28} color='black' style={{ paddingLeft: 10, paddingRight: 10 }} />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='black'
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style={{ color: 'black', fontSize: 16, fontWeight: '400' }}
                />
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 515, left: 55, justifyContent: 'space-between', }}>
                <TouchableOpacity style={{ paddingRight: 100 }}>
                    <Text style={{ color: 'black', fontWeight: 700 }}>keep me login</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color: 'black', fontWeight: 700 }}>forget password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLogin()} style={{ backgroundColor: 'blue', borderRadius: 25, top: 555, position: 'absolute', left: '17%', paddingHorizontal: 100, paddingVertical: 10 }}>
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 620, left: 98 }}>
                <Text style={{ color: 'black', fontWeight: 500 }}>Don't have a account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: 'blue', paddingLeft: 8, fontWeight: 600 }}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}