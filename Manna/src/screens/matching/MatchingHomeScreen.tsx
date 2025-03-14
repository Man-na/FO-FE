import {colors, matchingNavigations} from '@/constants';
import {MatchingStackParamList} from '@/navigation/stack/MatchingStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Navigation = StackNavigationProp<MatchingStackParamList>;

export const MatchingHomeScreen = () => {
  const navigation = useNavigation<Navigation>();
  const [friendModalVisible, setFriendModalVisible] = useState(false);

  const toggleFriendModal = () => {
    setFriendModalVisible(!friendModalVisible);
  };

  const closeModal = () => {
    setFriendModalVisible(false);
  };

  const handleLinkCopy = () => {
    console.log('링크 복사');
  };

  const navigateToRapidMatching = () => {
    navigation.navigate(matchingNavigations.RAPID_MATCHING);
  };

  const navigateToCustomMatching = () => {
    navigation.navigate(matchingNavigations.CUSTOM_MATCHING);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>팅팅 매칭</Text>
        </View>

        {/* 빠른 매칭 & 직접 매칭 섹션 */}
        <View style={styles.matchingOptions}>
          <View style={styles.matchingCard}>
            <Text style={styles.cardTitle}>빠른 매칭</Text>
            <Text style={styles.cardDescription}>
              미팅이 가능한 요일을 설정하면{'\n'}
              분위기에 상관없이{'\n'}
              가장 빠른 매칭을 할 수 있어요.
            </Text>
            <TouchableOpacity
              style={styles.matchingButton}
              onPress={navigateToRapidMatching}>
              <Text style={styles.matchingButtonText}>매칭진행</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.matchingCard}>
            <Text style={styles.cardTitle}>직접 매칭</Text>
            <Text style={styles.cardDescription}>
              날짜, 장소, 분위기를 설정하여{'\n'}
              직접 나에게 맞는 미팅을{'\n'}
              매칭할 수 있어요.
            </Text>
            <TouchableOpacity
              style={styles.matchingButton}
              onPress={navigateToCustomMatching}>
              <Text style={styles.matchingButtonText}>매칭진행</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 친구와 함께하기 버튼 */}
        <TouchableOpacity
          style={styles.friendsButton}
          onPress={toggleFriendModal}>
          <Text style={styles.friendsButtonText}>친구와 함께 하기</Text>
        </TouchableOpacity>

        {/* 이 달의 컨셉 팅팅 섹션 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>이 달의 컨셉 팅팅</Text>
        </View>

        <View style={styles.conceptContainer}>
          {/* 이미지나 컨텐츠가 들어갈 공간 */}
        </View>

        {/* 마감 임박 팅팅 섹션 */}
        <View style={styles.urgentSection}>
          <Text style={styles.urgentTitle}>❗❗ 마감 임박 팅팅 ❗❗</Text>

          <View style={styles.urgentCardsContainer}>
            <View style={styles.urgentCard}>
              <Text style={styles.dateText}>2025.04.15</Text>
              <Text style={styles.locationText}>장소</Text>
              <Text style={styles.participantsText}>남자 :N/4</Text>
            </View>

            <View style={styles.urgentCard}>
              <Text style={styles.dateText}>2025.04.15</Text>
              <Text style={styles.locationText}>장소</Text>
              <Text style={styles.participantsText}>남자 :N/4</Text>
            </View>

            <View style={styles.urgentCard}>
              <Text style={styles.dateText}>2025.04.15</Text>
              <Text style={styles.locationText}>장소</Text>
              <Text style={styles.participantsText}>남자 :N/4</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 친구와 함께하기 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={friendModalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  초대하고 싶은 팅팅의 링크를 친구에게 전달해주세요 :)
                </Text>

                <View style={styles.meetingCardContainer}>
                  {[1, 2, 3].map((item, index) => (
                    <View key={index} style={styles.meetingCard}>
                      <View style={styles.meetingCardLeft}>
                        <Text style={styles.meetingDate}>2025.xx.xx (금)</Text>
                        <View style={styles.locationPill}>
                          <Text style={styles.locationPillText}>장소</Text>
                        </View>
                        <Text style={styles.participantInfo}>
                          현재 매칭 인원 [남자N/4명] [여자 N/4명]
                        </Text>
                      </View>
                      <View style={styles.meetingCardRight}>
                        <View style={styles.autoMatchPill}>
                          <Text style={styles.autoMatchText}>자동매칭</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.copyLinkButton}
                          onPress={handleLinkCopy}>
                          <Text style={styles.copyLinkText}>링크복사</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  matchingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  matchingCard: {
    backgroundColor: colors.PINK_200,
    padding: 16,
    borderRadius: 16,
    width: '48%',
    position: 'relative',
    paddingTop: 30,
    minHeight: 190,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: colors.GRAY_700,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  matchingButton: {
    backgroundColor: colors.PINK_400,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  matchingButtonText: {
    color: colors.BLACK,
    fontSize: 14,
    fontWeight: '600',
  },
  friendsButton: {
    backgroundColor: colors.PINK_200,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    position: 'relative',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  conceptContainer: {
    height: 120,
    backgroundColor: colors.PINK_200,
    borderRadius: 16,
    marginBottom: 24,
    position: 'relative',
  },
  urgentSection: {
    marginBottom: 24,
    position: 'relative',
  },
  urgentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 12,
  },
  urgentCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urgentCard: {
    backgroundColor: colors.PINK_200,
    padding: 16,
    borderRadius: 16,
    width: '30%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: colors.BLACK,
    marginBottom: 6,
  },
  participantsText: {
    fontSize: 14,
    color: colors.BLACK,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  meetingCardContainer: {
    gap: 15,
  },
  meetingCard: {
    backgroundColor: colors.PINK_200,
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meetingCardLeft: {
    flex: 1,
  },
  meetingCardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  meetingDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 6,
  },
  locationPill: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  locationPillText: {
    fontSize: 12,
    color: colors.BLACK,
  },
  participantInfo: {
    fontSize: 12,
    color: colors.BLACK,
  },
  autoMatchPill: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6,
  },
  autoMatchText: {
    fontSize: 12,
    color: colors.BLACK,
  },
  copyLinkButton: {
    backgroundColor: colors.BLUE_500,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  copyLinkText: {
    fontSize: 12,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});
