import {AddChatRoomModal} from '@/components/chat/AddChatRoomModal';
import {chatNavigations} from '@/constants';
import {ChatStackParamList} from '@/navigation/stack/ChatStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ChatRoom {
  id: string;
  name: string;
}

type Navigation = StackNavigationProp<ChatStackParamList>;

export const ChatHomeScreen: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Navigation>();

  const handleCreateRoom = (roomName: string) => {
    const newRoom: ChatRoom = {
      id: Date.now().toString(),
      name: roomName,
    };
    setRooms(prevRooms => [...prevRooms, newRoom]);
  };

  const handlePressRoom = (roomId: string) => {
    navigation.navigate(chatNavigations.CHAT_ROOM_SCREEN, {id: roomId});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePressRoom(item.id)}>
            <View style={styles.roomItem}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.createButtonText}>채팅방 만들기</Text>
      </TouchableOpacity>

      <AddChatRoomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateRoom}
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
