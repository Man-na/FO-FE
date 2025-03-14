import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';
import Config from 'react-native-config';

export const useGetAddress = (location: LatLng) => {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const apiKey = Config.GOOGLE_MAPS_API_KEY;

        const {data} = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&result_type=street_address|route|political&language=ko`,
        );

        const address = data.results.length
          ? data.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return result;
};
