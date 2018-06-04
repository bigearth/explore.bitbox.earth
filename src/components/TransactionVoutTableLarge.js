import React, { Component } from 'react';
let memopress = require('memopress');

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


let memopress = require('memopress');
let test = memopress.encode('0x6d01', 'nakamoto')
console.log("test");
console.log(test);

class TransactionVoutTableLarge extends Component {
  handleRedirect(path) {
    this.props.handleRedirect(path);
  }

  render() {

    let voutBody = [];
    if(this.props.vout) {
      this.props.vout.forEach((v, ind) => {
        console.log(ind)
        let output;
        let largeNullData;
        if(v.scriptPubKey.addresses && v.scriptPubKey.addresses.length > 0) {
          output = <Link
            to={`/address/${this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}`}>
            {this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0], false)}
          </Link>;
        } else {

          let op = v.scriptPubKey.asm;
          let decoded = memopress.decode(op);

          largeNullData = <MemoLarge
            handleRedirect={this.handleRedirect.bind(this)}
            active={this.props.parsed.output && this.props.this.props.parsed.output == ind ? "active" : ""}
            parsed={this.props.parsed}
            key={ind+1}
            decoded={decoded}
            bitbox={this.props.bitbox}
            txid={this.props.txid}
          />
          // if(_.includes(memoPrefixes, prefix)){
          //   console.log()
          //   largeNullData = <MemoLarge
          //     handleRedirect={this.handleRedirect.bind(this)}
          //     active={this.props.parsed.output && this.props.this.props.parsed.output == ind ? "active" : ""}
          //     parsed={this.props.parsed}
          //     key={ind+1}
          //     split={split}
          //     prefix={prefix}
          //     bitbox={this.props.bitbox}
          //     txid={this.props.txid}
          //   />
          // }
          //
          // if(_.includes(blockpressPrefixes, prefix)){
          //   largeNullData = <BlockpressLarge
          //     handleRedirect={this.handleRedirect.bind(this)}
          //     active={this.props.parsed.output && this.props.this.props.parsed.output == ind ? "active" : ""}
          //     parsed={this.props.parsed}
          //     key={ind+2}
          //     split={split}
          //     prefix={prefix}
          //     bitbox={this.props.bitbox}
          //     txid={this.props.txid}
          //   />
          // }
        }

        let spent;
        if(v.spentTxId !== null) {
          spent = <i className="fas fa-times" />;
        }
        voutBody.push(
          <tr key={ind} className={this.props.parsed.output && this.props.parsed.output == ind ? "active" : ""}>
            <td>{v.n}</td>
            <td className='address'>{output}</td>
            <td className='address'>{spent}</td>
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

    console.log(voutBody)
    return (
      <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 outputs large">
        <h3 className='content-subhead'><i className="fas fa-long-arrow-alt-up" /> Outputs</h3>
        <table className="pure-table">
          <thead>
            <tr>
              <th>#</th>
              <th><i className="fas fa-qrcode" /> Address</th>
              <th>S?</th>
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

export default withRouter(TransactionVoutTableLarge);
