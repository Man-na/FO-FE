import {colors} from '@/constants';
import {VoteOption} from '@/types';
import Octicons from '@react-native-vector-icons/octicons';
import React from 'react';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {VoteInput} from './VoteInput';

export const VoteModal = () => {
  const {control, setValue} = useFormContext();
  const [voteOptions, isVoteOpen] = useWatch({
    control,
    name: ['voteOptions', 'isVoteOpen'],
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'voteOptions',
  });

  const handleAppendVote = () => {
    const priorities = voteOptions.map(
      (vote: VoteOption) => vote.displayPriority,
    );
    const nextPriority = Math.max(...priorities) + 1;
    append({displayPriority: nextPriority, content: ''});
  };

  const handleSubmitVote = () => {
    if (voteOptions.length < 2) {
      Alert.alert('투표 항목을 2개이상 추가해주세요.', '');
      return;
    }

    setValue('isVoteAttached', true);
    setValue('isVoteOpen', false);
  };

  return (
    <Modal visible={isVoteOpen} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => setValue('isVoteOpen', false)}
            style={styles.headerLeft}>
            <Octicons name="arrow-left" size={28} color={colors.BLACK} />
          </Pressable>
          <Text style={styles.headerTitle}>투표</Text>
          <Text style={styles.headerRight} onPress={handleSubmitVote}>
            첨부
          </Text>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={{gap: 12, padding: 16}}>
          {fields.map((field, index) => {
            return (
              <VoteInput
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
            );
          })}
          <Pressable onPress={handleAppendVote}>
            <Text style={styles.addVoteText}>+ 항목 추가</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.BLACK,
  },
  headerRight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PINK_500,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addVoteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.GRAY_500,
    textAlign: 'center',
  },
});
