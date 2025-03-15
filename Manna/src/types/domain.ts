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
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  images?: ImageUri[];
  date: Date | string;
  color: MarkerColor;
  score: number;
}

interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

type FeedVoteOption = VoteOption & {userVotes: {userId: number}[]};

interface FeedVote {
  id: number;
  title: string;
  options: FeedVoteOption[];
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
}

interface feedComment extends Comment {
  replies: Comment[];
}

interface Feed {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: {userId: number}[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: FeedVote[];
  comments?: feedComment[];
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

interface ChatRoom {
  id: number;
  title: string;
}

interface ChatMessage {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
}

interface RapidMatching {
  id: number;
  user: {id: number};
  priority1Day: string;
  priority2Day: string;
  agePreference: string;
  status: 'PENDING' | 'MATCHED' | 'CANCELED';
}

export type {
  MarkerColor,
  Category,
  ImageUri,
  Marker,
  Feed,
  VoteOption,
  Profile,
  Comment,
  ChatRoom,
  ChatMessage,
  RapidMatching,
};
