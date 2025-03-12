import {ChatMessage, ChatRoom} from '@/types';
import {axiosInstance} from '@/utils';

export type RequestCreateChatRoom = {
  title: string;
};
export type ResponseChatRoom = ChatRoom;

export const createChatRoom = async (
  body: RequestCreateChatRoom,
): Promise<ResponseChatRoom> => {
  const {data} = await axiosInstance.post('/chat/chat-room', body);
  return data.data;
};

export const getChatRoomsWithPagination = async (
  page = 1,
): Promise<ResponseChatRoom[]> => {
  const {data} = await axiosInstance.get(`/chat/chat-rooms?page=${page}`);

  return data.data.content;
};

export type ResponseChatMessage = ChatMessage;

export interface ChatMessagesResponse {
  content: ResponseChatMessage[];
  hasNext: boolean;
  totalPages: number;
}

export const getChatMessagesWithPagination = async (
  chatRoomId: number,
  page = 1,
): Promise<ChatMessagesResponse> => {
  const {data} = await axiosInstance.get(
    `/chat/${chatRoomId}/messages?page=${page}`,
  );

  return data.data;
};
