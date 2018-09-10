pragma solidity ^0.4.18;

interface IERC20 {
    
    function balanceOf(address _owner) view returns (uint256 balance);
  
    function transfer(address _to, uint256 _value) returns (bool success);
   
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
}