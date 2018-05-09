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
      tx: [],
      vin: [],
      vout: []
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
        size: result.size / 1000,
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
      formattedSize = this.state.size;
    }

    let date;
    if(this.state.time) {
      date = moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a');
    }
        // <tbody className='navTable'>
        //   {transactions}
        // </tbody>

    let vinBody = [];
    if(this.state.vin) {
      this.state.vin.forEach((v, ind) => {
        console.log(v)
        if(v.coinbase) {
          vinBody.push(
            <tr key={ind}>
              <td>Coinbase</td>
              <td>No Inputs</td>
            </tr>
          );
        } else {
          vinBody.push(
            <tr key={ind}>
              <td>
                <Link
                  to={`/transaction/${v.txid}`}>
                  <i className="fas fa-chevron-left" />
                </Link>
              </td>
              <td>
              {this.props.bitbox.BitcoinCash.toBitcoinCash(v.value)}
              </td>
              <td>
                <Link
                  to={`/address/${v.cashAddress}`}>
                  {this.props.bitbox.Address.toCashAddress(v.cashAddress, false)}
                </Link>
              </td>
              <td >
              {v.n}
              </td>
            </tr>
          );
        }
      });
    }

    let vinTable;
    if(this.state.vin.length > 0) {
      vinTable = <table className="pure-table">
        <thead>
          <tr>
            <th></th>
            <th>Value (BCH)</th>
            <th>Address</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {vinBody}
        </tbody>
      </table>;
    }

    let voutBody = [];
    if(this.state.vout) {
      this.state.vout.forEach((v, ind) => {
        voutBody.push(
          <tr key={ind}>
            <td>
            {v.n}
            </td>
            <td>
              <Link
                to={`/address/${this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}`}>
                {this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0], false)}
              </Link>
            </td>
            <td>{v.value}</td>
          </tr>
        );
      });
    }

    let voutTable;
    if(this.state.vout.length > 0) {
      voutTable = <table className="pure-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Value (BCH)</th>
          </tr>
        </thead>
        <tbody>
          {voutBody}
        </tbody>
      </table>;
    }

    return (
      <div className='Transaction container'>
        <h2 className='l-box'><i className="fas fa-exchange-alt" /> Transaction {this.state.id}</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="fas fa-cube" /> Included in block <Link
                to={`/block/${this.state.blockhash}`}>
                {formattedBlockHeight}
              </Link>
            </p>
            <p><i className="far fa-check-square" /> confirmations: {formattedConfirmations}</p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="far fa-file" /> Size: {formattedSize} kb</p>
            <p><i className="far fa-calendar-alt" /> {date}</p>
          </div>
        </div>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <h3 className='content-subhead'>Inputs</h3>
            {vinTable}
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <h3 className='content-subhead'>Outputs</h3>
            {voutTable}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Transaction);
