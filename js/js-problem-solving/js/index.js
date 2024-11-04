/**
 * NOTE: Any white spaces in the output of `window.prompt` should be trimmed,
 * but I couldn't do that because using methods is not allowed in this assignment.
 *
 * Hussein Kandil.
 */

/**
 * *** JS Problem Solving Sheet ***
 *
 * - Create an ordinary project folder with one `index.html`,
 *   `CSS` folder (including 3 files: `index.css`, font awesome
 *   `CSS` file, bootstrap `CSS` file), and one `JS` folder
 *   including 2 files : bootstrap JS file and your `index.js` file.
 *   determine the goal of the question.
 * - Separate each code of each question with `//` commenting the question number.
 * - Use `console.log` to print the output.
 * - After finishing, comment all the code(`Alt+a > ctrl+/`),
 *   `ZIP` your project folder and send it like an ordinary assignment.
 * - Read carefully the following questions and wisely
 *   and start to code the `JS` code that determines the output.
 */

/**
 * Using `if` condition and loops only and without `switch` `case`
 * or `array` or `object` or any built in methods,
 * code the following questions:
 */

/**
 * 1- Write a program that allows the user to enter a number then print it.
 *
 * Ex: if the user enter 5 as a number ⇒ should log a 5
 *
 * Ex: if the user enter 2 as a number ⇒ should log a 2
 */

// var num = prompt("Enter a number: ");
// if (num) {
//   console.log(num);
// }

/**
 * 2- Write a program that takes a number from the user
 *    then print yes if that number can divide by 3 and 4 at the same time,
 *    otherwise print no.
 *
 * Ex: if the user enters 12 as a number ⇒ should log a yes.
 *
 * Ex: if the user enters 19 as a number ⇒ should log a no.
 *
 * Hint: the number should have no remaining after division on 3 and 4 to print yes.
 */

// var num = prompt("Enter a number to know whether it is divisible by 3 and 4: ");
// if (num) {
//   if (num % 3 === 0 && num % 4 === 0) console.log("Yes");
//   else console.log("No");
// }

/**
 * 3- Write a program that allows the user to insert 2 integers
 *    then print the max.
 *
 * Ex: if the user enters 5 and 7 as numbers ⇒ should log a 7.
 *
 * Ex: if the user enters 2 and 0 as numbers ⇒ should log a 2.
 */

// var first = prompt("Enter the first integer: ");
// if (first) {
//   var second = prompt("Enter the second integer: ");
//   if (second) {
//     first = Number(first);
//     second = Number(second);
//     if (isNaN(first) || isNaN(second)) console.log(NaN);
//     else if (first > second) console.log(first);
//     else console.log(second);
//   }
// }

/**
 * 4- Write a program that allows the user to insert an integer
 *    then print negative if it is negative number, otherwise print positive.
 *
 * Ex: if the user enters 5 as a number ⇒ should log a Positive.
 *
 * Ex: if the user enters -2 as a number ⇒ should log a Negative.
 */

// var num = prompt("Enter an integer: ");
// if (num) {
//   num = Number(num);
//   if (isNaN(num)) console.log(NaN);
//   else if (num < 0) console.log("Negative");
//   else console.log("Positive");
// }

/**
 * 5- Write a program that takes 3 integers from the user
 *    then prints the max element and the min element.
 *
 * Ex: if the user enters 5 and 6 and 1 as numbers ⇒ should log a 6 is the max
 *     and 1 is the min.
 *
 * Ex: if the user enters 10 and 10 and -1 as numbers ⇒ should log a 10 is the max
 *     and -1 is the min
 */

// var first = prompt("Enter the first integer: ");
// if (first) {
//   var second = prompt("Enter the second integer: ");
//   if (second) {
//     var third = prompt("Enter the third integer: ");
//     if (third) {
//       first = Number(first);
//       second = Number(second);
//       third = Number(third);
//       if (isNaN(first) || isNaN(second) || isNaN(third)) {
//         console.log(
//           "Some of the given values are invalid! Try again with numbers only!"
//         );
//       } else {
//         var min, max;
//         if (first <= second && first <= third) min = first;
//         else if (first >= second && first >= third) max = first;
//         if (second <= first && second <= third) min = second;
//         else if (second >= first && second >= third) max = second;
//         if (third <= first && third <= second) min = third;
//         else if (third >= first && third >= second) max = third;
//         console.log(max + " is the max and " + min + " is the min");
//       }
//     }
//   }
// }

