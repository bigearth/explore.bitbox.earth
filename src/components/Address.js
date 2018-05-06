import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';
let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'https',
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: '',
  corsproxy: 'remote'
});

import "../styles/homepage.scss";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Address ${id} - Explore by BITBOX`;
    this.setState({
      id: id
    });

    BITBOX.Address.details(BITBOX.Address.toLegacyAddress(id))
    .then((result) => {
      console.log(result);
      this.setState({
        addrStr: result.addrStr,
        balance: result.balance,
        balanceSat: result.balanceSat,
        totalReceived: result.totalReceived,
        totalReceivedSat: result.totalReceivedSat,
        totalSent: result.total,
        totalSentSat: result.totalSentSat,
        transactions: result.transactions,
        txApperances: result.txApperances,
        unconfirmedBalance: result.unconfirmedBalance,
        unconfirmedBalanceSat: result.unconfirmedBalanceSat,
        unconfirmedTxApperances: result.unconfirmedTxApperances,
      });
    }, (err) => { console.log(err);
    });
  }

  render() {
    return (
      <div>
        <div className="splash-container">
          <div className="splash">
            <p>addrStr: {this.state.addrStr}</p>
            <p>balance: {this.state.balance}</p>
            <p>balanceSat: {this.state.balanceSat}</p>
            <p>totalReceived: {this.state.totalReceived}</p>
            <p>totalReceivedSat: {this.state.totalReceivedSat}</p>
            <p>totalSent: {this.state.totalSent}</p>
            <p>totalSentSat: {this.state.totalSentSat}</p>
            <p>transactions: {this.state.transactions}</p>
            <p>txApperances: {this.state.txApperances}</p>
            <p>unconfirmedBalance: {this.state.unconfirmedBalance}</p>
            <p>unconfirmedBalanceSat: {this.state.unconfirmedBalanceSat}</p>
            <p>unconfirmedTxApperances: {this.state.unconfirmedTxApperances}</p>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="footer l-box is-center">
            Created w/ ❤️ on EARTH by <a href='https://twitter.com/bitboxearth'>@bitboxearth</a>. Donations <strong>bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Address);
