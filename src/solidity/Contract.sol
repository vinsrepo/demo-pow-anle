pragma solidity ^0.4.18;
import "./IERC20.sol";
import "./SafeMath.sol";

contract FuncToken is IERC20 {
    using SafeMath for uint;
    
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowed;
    struct Instructor {
        uint age;
        string fName;
    }
    
    mapping (address => Instructor) instructors;
    
    function setInstructor(address _address, uint _age, string _fName) public {
        instructors[_address] = Instructor(_age, _fName);
    }
    
    function getInstructor(address ins) view public returns (uint age, string name) {
        return (instructors[ins].age, instructors[ins].fName);
    }
    
    
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    
    function transfer(address to, uint tokens) public returns (bool success) {
        require(to != address(0));
        require(balances[msg.sender] >= tokens);
        
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        
        
        
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        require(to != address(0));
        require(balances[from] >= tokens 
                && allowed[from][msg.sender] >= tokens
        );
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        
        
        
        emit Transfer(from, to, tokens);
        return true;
    }


    function() payable {
        require(msg.value >= 0);
        balances[msg.sender] = balances[msg.sender].add(msg.value);
        emit Transfer(0x00, msg.sender, msg.value);
    }
}