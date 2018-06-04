import React, { Component } from 'react';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import _ from 'underscore';

import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class BlockpressLarge extends Component {
  constructor(props) {
    super(props);

    let blockpress = [
      ['8d01', 397, 'Set Name'],
      ['8d02', 653, 'Create Text Post'],
      ['8d03', 909, 'Reply'],
      ['8d04', 1165, 'Like'],
      ['8d06', 1677, 'Follow'],
      ['8d07', 1933, 'Unfollow'],
      ['8d08', 2189, 'Set Profile Header'],
      ['8d09', 2445, 'Create Media Post'],
      ['8d10', 4237, 'Set Profile Avatar'],
      ['8d11', 4493, 'Create Post in Community']
    ];

    this.state = {
      blockpress: blockpress
    };
  }

  handleRedirect(type, action) {
    let path;
    if(_.includes(['Set Name', 'Follow', 'Unfollow', 'Set Profile Header', 'Create Media Post', 'Set Profile Avatar'], action)) {
      path = "https://www.blockpress.com/";
    } else {
      path = `https://www.blockpress.com/posts/${this.props.txid}`;
    }
    this.props.handleRedirect(path);
  }

  render() {
    let tr;
    let obj;
    this.state.blockpress.forEach((val, index) => {
      if(this.props.prefix === val[1]) {
        let asm
        if(this.props.prefix === 2445 || this.props.prefix === 4493) {
          asm = `${this.props.split[0]} ${this.state.blockpress[index][0]} ${this.props.split[3]}`;
        } else {
          asm = `${this.props.split[0]} ${this.state.blockpress[index][0]} ${this.props.split[2]}`;
        }

        let fromASM = this.props.bitbox.Script.fromASM(asm)
        let decoded = this.props.bitbox.Script.decode(fromASM)
        obj = {
          asm: asm,
          prefix: this.state.blockpress[index][0],
          action: this.state.blockpress[index][2],
          message: decoded[2].toString('ascii')
        };
        let data;
        if(obj.action === 'Set Profile Header' || obj.action === 'Set Profile Avatar') {
          data = <img src={obj.message} />;
        } else {
          data = obj.message;
        }
        tr = [
          <td className='cursor' key={index}><img src={'/assets/blockpress.jpg'} /></td>,
          <td className='cursor' key={index+1}><span className='title'>{this.state.blockpress[index][2]}</span> <br />{data}</td>,
          <td className='cursor' key={index+2}></td>
        ];
      }
    });

    return (
      <tr onClick={this.handleRedirect.bind(this, 'blockpress', obj.action)} className={this.props.active}>
        {tr}
      </tr>
    );
  }
}

export default withRouter(BlockpressLarge);
