import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import MemoLarge from './MemoLarge';
import BlockpressLarge from './BlockpressLarge';
import MemoSmall from './MemoSmall';
import _ from 'underscore';

import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class TransactionVoutTableSmall extends Component {
  handleRedirect(path) {
    this.props.handleRedirect(path);
  }

  render() {

    let voutBody = [];
    if(this.props.vout) {
      this.props.vout.forEach((v, ind) => {
        let output;
        let largeNullData;
        if(v.scriptPubKey.addresses && v.scriptPubKey.addresses.length > 0) {
          output = <Link
            to={`/address/${this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}`}>
            {this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0], false)}
          </Link>;
        } else {
          let op = v.scriptPubKey.asm;

          let memoPrefixes = [365, 621, 877, 1133, 1389, 1645, 1901, 3181];
          let blockpressPrefixes = [397, 653, 909, 1165, 1677, 1933, 2189, 2445, 4237, 4493];

          let split = op.split(" ");
          let prefix = +split[1];
          if(_.includes(memoPrefixes, prefix)){
            largeNullData = <MemoLarge
              handleRedirect={this.handleRedirect.bind(this)}
              active={this.props.parsed.output && this.props.this.props.parsed.output == ind ? "active" : ""}
              parsed={this.props.parsed}
              key={ind+1}
              split={split}
              prefix={prefix}
              bitbox={this.props.bitbox}
              txid={this.props.txid}
            />
          }

          if(_.includes(blockpressPrefixes, prefix)){
            largeNullData = <BlockpressLarge
              handleRedirect={this.handleRedirect.bind(this)}
              active={this.props.parsed.output && this.props.this.props.parsed.output == ind ? "active" : ""}
              parsed={this.props.parsed}
              key={ind+2}
              split={split}
              prefix={prefix}
              bitbox={this.props.bitbox}
              txid={this.props.txid}
            />
          }
        }

        voutBody.push(
          <tr key={ind} className={this.props.parsed.output && this.props.parsed.output == ind ? "active" : ""}>
            <td>{v.n}</td>
            <td className='address'>{output}</td>
            <td>
              <FormattedNumber maximumFractionDigits={8} value={v.value}/>
            </td>
          </tr>
        );
        if(largeNullData) {
          voutBody.push(largeNullData);
        }
      });
    }

    return (
      <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 outputs small">
        <h3 className='content-subhead'><i className="fas fa-long-arrow-alt-up" /> Outputs</h3>
        <table className="pure-table">
          <thead>
            <tr>
              <th>#</th>
              <th><i className="fas fa-qrcode" /> Address</th>
              <th><i className="fab fa-bitcoin" /> Value</th>
            </tr>
          </thead>
          <tbody>
            {voutBody}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TransactionVoutTableSmall);