/**
 * 6- Write a program that allows the user to insert an integer number
 *    then check If a number is even or odd.
 *
 * Ex: if the user enters 5 as a number ⇒ should log an 'Odd'.
 *
 * Ex: if the user enters 6 as a number ⇒ should log an 'Even'.
 *
 * Hint: the number should have no remaining after division on 2 to print 'Even'.
 */

// var num = prompt("Enter a number: ");
// if (num) {
//   num = Number(num);
//   if (isNaN(num)) console.log(NaN);
//   else if (num % 2 === 0) console.log("Even");
//   else console.log("Odd");
// }

/**
 * 7- Write a program that take character from user
 *    then if it is vowel chars (a,e,i,o,u) then print vowel
 *    otherwise print consonant.
 *
 * Note: lowercase and uppercase are important.
 *
 * Ex: if the user enters a or A as a character ⇒ should log Vowel.
 *
 * Ex: if the user enters s or S as a character ⇒ should log Consonant.
 */

// var char = prompt("Enter a letter: ");
// if (char) {
//   // Assuming that the user will enter a single letter;
//   // not a non-letter/s character nor more than one letter
//   if (
//     char === "a" ||
//     char === "A" ||
//     char === "e" ||
//     char === "E" ||
//     char === "i" ||
//     char === "I" ||
//     char === "o" ||
//     char === "O" ||
//     char === "u" ||
//     char === "U"
//   ) {
//     console.log("Vowel");
//   } else console.log("Consonant");
// }

/**
 * 8- Write a program that allows the user to enter a number
 *    then print all the numbers starting from 1 to the user entered number.
 *
 * Ex: if the user enter 5 as a number ⇒ should log a 1,2,3,4,5
 *
 * Ex: if the user enter 7 as a number ⇒ should log a 1,2,3,4,5,6,7
 *
 * Hint: Loops are helpful when you want to make pattern steps
 *       or when you want to make a code repeat many times.
 */

// var num = prompt("Enter a number: ");
// if (num) {
//   num = Number(num);
//   if (isNaN(num)) console.log(NaN);
//   else {
//     var max = num + 1;
//     var result = "";
//     for (var i = 1; i < max; i++) {
//       if (!result) result += i;
//       else result += "," + i;
//     }
//     console.log(result);
//   }
// }

/**
 * 9- Write a program that allows the user to insert an integer
 *    then print a multiplication table up to 12.
 *
 * Ex: if the user enters 5 as a number ⇒ should log 5,10,15,20,25.
 *
 * Ex: if the user enters 3 as a number ⇒ should log 3,6,9,12,15,18,21.
 *
 * Hint: Loops are helpful when you want to make pattern steps
 *       or when you want to make a code repeat many times.
 */

// var num = prompt("Enter a number: ");
// if (num) {
//   num = Number(num);
//   if (isNaN(num)) console.log(NaN);
//   else {
//     multiplicationTable = "";
//     for (var i = 1; i <= 12; i++) {
//       var product = num * i;
//       if (!multiplicationTable) multiplicationTable += product;
//       else multiplicationTable += "," + product;
//     }
//     console.log(multiplicationTable);
//   }
// }

/**
 * 10- Write a program that allows the user to enter a number
 *     then print all the only evens numbers starting from 1
 *     to the user entered number.
 *
 * Ex: if the user enters 5 as a number ⇒ should log 2,4.
 *
 * Ex: if the user enters 13 as a number ⇒ should log 2,4,6,8,10,12.
 */

// var num = prompt("Enter a number: ");
// if (num) {
//   num = Number(num);
//   if (isNaN(num) || !(num > 1) || !Number.isInteger(num)) {
//     console.log("Only an integer greater than 1 is allowed!");
//   } else {
//     // Assuming that the given number must be included when checking for even numbers!
//     var max = num + 1;
//     var evens = "";
//     for (var i = 2; i < max; i += 2) {
//       if (!evens) evens += i;
//       else evens += "," + i;
//     }
//     console.log(evens);
//   }
// }

/**
 * 11- Write a program that allows the user to enter two numbers
 *     and print the result to make the second number power the first number.
 *
 * Ex: if the user enters 2 and 10 as a number ⇒ should log 1024.
 *
 * Ex: if the user enters 4 and 3 as a number ⇒ should log 64.
 */

