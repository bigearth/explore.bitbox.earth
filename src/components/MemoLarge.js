import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class MemoLarge extends Component {
  constructor(props) {
    super(props);

    let memo = [
      ['6d01', 365, 'Set Name'],
      ['6d02', 621, 'Post Memo'],
      ['6d03', 877, 'Reply'],
      ['6d04', 1133, 'Like'],
      ['6d05', 1389, 'Set Profile Text'],
      ['6d06', 1645, 'Follow'],
      ['6d07', 1901, 'Unfollow'],
      ['6d0C', 3181, 'Post Topic Message']
    ];

    this.state = {
      memo: memo,
    };
  }

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
    let tr;
    let obj;
    this.state.memo.forEach((val, index) => {
      if(this.props.prefix === val[1]) {
        let asm
        if(this.props.prefix === 877) {
          asm = `${this.props.split[0]} ${this.state.memo[index][0]} ${this.props.split[3]}`;
        } else {
          asm = `${this.props.split[0]} ${this.state.memo[index][0]} ${this.props.split[2]}`;
        }
        let fromASM = this.props.bitbox.Script.fromASM(asm)
        let decoded = this.props.bitbox.Script.decode(fromASM)
        obj = {
          asm: asm,
          prefix: this.state.memo[index][0],
          action: this.state.memo[index][2],
          message: decoded[2].toString('ascii')
        };
        tr = [
          <td className='cursor' key={index}><img src={'/assets/memo.jpg'} /></td>,
          <td className='cursor' key={index+1}><span className='title'>{this.state.memo[index][2]}</span> <br />{obj.message}</td>,
          <td className='cursor' key={index+2}></td>
        ];
      }
    });
    return (
      <tr onClick={this.handleRedirect.bind(this, 'memo', obj.action)} className={this.props.active}>
        {tr}
      </tr>
    );
  }
}

export default withRouter(MemoLarge);
