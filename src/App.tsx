import React from 'react';
import { observer } from 'mobx-react-lite';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ThemeProvider } from 'styled-components';
import { useStore } from './store/StoreContext';
import { darkTheme, lightTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Shell } from './styles/styledComponents';
import { Header } from './components/Header';
import { RatingScreen } from './components/rating/RatingScreen';
import { EmployeesScreen } from './components/employees/EmployeesScreen';
import { Toast } from './components/Toast';
import { AwardModal } from './components/modals/AwardModal';
import { EmployeeModal } from './components/modals/EmployeeModal';
import { ConfirmDeleteModal } from './components/modals/ConfirmDeleteModal';

export const App: React.FC = observer(() => {
  const store = useStore();
  const isDark = store.theme === 'dark';
  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#d7ff2e',
          colorBgBase: isDark ? '#0d0d10' : '#edece7',
          colorBgContainer: isDark ? '#16161f' : '#ffffff',
          colorText: isDark ? '#ececf5' : '#17171a',
          fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
          borderRadius: 10
        }
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles theme={currentTheme} />
        <Shell id="shell">
          <Header />
          <RatingScreen />
          <EmployeesScreen />
          <AwardModal />
          <EmployeeModal />
          <ConfirmDeleteModal />
          <Toast />
        </Shell>
      </ThemeProvider>
    </ConfigProvider>
  );
});

export default App;
