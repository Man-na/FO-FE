type MarkerColor = 'RED' | 'YELLOW' | 'GREEN' | 'BLUE' | 'PURPLE';

type Category = {
  [key in MarkerColor]: string;
};

interface ImageUri {
  id?: number;
  uri: string;
}
interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

type PostVoteOption = VoteOption & {userVotes: {userId: number}[]};

interface PostVote {
  id: number;
  title: string;
  options: PostVoteOption[];
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
}

interface PostComment extends Comment {
  replies: Comment[];
}

interface Post extends Marker {
  id: number;
  userId: number;
  title: string;
  description: string;
  address: string;
  date: Date | string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: {userId: number}[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: PostComment[];
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
