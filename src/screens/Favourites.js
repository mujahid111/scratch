/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */


import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors';
import { Creators as itemsDispatcher } from '../store/character';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import CharacterCard from '../components/CharacterCard';

function ListEmptyComponent() {
    return (
        <View style={styles.emptyScreen}>
            <Text style={styles.title}>No favourites character found</Text>
        </View>
    )
};

export default function Favourites() {
    const dispatch = useDispatch();
    const { favourites } = useSelector(state => state.characters);


    return (
        <View style={styles.screen}>
            <Loader>
                <FlatList
                    numColumns={2}
                    data={favourites}
                    ListEmptyComponent={ListEmptyComponent}
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
    emptyScreen: {
        marginTop: 52,
        justifyContent: 'center',
        alignItems: "center"
    },
    title: {
        fontFamily: "Roboto-Thin",
        fontSize: 24,
        color: colors.secondary,
    },
    subtitle: {
        fontFamily: "Roboto-Thin",
        fontSize: 24,
        color: colors.textLightGrey,
    }
});