// var base = prompt("Exponentiation! Enter the base: ");
// if (base) {
//   var exponent = prompt("Exponentiation! Enter the exponent: ");
//   if (exponent) {
//     base = Number(base);
//     exponent = Number(exponent);
//     console.log(base ** exponent);
//   }
// }

/**
 * 12- Write a program to enter marks of five subjects and calculate total,
 *     average and percentage.
 *
 * Note: The total subject mark is from 100 and user should be able to enter 5 numbers;
 *       each number presents a subject mark.
 *
 * Ex: Enter 1st mark: 60
 *     Enter 2nd mark: 70
 *     Enter 3rd mark: 68
 *     Enter 4th mark: 76
 *     Enter 5th mark: 92
 *     Should log ( total : 366, average : 73.2 and percentage : 73.2%)
 *
 * Ex: Enter 1st mark: 95
 *     Enter 2nd mark: 76
 *     Enter 3rd mark: 58
 *     Enter 4th mark: 90
 *     Enter 5th mark: 89
 *     Should log ( total : 408, average : 81.6 and percentage : 81.6%)
 *
 * Hint: Loops are helpful when you want to make pattern steps
 *       or when you want to make a code repeat many times.
 */

// var SUBJECT_COUNT = 5;
// var MAX_MARK = 100;
// var total = 0;
// var ok = true;
// for (var i = 0; i < SUBJECT_COUNT; i++) {
//   var markNum = "";
//   if (i === 0) markNum = "1st";
//   else if (i === 1) markNum = "2nd";
//   else markNum = i + 1 + "th";
//   var mark = prompt("Enter " + markNum + " mark: ");
//   if (mark) {
//     mark = Number(mark);
//     if (isNaN(mark) || mark < 0 || mark > MAX_MARK) {
//       console.log("A mark must be between 0 and " + MAX_MARK + " inclusive!");
//       ok = false;
//       break;
//     }
//     total += mark;
//   } else {
//     ok = false;
//     break;
//   }
// }
// if (ok) {
//   var average = total / SUBJECT_COUNT;
//   var percentage = (100 * total) / (SUBJECT_COUNT * MAX_MARK);
//   console.log(
//     "Total: " +
//       total +
//       (", average: " + average) +
//       (", and percentage: " + percentage + "%")
//   );
// } else {
//   console.log("Mission Canceled!");
// }

/**
 * 13- Write a program to input the month number
 *     and print the number of days in that month.
 *
 * Ex: if the user enters 10 as a number ⇒ should log 31 days.
 *
 * Ex: if the user enters 6 as a number ⇒ should log 30 days.
 */

// var month = prompt("Enter a month number: ");
// if (month) {
//   month = Number(month);
//   if (!Number.isInteger(month) || month > 12 || month < 1) {
//     console.log(
//       "A month number must be an integer between 1 and 12 inclusive!"
//     );
//   } else {
//     var message = " days";
//     if (month === 2) message = 28 + message; // Ignoring leap years :D
//     else if (month === 4 || month === 6 || month === 9 || month === 11) {
//       message = 30 + message;
//     } else message = 31 + message;
//     console.log(message);
//   }
// }

/**
 * 14- Write a program to enter marks of five subjects and find percentage and grade.
 *
 * Note: The total subject mark is from 100 and the grades ranges are:
 *       - A grade from 90 to 100
 *       - B grade from 80 to 90
 *       - C grade from 70 to 80
 *       - D grade from 50 to 70
 *       - F grade under 50
 *
 * Ex: enter first mark: 60
 *     enter second mark: 70
 *     enter third mark: 68
 *     enter fourth mark: 76
 *     enter fifth mark: 92
 *     Should log enter first mark: D and 60%
 *                enter second mark: C and 70%
 *                enter third mark: D and 68%
 *                enter fourth mark: C and 76%
 *                enter fifth mark: A and 92%
 *
 * Ex: enter first mark: 95
 *     enter second mark: 76
 *     enter third mark: 58
 *     enter fourth mark: 90
 *     enter fifth mark: 89
 *     Should log enter first mark: A and 95%
 *                enter second mark: C and 76%
 *                enter third mark: D and 58%
 *                enter fourth mark: A and 90%
 *                enter fifth mark: B and 89%
 *
 * Hint: Loops are helpful when you want to make pattern steps
 *       or when you want to make a code repeat many times.
 */

