import {colors} from '@/constants';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';

interface AvatarItemProps extends PressableProps {
  uri: string;
  isSelected: boolean;
}

export const AvatarItem = ({uri, isSelected, ...props}: AvatarItemProps) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  return (
    <Pressable
      {...props}
      style={[styles.container, isSelected && styles.selectedContainer]}>
      <View style={styles.imageContainer}>
        {loading && !error && (
          <ActivityIndicator size="small" color={colors.GRAY_500} />
        )}
        <Image
          source={{uri}}
          style={styles.image}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={e => {
            setLoading(false);
            setError(true);
            console.log(`Failed to load image: ${uri}`, e.nativeEvent.error);
          }}
        />
        {error && (
          <View style={styles.errorContainer}>
            <Image
              source={require('@/assets/default-avatar.png')}
              style={styles.image}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: Dimensions.get('window').width / 3 - 15,
    height: Dimensions.get('window').width / 3 - 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.GRAY_200,
  },
  selectedContainer: {
    borderColor: colors.PINK_500,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GRAY_100,
  },
});
