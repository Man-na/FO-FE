import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  AddFeedHeaderRight,
  DescriptionInput,
  FeedWriteFooter,
  PreviewImageList,
  TitleInput,
} from '@/components/community/feed';
import {VoteAttached, VoteModal} from '@/components/community/vote';
import {useCreateFeed} from '@/services/community';
import {ImageUri, VoteOption} from '@/types';
import {CategorySelector} from '@/components/community/feed';

type AddFeedFormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean;
  isVoteAttached: boolean;
  voteOptions: VoteOption[];
  categoryId: number;
};

export const AddFeedScreen = () => {
  const navigation = useNavigation();
  const createFeed = useCreateFeed();
  const postForm = useForm<AddFeedFormValues>({
    defaultValues: {
      title: '',
      description: '',
      imageUris: [],
      isVoteOpen: false,
      isVoteAttached: false,
      voteOptions: [{displayPriority: 0, content: ''}],
      categoryId: 1,
    },
  });

  const handleSubmit = useCallback(
    (formValues: AddFeedFormValues) => {
      createFeed.mutate(formValues, {onSuccess: () => navigation.goBack()});
    },
    [createFeed, navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AddFeedHeaderRight onSubmit={postForm.handleSubmit(handleSubmit)} />
      ),
    });
  }, [navigation, postForm, handleSubmit]);

  const setCategoryId = (id: number) => {
    postForm.setValue('categoryId', id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FormProvider {...postForm}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <CategorySelector
            value={postForm.watch('categoryId')}
            onChange={setCategoryId}
          />
          <TitleInput />
          <DescriptionInput />
          <VoteAttached />
          <PreviewImageList imageUris={postForm.watch().imageUris} />
        </KeyboardAwareScrollView>

        <FeedWriteFooter />
        <VoteModal />
      </FormProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
