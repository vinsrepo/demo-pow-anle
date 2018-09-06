pragma solidity ^0.4.7;
import "./IERC20.sol";

contract UsuryContract is IERC20 {
    
    string public constant symbol = 'VND';
    string public constant name = 'viet nam dong';
    uint8 public constant decimals = 0;
    
    uint public constant _totalSupply = 10000;
    
    address private ownSpender; // nguoi cho vay
    address private ownBorrower; // nguoi vay
    uint private highestBid; // so tien giao dich da ki ket
    uint private lastLoaned = 0; // so tien lan cuoi cung vay
    uint private lastWithDrawFromBorrower = 0; // so tien lan cuoi rut cua con no
    uint public deadline; // thoi gian ki het hop dong
   
    mapping(address => uint256) balances;
    
    //Owner of account approves the transfer of an amount to another account
    mapping(address => mapping(address => uint256)) allowed;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
    
    function roleOfContract(address _spender, address _borrower, uint _highestBid) {
        ownSpender = _spender;
        ownBorrower = _borrower;
        highestBid = _highestBid;
    }
   
    function getRoleOfContract() view returns (address, address, uint, uint) {
        return (ownSpender, ownBorrower, highestBid, deadline);
    }
   
    function totalSupply() view returns (uint256 totalSupply) {
        return _totalSupply;
    }
    
    function balanceOf(address _owner) view returns (uint256 balance) {
        return balances[_owner];
    }
    
    function loan(uint _value) returns (bool success) {
        require(msg.sender == ownBorrower 
                && balances[ownSpender] >= _value
                && highestBid >= (lastLoaned + _value)
                && _value >= 0
        );
        lastLoaned += _value;
        balances[ownSpender] -= _value;
        balances[msg.sender] += _value;
    
        emit Transfer(ownSpender, ownBorrower, _value);
        return true;
    }
    
    function deposit() external {
        require(msg.sender != 0x0);
        require(msg.value >= 0);
        balances[msg.sender] += msg.value;
        emit Transfer(address(0), msg.sender, msg.value);
    }
    
     function setDeadline(uint _timer) returns(bool success){
        require(msg.sender == ownSpender);
        deadline = _timer;
        return true;
    }
    
    function automaticWithdrawBorrower(uint _value) returns(bool){
       if(deadline - now == 0) {
            require(
               (balances[ownBorrower] - _value) >= 0
               && highestBid >= (lastWithDrawFromBorrower + _value)
            );
            balances[ownBorrower] -= _value;
            lastWithDrawFromBorrower += _value;
            
            emit Transfer(ownBorrower, ownSpender, _value);
            return true;
       }
       return automaticWithdrawBorrower(_value);
    }
    
    function transfer(address _to, uint256 _value) returns (bool success) {
        require(_to != 0x0);
        require(
            balances[msg.sender] >= _value
            && _value >= 0
        );
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        require(
            allowed[_from][msg.sender] >= _value
            && balances[_from] >= _value
            && _value >= 0
        );
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    
}