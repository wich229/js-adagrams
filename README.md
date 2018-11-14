# JS Adagrams
## At a Glance
- Individual, [stage 1](https://github.com/Ada-Developers-Academy/pedagogy/blob/master/rule-of-three.md#stage-1) project
- Due before class, **DATE HERE**

## Introduction
In this project you will build the same Adagrams project from the Ruby curriculum using JavaScript running on Node.js in your terminal. Please review [the original project](https://github.com/AdaGold/adagrams#readme) for an explanation of the Adagrams game design.

A test suite and sample game project have been provided so that you can practice TDD and verify your implementation is correct. A completed project will pass all of the provided tests and have coverage of at least 90%.

## Learning Goals
- Write JavaScript code using functions
- Practice TDD with JavaScript and the Jest testing framework

## Getting Started
After forking and cloning this repo you should `cd` to the project directory and run:

```bash
$ npm install
```

Similar to `bundle install` in Ruby projects, this makes the npm package manager download and install any dependencies for the project (such as Jest).

### Tests
We have provided unit tests for you to run. A complete project will pass all provided tests in the `specs/adagrams.spec.js` file. The other specs are for game logic that is already implemented and they may pass or fail depending upon the state of your code, however you should focus on just the tests in `specs/adagrams.spec.js`.

To run the tests, in the command line, navigate to the project root and then run:

```bash
$ npm test
```

After your tests have run there is a short table outputting the coverage summary for each file. You can view complete coverage details by running:

```bash
$ npm run coverage
```

This is shorthand for the command `open coverage/lcov-report/index.html` and will open the coverage report in your default web browser.

### Adagrams Game
In addition to the provided unit tests we have provided a game application which makes use of the Adagrams code that you will implement. You can play the game as you implement each wave of the project and verify that game functionality begins to work, in addition to passing unit tests.

You can start the game application with the following command:

```bash
$ npm run game
```

This will start the Adagrams prompt, and you can start a new game by typing `start` (or `start <num>` for a game with multiple players).

Once the game has started each player is prompted to play anagrams from the displayed letter bank until their turn completes. At the end of each round the player who played the best word (according to the logic you will implement in wave 4) is awarded points based on that word. Once all rounds are completed the game announced who won with the point total for that player.

**NOTE**: If you would like to play the full version of the game before your implementation is complete you can check out the `solution/obfuscated` branch and follow the steps above.

The game is fairly rudimentary and has a few bugs remaining, such as needing to type 'exit' to complete your turn. If you've completed all of the waves for this project and wish to continue working on terminal JavaScript code, feel free to ask your instructors for suggestions on bug fixes or improvements to make for the game code.

### Project Structure
This repository has a baseline structure for the project which includes several files. You will only need to modify one of them:

File | Description
--- | ---
src/adagrams.js | This is the project code, your implementation should be written here as functions within the `Adagrams` object.
specs/adagrams.spec.js | This file contains the unit tests for all functions you must implement.
package.json | This is the [npm project description file](https://docs.npmjs.com/getting-started/using-a-package.json) for this project. It includes all of the dependencies, much like `Gemfile` in our Ruby projects.
package-lock.json | This is equivalent to the `Gemfile.lock` file in our Ruby projects.
jest.config.js | This is a configuration file for the Jest testing framework.
babel.config.js | This is a configuration file for the [Babel](https://babeljs.io/) compiler. For a short summary of why we use it, [click here](https://github.com/AdaGold/backbone-baseline#major-components)

#### Provided code
In the `src/adagrams.js` file there is a bit of code provided already. This is the structure that your code should follow in order for the pre-written unit tests to find and call your functions properly.

The code first creates a constant `Adagrams` and assigns it an object literal:
```js
const Adagrams = {
  drawLetters() {
    // Implement this method for wave 1
  },
};
```

The `Adagrams` object is used here as the equivalent of a Ruby module.

We've previously seen JavaScript objects used as hashes, and seen them act sort of like class instances with `this`, and now modules. Because of the language's design JavaScript's object type is flexible enough to unify all three of these concepts which are each distinct in Ruby.

The code ends with this line:
```js
export default Adagrams;
```

This line is necessary to allow our unit test file (`specs/adagrams.spec.js`) to import the `Adagrams` "module" and call the functions within it. Unlike Ruby, with JavaScript if we want to allow other files to access a piece of code we've written we must explicity [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) it.

## Implementation Requirements
### Wave 1
Our first job is to build a hand of 10 letters. To do so, add a function called `Adagrams.drawLetters` in `src/adagrams.js`. This method should have the following properties:

- No parameters
- Returns an array of ten strings
  - Each string should contain exactly one letter
  - These represent the hand of letters that the player has drawn
- The letters should be randomly drawn from a pool of letters
  - This letter pool should reflect the distribution of letters as described in the table below
  - There are only 2 available `C` letters, so `drawLetters` cannot ever return more than 2 `C`s
  - Since there are 12 `E`s but only 1 `Z`, it should be 12 times as likely to draw an `E` as a `Z`
- Invoking this function should **not** change the pool of letters
  - Imagine that the user returns their hand to the pool before drawing new letters

#### Distribution of Letters
| Letter : Qty. | Letter : Qty. |
|:------:|:-----:|
| A : 9  | N : 6 |
| B : 2  | O : 8 |
| C : 2  | P : 2 |
| D : 4  | Q : 1 |
| E : 12 | R : 6 |
| F : 2  | S : 4 |
| G : 3  | T : 6 |
| H : 2  | U : 4 |
| I : 9  | V : 2 |
| J : 1  | W : 2 |
| K : 1  | X : 1 |
| L : 4  | Y : 2 |
| M : 2  | Z : 1 |

**Note:** Making sure that the drawn letters match the rules of the letter pool can be straightforward or very difficult, depending on how you build the data structure for the letter pool. It is worth spending some time with your partner to think carefully about this.


### Wave 2
Next, we need a way to check if an input word (a word a player submits) only uses characters that are contained within a collection (or hand) of drawn letters. Essentially, we need a way to check if the word is, indeed, an anagram of some or all of the given letters in the hand.

To do so, add a function called `Adagrams.usesAvailableLetters` in `src/adagrams.js`. This method should have the following properties:

- Has two parameters:
   - `input`, the first parameter, describes some input word, and is a string
   - `lettersInHand`, the second parameter, describes an array of drawn letters in a hand. You can expect this to be an array of ten strings, with each string representing a letter
- Returns either `true` or `false`
- Returns `true` if every letter in the `input` word is available (in the right quantities) in the `lettersInHand`
- Returns `false` if not; if there is a letter in `input` that is not present in the `lettersInHand` or has too much of compared to the `lettersInHand`

### Wave 3
We want a function that returns the score of a given word as defined by the Adagrams game.

Name this function `scoreWord` in `src/adagrams.js`. This method should have the following properties:

- Has one parameter: `word`, which is a string of characters
- Returns an integer representing the number of points
- Each letter within `word` has a point value. The number of points of each letter is summed up to represent the total score of `word`
- Each letter's point value is described in the table below
- If the length of the word is 7, 8, 9, or 10, then the word gets an additional 8 points

#### Score chart
|Letter                        | Value|
|:----------------------------:|:----:|
|A, E, I, O, U, L, N, R, S, T  |   1  |
|D, G                          |   2  |
|B, C, M, P                    |   3  |
|F, H, V, W, Y                 |   4  |
|K                             |   5  |
|J, X                          |   8  |
|Q, Z                          |   10 |

### Wave 4
After several hands have been drawn, words have been submitted, checked, scored, and played, we want a way to find the highest scoring word. This function looks at the array of `words` and calculates which of these words has the highest score, applies any tie-breaking logic, and returns the winning word in a special data structure.

Add a function called `highestScoreFrom` in `src/adagrams.js`. This method should have the following properties:

- Has one parameter: `words`, which is an array of strings
- Returns a single hash that represents the data of a winning word and its score. The hash should have the following keys:
  - `:word`, whose value is a string of a word
  - `:score`, whose value is the score of that word
- In the case of tie in scores, use these tie-breaking rules:
    - prefer the word with the fewest letters...
    - ...unless one word has 10 letters. If the top score is tied between multiple words and one is 10 letters long, choose the one with 10 letters over the one with fewer tiles
    - If the there are multiple words that are the same score and the same length, pick the first one in the supplied list

## What Instructors Are Looking For
Check out the [feedback template](feedback.md) which lists the items instructors will be looking for as they evaluate your project.
