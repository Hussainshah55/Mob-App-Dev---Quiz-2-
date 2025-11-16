import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { UserContext } from './userContext';

export default function LoginScreen({ navigation }) {
    const { setEmail } = useContext(UserContext);
    const [email, setEmailLocal] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
        }
        if (password.length < 4) {
            Alert.alert('Error', 'Password must be at least 4 characters');
            return;
        }

        // Save email in context
        setEmail(email);
        // Navigate to Profile tab
        navigation.navigate('ProfileTab');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Enter email"
                value={email}
                onChangeText={setEmailLocal}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    label: { fontSize: 16, marginVertical: 5 },
    input: { borderWidth: 1, borderColor: '#999', borderRadius: 5, padding: 10, marginBottom: 15 },
});
