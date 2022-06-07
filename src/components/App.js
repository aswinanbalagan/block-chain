import React, { Component } from 'react';
import logo from '../logo.png';

import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json';
import SimpleBank from '../abis/SimpleBank.json';
import SideMenu from "./Sidenavbar";
import Balance from './Balance';
import Deposit from './Deposit';
import CustomizedSnackbars from './SnackBar';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: 0,
      products: [],
      loading: true,
      selectedMenu: 'Balance',
      contract: null
    }
  }






  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {

    /*  var Web3 = require('web3');
     var provider = 'https://mainnet.infura.io/v3/d694f22b3c264076b2c1a91ec54cd767';
     var web3Provider = new Web3.providers.HttpProvider(provider);
     var web3 = new Web3(web3Provider);
     web3.eth.getBlockNumber().then((result) => {
       console.log("Latest Ethereum Block is ",result);
     }); */

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
    /*  const networkId = await web3.eth.net.getId()
     console.log(networkId)  */
    //const networkData = Marketplace.networks[networkId]
    if (true) {
      const simpleBank = new web3.eth.Contract(SimpleBank, "0x3f9208D3e8Dad5E59C7dcB4549CCb22A5Ca904E1");
      const balance = await simpleBank.methods.getBalanceOf2().call()
      const v = await web3.eth.getBalance(accounts[0]);
      this.setState({ contract: simpleBank, balance: web3.utils.fromWei(v, 'ether') })
      console.log(web3.utils.fromWei(balance.toString(), 'ether'))
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  setSelectedMenu = (selectedMenu) => {
    this.setState({ selectedMenu })
  }

  onDeposit = (amount) => {
    this.state.contract.methods.deposit()
      .send({ from: this.state.account, value: window.web3.utils.toWei(amount, "ether") })
      .once("receipt", (receipt) => {
        this.setState({ notification: {open : true, message:"Deposited Successfully!", type:"success"} })
      })
      .on("error",  (error) =>{
        console.log(error);
        this.setState({ notification: {open : true, message:error.message, type:"error"} })
      });
  }

  onWithdraw = (amount) => {
    this.state.contract.methods.withDraw(amount)
      .send({ from: this.state.account})
      .once("receipt", (receipt) => {
        this.setState({ notification: {open : true, message:"Ether withdrawn Successfully!", type:"success"} })
      })
      .on("error",  (error) =>{
        console.log(error);
        this.setState({ notification: {open : true, message:error.message, type:"error"} })
      });
  }

  handleNotificationClose = () => {
    this.setState({ notification: null })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <SideMenu selected={this.state.selectedMenu} setSelected={this.setSelectedMenu} />
        <div className="container-fluid mt-5">
          {this.state.selectedMenu === 'Balance' && <Balance balance={this.state.balance} />}
          {this.state.selectedMenu === 'Deposit/WithDraw' && <Deposit onDeposit={this.onDeposit} onWithdraw={this.onWithdraw}/>}
          <CustomizedSnackbars notification={this.state.notification}  handleNotificationClose={this.handleNotificationClose}/>
        </div>

      </div>
    );
  }
}

export default App;
