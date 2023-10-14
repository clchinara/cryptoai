// import logo from './logo.svg';
import './App.css';
// import { HOME_ROUTE, EVAL_ROUTE } from './constants/routes';
import { BrowserRouter as Router } from 'react-router-dom';

import RootContainer from './components/RootContainer';

function App() {
  return (
    <Router>
      <RootContainer />
    </Router>
  );
}

export default App;
