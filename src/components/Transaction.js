import React, { Component } from 'react';
import moment from 'moment';
import {
  Link,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';
import {FormattedNumber} from 'react-intl';
import queryString from 'query-string';

import "../styles/homepage.scss";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tx: [],
      vin: [],
      vout: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    document.title = `Transaction ${id} - Explore by BITBOX`;
    this.setState({
      id: id
    });

    this.fetchTransactionData(id);
  }

  componentWillReceiveProps(props) {
    let id = props.match.params.id;
    document.title = `Transaction ${id} - Explore by BITBOX`;
    this.setState({
      id: id,
      blockhash: '',
      blockheight: '',
      confirmations: '',
      size: '',
      time: '',
      txid: '',
      valueOut: '',
      vin: [],
      vout: []
    });

    this.fetchTransactionData(id);
  }

  fetchTransactionData(id) {
    this.props.bitbox.Transaction.details(id)
    .then((result) => {
      this.setState({
        blockhash: result.blockhash,
        blockheight: result.blockheight,
        confirmations: result.confirmations,
        size: result.size / 1000,
        time: result.time,
        txid: result.txid,
        valueOut: result.valueOut,
        vin: result.vin,
        vout: result.vout
      });
    }, (err) => { console.log(err);
    });
  }

  render() {
    let parsed = queryString.parse(this.props.location.search);

    let formattedBlockHeight;
    if(this.state.blockheight) {
      formattedBlockHeight = <FormattedNumber value={this.state.blockheight}/>;
    }

    let formattedConfirmations;
    if(this.state.confirmations) {
      formattedConfirmations = <FormattedNumber value={this.state.confirmations}/>;
    }

    let formattedValue;
    if(this.state.valueOut) {
      formattedValue = <FormattedNumber value={this.state.valueOut}/>;
    }

    let formattedSize;
    if(this.state.size) {
      formattedSize = this.state.size;
    }

    let date;
    if(this.state.time) {
      date = moment.unix(this.state.time).format('MMMM Do YYYY, h:mm:ss a');
    }
        // <tbody className='navTable'>
        //   {transactions}
        // </tbody>

    let vinBody = [];
    if(this.state.vin) {
      this.state.vin.forEach((v, ind) => {
        if(v.coinbase) {
          vinBody.push(
            <tr key={ind} className={parsed.input && parsed.input == ind ? "active" : ""}>
              <td>Coinbase</td>
              <td>No Inputs</td>
              <td></td>
              <td></td>
            </tr>
          );
        } else {
          vinBody.push(
            <tr key={ind} className={parsed.input && parsed.input == ind ? "active" : ""}>
              <td>
                <Link
                  to={`/transaction/${v.txid}`}>
                  <i className="fas fa-chevron-left" />
                </Link>
              </td>
              <td>
               <FormattedNumber maximumFractionDigits={8} value={this.props.bitbox.BitcoinCash.toBitcoinCash(v.value)}/>
              </td>
              <td>
                <Link
                  to={`/address/${v.cashAddress}`}>
                  {this.props.bitbox.Address.toCashAddress(v.cashAddress, false)}
                </Link>
              </td>
              <td>
              {v.n}
              </td>
            </tr>
          );
        }
      });
    }

    let vinTable;
    if(this.state.vin.length > 0) {
      vinTable = <table className="pure-table">
        <thead>
          <tr>
            <th></th>
            <th><i className="fab fa-bitcoin" /> Value</th>
            <th><i className="fas fa-qrcode" /> Address</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {vinBody}
        </tbody>
      </table>;
    }

    let voutBody = [];
    if(this.state.vout) {
      this.state.vout.forEach((v, ind) => {
        let output;
        let nulldata;
        if(v.scriptPubKey.addresses && v.scriptPubKey.addresses.length > 0) {
          output = <Link
            to={`/address/${this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0])}`}>
            {this.props.bitbox.Address.toCashAddress(v.scriptPubKey.addresses[0], false)}
          </Link>;
        } else {
          let op = v.scriptPubKey.asm;

          let memo = {
            setName: ['6d01', 365],
            postMemo: ['6d02', 621],
            reply: ['6d03', 877],
            like: ['6d04', 1133],
            setProfileText: ['6d05', 1389],
            follow: ['6d06', 1645],
            unfollow: ['6d07', 1901]
          }

          let blockpress = {
            setName: ['8d01', 397],
            postMemo: ['8d02', 653],
            reply: ['8d03', 909],
            like: ['8d04', 1165],
            follow: ['8d06', 1677],
            unfollow: ['8d07', 1933],
            setProfileHeader: ['8d08', 2189],
            createMediaPost: ['8d09', 2445],
            setProfileAvatar: ['8d10', 4237],
            createPostInCommunity: ['8d11', 4493]
          }

          let split = op.split(" ");
          let prefix = +split[1];
          let memoKeys = Object.keys(memo);
          let memoVals = Object.values(memo);
          let blockpressKeys = Object.keys(blockpress);
          let blockpressVals = Object.values(blockpress);
          let obj;
          memoVals.forEach((val, index) => {
            if(prefix === val[1]) {
              let asm = `${split[0]} ${memoVals[index][0]} ${split[2]}`
              let fromASM = this.props.bitbox.Script.fromASM(asm)
              let decoded = this.props.bitbox.Script.decode(fromASM)
              obj = {
                asm: asm,
                prefix: memoVals[index][0],
                action: memoKeys[index],
                message: decoded[2].toString('ascii')
              };
              nulldata = <tr key={ind+1} className={parsed.output && parsed.output == ind ? "active" : ""}>
                  <td>MEMO:</td>
                  <td>{obj.message}</td>
                  <td>
                  </td>
                </tr>
            }
          });
          blockpressVals.forEach((val, index) => {
            if(prefix === val[1]) {
              let asm = `${split[0]} ${blockpressVals[index][0]} ${split[2]}`
              let fromASM = this.props.bitbox.Script.fromASM(asm)
              let decoded = this.props.bitbox.Script.decode(fromASM)
              obj = {
                asm: asm,
                prefix: blockpressVals[index][0],
                action: blockpressKeys[index],
                message: decoded[2].toString('ascii')
              };
              let data;
              if(obj.action === 'setProfileHeader' || obj.action === 'setProfileAvatar') {
                data = <td><img src={obj.message} /></td>;
              } else {
                data = <td>{obj.message}</td>;
              }
              nulldata = <tr key={ind+2} className={parsed.output && parsed.output == ind ? "active" : ""}>
                  <td>Blockpress:</td>
                  {data}
                  <td>
                  </td>
                </tr>
            }
          });
          output = obj.asm;
        }

        voutBody.push(
          <tr key={ind} className={parsed.output && parsed.output == ind ? "active" : ""}>
            <td>{v.n}</td>
            <td className='address'>{output}</td>
            <td>
              <FormattedNumber maximumFractionDigits={8} value={v.value}/>
            </td>
          </tr>
        );
        if(nulldata) {
          voutBody.push(nulldata);
        }
      });
    }

    let voutTable;
    if(this.state.vout.length > 0) {
      voutTable = <table className="pure-table">
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
      </table>;
    }

    return (
      <div className='Transaction container'>
        <h2 className='l-box'><i className="fas fa-exchange-alt" /> Transaction {this.state.id}</h2>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="fas fa-cube" /> Included in block <Link
                to={`/block/${this.state.blockhash}`}>
                {formattedBlockHeight}
              </Link>
            </p>
            <p><i className="far fa-check-square" /> confirmations: {formattedConfirmations}</p>
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <p><i className="far fa-file" /> Size: {formattedSize} kb</p>
            <p><i className="far fa-calendar-alt" /> {date}</p>
          </div>
        </div>
        <div className="pure-g">
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
            <h3 className='content-subhead'><i className="fas fa-long-arrow-alt-down" /> Inputs</h3>
            {vinTable}
          </div>
          <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2 outputs">
            <h3 className='content-subhead'><i className="fas fa-long-arrow-alt-up" /> Outputs</h3>
            {voutTable}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Transaction);
