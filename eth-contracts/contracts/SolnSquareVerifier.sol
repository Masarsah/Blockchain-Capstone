pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token{

 Verifier private verifierContract;





// TODO define a solutions struct that can hold an index & an address
  struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
        bool minted; //flag to indicate if this solution has been used in token minting
    }


// TODO define an array of the above struct
  uint256 numberOfSolutions = 0;

// TODO define a mapping to store unique solutions submitted

    mapping (bytes32 => Solution) solutions;

// TODO Create an event to emit when a solution is added

 event SolutionAdded(uint256 solutionIndex, address indexed solutionAddress);

    constructor(address verifierAddress) 
        CustomERC721Token() 
        public 
    {
        verifierContract = Verifier(verifierAddress);
    }




// TODO Create a function to add the solutions to the array and emit the event

 function addSolution(
        uint[2] memory A,
        uint[2][2] memory B,
        uint[2] memory C,
        uint[2] memory input
    ) 
        public 
    {
        bytes32 solutionKey = keccak256(abi.encodePacked(input[0], input[1]));

        require(solutions[solutionKey].solutionAddress == address(0), "Requires unique solution");
        
        bool verified = verifierContract.verifyTx(A, B, C, input);
        require(verified, "Requires valid solution");

        solutions[solutionKey] = Solution(numberOfSolutions, msg.sender, false);
        emit SolutionAdded(numberOfSolutions, msg.sender);
        numberOfSolutions++;
    }




// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  function mintNFT(uint a, uint b, address to) public
    {
        bytes32 solutionKey = keccak256(abi.encodePacked(a, b));
        require(solutions[solutionKey].solutionAddress != address(0), "Solution does not exist");
        require(solutions[solutionKey].minted == false, "Token already minted for this solution");
        require(solutions[solutionKey].solutionAddress == msg.sender, "incorrect solution");
        super.mint(to, solutions[solutionKey].solutionIndex);
        solutions[solutionKey].minted = true;
    }
}


























