import {useCreateChatRoom} from '@/services/chat';
import React, {useCallback, useState} from 'react';
import {Button, Modal, StyleSheet, TextInput, View} from 'react-native';

interface CreateRoomModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddChatRoomModal: React.FC<CreateRoomModalProps> = ({
  visible,
  onClose,
}) => {
  const [roomName, setRoomName] = useState('');
  const createChatRoom = useCreateChatRoom();

  const handleSubmit = useCallback(() => {
    createChatRoom.mutate({title: roomName}, {onSuccess: () => onClose()});
  }, [createChatRoom, roomName, onClose]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            value={roomName}
            onChangeText={setRoomName}
            placeholder="채팅방 이름을 입력하세요"
          />
          <Button title="만들기" onPress={handleSubmit} />
          <Button title="취소" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
