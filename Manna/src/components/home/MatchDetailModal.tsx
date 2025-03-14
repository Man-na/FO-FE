import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '@/constants';
import {Meeting} from '@/screens/home';

interface MatchDetailModalProps {
  visible: boolean;
  onClose: () => void;
  meetingInfo: Meeting | null;
}

export const MatchDetailModal = ({
  visible,
  onClose,
  meetingInfo,
}: MatchDetailModalProps) => {
  if (!meetingInfo) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>미팅정보</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.meetingInfo}>
              <Text style={styles.meetingInfoTitle}>미팅 날짜 / 장소</Text>
              <TouchableOpacity style={styles.shareLink}>
                <Text style={styles.shareLinkText}>
                  친구 초대 링크 복사하기
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.meetingDate}>
              {meetingInfo.date} / {meetingInfo.location}
            </Text>

            <Text style={styles.participantsTitle}>매칭 참가자 현황</Text>
            <View style={styles.participantsGrid}>
              <View style={styles.participantsColumn}>
                {meetingInfo.participants.males.map((participant, index) => (
                  <Text
                    key={`male-${index}`}
                    style={
                      participant.active
                        ? styles.participantActive
                        : styles.participantInactive
                    }>
                    남자 {index + 1}
                  </Text>
                ))}
              </View>
              <View style={styles.participantsColumn}>
                {meetingInfo.participants.females.map((participant, index) => (
                  <Text
                    key={`female-${index}`}
                    style={
                      participant.active
                        ? styles.participantActive
                        : styles.participantInactive
                    }>
                    여자 {index + 1}
                  </Text>
                ))}
              </View>
            </View>

            <Text style={styles.moodTitle}>미팅 분위기</Text>
            <View style={styles.moodContainer}>
              <Text style={styles.moodText}>{meetingInfo.mood}</Text>
            </View>

            <Text style={styles.confirmationText}>
              미팅이 확정되면 그룹 채팅방이 생성 됩니다.
            </Text>

            <View style={styles.timeContainer}>
              <Text style={styles.timeTitle}>매칭 확정까지 남은 시간</Text>
              <Text style={styles.timeRemaining}>
                {meetingInfo.timeRemaining}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EDEDED',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.PINK_500,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  modalContent: {
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  meetingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  shareLink: {
    padding: 4,
  },
  shareLinkText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  meetingDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  participantsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  participantsColumn: {
    flex: 1,
  },
  participantActive: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 8,
  },
  participantInactive: {
    fontSize: 16,
    color: colors.PINK_400,
    marginBottom: 8,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  moodContainer: {
    backgroundColor: '#FFDBDB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  moodText: {
    fontSize: 16,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 14,
    color: colors.GRAY_700,
    marginBottom: 16,
  },
  timeContainer: {
    marginTop: 8,
  },
  timeTitle: {
    fontSize: 14,
    color: colors.GRAY_700,
    marginBottom: 4,
  },
  timeRemaining: {
    fontSize: 16,
    color: colors.RED_500,
    fontWeight: 'bold',
  },
});
