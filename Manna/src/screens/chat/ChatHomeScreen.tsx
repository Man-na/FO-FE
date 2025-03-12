import {AddChatRoomModal} from '@/components/chat/AddChatRoomModal';
import {chatNavigations} from '@/constants';
import {ChatStackParamList} from '@/navigation/stack/ChatStackNavigator';
import {useGetInfiniteChatRooms} from '@/services/chat/queries/useGetInfiniteChatRooms';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Navigation = StackNavigationProp<ChatStackParamList>;

export const ChatHomeScreen: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Navigation>();
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const {
    data: chatRooms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteChatRooms();

  const handlePressRoom = (roomId: number) => {
    navigation.navigate(chatNavigations.CHAT_ROOM_SCREEN, {id: roomId});
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms?.pages.flat()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePressRoom(item.id)}>
            <View style={styles.roomItem}>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => String(item.id)}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.createButtonText}>채팅방 만들기</Text>
      </TouchableOpacity>

      <AddChatRoomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  roomItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
