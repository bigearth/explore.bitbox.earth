import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import QRCode from 'qrcode.react';
import ReactPaginate from 'react-paginate';
import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class Address extends Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    document.title = `Address ${id} - Explore by BITBOX`;
    this.state = {
      id: id,
      legacyAddress: this.props.bitbox.Address.toLegacyAddress(id),
      cashAddress: this.props.bitbox.Address.toCashAddress(id),
      tx: [],
      perPage: 10,
      offset: 0,
      transactions: [],
      redirect: false,
      txid: null,
      txs: []
    };
  }

  componentDidMount() {
    this.props.bitbox.Address.details(this.state.id)
    .then((result) => {
      this.fetchTransactionData(result.transactions);

      this.setState({
        balance: result.balance || "0",
        totalReceived: result.totalReceived,
        totalSent: result.total,
        transactions: result.transactions,
        txs: [],
        pageCount: Math.floor(result.transactions.length / this.state.perPage)
      });
    }, (err) => { console.log(err);
    });
  }

  componentWillReceiveProps(props) {
    let id = props.match.params.id;
    document.title = `Address ${id} - Explore by BITBOX`;
    this.setState({
      id: id,
      legacyAddress: this.props.bitbox.Address.toLegacyAddress(id),
      cashAddress: this.props.bitbox.Address.toCashAddress(id),
      balance: "",
      totalReceived: '',
      totalSent: '',
      transactions: [],
      txs: [],
      pageCount: 0
    });

    this.props.bitbox.Address.details(id)
    .then((result) => {
      this.fetchTransactionData(result.transactions);

      this.setState({
        balance: result.balance || "0",
        totalReceived: result.totalReceived,
        totalSent: result.total,
        transactions: result.transactions,
        txs: [],
        pageCount: Math.floor(result.transactions.length / this.state.perPage)
      });
    }, (err) => { console.log(err);
    });
  }

  handleRedirect(txid) {
    this.setState({
      redirect: true,
      txid: txid
    })
  }

  fetchTransactionData(transactions) {

    let txs = [];
    let upperBound = this.state.perPage;
    if(transactions.length < upperBound) {
      upperBound = transactions.length;
    }

    if(transactions.length > 0) {
      for(let i = this.state.offset; i < this.state.offset + upperBound; i++) {
        txs.push(transactions[i]);
      }
    }

    this.props.bitbox.Transaction.details(JSON.stringify(txs))
    .then((result) => {
      this.setState({
        txs: result
      });
    }, (err) => { console.log(err);
    });
  }

  handlePageClick(data) {
    this.setState({
      txs: []
    });
    let selected = data.selected;
    let transactions = this.state.transactions;
    let txs = [];
    if(this.state.transactions.length > 0) {
      for(let i = selected; i < selected + this.state.perPage; i++) {
        txs.push(this.state.transactions[i]);
      }
    }
    this.props.bitbox.Transaction.details(JSON.stringify(txs))
    .then((result) => {
      this.setState({
        txs: result
      });
    }, (err) => { console.log(err);
    });

  };

  render() {
    if(this.state.redirect) {
      return (<Redirect to={{
        pathname: `/transaction/${this.state.txid}`
      }} />)
    }

    let transactions = [];
    let transactionCount;
    if(this.state.cashAddress) {
      transactionCount = <FormattedNumber value={this.state.transactions.length}/>;

      this.state.txs.forEach((tx, ind) => {
        // if(tx.vin[0].cashAddress === this.state.cashAddress) {
        //   val = <td className='plus'><FormattedNumber value={tx.valueOut}/></td>;
        // } else {
        //   val = <td className='minus'><FormattedNumber value={tx.valueOut}/></td>;
        // }
        transactions.push(
          <tr key={ind} className="" onClick={this.handleRedirect.bind(this, tx.txid)}>
            <td>{tx.txid}</td>
            <td><FormattedNumber value={tx.vin.length}/></td>
            <td><FormattedNumber value={tx.vout.length}/></td>
            <td><FormattedNumber maximumFractionDigits={8} value={tx.valueIn}/></td>
          </tr>
        )
      })
    }

    let table;
    if(this.state.transactions.length > 0) {
      table = <table className="pure-table">
        <thead>
          <tr>
            <th>TXID</th>
            <th># vin</th>
            <th># vout</th>
            <th>value</th>
          </tr>
        </thead>

        <tbody className='navTable'>
          {transactions}
        </tbody>
      </table>;
    }

    let formattedBalance;
    if(this.state.balance) {
      formattedBalance = <FormattedNumber maximumFractionDigits={8} value={this.state.balance}/>;
    }

    let formattedReceived;
    if(this.state.totalReceived) {
      formattedReceived = <FormattedNumber maximumFractionDigits={8} value={this.state.totalReceived}/>;
    }

    return (
      <div className='Address container'>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-6 pure-u-lg-1-6">
            <QRCode value={this.state.id} />
          </div>
          <div className="l-box pure-u-1 pure-u-md-7-12 pure-u-lg-7-12">
            <h2 className=''> Address</h2>
              <p>Cash: {this.state.cashAddress}</p>
              <p>Legacy: {this.state.legacyAddress}</p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-4 pure-u-lg-1-4">
            <p><i className="fab fa-bitcoin" /> Balance: {formattedBalance}</p>
            <p><i className="fas fa-arrow-up" /> Total Received: {formattedReceived}</p>
          </div>
        </div>
        <h2 className='l-box'><i className="fas fa-exchange-alt" />  Transactions {transactionCount}</h2>
        {table}

        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default withRouter(Address);
