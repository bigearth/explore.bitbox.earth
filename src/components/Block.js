import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import ReactPaginate from 'react-paginate';
import SmallTransactionTable from './SmallTransactionTable';
import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: [],
      id: null,
      poolInfo: {},
      perPage: 5,
      redirect: false,
      txid: null,
      txs: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    this.determineEndpoint(id);
  }

  componentWillReceiveProps(props) {
    let id = props.match.params.id;

    this.determineEndpoint(id);
  }

  handleRedirect(txid) {
    this.setState({
      redirect: true,
      txid: txid
    })
  }

  determineEndpoint(id) {
    document.title = `Block ${id} - Explore by this.props.bitbox`;
    this.setState({
      id: id,
      offset: 0
    });

    if(id.length !== 64) {
      this.props.bitbox.Blockchain.getBlockHash(id)
      .then((result) => {
        this.fetchBlockData(result);
      }, (err) => { console.log(err);
      });
    } else {
      this.fetchBlockData(id);
    }
  }

  fetchBlockData(id) {
    this.props.bitbox.Block.details(id)
    .then((result) => {
      this.fetchTransactionData(result.tx);

      this.setState({
        confirmations: result.confirmations,
        difficulty: result.difficulty,
        hash: result.hash,
        height: result.height,
        nextblockhash: result.nextblockhash,
        poolInfo: result.poolInfo,
        previousblockhash: result.previousblockhash,
        reward: result.reward,
        size: result.size / 1000,
        time: result.time,
        transactions: result.tx,
        pageCount: Math.floor(result.tx.length / this.state.perPage)
      });
    }, (err) => { console.log(err);
    });
  }

  fetchTransactionData(transactions) {
    let txs = [];
    let upperBound = this.state.perPage;
    if(transactions.length < upperBound) {
      upperBound = transactions.length;
    }

    for(let i = this.state.offset; i < this.state.offset + upperBound; i++) {
      txs.push(transactions[i]);
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
    for(let i = selected; i < selected + this.state.perPage; i++) {
      txs.push(this.state.transactions[i]);
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
    if(this.state.transactions) {
      transactionCount =  <FormattedNumber value={this.state.transactions.length}/>;

      this.state.txs.forEach((tx, ind) => {
        transactions.push(
          <tr key={ind} onClick={this.handleRedirect.bind(this, tx.txid)}>
            <td>{tx.txid}</td>
            <td><FormattedNumber value={tx.vin.length}/></td>
            <td><FormattedNumber value={tx.vout.length}/></td>
            <td><FormattedNumber maximumFractionDigits={8} value={tx.valueOut}/></td>
          </tr>
        )
      })
    }

    let tableSmall;
    if(this.state.txs && this.state.txs.length > 0) {
      tableSmall = <SmallTransactionTable transactions={this.state.txs} handleRedirect={this.handleRedirect.bind(this)}/>;
    }

    let tableLarge;
    if(this.state.txs && this.state.txs.length > 0) {
      tableLarge = <table className="pure-table large">
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
        </table>
    }

    let formattedBlockHeight;
    if(this.state.height) {
      formattedBlockHeight = <FormattedNumber value={this.state.height}/>;
    }

    let formattedConfirmations;
    if(this.state.confirmations) {
      formattedConfirmations = <FormattedNumber value={this.state.confirmations}/>;
    }

    let formattedDifficulty;
    if(this.state.difficulty) {
      formattedDifficulty = <FormattedNumber value={this.state.difficulty}/>;
    }
    return (
      <div className='Block container'>
        <h2 className='l-box'><i className="fas fa-cube" /> Block {formattedBlockHeight}</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="fas fa-code" /> Hash: {this.state.hash}</p>
            <p><i className="far fa-calendar-alt" /> Time: {moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><i className="far fa-check-square" /> Confirmations: {formattedConfirmations}</p>
            <p><i className="fas fa-link" /> Difficulty: {formattedDifficulty}</p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="far fa-file" /> Size: {this.state.size} kb</p>
            <p><i className="fab fa-bitcoin" /> Reward: {this.state.reward}</p>
            <p><i className="fas fa-arrow-right" /> next:
              <Link
                to={`/block/${this.state.nextblockhash}`}>
                {this.state.nextblockhash}
              </Link>
            </p>
            <p><i className="fas fa-arrow-left" /> prev:
              <Link
                to={`/block/${this.state.previousblockhash}`}>
                {this.state.previousblockhash}
              </Link>
            </p>
            <p><i className="fas fa-wrench" /> Miner: <a href={this.state.poolInfo.url}>{this.state.poolInfo.poolName}</a></p>
          </div>
        </div>

        <h2 className='l-box'><i className="fas fa-exchange-alt" />  Transactions {transactionCount}</h2>
        {tableSmall}
        {tableLarge}

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

export default withRouter(Block);
