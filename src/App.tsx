import './App.css'
import Search from './pages/Search'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import PersonDetails from './pages/PersonDetails';
import TVDetails from './pages/TVDetails';

const App = () => {
  return (
    <Router>
      <Search />
      <Switch>
        <Route exact path='/movie/:id' component={MovieDetails} />
        <Route exact path='/tv/:id' component={TVDetails} />
        <Route exact path='/person/:id' component={PersonDetails} />
        {/* <Route path='/' component={Search} /> */}
      </Switch>
    </Router>
  );
}

export default App;
