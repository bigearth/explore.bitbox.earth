import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  NavLink,
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

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      redirect: false,
      blockIndex: null,
      hash: null,
      searchTerm: ''
    }
  }

  componentDidMount() {
    document.title = "BITBOX by EARTH - Supercharge your Bitcoin Cash workflow";

    BITBOX.Blockchain.getBlockCount()
    .then((result) => {
      for(let i = result; i >= (result - 10); i--) {
        BITBOX.Blockchain.getBlockHash(i)
        .then((result) => {
          BITBOX.Block.details(result)
          .then((result) => {
            if(i === result) {
              BITBOX.Transaction.details(block.hash)
              .then((result) => {
                console.log(result)
              }, (err) => { console.log(err);
              });
            }

            let blocks = this.state.blocks;
            blocks.push(result);
            this.setState({
              blocks: blocks
            });
          }, (err) => { console.log(err);
          });
        }, (err) => { console.log(err);
        });
      }
    }, (err) => { console.log(err);
    });
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      searchTerm: value
    });
  }

  handleSubmit(searchTerm, event) {
    if(searchTerm.length === 54 || searchTerm.length === 42 || searchTerm.length === 34) {
        this.props.history.push(`/address/${searchTerm}`)
    } else {
        BITBOX.Blockchain.getBlockHash(searchTerm)
        .then((result) => {
          this.props.history.push(`/block/${searchTerm}`)
        }, (err) => {
          console.log('2', err);
        });

        BITBOX.Transaction.details(searchTerm)
        .then((result) => {
          this.props.history.push(`/transaction/${searchTerm}`)
        }, (err) => {
          console.log('4', err);
        });
    }
    // > "ca69d904c460403ac9d09b95cd838849487e5c735684c34fb7a276da0f86fb35".length
    // 64
    // let index;
    // let result;
    // if(searchTerm !== '') {
    //   // first search by block index
    //   result = underscore.findWhere(blockchain.chain, {index: +searchTerm});
    //   if(!result) {
    //     // next search by block header
    //     result = underscore.findWhere(blockchain.chain, {header: searchTerm});
    //   }
    // }
    //
    // if(result) {
    //   this.props.history.push(`/blocks/${result.index}`)
    // // } else {
    // //
    // //   blockchain.chain.forEach((block) => {
    // //     block.transactions.forEach((tx) => {
    // //       // next search by tx hash and raw hex
    // //       if(tx.hash === searchTerm || tx.rawHex === searchTerm) {
    // //         result = tx;
    // //         index = block.index;
    // //       }
    // //     })
    // //   })
    // //
    // //   if(result) {
    // //     console.log(`/blocks/${index}/transactions/${result.hash}`)
    // //     this.props.history.push(`/blocks/${index}/transactions/${result.hash}`)
    // //   }
    // }
    // this.props.resetValue();
    event.preventDefault();
  }

  render() {
    let blocks = [];
    if(this.state.blocks) {
      this.state.blocks.forEach((block, index) => {
        blocks.push(<li key={index}>
            <NavLink
              activeClassName="pure-menu-selected"
              className="pure-menu-link"
              to={`/block/${block.hash}`}>
              <i className="fas fa-cube"></i> Block: {block.height}
            </NavLink>

          </li>)
      });
    }
    return (
      <div>
        <div className="splash-container">
          <div className="splash">
            <h1 className="splash-head">EXPLORE</h1>
            <p className="splash-subhead">
              Bitcoin Cash Block Explorer by BITBOX.
            </p>
            <span className="input-icon-wrap">
              <form onSubmit={this.handleSubmit.bind(this, this.state.searchTerm)}>
                <input id="form-name" onChange={this.handleInputChange.bind(this)} value={this.state.searchTerm} placeholder="SEARCH BLOCK/ADDRESS/TRANSACTION" type="text" className="pure-input-rounded input-with-icon" />
              </form>
              <span className="input-icon"><i className="fas fa-search" /></span>
            </span>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="content features">
              <h2 className="content-head is-center">Features</h2>

              <div className="pure-g">
                  <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
                    <p className="header-icon"><i className="fa fa-cubes" /></p>
                    <h3 className="content-subhead">
                      Latest Blocks
                    </h3>
                    <ul>
                      {blocks}
                    </ul>
                  </div>
                  <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
                    <p className="header-icon"><i className="fa fa-exchange-alt" /></p>
                    <h3 className="content-subhead">
                      Latest Transactions
                    </h3>
                  </div>
              </div>
          </div>
          <div className="footer l-box is-center">
            Created w/ ❤️ on EARTH by <a href='https://twitter.com/bitboxearth'>@bitboxearth</a>. Donations <strong>bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Homepage);
