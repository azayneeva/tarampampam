
# Avoiding Common Attacks

## Race Condition: Reentrancy

This bug involves functions that could be called repeatedly, before the first invocation of the function was finished. This may cause the different invocations of the function to interact in destructive ways.

#### Tackled the risk by: 

Used `address.transfer()` instead of `address.call.value(y)()` which is considered safe against reentrancy. In `finalizeTask` function `task.complete` has been set to `true` before transferring funds so that reentry at this point is impossible.

## Cross-function Race Conditions

An attacker may be able to do a similar reentrancy attack using two different functions that share the same state.

#### Tackled the risk by:  

There are no functions in this project that share the same state.

## Transaction-Ordering Dependence (TOD) / Front Running

Attackers can manipulate the order of transactions themselves (within a block).

#### Tackled the risk by:  

This risk is more specific for decentralized market, and, I guess, it's not an issue for this particular project. 

## Timestamp Dependence

The timestamp of the block can be manipulated by the miner.

#### Tackled the risk by:

There are no timestamps used in this project.

## Integer Overflow and Underflow

If a balance reaches the maximum uint value (2^256) it will circle back to zero. If a uint is made to be less than zero, it will cause an underflow and get set to its maximum value.

#### Tackled the risk by: 

This project doesn't have issues with integer overflow and underflow. In case of complex integer manipulation using [OpenZeppelin Math libraries](https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/contracts/math) would help mitigating this risk.

## DoS with (Unexpected) revert

When a contract iterates through a loop, it's common to want to make sure that each round succeeds. If not, one should revert. The issue is that if one round fails, an attacker may revert the whole system, meaning the loop will never complete. 

#### Tackled the risk by: 

In this project I've avoided using `for` loops.

## Logic Bugs

Simple programming mistakes can cause the contract to behave differently to its stated rules, especially on 'edge cases'.

#### Tackled the risk by: 

Ran tests against the contracts and avoided overly complex rules or complicated implementation.

## Exposed Secrets

All code and data on the blockchain is visible by anyone, even if not marked as "public" in Solidity. Contracts that attempt to rely on keeping keys or behaviour secret are in for a surpsise.

#### Tackled the risk by:

Made sure that contracts do not rely on any secret information.

## Malicious Creator
If a contract gives the creator/owner of the contract too much power, they may take funds that should be owned by users of the contract, or change the behaviour of the contract in their favour.

#### Tackled the risk by:

To prevent users from modifying project contract by removing security restrictions, I've added a Factory contract that handles deployment of a new instance of project contract. It means that whenever users want to create a new project they will have to invoke Factory contract first, so there will be no chance for a malicious creator to modify the project contract. 

## Tx.Origin Problem

If a contract relies on Solidity 'tx.origin' to decide who the caller is (e.g. to see if they're allowed to withdraw their funds), there's a danger that a malicious intermediary contract could make calls to the contract on behalf of the user (who presumably thought the malicious intermediary contract would do something else). 

#### Tackled the risk by:

Not using tx.origin at all.