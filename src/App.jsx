import { Divider, Tabs } from 'antd';
import './App.css';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import HomePage from './pages/HomePage';
import Button from './components/UI/Button';

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
}

export default App;
