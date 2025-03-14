import {WebSocketProvider} from '@/context/WebSocketContext';
import RootNavigator from '@/navigation/root/RootNavigator';
import {queryClient} from '@/utils';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
