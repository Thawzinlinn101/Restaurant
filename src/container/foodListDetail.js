import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { height, SPACING, width } from '../config/theme';
import { CELL_WIDTH } from './foodList';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';

const DURATION = 400;
const animation = {
    0: { opacity: 0, translateY: 100 },
    1: { opacity: 1, translateY: 0 },
};
const createAnimation = (from) => ({
    0: { opacity: 0, translateY: -100, translateX: from },
    1: { opacity: 1, translateY: 0, translateX: 0 },
});
const animations = [
    createAnimation(100),
    createAnimation(0),
    createAnimation(-100),
];

export default function foodListDetail({ navigation, route }) {
    const { item } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject]}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color },]} />
                <AntDesign
                    name='close'
                    size={28}
                    style={{ padding: SPACING, position: 'absolute', top: SPACING * 0.2, right: SPACING * 0.2, zIndex: 2, }}
                    color={'#333'}
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            </SharedElement>
            <SharedElement id={`item.${item.key}.meta`}>
                <View style={{ position: "absolute", top: SPACING, left: SPACING * 2 }}>
                    <Text style={styles.type}>{item.type}</Text>
                    <Text style={styles.subType}>{item.subType}</Text>
                </View>
            </SharedElement>
            <View style={{ marginTop: height * 0.1 }}>
                <SharedElement id={`item.${item.key}.image`}>
                    <Image source={item.image} style={styles.image} />
                </SharedElement>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: SPACING * 3, }}>
                    {item.subcategories.map((subCategory, index) => {
                        return (
                            <Animatable.View
                                useNativeDriver
                                animation={animations[index]}
                                delay={DURATION}
                                key={subCategory.key}
                                style={{ backgroundColor: `${item.fullColor}99`, padding: SPACING, borderRadius: 50, }}
                            >
                                <Image source={subCategory.image} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
                            </Animatable.View>
                        );
                    })}
                </View>
            </View>
            <View style={{ padding: SPACING }}>
                <Animatable.Text
                    useNativeDriver
                    animation={animation}
                    delay={DURATION + 300}
                    style={{ fontSize: 32, fontWeight: '700', marginBottom: SPACING / 2, color: 'black', }}>
                    {item.price}
                </Animatable.Text>
                <Animatable.Text
                    useNativeDriver
                    animation={animation}
                    delay={DURATION + 400}
                    style={{ fontSize: 14, lineHeight: 20, color: "rgba(0,0,0,0.7)" }}>
                    {item.description}
                </Animatable.Text>
            </View>
        </SafeAreaView>
    );
}

foodListDetail.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.key}.bg`,
        },
        {
            id: `item.${item.key}.meta`,
        },
        {
            id: `item.${item.key}.image`,
        },
    ];
};

const styles = StyleSheet.create({
    type: {
        fontWeight: '800',
        fontSize: 22,
        color: 'black',
    },
    subType: {
        fontSize: 12,
        opacity: 0.8,
        color: 'black',
    },
    image: {
        zIndex: 2,
        width: CELL_WIDTH * 0.9,
        height: CELL_WIDTH * 0.9,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginVertical: SPACING * 4,
    },
});