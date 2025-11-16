import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { UserContext } from './userContext';
export default function ProfileScreen({ route }) {

    const { email } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
            <Text style={styles.text}>Logged in as:</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
    },
    email: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
});
