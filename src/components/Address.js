import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import QRCode from 'qrcode.react';

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
      this.setState({
        legacyAddress: result.legacyAddress,
        cashAddress: result.cashAddress,
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
    let qr;
    let cashAddr;
    let legacy;
    let transactions;
    if(this.state.cashAddress) {
      qr = <QRCode value={this.state.id} />;
      cashAddr = <p>Cash: {this.state.cashAddress}</p>;
      legacy = <p>Legacy: {this.state.legacyAddress}</p>;
    }

    return (
      <div className='Address'>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-12 pure-u-lg-1-12">
            {qr}
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-3 pure-u-lg-1-3">
            <h2 className=''> Address</h2>
            {cashAddr}
            {legacy}
          </div>
          <div className="l-box pure-u-1 pure-u-md-7-12 pure-u-lg-7-12">
            <p><i className="fab fa-bitcoin" /> Balance: {this.state.balance}</p>
            <p><i className="fas fa-arrow-up" /> Total Received: {this.state.totalReceived}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Address);
