import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';
let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: "138.68.54.100",
  port: "8332",
  username: "bitcoin",
  password: "xhFjluMJMyOXcYvF",
  corsproxy: "remote"
});

import "../styles/homepage.scss";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Block ${id} - Explore by BITBOX`;
    this.setState({
      id: id
    });

    if(id.length !== 64) {
      BITBOX.Blockchain.getBlockHash(id)
      .then((result) => {
        BITBOX.Block.details(result)
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
      }, (err) => { console.log(err);
      });
    } else {
      BITBOX.Block.details(id)
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
      <div>
        <div className="splash-container">
          <div className="splash">
            <p>Bits: {this.state.bits}</p>
            <p>Chainwork: {this.state.chainwork}</p>
            <p>Confirmations: {this.state.confirmations}</p>
            <p>Difficulty: {this.state.difficulty}</p>
            <p>Hash: {this.state.hash}</p>
            <p>Height: {this.state.height}</p>
            <p>IsMainChain: {this.state.isMainChain}</p>
            <p>Merkleroot: {this.state.merkleroot}</p>
            <p>Nextblockhash: {this.state.nextblockhash}</p>
            <p>Nonce: {this.state.nonce}</p>
            <p>PoolInfo: {this.state.poolInfo}</p>
            <p>Previousblockhash: {this.state.previousblockhash}</p>
            <p>Reward: {this.state.reward}</p>
            <p>Size: {this.state.size}</p>
            <p>Time: {this.state.time}</p>
            <p>Tx: {this.state.tx.length}</p>
            <p>Version: {this.state.version}</p>
          </div>

          <div className="footer l-box is-center">
            Created w/ ❤️ on EARTH by <a href='https://twitter.com/bitboxearth'>@bitboxearth</a>. Donations <strong>bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Block);
