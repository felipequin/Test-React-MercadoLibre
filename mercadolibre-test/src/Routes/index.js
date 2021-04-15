import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./../pages/Home";
import Header from "./../components/Header";
import ProductList from "./../components/productList"
import Product from "./../components/Product"
import { Provider } from "react-redux";
import store from "../redux/store/store";

const Routes = () => {
    return (
    <Provider store={store}> 
    <Router>
     <Header/>
     <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/products" component={ProductList}/>
         <Route path="/product/:idItem" component={Product}/>
         </Switch>    
    </Router>
    </Provider>
    );
};

export default Routes;