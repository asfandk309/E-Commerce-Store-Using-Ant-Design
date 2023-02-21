import './App.css';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';
import PageContent from './Components/PageContent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
