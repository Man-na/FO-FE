import {ImageUri} from '@/types';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}

export const PreviewImageList = ({imageUris = []}: PreviewImageListProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {imageUris.map(({uri}, index) => {
        return (
          <View key={uri + index} style={styles.imageContainer}>
            <Image style={styles.image} source={{uri}} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
