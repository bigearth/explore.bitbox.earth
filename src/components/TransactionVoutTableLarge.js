import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import MemoLarge from './MemoLarge';
import MemoSmall from './MemoSmall';
import _ from 'underscore';

import {FormattedNumber} from 'react-intl';

import "../styles/homepage.scss";

class TransactionVoutTableLarge extends Component {
  handleRedirect(path) {
    this.props.handleRedirect(path);
  }

  render() {

    let voutBody = [];
    if(this.props.vout) {
      this.props.vout.forEach((v, ind) => {
        console.log('foo', v)
        let output;
        let largeNullData;
        if(v.scriptPubKey.addresses && v.scriptPubKey.addresses.length > 0) {
          output = <Link
            to={`/address/${this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}`}>
            {this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0], false)}
          </Link>;
        } else {
          let op = v.scriptPubKey.asm;

          let memoPrefixes = [365, 621, 877, 1133, 1389, 1645, 1901, 3181];
          let blockpressPrefixes = [];

          let split = op.split(" ");
          let prefix = +split[1];
          console.log(prefix)
          if(_.includes(memoPrefixes, prefix)){
            largeNullData = <MemoLarge
              handleRedirect={this.handleRedirect.bind(this)}
              active={this.props.parsed.output && this.props.this.props.parsed.output == ind ? "active" : ""}
              parsed={this.props.parsed}
              key={ind+1}
              split={split}
              prefix={prefix}
              bitbox={this.props.bitbox}
              txid={this.props.txid}
            />
          }

        //   let blockpress = {
        //     setName: ['8d01', 397, 'Set Name'],
        //     createTextPost: ['8d02', 653, 'Create Text Post'],
        //     reply: ['8d03', 909, 'Reply'],
        //     like: ['8d04', 1165, 'Like'],
        //     follow: ['8d06', 1677, 'Follow'],
        //     unfollow: ['8d07', 1933, 'Unfollow'],
        //     setProfileHeader: ['8d08', 2189, 'Set Profile Header'],
        //     createMediaPost: ['8d09', 2445, 'Create Media Post'],
        //     setProfileAvatar: ['8d10', 4237, 'Set Profile Avatar'],
        //     createPostInCommunity: ['8d11', 4493, 'Create Post in Community']
        //   }
        //   let blockpressKeys = Object.keys(blockpress);
        //   let blockpressVals = Object.values(blockpress);
        //   let obj = {
        //     asm: ''
        //   };
        //   blockpressVals.forEach((val, index) => {
        //     if(prefix === val[1]) {
        //       let asm
        //       if(prefix === 2445) {
        //         asm = `${split[0]} ${blockpressVals[index][0]} ${split[3]}`;
        //       } else if(prefix === 4493) {
        //         asm = `${split[0]} ${blockpressVals[index][0]} ${split[3]}`;
        //       } else {
        //         asm = `${split[0]} ${blockpressVals[index][0]} ${split[2]}`;
        //       }
        //
        //       let fromASM = this.props.bitbox.Script.fromASM(asm)
        //       let decoded = this.props.bitbox.Script.decode(fromASM)
        //       obj = {
        //         asm: asm,
        //         prefix: blockpressVals[index][0],
        //         action: blockpressKeys[index],
        //         message: decoded[2].toString('ascii')
        //       };
        //       let data;
        //       if(obj.action === 'setProfileHeader' || obj.action === 'setProfileAvatar') {
        //         data = <img src={obj.message} />;
        //       } else {
        //         data = obj.message;
        //       }
        //       largeNullData = <tr onClick={this.handleRedirect.bind(this, 'blockpress', this.state.id, obj.action)} key={ind+2} className={parsed.output && parsed.output == ind ? "active" : ""}>
        //           <td className='cursor'><img src={'/assets/blockpress.jpg'} /></td>
        //           <td className='cursor'><span className='title'>{blockpressVals[index][2]}</span> <br />{data}</td>
        //           <td className='cursor'>
        //           </td>
        //         </tr>
        //     }
        //   });
        //   output = obj.asm;
        }

        voutBody.push(
          <tr key={ind} className={this.props.parsed.output && this.props.parsed.output == ind ? "active" : ""}>
            <td>{v.n}</td>
            <td className='address'>{output}</td>
            <td>
              <FormattedNumber maximumFractionDigits={8} value={v.value}/>
            </td>
          </tr>
        );
        if(largeNullData) {
          voutBody.push(largeNullData);
        }
      });
    }

    return (
      <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 outputs large">
        <h3 className='content-subhead'><i className="fas fa-long-arrow-alt-up" /> Outputs</h3>
        <table className="pure-table">
          <thead>
            <tr>
              <th>#</th>
              <th><i className="fas fa-qrcode" /> Address</th>
              <th><i className="fab fa-bitcoin" /> Value</th>
            </tr>
          </thead>
          <tbody>
            {voutBody}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TransactionVoutTableLarge);
