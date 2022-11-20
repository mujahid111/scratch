/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors';
import Button from './Button';
import Icon from 'react-native-vector-icons/Feather';
import IconF from 'react-native-vector-icons/FontAwesome';
import ProgressiveImage from './Image';
import { Creators as itemsDispatcher } from '../store/character';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function CharacterCard(props) {
    const dispatch = useDispatch();
    const { favourites } = useSelector(state => state.characters);
    const navigation = useNavigation();

    const toggleHandler = (item) => {
        if (!favourites.find(a => a.char_id === props.item.char_id)) {
            dispatch(itemsDispatcher.addFavourite(item))
        } else {
            dispatch(itemsDispatcher.removeFavourite(item))
        }
    };


    return (
        <View style={[{ flex: 1, margin: props.hideFavorite ? 10 : 15, maxWidth: props.hideFavorite ? 160 : '42%' }, props.hideFavorite ? { width: 160, flex: 0 } : {}]}>
            <Button activeOpacity={0.7} onPress={() => {
                navigation.navigate("Detail", { item: props.item })
            }}>
                <>
                    <ProgressiveImage
                        thumbnailSource={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}` }}
                        source={{ uri: props.item.img }} style={{ height: 195 }} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {props.item.name}
                        </Text>
                        {!props.hideFavorite && <Button onPress={() => toggleHandler(props.item)}>
                            {!favourites.find(a => a.char_id === props.item.char_id) ? <Icon
                                name="heart"
                                size={20} color={colors.lightGrey} />
                                : <IconF
                                    name="heart"
                                    size={20} color={colors.secondary} />}
                        </Button>}
                    </View>
                    <Text style={styles.subTitle}>
                        {props.item.nickname}
                    </Text>
                </>
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.black,
    },
    titleContainer: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "Roboto-Bold",
        color: colors.textPrimary
    },
    subTitle: {
        fontFamily: "Roboto-Light",
        color: colors.textPrimary
    }
});
