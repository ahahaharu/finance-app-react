import { Divider, Tabs } from 'antd';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { CategoriesProvider } from './context/CategoryContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TransactionsProvider } from './context/TransactionsContext';
import AccountsPage from './pages/AccountsPage';
import ChartsPage from './pages/ChartsPage';
import SettingsPage from './pages/SettingsPage';
import { AccountsProvider } from './context/AccountsContext';

function App() {
  return (
    <BrowserRouter>
      <CategoriesProvider>
        <AccountsProvider>
          <TransactionsProvider>
            <Header />
            <Routes>
              <Route index element={<Navigate to={'/home'} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </TransactionsProvider>
        </AccountsProvider>
      </CategoriesProvider>
    </BrowserRouter>
  );
}

export default App;
