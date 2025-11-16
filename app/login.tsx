
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../userContext';

export default function LoginScreen({ navigation }) {
    const { setEmail } = useContext(UserContext);

    const [email, setEmailLocal] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleLogin = () => {
        let newErrors = { email: '', password: '' };
        let valid = true;

        // Email validation
        if (!email.includes('@') || !email.includes('.com')) {
            newErrors.email = 'Email must contain @ and .com';
            valid = false;
        }

        // Password validation
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors); // <-- IMPORTANT: this re-renders and shows errors

        if (!valid) return;

        // Save email in context
        setEmail(email);

        // Navigate with params
        navigation.navigate('ProfileTab', { userEmail: email });
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

            {/* Email Error */}
            {errors.email !== '' && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Password:</Text>
            <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {/* Password Error */}
            {errors.password !== '' && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 2,
        fontSize: 14,
    },
});
