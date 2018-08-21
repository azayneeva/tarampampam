# MAD - Make a Difference

Crowdfunding platform to make bright ideas come true.

## Description

This platform helps raising money to implement different project ideas in a transparent way. To raise money for a project users will have to:
1. Create a project on the platform. 
2. Specify tasks that have to be done to implement the project and the required amount of money for each of them, also the account address where money has to be sent to implement each of the tasks.
3. This information will be publicly available, so that random people from the Internet will be able to view it and donate money.
4. In order to prevent malicious users from spending funds other than on the projects, donators will have to approve the tasks. So once the necessary amount of money is accumulated, the funds will be sent to the account address only if more than a half of the donators approve the task. 

## Running the Project

1. `git clone https://github.com/azayneeva/tarampampam.git`

2. `npm install`

3. `cd client` and run `npm install`

4. Login with Metamask and choose `Rinkeby Test Network`

5. Run `truffle compile` and `truffle migrate`

6. Start the local dev server: `npm run dev`

7. To run tests use `npm run test`

## Contracts Details

#### ProjectDeployment.sol

The purpose of ProjectDeployment contract is to handle deployment of a new instance of Project contract. This contract is used in order to prevent users from modifying Project.sol by removing security restrictions.

#### Project.sol

This contract includes functionality to create tasks, donate funds, approve tasks and send funds to recipient addresses.

#### LibraryDemo.sol

This contract demonstrates usage of OpenZeppelin SafeMath library.

## Avoiding Common Attacks

Steps taken to avoid common attacks are described in `avoiding_common_attacks.md`.

## Design Patterns

The design patterns used in the project are described in `design_pattern_descision.md`.

## Rinkeby Test Network
Deployed addresses are specified in `deployed_addresses.txt`.