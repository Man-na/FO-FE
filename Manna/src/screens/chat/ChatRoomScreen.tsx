import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {useWebSocket} from '@/context/WebSocketContext';

interface Message {
  id: number;
  text: string;
}

export const ChatRoomScreen: React.FC = () => {
  const {ws} = useWebSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const flatListRef = useRef<FlatList<Message> | null>(null);

  useEffect(() => {
    if (!ws) {
      console.log('ChatScreen에서 ws 상태: 연결 없음');
      return;
    }

    ws.onmessage = (event: WebSocketMessageEvent) => {
      const response = JSON.parse(event.data);
      const newMessage: Message = {
        id: Date.now(),
        text: response.message,
      };
      console.log(newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      flatListRef.current?.scrollToEnd({animated: true});
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws]);

  const sendMessage = () => {
    if (!ws) {
      console.error('WebSocket 객체가 없습니다.');
      return;
    }
    if (inputText.trim() && ws.readyState === WebSocket.OPEN) {
      const message: Message = {id: Date.now(), text: inputText};
      ws.send(JSON.stringify(message));
      setMessages(prevMessages => [...prevMessages, message]);
      setInputText('');
      flatListRef.current?.scrollToEnd({animated: true});
    } else {
      console.error('WebSocket이 연결되지 않았습니다. 상태:', ws.readyState);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList<Message>
          ref={flatListRef}
          data={messages}
          renderItem={({item}) => (
            <View style={styles.messageBubble}>
              <Text>{item.text}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지를 입력하세요"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageBubble: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
  },
});
