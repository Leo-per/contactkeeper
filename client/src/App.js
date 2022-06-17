import "./App.css";
import { Fragment } from "react";
import NavBar from "./component/layout/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
// import AlertState from "./context/alert/AlertState";

import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Register from "./component/auth/Register";
import Login from "./component/auth/login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./component/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./component/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <NavBar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
