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
  host: "138.68.54.100",
  port: "8332",
  username: "bitcoin",
  password: "xhFjluMJMyOXcYvF",
  corsproxy: "remote"
});

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

    BITBOX.Transaction.details(id)
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
      <div>
        <div className="splash-container">
          <div className="splash">
            <p>blockhash: {this.state.blockhash}</p>
            <p>blockheight: {this.state.blockheight}</p>
            <p>blocktime: {this.state.blocktime}</p>
            <p>confirmations: {this.state.confirmations}</p>
            <p>isCoinBase: {this.state.isCoinBase}</p>
            <p>locktime: {this.state.locktime}</p>
            <p>size: {this.state.size}</p>
            <p>time: {this.state.time}</p>
            <p>txid: {this.state.txid}</p>
            <p>valueOut: {this.state.valueOut}</p>
            <p>version: {this.state.version}</p>
          </div>

          <div className="footer l-box is-center">
            Created w/ ❤️ on EARTH by <a href='https://twitter.com/bitboxearth'>@bitboxearth</a>. Donations <strong>bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Transaction);
