import './App.scss';
import Header from './components/Header/Header';
import { Link } from 'react-router-dom'

const App = () => {

  return (
    <div className='app-container'>
      <Header />

      <nav>
        <ul>
          <li>
            <Link to={`user`}>User</Link>
          </li>
          <li>
            <Link to={`admin`}>admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
