import React, { Component } from 'react';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class MemoLarge extends Component {
  handleRedirect(type, action) {
    let path;
    if(action === 'Set Name' || action === 'Like' || action === 'Set Profile Text' || action === 'Follow' || action === 'Unfollow') {
      path = "https://memo.cash";
    } else {
      path = `https://memo.cash/post/${this.props.txid}`;
    }

    this.props.handleRedirect(path);
  }

  render() {
    console.log("this.props")
    console.log(this.props)
      // <tr onClick={this.handleRedirect.bind(this, this.props.decoded.service, this.props.decoded.action)} className={this.props.active}>
      //   <td className='cursor'><img src={'/assets/memo.jpg'} /></td>,
      //   <td className='cursor'><span className='title'>{this.props.decoded.action}</span> <br />{this.props.decoded.message}</td>,
      //   <td className='cursor'></td>
      // </tr>
    return (
      <tr onClick={this.handleRedirect.bind(this, this.props.decoded.service, this.props.decoded.action)} className={this.props.active}>
        <td className='cursor'><img src={`/assets/${this.props.decoded.service}.jpg`} /></td>
        <td className='cursor'>{this.props.decoded.message}</td>
        <td className='cursor'></td>
      </tr>
    );
  }
}

export default withRouter(MemoLarge);
