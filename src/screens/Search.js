/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */


import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../utils/colors';
import { Creators as itemsDispatcher } from '../store/character';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import CharacterCard from '../components/CharacterCard';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { debounce } from "lodash";
import ListEmptyComponent from '../components/ListEmptyComponent';

export default function Search() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { serachData, isSearching } = useSelector(state => state.characters);
    const [searchQuery, setSearchQuery] = useState("");

    const changeTextDebounced = (text) => {
        dispatch(itemsDispatcher.searchCharacters(text));
    };
    const changeTextDebouncer = useCallback((t) => {
        setSearchQuery(t)
        debounce(changeTextDebounced, 1000)(t);
    }, []);


    useEffect(() => {
        dispatch(itemsDispatcher.searchCharacters(searchQuery));
    }, []);


    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Button style={{ marginHorizontal: 14, }} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color={colors.textPrimary} />
                </Button>
                <TextInput
                    cursorColor={colors.textPrimary}
                    placeholderTextColor={colors.textLightGrey}
                    placeholder='Search'
                    style={styles.input}
                    onChangeText={changeTextDebouncer}
                    value={searchQuery}
                />
                <Button disabled={!searchQuery} style={{ marginRight: 14 }} onPress={() => {
                    setSearchQuery("");
                    dispatch(itemsDispatcher.searchCharacters(""));
                }}>
                    <Icon name="x" size={20} color={colors.textPrimary} />
                </Button>
            </View>
            <Loader loading={isSearching}>
                <FlatList
                    ListEmptyComponent={ListEmptyComponent}
                    numColumns={2}
                    data={serachData}
                    renderItem={(p) => <CharacterCard {...p} />}
                    keyExtractor={item => item.char_id}
                />
            </Loader>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.black,
    },
    text: {
        fontFamily: "Roboto-Light"
    },
    header: {
        backgroundColor: colors.lightGrey,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        fontSize: 24,
        fontFamily: "Roboto-Light",
        color: colors.textLightGrey
    }
});