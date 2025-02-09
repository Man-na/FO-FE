import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        let {latitude, longitude} = info.coords;
        if (__DEV__ && longitude < 0) {
          latitude = 37.5516032365118;
          longitude = 126.98989626020192;
        }
        setUserLocation({latitude, longitude});
        setIsUserLocationError(false);
      },
      error => {
        console.error(error);
        setIsUserLocationError(true);
      },
      {enableHighAccuracy: true},
    );
  }, []);

  return {userLocation, isUserLocationError};
};
