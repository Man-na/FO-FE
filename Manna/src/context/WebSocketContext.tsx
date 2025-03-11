import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';

interface WebSocketContextType {
  ws: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({ws: null});

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [wsState, setWsState] = useState<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:9001/ws');

    wsRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
      setWsState(wsRef.current);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket 연결 종료');
      setWsState(null);
    };

    wsRef.current.onerror = error => {
      console.error('WebSocket 오류:', error);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ws: wsState}}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
