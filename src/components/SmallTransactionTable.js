import React, { Component } from 'react';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Slider from 'react-slick';
import ReactPaginate from 'react-paginate';
import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class SmallTransactionTable extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {

    };
  }

  handleRedirect(txid) {
    this.props.handleRedirect(txid);
  }

  render() {
    let transactions = [];
    this.props.transactions.forEach((transaction, index) => {
      transactions.push(<div onClick={this.handleRedirect.bind(this, transaction.txid)} key={index}>
        <div className="l-box pure-u-1-8">
          <p>TXID</p>
          <p><i className="fas fa-arrow-down" /></p>
          <p><i className="fas fa-arrow-up" /></p>
          <p><i className="fab fa-bitcoin" /></p>
        </div>
        <div className="l-box pure-u-7-8 vout">
          <p>{transaction.txid}</p>
          <p><FormattedNumber value={transaction.vin.length} /></p>
          <p><FormattedNumber value={transaction.vout.length} /></p>
          <p><FormattedNumber maximumFractionDigits={8} value={transaction.isCoinBase === true ? transaction.valueOut : transaction.valueIn} /></p>
        </div>
      </div>);
    })
    return (
      <div className='pure-g SmallTransactionTable small'>
        {transactions}
      </div>
    );
  }
}

export default withRouter(SmallTransactionTable);
