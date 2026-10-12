import React, { useState, usestate } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    Statusbar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import ProductCard from './components/ProductCard';

export default function App() {

    // Product list
    const [products, setProducts] = useState([]);

    // Form fields
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setcategory] = useState('');
    const [price, setPrice] = useState('');

    // Error message
    const [error, setError] = useState('');

    // Add a new product
    const addProduct = () => {

        // validation
        if (
            productName.trim() === '' ||
            description.trim() === '' ||
            category.trim() === '' ||
            price.trim() === '' 
        ) {
            setError('Please complete all fields before adding the product.');
            return;
        }

        // Check that price is a valid number
        if (isNaN(Number(price))) {
            setError('Please enter a valid price.');
            return;
        }

        // Create new product
        const newProduct = {
            id: Date.now().toString(),
            name: productName.trim(),
            category: category.trim(),
            price: Number(price).toFixed(2),
        };

        // Add product to the list
        setProducts((currentProducts) => [
            ...currentProducts,
            newProduct,
        ]);

        // Clear error
        setError('');

        // Clear input fields
        setProductName('');
        setDescription('');
        setcategory('');
        setPrice('');

        // Confirmattion
        Alert.alart(
            'Product Added',
            'The product was successfully added to your shop.'
        );
    };

    // Display each product
    const renderProduct = ({ item }) => {
        return <ProductCard product={item} />;
    };

    return (
        <SafeAreaView style={StyleSheet.container}>

            <Statusbar
            barStyle="light-content"
            backgroundColor="#0B7A53"
            />

            <KeyboardAvoidingView
             style={StyleSheet.keyboardCppntainer}
             behavior={
                 Platform.OS === 'ios'
                 ? 'padding'
                 : underined
                }
            >

                {/* HEADER */}

                <View style={styles.header}>

                    <Text style={styles.headerTitle}>
                        Shop Manager
                    </Text>

                    <Text style={styles.headerSubtitle}>
                        Manage your shop products
                    </Text>
                </View>

                {/* MAIN CONTENT */}

                <FlatList
                  data={products}
                  keyExtractor={(item) => item.id}
                  renderItem={renderProduct}
                  showsVerticalScrollIndicator={false}

                  contentContainerStyle={
                    products.length === 0
                    ? styles.emptyContainer
                    : styles.listContainer
                  }

                  ListHeaderComponent={

                    <View>

                        {/* ADD PRODUCT SECTION */}

                        <View style={styles.formCard}>

                            <Text style={styles.sectionTitle}>
                                Add New Product
                            </Text>

                            <Text style={styles.sectionDescription}>
                                Enter the details of a product below.
                            </Text>

                            {/* PRODUCT NAME */}

                            <Text style={styles.label}>
                                Product Name
                            </Text>

                            <TextInput
                               style={styles.input}
                               placeholder="e.g T-Shirt"
                               placeholderTextColor="#999"
                               value={productName}
                               onChangeText={setProductName}
                            />

                            {/* DESCRIPTION */}

                            <Text style={styles.label}>
                                Description
                            </Text>

                            <TextInput
                              style={[
                                styles.input,
                                styles.descriptionInput,
                              ]}
                              placeholder="Enter product description"
                              placeholderTextColor="#999"
                              value={description}
                              onChangeText={setDescription}
                              multiline={true}
                              numberofLines={4}

                            />

                            {/* CATEGORY */}

                            <Text style={styles.label}>
                                Category
                            </Text>

                            <TextInput
                              style={styles.input}
                              placeholder="e.g Clothing"
                              placeholderTextColor="#999"
                              value={category}
                              onChangeText={setCategory}
                            />

                            {/* PRICE */}

                            <Text style={styles.label}>
                                Price
                            </Text>

                            <View style={styles.priceContainer}>
                                
                                <Text style={styles.currency}>
                                    R
                                </Text>

                                <TextInput
                                  style={styles.priceInput}
                                  placeholder="0.00"
                                  placeholderTextColor="#999"
                                  value={price}
                                  onChangeText={setPrice}
                                  keyboardType="decimal-pad"
                                />

                            </View>

                            {/* ERROR MESSAGE */}

                            {error !== '' && (

                                <View style={styles.eerorBox}>

                                    <Text style={styles.errorText}>
                                        {error}
                                    </Text>

                                </View>    
                            
                            )} 

                            {/* ADD BUTTON */}

                            <TouchableOpacity
                              style={styles.addButton}
                              onPress={addProduct}
                              ActiveOpacity={0.8}
                            >
                                <Text style={styles.addButtonText}>
                                    + Add Product
                                </Text>

                            </TouchableOpacity>     

                        </View>

                        {/* PRODUCT LIST TITLE */}

                        <View style={styles.listHeader}>

                            <Text style={styles.listTitle}>
                                Products
                            </Text>

                            <View style={styles.countBadge}>
                                
                                <Text styles={styles.countText}>
                                    {products.length}
                                </Text>

                            </View> 

                        </View>

                        {/* EMPTY MESSAGE */}

                        {products.length === 0 && (

                            <View style={styles.noProductsBox}>

                                <Text style={styles.noProductionIcon}>
                                    📦
                                </Text>

                                <Text style={styles.noProductsTitle}>
                                    No products added yet
                                </Text>

                                <Text style={styles.noProductsText}>
                                    Add your first product using the form above.
                                </Text>

                            </View> 

                        )}

                    </View>

                
                  }

                  ListFooterComponent={
                    products.length > 0
                    ? <View style={styles.bottomSpace} />
                    : null
                  }

                />

            </KeyboardAvoidingView>    

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F7F6',
    },

    keyboardContainer: {
        flex: 1
    },

    // HEADER

    header: {
        backgroundColor: '#0B7A53',
        paddingHorizonatal: 22,
        paddingTop: 20,
        paddingBottom: 22,

        borderBottomLefgRadius: 24,
        borderBottomRightRaddius: 24,
    },

    headerTitle: {
        color: '#ffffff',
        fontSize: 27,
        fontWeight: 'bold',
    },

    headersubtitle: {
        color: '#D8F#E8',
        fontSize: 14,
        marginTop: 5,
    },

    // FORM

    formCard: {
        backgroundColor: '#FFFFFF',
        margin: 16,
        padding: 20,
        borderRadius: 18,
    

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },  
    
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 3,
    },
    
    sectionTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#222222',
    },

    sectionDescription: {
        color: '#777777',
        fontSize: 14,
        marginTop: 5,
        marginBotom: 7,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 7,
        marginTop: 10,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D8DEDB',
        borderRadius: 11,
        paddingHorizonatal: 14,
        fontSize: 15,
        color: '#222222',
        backgroundColor: '#FAFBFA',
    },

    descriptionInput: {
        height: 90,
        textAlignVertical: 'top',
        padding: 13,
    },

    // PRICE

    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 11,

        backgroundColor: '#FAFBFA',
    },

    currency: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0B7A53',
        paddingLeft: 14,
    },

    priceInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#222222',
    },

    // ERROR 
    errorBox: {
        backgroundColor: '#FFF0F0',
        borderRadius: 10,
        padding: 12,
        marginTop: 15,
    },

    errorText: {
        color: '#B42318',
        fontSize: 13,
    },

    // BUTTON 

    addButton: {
        backgroundColor: '#0B7A53',
        height: 52,
        borderRadius: 12,

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 20,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // PRODUCT LIST

    listContainer: {
        paddingBottom: 30,
    },

    emptyContainer: {
        paddingBottom: 30,
    },

    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',

        marginHorizontal: 18,
        marginTop: 3,
        marginBottom: 12,
    },

    listTitle: {
        fontSize: 21,
        fontweight: 'bold',
        color: '#222222',
    },

    countBadge: {
        marginLeft: 10,

        minWidth: 28,
        height: 28,

        borderRadius: 14, 

        backgroundColor: '#DFF4EA',

        alignItems: 'center',
        justifyContent: 'center',
    },

    countText: {
        color: '#0B7A53',
        fontWeight: 'bold',
    },

    // NO PRODUCTS

    noProductBox: {
        backgroundColor: '#FFFFFF',

        marginHorizontal: 16,

        paddingVertical: 30,
        paddingHorizontal: 20,

        borderRadius: 16,

        alignItems: 'center',
    },

    noProductsIcon: {
        fontSize: 40,
        marginBottom: 10,
    },

    noProductsTitle: {
        fontSize: 17,
        fontweight: 'bold',
        color: '#333333',
    },

    noProductionsText: {
        textAlign: 'center',
        color: '#777777',
        fontSize: 14,
        marginTop: 7,
        lineHeight: 20,
    },

    bottomSpace: {
        height: 20,
    },
});
