import {ImageUri} from '@/types';
import React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}

export const PreviewImageList = ({
  imageUris,
}: PreviewImageListProps): React.JSX.Element => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => {
          return (
            <Pressable style={styles.imageContainer}>
              <Image
                key={index}
                resizeMode="cover"
                source={{
                  uri: `http://localhost:9000/${uri}`,
                }}
                style={styles.image}
              />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
    width: 70,
    height: 70,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
