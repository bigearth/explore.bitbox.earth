import React, { Component } from 'react';
import "../styles/homepage.scss";

class Footer extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="footer l-box is-center">
          Created w/ ❤️ on EARTH by <a href='https://twitter.com/bitboxearth'>@bitboxearth</a>. Donations <strong>bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c</strong>
        </div>
      </div>
    );
  }
}

export default Footer;
