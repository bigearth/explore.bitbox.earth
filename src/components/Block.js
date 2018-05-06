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
      id: null
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
          // console.log(result)
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
            // poolInfo: result.poolInfo,
            previousblockhash: result.previousblockhash,
            reward: result.reward,
            size: result.size,
            time: result.time,
            length: result.length,
            version: result.version,
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
          // poolInfo: result.poolInfo,
          previousblockhash: result.previousblockhash,
          reward: result.reward,
          size: result.size,
          time: result.time,
          length: result.length,
          version: result.version,
        });
      }, (err) => { console.log(err);
      });
    }

  }

  render() {
    return (
      <div className='Block'>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <p>Confirmations: {this.state.confirmations}</p>
            <p>Difficulty: {this.state.difficulty}</p>
            <p>Hash: {this.state.hash}</p>
            <p>Height: {this.state.height}</p>
          </div>
          <div className="pure-u-1-2">
            <p>next:
              <Link
                to={`/block/${this.state.nextblockhash}`}>
                <i className="fa fa-code"></i> {this.state.nextblockhash}
              </Link>
            </p>
            <p>PoolInfo: {this.state.poolInfo}</p>
            <p>previous:
              <Link
                to={`/block/${this.state.previousblockhash}`}>
                <i className="fa fa-code"></i> {this.state.previousblockhash}
              </Link>
            </p>
            <p>Reward: {this.state.reward}</p>
            <p>Size: {this.state.size}</p>
            <p>Time: {this.state.time}</p>
            <p>Tx: {this.state.tx.length}</p>
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

export default withRouter(Block);
