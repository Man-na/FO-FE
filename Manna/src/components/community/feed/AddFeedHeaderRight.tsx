import {HeaderButton} from '@/components/common';
import React from 'react';

interface AddFeedHeaderRightProps {
  onSubmit: () => void;
}

export const AddFeedHeaderRight = ({onSubmit}: AddFeedHeaderRightProps) => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};
