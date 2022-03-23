pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MockNFT is ERC721Enumerable {
  string public baseURI = "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/";

  constructor() ERC721("MockNFT", "MOCK") {}

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }
}
