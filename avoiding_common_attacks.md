
Measures taken to avoid common attacks
Integer Overflow and Underflow
When max or min values are hit for integers the value wraps we have to be extra careful with smaller data types like uint8, uint16, etc, they can more easily reach their maximum value.

Mitigated against this risk by: Using the OpenZeppelin SafeMath library which has math operations with safety checks that throw on error.

Race Condition - Reentrancy
Calling external contract means it takes over control and in this case can call functions that could be called repeatedly before the first invocation of the function was finished.

Mitigated against this risk by: Used someAddress.transfer() which is considered safe against reentrancy.

Race Condition - Cross function
An external contract could call another function while executing original.

Mitigated against this risk by: Where external call can't be avoided then internal work is done before the call.

DoS with (Unexpected) revert
Passing execution to another contract that always reverts makes original function unusable.

Mitigated against this risk by: Avoided looping behaviour where e.g. a function costs more and more gas each time is used.

Logic Bugs
Simple programming mistakes can cause the contract to behave differently to its stated rules, especially on 'edge cases'.

Mitigated against this risk by:

Running tests against the contracts - run 'truffle tests' to view. Avoiding overly complex rules (even at the cost of some functionality) or complicated implementation (even at the cost of some gas).

Following Solidity coding standards and general coding best practices for safety-critical software.

Exposed Secrets
All code and data on the blockchain is visible by anyone, even if not marked as "public" in Solidity.

Mitigated against this risk by: Ensuring contracts do not rely on any secret information.

Tx.Origin Problem
If a contract relies on Solidity 'tx.origin' to decide who the caller is (e.g. to see if they're allowed to withdraw their funds), there's a danger that a malicious intermediary contract could make calls to the contract on behalf of the user (who presumably thought the malicious intermediary contract would do something else). See vessenes.com - Tx.Origin And Ethereum Oh My! for a better description.

Mitigated against this risk by: Not using tx.origin for at all.

Transaction ordering
Miners choose order to include transactions from mempool in their block. Anyone can know what transaction are about to occur by viewing mempool.

Mitigated against this risk by: This isn't an issue for this project but can be important to bear in mind for things like decentralised exchanges where batch submitting might be a good solution.

Timestamp Dependence
Timestamps of blocks can be manipulated by the miner.

Mitigated against this risk by: There are no timestamps used in this project but best practice recommends that all direct and indirect uses of the timestamp should be considered.

Forcibly Sending Ether to a Contract
It’s possible to force sending Ether to a contract without triggering its fallback function.

Mitigated against this risk by: This project doesn't use contract balance in critical logic.

Use require() properly
Used require(condition) for input validation, which has been done on any user input, and reverts if the condition is false. Following this paradigm allows formal analysis tools to verify that the invalid opcode can never be reached: meaning no invariants in the code are violated and that the code is formally verified.