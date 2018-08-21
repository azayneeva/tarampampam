pragma solidity ^0.4.24;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 _a, uint256 _b) internal pure returns (uint256) {
    uint256 c = _a + _b;
    require(c >= _a);

    return c;
  }

}

contract ContractWithSafeMath {
    using SafeMath for uint;

    uint public result;

    function addNumbers(uint a, uint b) public {
    /* The add method of the SafeMath library verifies that there is no overflow and 
        reverts the transaction in case of an error. 
        If there are no errors, it returns the result. */
        result = a.add(b);
    }
}