import { Divider, Tabs } from 'antd';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { CategoriesProvider } from './context/CategoryContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TransactionsProvider } from './context/TransactionsContext';

function App() {
  return (
    <BrowserRouter>
      <CategoriesProvider>
        <TransactionsProvider>
          <Header />
          <Routes>
            <Route index element={<Navigate to={'/home'} />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </TransactionsProvider>
      </CategoriesProvider>
    </BrowserRouter>
  );
}

export default App;
