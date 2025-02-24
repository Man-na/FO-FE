import {HeaderButton} from '@/components/common/HeaderButton';
import React from 'react';

export const CalendarHomeHeaderRight = (onPress: () => void) => {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
};
