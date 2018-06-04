import React, { Component } from 'react';
import {
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';
import Slider from 'react-slick';

import "../styles/homepage.scss";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      showSearch: true
    }

    if(props.location.pathname === '/') {
      this.setState({
        showSearch: false
      });
    }
  }

  handleInputChange(e) {
    let value = e.target.value;
    this.setState({
      searchTerm: value
    });
  }

  componentDidMount() {
    if(this.props.location.pathname === '/') {
      this.setState({
        showSearch: false
      });
    }
  }

  componentWillReceiveProps(props) {
    if(props.location.pathname === '/') {
      this.setState({
        showSearch: false
      });
    } else {
      this.setState({
        showSearch: true
      });
    }
  }

  handleSubmit(searchTerm, event) {
    if(searchTerm.length === 54 || searchTerm.length === 42 || searchTerm.length === 34) {
        this.setState({
          searchTerm: ''
        });
        this.props.history.push(`/address/${searchTerm}`)
    } else if(searchTerm.length === 64) {
      this.props.bitbox.Transaction.details(searchTerm)
      .then((result) => {
        this.setState({
          searchTerm: ''
        });
        this.props.history.push(`/transaction/${searchTerm}`)
      }, (err) => {
        console.log('4', err);
      });
    } else {
      this.props.bitbox.Blockchain.getBlockHash(searchTerm)
      .then((result) => {
        this.setState({
          searchTerm: ''
        });
        this.props.history.push(`/block/${searchTerm}`)
      }, (err) => {
        console.log('2', err);
      });
    }
    event.preventDefault();
  }

  render() {
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
          </li>
        )
      });
    }
    let search;
    if(this.state.showSearch) {
      search = <div className="l-box pure-u-1 pure-u-md-1-3 pure-u-lg-1-3">
        <span className="input-icon-wrap">
          <form onSubmit={this.handleSubmit.bind(this, this.state.searchTerm)}>
            <input id="form-name" onChange={this.handleInputChange.bind(this)} value={this.state.searchTerm} placeholder="SEARCH BLOCK/ADDRESS/TRANSACTION" type="text" className="pure-input-rounded input-with-icon" />
          </form>
          <span className="input-icon"><i className="fas fa-search" /></span>
        </span>
      </div>
    }

    return (
      <div className="header">
        <div className="home-menu main-menu pure-menu pure-menu-horizontal pure-menu-fixed">
          <div className="pure-g">
            <div className="l-box pure-u-1 pure-u-md-2-3 pure-u-lg-2-3">
              <Link className="pure-menu-heading header-logo" to="/">
                <img src={'/assets/logo.png'} /> <br />BitBox
              </Link>
            </div>
            {search}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
