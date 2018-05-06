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

let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'https',
  host: "138.68.54.100",
  port: "8332",
  username: "bitcoin",
  password: "xhFjluMJMyOXcYvF",
  corsproxy: "remote"
});

// custom components
import Menu from './components/Menu';
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
          bitbox={BITBOX}
        />
      );
    };

    const AddressPage = (props) => {
      return (
        <Address
          bitbox={BITBOX}
        />
      );
    };

    const TransactionPage = (props) => {
      return (
        <Transaction
          bitbox={BITBOX}
        />
      );
    };

    const Home = (props) => {
      return (
        <Homepage
          bitbox={BITBOX}
        />
      );
    };

    const MenuPage = (props) => {
      return (
        <Menu
          bitbox={BITBOX}
          match={props.match}
        />
      );
    };

    return (
      <Router>
        <div>
          <MenuPage />
          <Switch>
            <Route path="/block/:id" component={BlockPage}/>
            <Route path="/address/:id" component={AddressPage}/>
            <Route path="/transaction/:id" component={TransactionPage}/>
            <Route exact path="/" component={Home}/>
            <Redirect from='*' to='/' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
