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
import { useNavigation } from '@react-navigation/native';

export default function Dashboard(props) {
    const dispatch = useDispatch();
    const { characters, isLoading } = useSelector(state => state.characters);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(itemsDispatcher.getCharacters());
    }, [navigation.isFocused]);


    return (
        <View style={styles.screen}>
            <Loader loading={isLoading}>
                <FlatList
                    numColumns={2}
                    data={characters}
                    renderItem={(p) => <CharacterCard
                        {...p}
                    />}
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
    }
});

