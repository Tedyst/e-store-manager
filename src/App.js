import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductAdd from './routes/productAdd';
import ProductList from './routes/productList';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Listing page: */}
          <Route exact path="/" component={ProductList} />
          
          {/* Adding product page: */}
          <Route exact path="/add-product" component={ProductAdd} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
