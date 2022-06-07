// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Ownable.sol";

contract SimpleATM is Ownable {

    uint availableBalance;

    struct Account{
        uint withdrawnAmount;
        uint allowance;
        bool isAllowedToWithdraw;

    }

    mapping (address => Account) accounts;
    uint noOfAccounts;
  //  mapping(address=>uint) allowance;

  event Deposit(address indexed _address, uint amount);
  event WithDraw(address indexed _address, uint amount);

    modifier isAuthorizedToWithdraw() {
        require(accounts[msg.sender].isAllowedToWithdraw || msg.sender== owner(), "You are not authorized to withdraw amount.");
        _;
    }

    //To Provide withDraw access to any address
    function provideAccessToWithDraw(address _address) public onlyOwner{
        accounts[_address].isAllowedToWithdraw = true;
    } 

    //To check balance
    function getBalance() view public  returns(uint) {
        return address(this).balance;
    }

    //To check balance
    function getBalanceOf2() view public  returns(uint) {
        return msg.sender.balance;
    }

   
   //To deposit amount 
    function deposit() public payable onlyOwner returns(bool success) {
        require(msg.value > 0, "Amount is not valid");
        availableBalance += msg.value;
        emit Deposit(owner(), msg.value);
        return true;
    }

    //To withdraw amount from account
    function withDraw(uint _amountToWithdraw) public payable isAuthorizedToWithdraw returns(bool success)   {
        require(accounts[msg.sender].allowance > _amountToWithdraw, "Insufficient balance");
        require( address(this).balance > _amountToWithdraw, "Insufficient balance");
        payable(msg.sender).transfer(_amountToWithdraw);
        accounts[msg.sender].allowance -= _amountToWithdraw;
        accounts[msg.sender].withdrawnAmount += _amountToWithdraw;
        emit WithDraw(msg.sender, msg.value);
        return true;
    }

    function approve(address _address, uint _amount) onlyOwner external{
        require(availableBalance > _amount, "Insufficient Balance");
        accounts[_address].allowance = _amount;

    }

   
}