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
  corsproxy: "local"
});

import "../styles/homepage.scss";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
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
