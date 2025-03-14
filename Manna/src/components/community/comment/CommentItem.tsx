import {colors} from '@/constants';
import {useAuth} from '@/services/auth';
import {useDeleteComment} from '@/services/comment/queries/useDeleteComment';
import {Comment} from '@/types';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import {InputField} from '../InputField';
import {Profile} from '../feed/Profile';

interface CommentItemProps {
  comment: Comment;
  parentCommentId?: number | null;
  onReply?: () => void;
  onCancelReply?: () => void;
  isReply?: boolean;
}

export const CommentItem = ({
  comment,
  parentCommentId,
  onReply,
  onCancelReply,
  isReply = false,
}: CommentItemProps) => {
  const {getProfileQuery} = useAuth();
  const deleteComment = useDeleteComment();

  const getCommentBackground = () => {
    if (parentCommentId === comment.id) {
      return colors.PINK_200;
    }
    if (isReply) {
      return colors.GRAY_100;
    }
    return colors.WHITE;
  };

  const handlePressOption = () => {
    const options = ['삭제', '취소'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    ActionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: getCommentBackground()}]}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialIcons
            name="subdirectory-arrow-right"
            size={24}
            color={'black'}
          />
        )}
        <Profile
          imageUri={comment.isDeleted ? '' : comment.user.imageUri}
          nickname={comment.isDeleted ? '(삭제)' : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {
            // 해당 유저의 프로필 페이지로 이동
            if (!comment.isDeleted) {
            }
          }}
          option={
            getProfileQuery.data?.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color="black"
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false}
        value={comment.isDeleted ? '삭제된 댓글입니다.' : comment.content}
      />
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>답글 남기기</Text>
          </Pressable>
          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  replyButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  replyButton: {
    fontWeight: 'bold',
    color: colors.PINK_500,
    fontSize: 12,
  },
  cancelButton: {
    fontWeight: 'bold',
    color: colors.BLACK,
    fontSize: 12,
  },
});
