import React, { Component } from 'react';
import moment from 'moment';
import {
  NavLink,
  Link,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';

import "../styles/homepage.scss";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: [],
      id: null,
      poolInfo: {}
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Block ${id} - Explore by this.props.bitbox`;
    this.setState({
      id: id
    });

    this.fetchData(id);
  }

  componentWillReceiveProps(props) {
    let id = props.match.params.id;
    document.title = `Block ${id} - Explore by this.props.bitbox`;
    this.setState({
      id: id
    });

    this.fetchData(id);
  }

  fetchData(id) {
    if(id.length !== 64) {
      this.props.bitbox.Blockchain.getBlockHash(id)
      .then((result) => {
        this.props.bitbox.Block.details(result)
        .then((result) => {
          this.setState({
            bits: result.bits,
            chainwork: result.chainwork,
            confirmations: result.confirmations,
            difficulty: result.difficulty,
            hash: result.hash,
            height: result.height,
            isMainChain: result.isMainChain,
            merkleroot: result.merkleroot,
            nextblockhash: result.nextblockhash,
            nonce: result.nonce,
            poolInfo: result.poolInfo,
            previousblockhash: result.previousblockhash,
            reward: result.reward,
            size: result.size,
            time: result.time,
            length: result.length,
            version: result.version,
            tx: result.tx
          });
        }, (err) => { console.log(err);
        });
      }, (err) => { console.log(err);
      });
    } else {
      this.props.bitbox.Block.details(id)
      .then((result) => {
        this.setState({
          bits: result.bits,
          chainwork: result.chainwork,
          confirmations: result.confirmations,
          difficulty: result.difficulty,
          hash: result.hash,
          height: result.height,
          isMainChain: result.isMainChain,
          merkleroot: result.merkleroot,
          nextblockhash: result.nextblockhash,
          nonce: result.nonce,
          poolInfo: result.poolInfo,
          previousblockhash: result.previousblockhash,
          reward: result.reward,
          size: result.size,
          time: result.time,
          version: result.version,
          tx: result.tx
        });
      }, (err) => { console.log(err);
      });
    }

  }

  render() {
    return (
      <div className='Block'>
        <h2 className='l-box'><i className="fas fa-cube" /> Block {this.state.height}</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="fas fa-code" /> Hash: {this.state.hash}</p>
            <p><i className="far fa-calendar-alt" /> Time: {moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p><i className="far fa-check-square" /> Confirmations: {this.state.confirmations}</p>
            <p><i className="fas fa-link" /> Difficulty: {this.state.difficulty}</p>
            <p><i className="fas fa-exchange-alt" /> Tx: {this.state.tx.length}</p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="far fa-file" /> Size: {this.state.size}</p>
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
      </div>
    );
  }
}

export default withRouter(Block);