// var SUBJECT_COUNT = 5;
// var MAX_MARK = 100;
// var ok = true;
// var res1, res2, res3, res4, res5;
// for (var i = 0; i < SUBJECT_COUNT; i++) {
//   var markNum = "";
//   if (i === 0) markNum = "1st";
//   else if (i === 1) markNum = "2nd";
//   else markNum = i + 1 + "th";
//   var mark = prompt("Enter " + markNum + " mark: ");
//   if (mark) {
//     mark = Number(mark);
//     if (isNaN(mark) || mark < 0 || mark > MAX_MARK) {
//       console.log("A mark must be between 0 and " + MAX_MARK + " inclusive!");
//       ok = false;
//       break;
//     }
//     var percent = (100 * mark) / MAX_MARK;
//     var grade;
//     if (percent >= 90) grade = "A";
//     else if (percent >= 80) grade = "B";
//     else if (percent >= 70) grade = "C";
//     else if (percent >= 50) grade = "D";
//     else grade = "F";
//     if (i === 0) {
//       res1 = markNum + " mark: " + grade + " and " + percent + "%";
//     } else if (i === 1) {
//       res2 = markNum + " mark: " + grade + " and " + percent + "%";
//     } else if (i === 2) {
//       res3 = markNum + " mark: " + grade + " and " + percent + "%";
//     } else if (i === 3) {
//       res4 = markNum + " mark: " + grade + " and " + percent + "%";
//     } else {
//       res5 = markNum + " mark: " + grade + " and " + percent + "%";
//     }
//   } else {
//     ok = false;
//     break;
//   }
// }

// if (ok) {
//   for (var i = 0; i < SUBJECT_COUNT; i++) {
//     if (i === 0) console.log(res1);
//     else if (i === 1) console.log(res2);
//     else if (i === 2) console.log(res3);
//     else if (i === 3) console.log(res4);
//     else console.log(res5);
//   }
// } else {
//   console.log("Mission canceled!");
// }

/**
 * Using switch case only and without array or object
 * or any built in methods, code the following questions:
 */

/**
 * 15- Write a program to input the month number
 *     and print the number of days in that month.
 *
 * Ex: if the user enters 10 as a number ⇒ should log 31 days.
 *
 * Ex: if the user enters 6 as a number ⇒ should log 30 days.
 */

// var month = prompt("Enter a month number: ");
// switch (month) {
//   case "":
//   case null:
//     break;
//   default:
//     month = Number(month);
//     switch (!Number.isInteger(month) || month > 12 || month < 1) {
//       case true:
//         console.log(
//           "A month number must be an integer between 1 and 12 inclusive!"
//         );
//         break;
//       default:
//         var message = " days";
//         switch (month) {
//           case 2:
//             message = 28 + message; // Ignoring leap years :D
//             break;
//           case 4:
//           case 6:
//           case 9:
//           case 11:
//             message = 30 + message;
//             break;
//           default:
//             message = 31 + message;
//         }
//         console.log(message);
//     }
// }

/**
 * 16- Write a program that take character from user
 *     then if it is vowel chars (a,e,I,o,u)
 *     then print vowel otherwise print consonant
 *
 * Note: lowercase and uppercase are important.
 *
 * Ex: if the user enters a or A as a character ⇒ should log Vowel.
 *
 * Ex: if the user enters s or S as a character ⇒ should log Consonant.
 */

// var char = prompt("Enter a letter: ");
// switch (char) {
//   case "":
//   case null:
//     break;
//   default:
//     // Assuming that the user will enter a single letter;
//     // not a non-letter/s character nor more than one letter
//     switch (char) {
//       case "a":
//       case "A":
//       case "e":
//       case "E":
//       case "i":
//       case "I":
//       case "o":
//       case "O":
//       case "u":
//       case "U":
//         console.log("Vowel");
//         break;
//       default:
//         console.log("Consonant");
//     }
// }

/**
 * 17- Write a program that takes 2 integers from the user
 *     then prints the max element.
 *
 * Ex: if the user enters 5 and 6 as numbers ⇒ should log a 6 is the max.
 *
 * Ex: if the user enters 10 and -1 as numbers ⇒ should log a 10 is the max.
 */

