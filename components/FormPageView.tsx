import React from 'react';
import { View } from 'react-native';

type FormPageViewProps = {
    children?: React.ReactNode;
};

export const FormPageView = (
    { children }
    : FormPageViewProps) => {
  return (
    <View className="w-full flex gap-y-6">

        { children }

    </View>
  );
};