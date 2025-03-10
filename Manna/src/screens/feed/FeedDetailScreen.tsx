import CommentItem from '@/components/feed/CommentItem';
import {FeedItem} from '@/components/feed/FeedItem';
import InputField from '@/components/feed/InputField';
import {colors, feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigation/stack/FeedStackNavigator';
import {MainTabParamList} from '@/navigation/tab/MainTabNavigator';
import {useCreateComment} from '@/services/comment';
import {useGetFeed} from '@/services/feed';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {Fragment, useRef, useState} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  StackScreenProps<MainTabParamList>
>;

export const FeedDetailScreen = ({
  route,
}: FeedDetailScreenProps): React.JSX.Element => {
  const {id} = route.params;
  const {data: feed, isPending, isError} = useGetFeed(id);
  const createComment = useCreateComment();
  const [content, setContent] = useState('');
  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss();
  };

  const handleSubmitComment = () => {
    const commentData = {
      feedId: feed.id,
      content: content,
    };
    if (parentCommentId) {
      createComment.mutate({...commentData, parentCommentId});
      setContent('');
      handleCancelReply();
      return;
    }

    if (parentCommentId) {
      createComment.mutate({...commentData, parentCommentId});
      setContent('');
      handleCancelReply();
      return;
    }

    createComment.mutate(commentData);
    setContent('');
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}>
          <ScrollView
            ref={scrollRef}
            style={{marginBottom: 75}}
            contentContainerStyle={styles.scrollViewContainer}>
            <View style={{marginTop: 12}}>
              <FeedItem feed={feed} isDetail />
              <Text style={styles.commentCount}>
                댓글 {feed.commentCount}개
              </Text>
            </View>

            {feed.comments?.map(comment => (
              <Fragment key={comment.id}>
                <CommentItem
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  comment={comment}
                />
                {comment.replies.map(reply => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
              onChangeText={text => setContent(text)}
              placeholder={
                parentCommentId ? '답글 남기는중...' : '댓글을 남겨보세요.'
              }
              rightChild={
                <Pressable
                  disabled={!content}
                  style={styles.inputButtonContainer}
                  onPress={handleSubmitComment}>
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    marginTop: 12,
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentInputContainer: {
    width: '100%',
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    padding: 16,
    bottom: 0,
    position: 'absolute',
  },
  inputButtonContainer: {
    backgroundColor: colors.PINK_500,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});
