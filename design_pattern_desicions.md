# Design Pattern Decisions

## Fail early and fail loud: using `require` statements in functions

`require` statements check conditions required for execution as early as possible in the function body and throws an exception if the condition is not met. I've used them in the majority of contract functions to reduce unnecessary code execution in the event that an exception will be thrown.
