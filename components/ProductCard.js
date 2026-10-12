import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

export default function ProductCard({ product }) {
    return (
        <View style={styles.card}>
            <Text sytle={styles.productName}>
                {product.name}
            </Text>

            <Text style={styles.price}>
                R{product.price}
            </Text>

            <Text style={styles.category}>
                {product.category}
            </Text>

            <Text style={styles.description}>
                {product.description}
            </Text>
        </View>   
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        marginBottom: 14,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,

        elevation: 4,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'centre',
        marginBottom: 8,
    },

    productName: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#222222',
        flex: 1,
    },

    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0B7A53',
    },

    category: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B4EFF',
        marginBottom: 8,
    },

    description: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 21,
    },
});