// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract PermitToken is ERC20Permit {
    constructor() ERC20("PermitToken", "PERMIT") ERC20Permit("PermitToken") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
