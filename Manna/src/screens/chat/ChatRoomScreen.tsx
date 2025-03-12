import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {useWebSocket} from '@/context/WebSocketContext';
import {useGetInfiniteChatMessages} from '@/services/chat/queries/useGetInfiniteChatMessages';
import {useAuth} from '@/services/auth';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@/navigation/stack/ChatStackNavigator';
import {useQueryClient} from '@tanstack/react-query';
import {queryKeys} from '@/constants';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

interface GiftedMessage extends IMessage {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
  };
}

type ChatRoomScreenProps = StackScreenProps<ChatStackParamList>;

export const ChatRoomScreen = ({
  route,
}: ChatRoomScreenProps): React.JSX.Element => {
  const {id} = route.params ?? {id: 0};
  const {ws} = useWebSocket();
  const [messages, setMessages] = useState<GiftedMessage[]>([]);
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useGetInfiniteChatMessages(id);
  const {getProfileQuery} = useAuth();
  const currentUserId = getProfileQuery.data?.id;

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.CHAT, queryKeys.GET_CHAT_MESSAGES, id.toString()],
    });
    setMessages([]);
    refetch();
  }, [id, queryClient, refetch]);

  useEffect(() => {
    if (data) {
      console.log('데이터 업데이트:', data.pages[0].content);
      const allMessages = data.pages[0].content.map(msg => ({
        _id: msg.id,
        text: msg.content,
        createdAt: new Date(msg.timestamp || new Date().toISOString()),
        user: {
          _id: msg.senderId,
        },
      }));
      setMessages(prevMessages => {
        const combinedMessages = [
          ...allMessages,
          ...prevMessages.filter(
            pm => !allMessages.some(m => m._id === pm._id),
          ),
        ];
        return combinedMessages.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
      });
    }
  }, [data]);

  useEffect(() => {
    if (!ws) {
      console.log('ChatScreen에서 ws 상태: 연결 없음');
      return;
    }

    ws.onmessage = (event: WebSocketMessageEvent) => {
      const response = JSON.parse(event.data);
      const newMessage: GiftedMessage = {
        _id: response.id,
        text: response.content,
        createdAt: new Date(response.timestamp || new Date().toISOString()),
        user: {
          _id: response.senderId,
        },
      };
      setMessages(prevMessages => {
        if (prevMessages.some(msg => msg._id === newMessage._id)) {
          return prevMessages;
        }
        return [newMessage, ...prevMessages];
      });
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws]);

  const onSend = useCallback(
    (newMessages: GiftedMessage[] = []) => {
      if (!ws) {
        console.error('WebSocket 객체가 없습니다.');
        return;
      }
      if (ws.readyState === WebSocket.OPEN) {
        const messageToSend = {
          chatRoomId: id,
          senderId: currentUserId,
          content: newMessages[0].text,
          timestamp: new Date().toISOString(),
        };
        ws.send(JSON.stringify(messageToSend));
      } else {
        console.error('WebSocket이 연결되지 않았습니다. 상태:', ws.readyState);
      }
    },
    [ws, id, currentUserId],
  );

  const loadEarlierMessages = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log('fetchNextPage 호출: 다음 페이지 요청');
      fetchNextPage();
    } else {
      console.log(
        'fetchNextPage 호출 안 함: hasNextPage=',
        hasNextPage,
        'isFetchingNextPage=',
        isFetchingNextPage,
      );
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <GiftedChat
          messages={messages}
          onSend={newMessages => onSend(newMessages)}
          user={{
            _id: currentUserId!,
          }}
          placeholder="메시지를 입력하세요"
          loadEarlier={hasNextPage}
          onLoadEarlier={loadEarlierMessages}
          isLoadingEarlier={isFetchingNextPage}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
