
/*
 * This file is the plain js (jquery and prototypes) version of the interview programming exercises.
 *
 * As the candidate, your tasks are
 *    1. load the html page into a browser and test its functionality
 *    2. note the bugs and fix them. Be prepared to explain your work. (use window.alert or a new span to put out error messages)
 *       - if you get stuck and can't make any progress, ask for help because getting some help and making progress is better
 *         than not getting anything done.
 *       2.1 explain the function pattern at the end
 *    3. extra credit: change the equation entry to free form text entry
 *       3.1 first, make it functionally equivalent to the existing entry
 *       3.2 second, allow any well formed equation using the given operators with the addition of parentheses
 *
 */
document.addEventListener("DOMContentLoaded", function(event) {

    var Equation = function() {
        this.operand1 = null;
        this.operand2 = null;
    // Initialize operator value to `+` to match default selector value
        this.operator = '+';
        this.answer = null;
    };

    Equation.prototype.compute = function() {
        switch (this.operator) {
            case '+':
                this.answer = this.operand1 + this.operand2;
                break;
            case '-':
                this.answer = this.operand1 - this.operand2;
                break;
            case '/':
                this.answer = this.operand1 / this.operand2;
                break;
            case '*':
                this.answer = this.operand1 * this.operand2;
                break;

            default:
                break;
        }
        if (this.operand1 !== null && this.operand2 !== null)
            document.querySelector('#answer').innerHTML = this.answer;
    };

    Equation.prototype.updateOperand = function(event) {
    // Removed `#` from operand1 below since currentTarget.id already specifies an id
    // Clean up function for readability

        // convert value to a number or return 0 if falsey
        event.currentTarget.value = +event.currentTarget.value || 0;

        event.currentTarget.id === 'operand1' ?
            this.operand1 = parseFloat( event.currentTarget.value ) :
            this.operand2 = parseFloat( event.currentTarget.value ) ;

        this.compute();
    };


    Equation.prototype.updateOperator = function(event) {
        this.operator = event.currentTarget.value;
        this.compute();
    };

    (function() {
        // WARNING: don't treat equation as a global variable in any changes you make
        var equation = new Equation();
        // add .bind() to create a new update<XXX> functions and set the scope to be bound to equation.
        document.querySelector('#operator').addEventListener('change', equation.updateOperator.bind(equation));

        var operands = document.querySelectorAll('.operand');
        for (var i = 0, numOperands = operands.length; i < numOperands; i++) {
        // Changed `change` event to `input` so that the event listener triggers
        // upon any value change instead of just when input focus is lost.
            operands[i].addEventListener('input', equation.updateOperand.bind(equation));
        }
    })();
});

// The function pattern at the end is an Immediately-Invoked Function Expression
// (IIFE). The IIFE places the contained code within a local scope and runs it
// as soon as it is defined.




