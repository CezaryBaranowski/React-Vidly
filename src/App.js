import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import Rentals from "./components/Rentals";
import Customers from "./components/customers";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/loginForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
