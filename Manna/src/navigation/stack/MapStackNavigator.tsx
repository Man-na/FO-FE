import {mapNavigations} from '@/constants';
import {AddMarkerScreen} from '@/screens/map/AddMarkerScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {MarkerDetailScreen} from '@/screens/marker/MarkerDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LatLng} from 'react-native-maps';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_MARKER]: {location: LatLng};
  [mapNavigations.MARKER_DETAIL]: {id: number};
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.ADD_MARKER}
        component={AddMarkerScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
      <Stack.Screen
        name={mapNavigations.MARKER_DETAIL}
        component={MarkerDetailScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
