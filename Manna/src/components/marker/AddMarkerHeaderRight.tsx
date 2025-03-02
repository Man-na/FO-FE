import React from 'react';
import {HeaderButton} from '../common/HeaderButton';

interface AddMarkerHeaderRightProps {
  onSubmit: () => void;
}

export const AddMarkerHeaderRight = ({
  onSubmit,
}: AddMarkerHeaderRightProps): React.JSX.Element => {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
};