// var first = prompt("Enter the first integer: ");
// switch (first) {
//   case "":
//   case null:
//     break;
//   default:
//     var second = prompt("Enter the second integer: ");
//     switch (second) {
//       case "":
//       case null:
//         break;
//       default:
//         first = Number(first);
//         second = Number(second);
//         switch (isNaN(first) || isNaN(second)) {
//           case true:
//             console.log(NaN);
//             break;
//           default:
//             var tail = " is the max";
//             switch (first > second) {
//               case true:
//                 console.log(first + tail);
//                 break;
//               default:
//                 console.log(second + tail);
//             }
//         }
//     }
// }

/**
 * 18- Write a program that allows the user to insert an integer number
 *     then check If a number is even or odd.
 *
 * Ex: if the user enters 5 as a number ⇒ should log an Odd.
 *
 * Ex: if the user enters 6 as a number ⇒ should log an Even.
 *
 * Hint: the number should have no remaining after division on 2 to print Even.
 */

// var num = prompt("Enter a number: ");
// switch (num) {
//   case "":
//   case null:
//     break;
//   default:
//     num = Number(num);
//     switch (isNaN(num)) {
//       case true:
//         console.log(NaN);
//         break;
//       default:
//         switch (num % 2 === 0) {
//           case true:
//             console.log("Even");
//             break;
//           default:
//             console.log("Odd");
//         }
//     }
// }

/**
 * 19- Write a program that allows the user to insert an integer
 *     then print 'negative' if it is negative number,
 *     'positive' if it is a positive number,
 *     or 'zero' if it is zero.
 *
 * Ex: if the user enters 5 as a number ⇒ should log a Positive.
 *
 * Ex: if the user enters -2 as a number ⇒ should log a Negative.
 *
 * Ex: if the user enters 0 as a number ⇒ should log a Zero.
 */

// var num = prompt("Enter a number: ");
// switch (num) {
//   case "":
//   case null:
//     break;
//   default:
//     num = Number(num);
//     switch (isNaN(num)) {
//       case true:
//         console.log(NaN);
//         break;
//       default:
//         switch (num) {
//           case 0:
//             console.log("Zero");
//             break;
//           default:
//             switch (num > 0) {
//               case true:
//                 console.log("Positive");
//                 break;
//               default:
//                 console.log("Negative");
//             }
//         }
//     }
// }

/**
 * 20- Write a program to create Simple Calculator.
 *
 * Ex: if the user enters 5 and 6 as numbers and + as character ⇒ should log 11.
 *
 * Ex: if the user enters 10 and 2 as numbers and - as character ⇒ should log 8.
 *
 * Ex: if the user enters 3 and 4 as numbers and * as character ⇒ should log 12.
 *
 * Ex: if the user enters 12 and 6 as numbers and / as character ⇒ should log 2.
 */

// var firstOperand = prompt("Enter 1st operand (number): ");
// var canceled = false;
// switch (firstOperand) {
//   case "":
//   case null:
//     canceled = true;
//     break;
//   default:
//     firstOperand = Number(firstOperand);
//     switch (isNaN(firstOperand)) {
//       case true:
//         console.log(NaN);
//         break;
//       default:
//         var secondOperand = prompt("Enter 2nd operand (number): ");
//         switch (secondOperand) {
//           case "":
//           case null:
//             canceled = true;
//             break;
//           default:
//             secondOperand = Number(secondOperand);
//             switch (isNaN(secondOperand)) {
//               case true:
//                 console.log(NaN);
//                 break;
//               default:
//                 var operator = prompt("Enter an operator (+, -, *, or /): ");
//                 switch (operator) {
//                   case "":
//                   case null:
//                     canceled = true;
//                     break;
//                   default:
//                     switch (operator) {
//                       case "+":
//                         console.log(
//                           "%c" + (firstOperand + secondOperand),
//                           "color: #0c0"
//                         );
//                         break;
//                       case "-":
//                         console.log(
//                           "%c" + (firstOperand - secondOperand),
//                           "color: #0c0"
//                         );
//                         break;
//                       case "*":
//                         console.log(
//                           "%c" + firstOperand * secondOperand,
//                           "color: #0c0"
//                         );
//                         break;
//                       case "/":
//                         console.log(
//                           "%c" + firstOperand / secondOperand,
//                           "color: #0c0"
//                         );
//                         break;
//                       default:
//                         console.log(
//                           "%cThe given operator is invalid or unsupported!",
//                           "color: #f00"
//                         );
//                     }
//                 }
//             }
//         }
//     }
// }
// if (canceled) console.log("%cOperation canceled!", "color: #f70");
