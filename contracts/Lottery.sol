pragma solidity >=0.4.22 <0.7.0;

contract Lottery {
    
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now, players)));
    }
    
    function pickWinner() public payable restricted {
        uint256 index = random()%players.length;
        address addr = players[index];
        addr.transfer(this.balance);
        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[] memory){
        return players;
    }
    
}