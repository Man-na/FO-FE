import {PreviewImageList} from '@/components/common/PreviewImageList';
import {DescriptionInput} from '@/components/feed/DescriptionInput';
import {PostWriteFooter} from '@/components/feed/FeedWriteFooter';
import {TitleInput} from '@/components/feed/TitleInput';
import {VoteAttached} from '@/components/feed/VoteAttached';
import VoteModal from '@/components/feed/VoteModal';
import {AddMarkerHeaderRight} from '@/components/marker/AddMarkerHeaderRight';
import {feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigation/stack/FeedStackNavigator';
import {useCreateFeed} from '@/services/feed';
import {ImageUri, VoteOption} from '@/types';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type AddFeedFormValues = {
  title: string;
  description: string;
  imageUris: ImageUri[];
  isVoteOpen: boolean;
  isVoteAttached: boolean;
  voteOptions: VoteOption[];
};

type AddFeedScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.ADD_FEED
>;

export const AddFeedScreen = ({}: AddFeedScreenProps): React.JSX.Element => {
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
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <AddMarkerHeaderRight onSubmit={postForm.handleSubmit(handleSubmit)} />
      ),
    });
  }, [navigation, postForm, handleSubmit]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FormProvider {...postForm}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <TitleInput />
          <DescriptionInput />
          <VoteAttached />
          <PreviewImageList imageUris={postForm.watch().imageUris} />
        </KeyboardAwareScrollView>

        <PostWriteFooter />
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
