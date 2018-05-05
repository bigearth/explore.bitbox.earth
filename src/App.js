// react imports
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  NavLink
} from 'react-router-dom';

// custom components
import Homepage from './components/Homepage';
import Block from './components/Block';
import Address from './components/Address';
import Transaction from './components/Transaction';

// css
import './styles/app.scss';

class App extends Component {

  handlePathMatch(path) {
    if(path === '/' || path === '/blocks' || path === '/transactions' || path === '/logs' || path === '/configuration/accounts-and-keys') {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const pathMatch = (match, location) => {
      if (!match) {
        return false
      }
      return this.handlePathMatch(match.path);
    }

    const BlockPage = (props) => {
      return (
        <Block
        />
      );
    };

    const AddressPage = (props) => {
      return (
        <Address
        />
      );
    };

    const TransactionPage = (props) => {
      return (
        <Transaction
        />
      );
    };

    return (
      <Router>
        <div>
          <div className="header">
            <div className="home-menu main-menu pure-menu pure-menu-horizontal pure-menu-fixed">
              <Link className="pure-menu-heading header-logo" to="/">
                <img src={'/assets/logo.png'} /> <br />BitBox
              </Link>

              <ul className="pure-menu-list">
                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/block">
                    <i className="fas fa-cube"></i> Block
                  </NavLink>
                </li>
                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/address">
                    <i className="fas fa-qrcode"></i> Address
                  </NavLink>
                </li>
                <li className="pure-menu-item">
                  <NavLink
                    isActive={pathMatch}
                    activeClassName="pure-menu-selected"
                    className="pure-menu-link"
                    to="/transaction">
                    <i className="fas fa-exchange-alt"></i> Transaction
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <Switch>
            <Route path="/block/:id" component={BlockPage}/>
            <Route path="/address/:id" component={AddressPage}/>
            <Route path="/transaction/:id" component={TransactionPage}/>
            <Route exact path="/" component={Homepage}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
