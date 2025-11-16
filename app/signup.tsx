import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../userContext';

export default function SignupScreen({ navigation }) {

    const { setEmail } = useContext(UserContext);

    const [fullName, setFullName] = useState('');
    const [email, setEmailLocal] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const handleSignup = () => {
        let newErrors = { fullName: '', email: '', password: '' };
        let isValid = true;

        // Full Name
        if (fullName.trim().length < 2) {
            newErrors.fullName = "Full name must be at least 2 characters";
            isValid = false;
        }

        // Email
        if (!email.includes('@') || !email.includes('.com')) {
            newErrors.email = "Email must contain @ and .com";
            isValid = false;
        }

        // Password
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        setErrors(newErrors);
        if (!isValid) return;

        // Save email in context
        setEmail(email);

        // Go to Profile with params
        navigation.navigate("ProfileTab", { email: email });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
                placeholder="Enter full name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
            />
            {errors.fullName !== '' && <Text style={styles.error}>{errors.fullName}</Text>}

            <Text style={styles.label}>Email:</Text>
            <TextInput
                placeholder="Enter email"
                value={email}
                onChangeText={setEmailLocal}
                style={styles.input}
                autoCapitalize="none"
            />
            {errors.email !== '' && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Password:</Text>
            <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {errors.password !== '' && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Signup" onPress={handleSignup} />

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
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    }
});
