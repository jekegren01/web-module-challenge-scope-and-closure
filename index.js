// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0]);
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 * 
 *    Counter 2 is using a global variable inside of its function.  Counter 1 is defining the count variable inside of its function, maintaining scope.
 * 
 * 2. Which of the two uses a closure? How can you tell?
 * 
 *    Because counter 1 have the variable defined inside of the function, it is using closure. 
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *    
 *    Counter 2 would only be useful if other functions needed to access the same global variable. Otherwise, counter 1 is preferrable due to it maintain all of its needed variables defined with in the function itself. 
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(){

    const score = (Math.round(Math.random() * 2));
    return score;
    // console.log(score);
}

console.log(inning());
// inning(2);
// inning(3);

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore(cb, num) {
  let Home = 0;
  let Away = 0;
  let topOrBtm = true;
  return function () {
    for (let i = 1; i <= num; i++) {
      if (topOrBtm === true) Home += cb();
      else Away += cb();
      topOrBtm = !topOrBtm;
    }
    return { Home, Away };
  };
}

const inningScore = finalScore(inning, 9);
console.log(inningScore());

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `inning` that you wrote above
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: 0 - 2
2nd inning: 1 - 3
3rd inning: 1 - 3
4th inning: 2 - 4
5th inning: 4 - 6
6th inning: 4 - 6
7th inning: 4 - 6
8th inning: 5 - 8
9th inning: 6 - 10

Final Score: 6 - 10 */

function scoreboard(getInningScore, cb, numberOfInnings) {
  let currentInning = 1;
  const scoreList = new Array(numberOfInnings + 1).fill({ Home: 0, Away: 0 });
  const inningScore = getInningScore(cb, 1);
  return () => {
    const { Home, Away } = inningScore();
    scoreList[currentInning] = { Home, Away };
    let end = "st";
    if (currentInning === 2) end = "nd";
    else if (currentInning === 3) end = "rd";
    else if (currentInning > 3) end = "th";
    return `${currentInning++ + end} inning: ${Away} - ${Home}`;
  };
}


const sb = scoreboard(finalScore, inning, 9);
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());
console.log(sb());


// function sum(numbers) {
//   return numbers.reduce((sum, next) => sum + next, 0)
// }

// function scoreboard(getInningScore, inning, inningCount) {
//   const homeTeamScores = [];
//   const awayTeamScores = [];

//   for (let currentInning = 1; currentInning <= inningCount; ++currentInning) {
//     homeTeamScores.push(inning())
//     awayTeamScores.push(inning())
//   }

//   let ret = '';

//   for (let i=0; i<homeTeamScores.length; ++i) {
//     const inning = i+1; // correct for 0-based indexing
//     let suffix = 'th';
//     switch (inning) {
//       case 1:
//         suffix = 'st';
//         break;
//       case 2:
//         suffix = 'nd';
//         break;
//       case 3:
//         suffix = 'rd'
//         break;
//       default:
//         suffix = 'th';
//         break;
//     }
//     ret += `${inning}${suffix} inning: ${awayTeamScores[i]} - ${homeTeamScores[i]}\n`
//   }

//   ret += '\n'

//   ret += `Final score: ${sum(awayTeamScores)} - ${sum(homeTeamScores)}`

//   return ret;
// }

// console.log(scoreboard(undefined, inning, 9));