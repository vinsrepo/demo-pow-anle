pragma solidity ^0.4.7;

interface IERC20 {
    
    //Returns the name of the token - e.g. "MyToken".
    // function name() view returns (string name);
    
    // //Returns the symbol of the token. E.g. "HIX".
    // function symbol() view returns (string symbol);
    
    //Returns the number of decimals the token uses - e.g. 8, 
    //means to divide the token amount by 100000000 to get its user representation.
    //function decimals() view returns (uint8 decimals);
    
    //Returns the total token supply.
    function totalSupply() view returns (uint256 totalSupply);
    
    //Returns the account balance of another account with address _owner.
    function balanceOf(address _owner) view returns (uint256 balance);
    
    //Transfers _value amount of tokens to address _to, and MUST fire the Transfer event.
    //The function SHOULD throw if the _from account balance does not have enough tokens to spend.
    function transfer(address _to, uint256 _value) returns (bool success);
    
    //The transferFrom method is used for a withdraw workflow, allowing contracts to transfer tokens on your behalf. 
    //This can be used for example to allow a contract to transfer tokens on your behalf and/or to charge fees in sub-currencies
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);
    
    //Allows _spender to withdraw from your account multiple times, up to the _value amount. 
    //If this function is called again it overwrites the current allowance with _value.
    //function approve(address _spender, uint256 _value) returns (bool success);
    
    //Returns the amount which _spender is still allowed to withdraw from _owner.
    //function allowance(address _owner, address _spender) view returns (uint256 remaining);
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
   // event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}