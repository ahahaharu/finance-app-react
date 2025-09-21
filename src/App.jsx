import { Divider, Tabs } from 'antd';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import { ExpensesProvider } from './context/ExpensesContext';
import { CategoriesProvider } from './context/CategoryContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <CategoriesProvider>
        <ExpensesProvider>
          <Header />
          <Routes>
            <Route index element={<Navigate to={'/home'} />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </ExpensesProvider>
      </CategoriesProvider>
    </BrowserRouter>
  );
}

export default App;
