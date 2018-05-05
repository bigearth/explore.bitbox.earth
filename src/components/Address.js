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
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: '',
  corsproxy: 'remote'
});

import "../styles/homepage.scss";

class Address extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Explore by BITBOX - Address ${id}`;
    this.setState({
      id: id
    });

    BITBOX.Address.details(BITBOX.Address.toLegacyAddress(id))
    .then((result) => {
      console.log(result);
    }, (err) => { console.log(err);
    });
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div>
        <div className="splash-container">
          <div className="splash">
            <h1 className="splash-head">Address</h1>
            <p className="splash-subhead">
              Bitcoin Cash Block Explorer by BITBOX.
            </p>
            <p>
              <a href="https://github.com/bigearth/bitbox-gui/releases/download/0.7.8/BITBOX-0.7.8.dmg" className="pure-button pure-button-primary">
                <i className="fab fa-apple"></i> Download (MacOS)
              </a>
            </p>
            <div>
              <p className="splash-subhead install">
              INSTALL VIA NPM
              </p>
              <p>
                <code>npm install bitbox-cli --global</code>
              </p>
            </div>
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
                    <p>
                      Your own Bitcoin Cash blockchain to configure however you choose. Execute commands from the command line and w/ web bindings.
                    </p>
                  </div>
                  <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
                    <p className="header-icon"><i className="fa fa-exchange-alt" /></p>
                    <h3 className="content-subhead">
                      Latest Transactions
                    </h3>
                    <p>
                      Generate any number of addresses. Toggle the address between public/privateWIF and cashaddr/base58. Set a custom mnemonic and/or HD Derivation Path. Generate/Translate mnemonics in 8 languages.
                    </p>
                  </div>
              </div>
          </div>
          <div className="footer l-box is-center">
            Created w/ ❤️ on EARTH by <a href='https://twitter.com/bitboxearth'>@bitboxearth</a>. Donations <strong>bitcoincash:qpcxf2sv9hjw08nvpgffpamfus9nmksm3chv5zqtnz</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Address);
