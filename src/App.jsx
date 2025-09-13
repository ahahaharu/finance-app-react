import { Divider, Tabs } from 'antd';
import './App.css';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './pages/HomePage';
import Button from './components/UI/Button';
import { ExpensesProvider } from './context/ExpensesContext';
import { CategoriesProvider } from './context/CategoryContext';

function App() {
  return (
    <CategoriesProvider>
      <ExpensesProvider>
        <Header />
        <HomePage />
      </ExpensesProvider>
    </CategoriesProvider>
  );
}

export default App;
