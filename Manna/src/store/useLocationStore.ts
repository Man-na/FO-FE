import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

export const useLocationStore = create<LocationState>(set => ({
  moveLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set({moveLocation});
  },
}));
