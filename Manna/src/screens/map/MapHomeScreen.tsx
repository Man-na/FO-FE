import useAuth from '@/service/auth/queries/useAuth';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

function MapHomeScreen(): React.JSX.Element {
  const {logoutMutation} = useAuth();
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={true}
      />
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapHomeScreen;
