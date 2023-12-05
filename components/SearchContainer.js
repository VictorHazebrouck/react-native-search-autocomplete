import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';


const SearchContainer = ({ onInputChange, onResultSelection, minChar = 3, maxResults, placeholder, debounceTimer = 200, inputStyle = {}, resultsStyle = {}, }) => {
    if (!inputStyle.height) inputStyle.height = 50
    const styles = mergeStyles(defaultStyles, inputStyle, resultsStyle)
    const [input, setInput] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [list, setList] = useState([])


    //on Input change, send Input value to parent if no change for 'debounceTimer' ms, receive computed values. 
    //map over items provided by parent to save data within components,
    //and display only their values from "searchName" key in suggestions.
    useEffect(() => {
        if (input.length === 0) setIsVisible(false)
        if (input.length < minChar) { setList([]); setIsVisible(false); return }

        const timeoutId = setTimeout(async () => {
            const data = await onInputChange(input)
            const results = data.map((e, i) => {
                return (
                    <TouchableOpacity onPress={() => handleClick(e)} style={styles.results} key={i}>
                        <Text style={{ fontSize: 25 }}>{e._searchName}</Text>
                    </TouchableOpacity>)
            })
            setList(results)
            setIsVisible(true)
        }, debounceTimer);

        return () => clearTimeout(timeoutId)
    }, [input])

    //on Click on a suggestion item, send data specific to this element back to parent, reset stuff. 
    const handleClick = (data) => {
        setInput('')
        setIsVisible(false)
        onResultSelection(data)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, { height: inputStyle.height }]}>
                <TextInput
                    style={[styles.input, { height: inputStyle.height }]}
                    placeholder={placeholder}
                    onChangeText={(value) => setInput(value)}
                    value={input}
                />
                <FontAwesome name={isVisible ? "chevron-up" : "chevron-down"} size={20} color='gray' onPress={() => setIsVisible(!isVisible)} />
            </View>
            <View style={styles.resultsContainer}>
                {isVisible && list}
            </View>
        </View>
    );
};

const mergeStyles = (baseStyles, inputStyle, resultsStyle) => {
    const mergedStyles = { ...baseStyles };
    if (inputStyle) mergedStyles.inputContainer = { ...baseStyles.inputContainer, ...inputStyle };
    if (resultsStyle) mergedStyles.results = { ...baseStyles.results, ...resultsStyle };
    return StyleSheet.create(mergedStyles)
};

const defaultStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        zIndex: 2,
        width: '100%'
    },
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 15,
        paddingLeft: 15,
        borderRadius: 4,
        marginBottom: 3,
    },
    resultsContainer: {
        borderRadius: 4,
        overflow: "hidden",
    },
    input: {
        flex: 1,
    },
    results: {
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 20,
    }
});

export default SearchContainer;