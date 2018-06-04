import React, { Component } from 'react';
import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';

import "../styles/homepage.scss";
import Footer from './Footer';

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
    document.title = "EXPLORE - Bitcoin Cash Block Explorer by BITBOX.";

    // this.props.bitbox.Blockchain.getBlockCount()
    // .then((result) => {
    //   for(let i = result; i >= (result - 10); i--) {
    //     this.props.bitbox.Blockchain.getBlockHash(i)
    //     .then((result) => {
    //       this.props.bitbox.Block.details(result)
    //       .then((result) => {
    //         if(i === result) {
    //           this.props.bitbox.Transaction.details(block.hash)
    //           .then((result) => {
    //             console.log(result)
    //           }, (err) => { console.log(err);
    //           });
    //         }
    //
    //         let blocks = this.state.blocks;
    //         blocks.push(result);
    //         this.setState({
    //           blocks: blocks
    //         });
    //       }, (err) => { console.log(err);
    //       });
    //     }, (err) => { console.log(err);
    //     });
    //   }
    // }, (err) => { console.log(err);
    // });
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
    } else if(searchTerm.length === 64) {
      this.props.bitbox.Transaction.details(searchTerm)
      .then((result) => {
        this.props.history.push(`/transaction/${searchTerm}`)
      }, (err) => {
        console.log('4', err);
      });
    } else {
      this.props.bitbox.Blockchain.getBlockHash(searchTerm)
      .then((result) => {
        this.props.history.push(`/block/${searchTerm}`)
      }, (err) => {
        console.log('2', err);
      });
    }
    event.preventDefault();
  }

  render() {
          // <div className="content features">
          //   <div className="pure-g">
          //     <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          //       <p className="header-icon"><i className="fa fa-cubes" /></p>
          //       <h2 className="content-head">
          //         Latest Blocks
          //       </h2>
          //       <ul>
          //         {blocks}
          //       </ul>
          //     </div>
          //     <div className="l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-2">
          //       <p className="header-icon"><i className="fa fa-exchange-alt" /></p>
          //       <h2 className="content-head">
          //         Latest Transactions
          //       </h2>
          //     </div>
          //   </div>
          // </div>

    let blocks = [];
    if(this.state.blocks) {
      this.state.blocks.forEach((block, index) => {
        blocks.push(
          <li key={index}>
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
      <div className='Homepage'>
        <div className="splash-container">
          <div className="splash">
            <h1 className="splash-head">EXPLORE</h1>
            <p className="splash-subhead">
              Bitcoin Cash Block Explorer by BITBOX.
            </p>
            <span className="input-icon-wrap">
              <form onSubmit={this.handleSubmit.bind(this, this.state.searchTerm)}>
                <input id="form-name" onChange={this.handleInputChange.bind(this)} value={this.state.searchTerm} placeholder="SEARCH BLOCK HEIGHT, ADDRESS or TRANSACTION" type="text" className="pure-input-rounded input-with-icon" />
              </form>
              <span className="input-icon"><i className="fas fa-search" /></span>
            </span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Homepage);
