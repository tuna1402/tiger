import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 테마를 설정합니다.
const theme = createTheme({
  palette: {
    mode: 'light', // 'dark' 모드 사용 시 'dark'로 설정
    primary: {
      main: '#007bff', // 원래 'Add Todo' 버튼 색상
    },
    secondary: {
      main: '#dc3545', // 원래 'Cancel' 버튼 색상
    },
    // 기본 버튼 색상
    default: {
      main: '#6c757d', // 원래 'Reset' 버튼 색상
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// 성능 측정을 원하는 경우, 아래의 함수를 사용하여 로그를 기록할 수 있습니다.
reportWebVitals();
