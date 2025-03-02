import {colors, feedNavigations, mainNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigation/stack/FeedStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {CalendarMarker} from '@/services/calendar';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface EventListProps {
  markers: CalendarMarker[];
}

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof mainNavigations.FEED>,
  StackNavigationProp<FeedStackParamList>
>;

export const EventList = ({markers}: EventListProps) => {
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();

  const handlePressItem = (id: number) => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedNavigations.FEED_DETAIL,
      params: {id},
    });
  };

  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{right: 1}}>
      <View style={[styles.innerContainer, {marginBottom: insets.bottom + 30}]}>
        {markers?.map(marker => (
          <Pressable
            key={marker.id}
            style={styles.itemContainer}
            onPress={() => handlePressItem(marker.id)}>
            <View style={styles.itemHeader} />
            <View style={styles.infoContainer}>
              <Text
                style={styles.addressText}
                numberOfLines={1}
                ellipsizeMode="tail">
                {marker.address}
              </Text>
              <Text style={styles.titleText}>{marker.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  innerContainer: {
    gap: 20,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemHeader: {
    backgroundColor: colors.PINK_700,
    width: 6,
    height: 50,
    marginRight: 8,
    borderRadius: 20,
  },
  infoContainer: {
    justifyContent: 'space-evenly',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
});
