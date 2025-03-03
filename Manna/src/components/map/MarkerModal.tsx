import {CustomMarker} from '@/components/common/CustomMarker';
import {
  colors,
  feedNavigations,
  mainNavigations,
  mapNavigations,
} from '@/constants';
import {MapStackParamList} from '@/navigation/stack/MapStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useGetMarker} from '@/services/marker';
import {getDateWithSeparator} from '@/utils';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Octicons from '@react-native-vector-icons/octicons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  StackNavigationProp<MapStackParamList>
>;

export const MarkerModal = ({
  markerId,
  isVisible,
  hide,
}: MarkerModalProps): React.JSX.Element => {
  const navigation = useNavigation<Navigation>();
  const {data: marker, isPending, isError} = useGetMarker(markerId);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate(mainNavigations.HOME, {
      screen: mapNavigations.MARKER_DETAIL,
      params: {
        id: marker.id,
      },
      initial: false,
    });
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {marker.images.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{uri: marker.images[0]?.uri}}
                    resizeMode="cover"
                  />
                </View>
              )}
              {marker.images.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <CustomMarker color={marker.color} score={marker.score} />
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={10} color={colors.GRAY_500} />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.addressText}>
                    {marker.address}
                  </Text>
                </View>
                <Text style={styles.titleText}>{marker.title}</Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(marker.date, '.')}
                </Text>
              </View>
            </View>

            <View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color={colors.BLACK}
              />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 20,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    elevation: 1,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GRAY_200,
    borderRadius: 35,
    borderWidth: 1,
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
});
