/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */


import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import CharacterCard from '../components/CharacterCard';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Detail(props) {
    const item = props?.route?.params?.item;
    const { characters } = useSelector(state => state.characters);

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <>
                    <Image source={{ uri: item?.img }} style={styles.backImage} />
                    <LinearGradient colors={['#rgba(0, 0, 0, 0.3)', '#rgba(0, 0, 0, 0.7)', "rgba(0, 0, 0, 1)"]} style={styles.linearGradient} />
                    <View style={styles.intro}>
                        <View style={styles.image}>
                            <Image source={{ uri: item?.img }} style={{ width: 156, height: 195 }} />
                        </View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.nickname}>{item.nickname}</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </View>
                    <View style={{ padding: 24 }}>
                        <View style={styles.potrayedContainer}>
                            <View>
                                <Text style={styles.title1}>Potrayed</Text>
                                <Text style={styles.value}>{item.portrayed}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.value}>{moment(item.birthday, "DD-MM-YYYY").format("DD-MMMM-YYYY")}</Text>
                                <Icon size={14} name="gift" color={colors.textPrimary} style={{ marginLeft: 10 }} />
                            </View>
                        </View>
                        {!!item?.occupation?.length && <View style={styles.potrayedContainer}>
                            <View>
                                <Text style={styles.title1}>Occupation</Text>
                                {item?.occupation?.map((o) => <Text key={o} style={styles.value}>{o}</Text>)}
                            </View>
                        </View>}
                        {!!item?.appearance?.length && <View style={styles.potrayedContainer}>
                            <View>
                                <Text style={styles.title1}>Appeared in</Text>
                                <ScrollView horizontal contentContainerStyle={{ marginLeft: -6 }}>
                                    {item?.appearance?.map((o) => (
                                        <View key={o} style={styles.appearanceBox}>
                                            <Text style={styles.value}>Season {o}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>}
                        {<View style={styles.potrayedContainer}>
                            <View>
                                <Text style={styles.otherTitle}>Other characters</Text>
                                <FlatList
                                    horizontal
                                    data={characters?.filter(a => a.char_id !== item.char_id)}
                                    renderItem={(p) => <CharacterCard
                                        {...p}
                                        hideFavorite
                                    />}
                                    keyExtractor={item => item.char_id}
                                />
                            </View>
                        </View>}
                    </View>
                </>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.black,
    },
    backImage: { position: "absolute", width: windowWidth, height: windowHeight - 150, resizeMode: "cover" },
    linearGradient: { flex: 1, position: "absolute", width: windowWidth, height: windowHeight - 150, },
    intro: { alignItems: 'center', justifyContent: "center", marginTop: 166 },
    image: { height: 195, width: 156, borderRadius: 5, overflow: 'hidden' },
    name: {
        marginTop: 26,
        fontSize: 31,
        fontFamily: "Roboto-Bold",
        color: colors.textPrimary
    },
    otherTitle: {
        marginTop: 60,
        fontSize: 23,
        fontFamily: "Roboto-Bold",
        color: colors.textPrimary
    },
    nickname: {
        fontSize: 14,
        fontFamily: "Roboto-Light",
        color: colors.textPrimary
    },
    status: {
        fontSize: 14,
        fontFamily: "Roboto-Bold",
        color: colors.danger
    },
    potrayedContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 15,
    },
    title1: {
        color: colors.secondary,
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        marginVertical: 3
    },
    value: {
        color: colors.textPrimary,
        fontFamily: "Roboto-Light",
        fontSize: 14
    },
    appearanceBox: {
        backgroundColor: colors.appearance,
        paddingVertical: 5,
        paddingHorizontal: 16,
        margin: 6,
        borderRadius: 3
    }
});
