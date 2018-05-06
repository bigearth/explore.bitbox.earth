import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';

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
    document.title = `Explore by BITBOX - Transaction ${id}`;
    this.setState({
      id: id
    });

    this.props.bitbox.Transaction.details(id)
    .then((result) => {
      this.setState({
        blockhash: result.blockhash,
        blockheight: result.blockheight,
        blocktime: result.blocktime,
        confirmations: result.confirmations,
        isCoinBase: result.isCoinBase,
        locktime: result.locktime,
        size: result.size,
        time: result.time,
        txid: result.txid,
        valueOut: result.valueOut,
        version: result.version
      });
    }, (err) => { console.log(err);
    });
  }

  render() {
    let coinbase;
    if(this.state.isCoinBase) {
      coinbase = <p><i className="fab fa-bitcoin" /> coinbase</p>
    }

    return (
      <div className='Transaction'>
        <h2 className='l-box'><i className="fas fa-exchange-alt" /> Transaction {this.state.id}</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="fas fa-cube" /> blockhash: {this.state.blockhash}</p>
            <p><i className="fas fa-cubes" /> blockheight: {this.state.blockheight}</p>
            <p><i className="far fa-check-square" /> confirmations: {this.state.confirmations}</p>
            {coinbase}
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="far fa-file" /> Size: {this.state.size}</p>
            <p><i className="far fa-calendar-alt" /> Time: {moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><i className="far fa-id-card" /> txid: {this.state.txid}</p>
            <p><i className="fab fa-bitcoin" /> valueOut: {this.state.valueOut}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Transaction);
