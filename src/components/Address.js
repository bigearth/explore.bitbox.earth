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

    this.props.bitbox.Address.details(this.props.bitbox.Address.toLegacyAddress(id))
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
    let cashAddr;
    let legacy;
    let transactions;
    if(this.state.addrStr) {
      cashAddr = <p><i className="fas fa-qrcode" /> Cash: {this.props.bitbox.Address.toCashAddress(this.state.addrStr)}</p>;
      legacy = <p><i className="fas fa-qrcode" /> Legacy: {this.props.bitbox.Address.toLegacyAddress(this.state.addrStr)}</p>;
      transactions = <p><i className="fas fa-exchange-alt" /> Transactions: {this.state.transactions.length}</p>;
    }

    return (
      <div className='Address'>
        <h2><i className="fas fa-qrcode" /> Address {this.state.id}</h2>
        <div className="pure-g">
          <div className="pure-u-1-2">
            {cashAddr}
            {legacy}
            <p>balance: {this.state.balance}</p>
            <p>balanceSat: {this.state.balanceSat}</p>
            <p>totalReceived: {this.state.totalReceived}</p>
            <p>totalSent: {this.state.totalSent}</p>
          </div>
          <div className="pure-u-1-2">
            {transactions}
            <p>unconfirmedBalance: {this.state.unconfirmedBalance}</p>
            <p>unconfirmedTxApperances: {this.state.unconfirmedTxApperances}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Address);
