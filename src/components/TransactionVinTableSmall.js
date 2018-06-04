import React, { Component } from 'react';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class TransactionVinTableSmall extends Component {
  render() {
    let vinBody = [];
    if(this.props.vin) {
      this.props.vin.forEach((v, ind) => {
        if(v.coinbase) {
          vinBody.push(
            <tr key={ind} className={this.props.parsed.input && this.props.parsed.input == ind ? "active" : ""}>
              <td>Coinbase</td>
              <td>No Inputs</td>
              <td></td>
              <td></td>
            </tr>
          );
        } else {
          vinBody.push(
            <tr key={ind} className={this.props.parsed.input && this.props.parsed.input == ind ? "active" : ""}>
              <td>
                <Link
                  to={`/transaction/${v.txid}`}>
                  <i className="fas fa-chevron-left" />
                </Link>
              </td>
              <td>
               <FormattedNumber maximumFractionDigits={8} value={this.props.bitbox.BitcoinCash.toBitcoinCash(v.value)}/>
              </td>
              <td>
                <Link
                  to={`/address/${v.cashAddress}`}>
                  {this.props.bitbox.Address.toCashAddress(v.cashAddress, false)}
                </Link>
              </td>
              <td>
              {v.n}
              </td>
            </tr>
          );
        }
      });
    }
    return (
      <div className="l-box pure-u-1 small">
        <h3 className='content-subhead'><i className="fas fa-long-arrow-alt-down" /> Inputs</h3>
        <table className="pure-table">
          <thead>
            <tr>
              <th></th>
              <th><i className="fab fa-bitcoin" /> Value</th>
              <th><i className="fas fa-qrcode" /> Address</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {vinBody}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TransactionVinTableSmall);
