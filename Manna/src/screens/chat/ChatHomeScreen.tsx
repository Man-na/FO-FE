import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AddChatRoomModal} from '@/components/chat';
import {chatNavigations, colors} from '@/constants';
import {ChatStackParamList} from '@/navigation/stack/ChatStackNavigator';
import {useGetInfiniteChatRooms} from '@/services/chat';
import {Meeting} from '../home';

type Navigation = StackNavigationProp<ChatStackParamList>;

const MeetingCard = ({
  meeting,
  index,
  onPress,
}: {
  meeting: Meeting;
  index: number;
  onPress: (id: number) => void;
}) => (
  <TouchableOpacity
    style={styles.meetingCard}
    onPress={() => onPress(meeting.id)}>
    <View style={styles.meetingImageContainer}>
      <View style={styles.placeholderImage}>
        <Text style={styles.placeholderText}>{meeting.date}</Text>
        <Text style={styles.placeholderText}>{meeting.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PersonalMessageItem = ({
  item,
  index,
  onPress,
}: {
  item: any;
  index: number;
  onPress: (id: number) => void;
}) => (
  <TouchableOpacity
    style={styles.personalMessageItem}
    onPress={() => onPress(item.id)}>
    <View style={styles.messageImageContainer}>
      <View style={styles.placeholderImage}>
        <Text style={styles.placeholderText}>img</Text>
      </View>
    </View>
    <View style={styles.messageContent}>
      <Text style={styles.messageSender}>닉네임</Text>
      <Text style={styles.messagePreview}>메세지 메세지 메세지 메세지</Text>
    </View>
    {index === 0 && (
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationText}>1</Text>
      </View>
    )}
  </TouchableOpacity>
);

export const ChatHomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<Navigation>();
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  const {data: chatRooms} = useGetInfiniteChatRooms();

  // Use the provided meeting data
  const meetingsData: Meeting[] = [
    {
      id: 1,
      date: '2025.03.02(일)',
      location: '강남',
      status: '자동매칭',
      participants: {
        males: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: true},
          {id: 4, active: false},
        ],
        females: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: false},
          {id: 4, active: false},
        ],
      },
      mood: '다 같이 미친듯이 놀자! 🎮🔥',
      timeRemaining: '1일 12시간 05분',
    },
    {
      id: 2,
      date: '2025.03.10(월)',
      location: '홍대',
      status: '나의매칭',
      participants: {
        males: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: false},
          {id: 4, active: false},
        ],
        females: [
          {id: 1, active: true},
          {id: 2, active: true},
          {id: 3, active: true},
          {id: 4, active: false},
        ],
      },
      mood: '술게임은 적당히, 대화 위주로! 🍷🗯️',
      timeRemaining: '2일 08시간 30분',
    },
  ];

  const handlePressRoom = (roomId: number) => {
    navigation.navigate(chatNavigations.CHAT_ROOM_SCREEN, {id: roomId});
  };

  const personalChatRooms = chatRooms?.pages.flat() || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>미팅메시지</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.meetingsScrollView}
          contentContainerStyle={styles.meetingsContainer}>
          {meetingsData.map((meeting, index) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              index={index}
              onPress={handlePressRoom}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>개인메시지</Text>
        <View style={styles.personalMessagesContainer}>
          {personalChatRooms.map((item, index) => (
            <PersonalMessageItem
              key={item.id}
              item={item}
              index={index}
              onPress={handlePressRoom}
            />
          ))}
        </View>
      </View>

      <AddChatRoomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const {width} = Dimensions.get('window');
const cardWidth = width * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.WHITE,
  },
  meetingsScrollView: {
    backgroundColor: colors.PINK_200,
    paddingVertical: 16,
  },
  meetingsContainer: {
    paddingHorizontal: 12,
  },
  meetingCard: {
    width: cardWidth,
    marginHorizontal: 4,
    alignItems: 'center',
    position: 'relative',
  },
  meetingImageContainer: {
    position: 'relative',
  },
  placeholderImage: {
    width: cardWidth - 10,
    height: cardWidth - 10,
    borderRadius: (cardWidth - 10) / 2,
    backgroundColor: colors.GRAY_200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_500,
    gap: 4,
  },
  placeholderText: {
    color: colors.GRAY_500,
    fontSize: 16,
  },
  notificationBadge: {
    position: 'absolute',
    top: 44,
    right: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: colors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  personalMessagesContainer: {
    backgroundColor: colors.PINK_200,
    paddingVertical: 8,
  },
  personalMessageItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    position: 'relative',
  },
  messageImageContainer: {
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  createButton: {
    backgroundColor: colors.BLUE_500,
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  createButtonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});
