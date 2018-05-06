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
    return (
      <div className='Transaction'>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <p>blockhash: {this.state.blockhash}</p>
            <p>blockheight: {this.state.blockheight}</p>
            <p>blocktime: {this.state.blocktime}</p>
            <p>confirmations: {this.state.confirmations}</p>
            <p>isCoinBase: {this.state.isCoinBase}</p>
            <p>locktime: {this.state.locktime}</p>
          </div>
          <div className="pure-u-1-2">
            <p>size: {this.state.size}</p>
            <p>time: {this.state.time}</p>
            <p>txid: {this.state.txid}</p>
            <p>valueOut: {this.state.valueOut}</p>
            <p>version: {this.state.version}</p>
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

export default withRouter(Transaction);
