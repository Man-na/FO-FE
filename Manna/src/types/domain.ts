type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

interface Post extends Marker {
  title: string;
  address: string;
  date: Date | string;
  description: string;
}

interface User {
  id: number;
  nickname: string;
  imageUri?: string;
}

interface Profile extends User {
  email: string;
  hatId: string;
  handId: string;
  skinId: string;
  topId: string;
  faceId: string;
  bottomId: string;
  background: string;
}

export type {MarkerColor, Category, ImageUri, Marker, Post, Profile};
