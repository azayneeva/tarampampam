There are several design patterns and best practices that have been developed.


Fail early and fail loud


   //Bad code, do not emulate

   function silentFailIfZero(uint num) public view returns (uint){

       if(num != 0){

           return num;

       }

   }


This function will fail without throwing an exception. This is a bad practice because it is not immediately clear whether the function executed properly or not.

   function throwsErrorIfZero(uint num) public view returns (uint){

       require(num != 0);

       return num;

   }

This function checks the condition required for execution as early as possible in the function body and throws an exception if the condition is not met. This is a good practice to reduce unnecessary code execution in the event that an exception will be thrown.

Restricting Access


You cannot prevent people or computer programs from reading your contracts’ state. The state is publicly available information.

You can restrict other contracts’ access to the state by making state variables private.


contract C1 {

 uint private internalNum;

}


You can restrict function access so that only specific addresses are permitted to execute functions.

This is useful for allowing only designated users, or other contracts to access administrative methods, such as changing ownership of a contract, implementing an upgrade or stopping the contract. 




It can be useful to restrict function access to owners, a more general admin class or to any stakeholder in the system.

