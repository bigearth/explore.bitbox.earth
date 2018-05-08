import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';
import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Transaction ${id} - Explore by BITBOX`;
    this.setState({
      id: id
    });

    this.props.bitbox.Transaction.details(id)
    .then((result) => {
      this.setState({
        blockhash: result.blockhash,
        blockheight: result.blockheight,
        confirmations: result.confirmations,
        isCoinBase: result.isCoinBase,
        size: result.size,
        time: result.time,
        txid: result.txid,
        valueOut: result.valueOut,
        vin: result.vin,
        vout: result.vout
      });
    }, (err) => { console.log(err);
    });
  }

  render() {
    let coinbase;
    if(this.state.isCoinBase) {
      coinbase = <p><i className="fab fa-bitcoin" /> coinbase</p>
    }

    let formattedBlockHeight;
    if(this.state.blockheight) {
      formattedBlockHeight = <FormattedNumber value={this.state.blockheight}/>;
    }

    let formattedConfirmations;
    if(this.state.confirmations) {
      formattedConfirmations = <FormattedNumber value={this.state.confirmations}/>;
    }

    let formattedValue;
    if(this.state.valueOut) {
      formattedValue = <FormattedNumber value={this.state.valueOut}/>;
    }

    let formattedSize;
    if(this.state.size) {
      formattedSize = <FormattedNumber value={this.state.valueOut}/>;
    }

    let vin = [];
    if(this.state.vin) {
      this.state.vin.forEach((v, ind) => {
        console.log(v)
        if(v.coinbase) {
          vin.push(
            <li key={ind}>Coinbase</li>
          );
        } else {
          vin.push(
            <li key={ind}>
              <Link
                to={`/address/${v.cashAddress}`}>
                {v.cashAddress}
              </Link>
            </li>
          );
        }
      });
    }

    let vout = [];
    if(this.state.vout) {
      this.state.vout.forEach((v, ind) => {
        vout.push(
          <li key={ind}>
            <Link
              to={`/address/${this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}`}>
              {this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}
            </Link>
          </li>
        );
      });
    }

    return (
      <div className='Transaction'>
        <h2 className='l-box'><i className="fas fa-exchange-alt" /> Transaction {this.state.id}</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="fas fa-cube" /> blockhash: {this.state.blockhash}</p>
            <p><i className="fas fa-cubes" /> blockheight: {formattedBlockHeight}</p>
            <p><i className="far fa-check-square" /> confirmations: {formattedConfirmations}</p>
            {coinbase}
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="far fa-file" /> Size: {formattedSize} bytes</p>
            <p><i className="far fa-calendar-alt" /> Time: {moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><i className="far fa-id-card" /> txid: {this.state.txid}</p>
            <p><i className="fab fa-bitcoin" /> valueOut: {formattedValue}</p>
          </div>
        </div>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <h3 className='content-subhead'>Inputs</h3>
            <ul>
              {vin}
            </ul>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <h3 className='content-subhead'>Outputs</h3>
            <ul>
              {vout}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Transaction);
