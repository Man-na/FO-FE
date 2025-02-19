import React from 'react';
import {HeaderButton} from '../common/HeaderButton';

interface AddPostHeaderRightProps {
  onSubmit: () => void;
}

export const AddPostHeaderRight = ({
  onSubmit,
}: AddPostHeaderRightProps): React.JSX.Element => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};
