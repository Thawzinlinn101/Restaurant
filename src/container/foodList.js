import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tabs, ORANGE, popularFood, food } from '../config/data/food';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SPACING, width } from '../config/theme';
import { SharedElement } from 'react-navigation-shared-element';

export const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;
const FULL_SIZE = CELL_WIDTH + SPACING * 2;

export default function foodList({ navigation }) {
    const [selectedTab, setSelectedTab] = React.useState(tabs[0]);

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={tabs}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={{ padding: SPACING }}
                    renderItem={({ item: tab }) => {
                        return (
                            <TouchableOpacity onPress={() => setSelectedTab(tab)}>
                                <View style={[
                                    styles.pill,
                                    {
                                        backgroundColor: selectedTab === tab ? ORANGE : 'transparent'
                                    }
                                ]}>
                                    <Text style={[
                                        styles.pillText,
                                        {
                                            color: selectedTab === tab ? 'white' : '#000'
                                        }
                                    ]}>{tab || null}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                <FlatList
                    data={food}
                    keyExtractor={item => item.key}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={FULL_SIZE}
                    decelerationRate='fast'
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('FoodListDetail', { item });
                            }}
                                style={{ width: CELL_WIDTH, height: CELL_HEIGHT, margin: SPACING }}>
                                <View style={{ flex: 1, padding: SPACING, justifyContent: 'center', }}>
                                    <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject]}>
                                        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 },]} />
                                    </SharedElement>
                                    <SharedElement id={`item.${item.key}.meta`} style={[StyleSheet.absoluteFillObject]}>
                                        <View style={{ position: "absolute", top: SPACING, left: SPACING }}>
                                            <Text style={styles.type}>{item.type}</Text>
                                            <Text style={styles.subType}>{item.subType}</Text>
                                        </View>
                                    </SharedElement>
                                    <SharedElement id={`item.${item.key}.image`} style={styles.image}>
                                        <Image source={item.image} style={styles.image} />
                                    </SharedElement>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <FlatList
                    data={popularFood}
                    keyExtractor={item => item.key}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                        return <View style={{ flexDirection: 'row', alignItems: 'center', padding: SPACING }}>
                            <Image source={item.image} style={styles.popularImage} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.popularType}>{item?.type || null}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign
                                        name="star"
                                        size={16}
                                        color={ORANGE}
                                        style={{ marginRight: SPACING / 2 }}
                                    />
                                    <Text style={{ fontWeight: '700', color: 'black' }}>{item?.rating || null}</Text>
                                </View>
                            </View>
                            <Text style={styles.popularPrice}>{item?.price || 0}</Text>
                        </View>
                    }}
                />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pill: {
        padding: SPACING,
        paddingVertical: SPACING / 2,
        borderRadius: 12,
    },
    pillText: {
        fontWeight: '700',
    },
    popularType: {
        fontWeight: '800',
        fontSize: 16,
        color: 'black',
    },
    popularImage: {
        width: 54,
        height: 54,
        resizeMode: 'contain',
        marginRight: SPACING,
    },
    popularPrice: {
        fontWeight: '800',
        color: 'black',
    },
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
        width: CELL_WIDTH * 0.7,
        height: CELL_WIDTH * 0.7,
        alignSelf: 'center',
        resizeMode: 'contain',
        position: 'absolute',
    },
});