//#region Table of content
/*
!                    Four-Wins-Online CPU_Player-JS-File
?                                       powered by
!                                        Stefan Bartl
!                          (WKDSteVIE / WKDMinerva)
?                                              2021                                                                                                                                                                        
?                  ________________________________                                                                                                                                                                                                  
!                                       Table of content                                         
                                                   
?                              1) CPU control algorithms
.                                         - CPU Easy                                           
.                                         - CPU Normal                                                                                                                                                
.                                         - CPU Hard 
?                              2)  Detect placement opportunities 
.                                         - Detect_3_Coin_Chains_Diagonal                                                                                                                                                                                                                                                                            
.                                         - Detect_3_Coin_Chains_Upwards                                                                                                                                                                                                                                                          
.                                         - Detect_3_Coin_Chains_Sideways                                                     
.                                         - Get_Valid_Upwards_Placemement                                                                                                                                                                                                                                                                                                                                                                                                                                                       
.                                         - Get_Valid_Sideways_Placement 
?                             3) CPU placements
.                                         - CPU Placement                        
.                                         - Placement Randomizer                 

?                  Javascript - what a wonderful language!

*/
//#endregion
   
//#region  CPU control algorithms

     /*  ===================  
!         ===  Easy algorhytm  ===
          ===================  */
function CPU_Easy() {

//? === CPU Easy produce a randum but valid placement ===

 // console.log("CPU Easy starts to thinking....");

  // Get a random number
  const random_number = getRandomInt(Game.gameboard_size_x);
  // Proof if in this column a placement is possible
  let proofed_number = random_number;
  Game.rowCounter[`C${random_number}`] > 0 ? proofed_number = true : proofed_number = false; 
  // console.log("Number to proof is valid:", proofed_number);

  // If proofed_number is true invoke "CPU_Thinking", if it isn"t get a random number again and proof it as long as there is a valid number
  if (proofed_number === true) {
    // console.log("CPU Easy makes placement in column:", random number);
    Thinking_Effect(true, random_number);
  } else CPU_Easy();
};

     /*  =====================  
!         ===  Normal algorhytm  ===
          =====================  */
function CPU_Normal() {
//? === Function to let CPU Normal make placements as near as its possible to other Coins from him, 
//? try to avoid upwards and sideways finishing moves from Human Player and try to make them self. ===

  // console.log("CPU Normal starts.");

  // If it is the first CPU Normal Placement, make a random placement
  if (Game.roundCounter === 1 || Game.roundCounter === 2) CPU_Easy();
  else {
    // Proof if CPU have to make or avoid diagonal finishing move
    const diagonal = Detect_3_Coin_Chains_Diagonal();
    if (diagonal !== undefined) {
       console.log("CPU Normal: Diagonal Chain Detected in column ", diagonal);
      // If there is a possibility, proof if placement on top is possible
      const diagonal_topVal = validator__column(diagonal, true);
       console.log("CPU Normal: Diagonal placement possible in column ", diagonal,  diagonal_topVal);
      if (diagonal_topVal === true) {
        Thinking_Effect(true, diagonal);
        return
      };
    };

    // Proof if CPU have to make or avoid vertial finishing move
    const upwards = Detect_3_Coin_Chains_Upwards();
    if (upwards !== undefined) {
     // console.log("CPU Normal: Upwards Chain detected in column ", upwards);
      // If there is a possibility, proof if placement on top is possible
     let columnToProof = Game.rowCounter[`C${upwards}`];
     let upwards_topVal;
     columnToProof > 1 ? upwards_topVal = true : upwards_topVal = false; 
      //console.log("CPU Normal: Upwards placement possible in column", upwards,  upwards_topVal);
      if (upwards_topVal === true) {
        Thinking_Effect(true, upwards);
        return
      };
    };

    const sideways = Detect_3_Coin_Chains_Sideways();
    if (sideways !== undefined) {
      // console.log("CPU Normal: Sideway chain detected in column ", sideways);
      Thinking_Effect(true, sideways);
      return
    };

    let randomNumber,  randomizedColumn, columnToProof;
    // If not, get possible placement upon a placed coin
    const numbers_upwards = Get_Valid_Upwards_Placemement();
    // Take the first one and proof it
    if (numbers_upwards !== undefined) {
     // console.log("Got posssible placements upon coins in column(s):", numbers_upwards);
     // randomize placement if there are more than 1 possibility
     randomNumber = getRandomInt(numbers_upwards.length);
     randomizedColumn = numbers_upwards[randomNumber];
     // proof top cell limit in this column
     columnToProof = Game.rowCounter[`C${randomizedColumn}`];
     let upwards_topVal;
     columnToProof > 1 ? upwards_topVal = true : upwards_topVal = false; 
     //console.log(`In column ${randomizedColumn} top-cell is not locked: ${upwards_topVal}.`);
    // if all ok invoke placement
     if (upwards_topVal === true) {
        // console.log(`Number upwards placement in column ${randomizedColumn} made.`);
        Thinking_Effect(true, randomizedColumn);
        return
      };
    };

 // If not, get possible placement beside a placed coin
 const numbers_sideways = Get_Valid_Sideways_Placement();
 // Take the first one and proof it
 if (numbers_sideways !== undefined) {
 // console.log("Got posssible placements sideways coins in column(s):", numbers_sideways);
  // randomize placement if there are more than 1 possibility
  randomNumber = getRandomInt(numbers_sideways.length);
  randomizedColumn = numbers_sideways[randomNumber];
  // proof top cell limit in this column
  columnToProof = Game.rowCounter[`C${randomizedColumn}`];
  let sideways_topVal;
  columnToProof > 1 ? sideways_topVal = true : sideways_topVal = false; 
  // console.log(`In column ${randomizedColumn} top-cell is not locked: ${sideways_topVal}.`);
 // if all ok invoke placement
  if (sideways_topVal === true) {
    // console.log(`Number upwards placement in column ${randomizedColumn} made.`);
     Thinking_Effect(true, randomizedColumn);
     return
   };
 };
    // console.log("CPU Normal does not have a valid placement. Submit this task to CPU Easy...");
    // If nothing is possible, make random placement
    // console.log("Nothing possible. Ask CPU Easy for valid placement...");
    CPU_Easy();
  };
};

     /*  ===================  
!         ===  Hard algorhytm  ===
          ===================  */
function CPU_Hard() {
/*
?                                    Ideas for writing this function
Function to let CPU Normal make placements as near as its possible to other Coins from istelf,
try to avoid upwards, sideways and diagonal finishing moves from Human Player and try to make them self.
Also prefer make placements on a 2 Coin chain, also in all three directions.
*/
};

//#endregion

//#region Detect placement possibilities 

     /*  ========================  
!         ===  3 coin chains diagonal  ===
          ========================  */
function Detect_3_Coin_Chains_Diagonal() {
  
//? === detect valid diagonal placements to finish or defend a winning move ===

  //console.log("Entered Diagonal 3 Coin Chains Detection");

  for (let columnNumber = 1; columnNumber < (Game.gameboard_size_x -2); columnNumber++) {
    for (let rowNumber = 1; rowNumber < (Game.gameboard_size_y -2); rowNumber++) {
      let basis = document.getElementById(`ID_C${columnNumber}R${rowNumber}`),
        second_plus = document.getElementById(
          `ID_C${columnNumber + 1}R${rowNumber + 1}`
        ),
        third_plus = document.getElementById(
          `ID_C${columnNumber + 2}R${rowNumber + 2}`
        );
      free_fourth = document.getElementById(
        `ID_C${columnNumber + 3}R${rowNumber + 3}`
      );
      ground_fourth = document.getElementById(
        `ID_C${columnNumber + 3}R${rowNumber + 2}`
      );
      if (
        basis.classList.contains(".placedCoin__2 ") &&
        second_plus.classList.contains(".placedCoin__2 ") &&
        third_plus.classList.contains(".placedCoin__2 ") &&
        free_fourth.getAttribute("data-isPlayed") !== "yes" &&
        ground_fourth.getAttribute("data-isPlayed") === "yes"
      ) {
        console.log("Diagonal Right");
        return columnNumber + 3;
      }
    }
  };

  for (let columnNumber = Game.gameboard_size_x; columnNumber > 3; columnNumber--) {
    for (let rowNumber = 1; rowNumber < (Game.gameboard_size_y - 2); rowNumber++) {
      let basis = document.getElementById(`ID_C${columnNumber}R${rowNumber}`),
        second_plus = document.getElementById(
          `ID_C${columnNumber - 1}R${rowNumber + 1}`
        ),
        third_plus = document.getElementById(
          `ID_C${columnNumber - 2}R${rowNumber + 2}`
        );
      free_fourth = document.getElementById(
        `ID_C${columnNumber - 3}R${rowNumber + 3}`
      );
      ground_fourth = document.getElementById(
        `ID_C${columnNumber - 3}R${rowNumber + 2}`
      );
      if (
        basis.classList.contains(".placedCoin__2 ") &&
        second_plus.classList.contains(".placedCoin__2 ") &&
        third_plus.classList.contains(".placedCoin__2 ") &&
        free_fourth.getAttribute("data-isPlayed") !== "yes" &&
        ground_fourth.getAttribute("data-isPlayed") === "yes"
      ) {
        console.log("Diagonal Left");
        return columnNumber + 3;
      }
    }
  };
};

     /*  =======================  
!         ===  3 coin chains vertical  ===
          =======================  */
function Detect_3_Coin_Chains_Upwards() {

  //? === detect valid vertical placements to finish or defend a winning move ===

// console.log("Detection of 3 coins up started");

// detection function
  function Detection_3Coins_Up(player){
    let playerPlacements, arrayToValidate;
      // get correct placements array
  player == 1 ? playerPlacements = Game.player1_coins : playerPlacements = Game.player2_coins;
  // loop trough columns
  for(let columnNumber = 1; columnNumber <= Game.gameboard_size_x; columnNumber++){
    // get current array  
    arrayToValidate = playerPlacements[`C${columnNumber}`];
    // validate only if there are at least 4 coins
    if(arrayToValidate.length >= 3){
      // loop trough array to validate
      for(let row = 0; row  < arrayToValidate.length;  row++){
        // console.log("Values to validate, basis row: " + arrayToValidate[row] + "  plus 1 : " + arrayToValidate[row + 1] + " plus 2: " + arrayToValidate[row + 2]);
        if(arrayToValidate[row] - arrayToValidate[row + 1] === 1){
            //console.log("2 coins upon each other.");
            if(arrayToValidate[row + 1] - arrayToValidate[row + 2] === 1){
             // console.log("3 coins upon each other, colum number", columnNumber)
              return columnNumber
            };
          };
      };
    };  
  };
  };

  // Invoke first CPU coins to detect a possible finishing placement...
  let up_finish = Detection_3Coins_Up(2);
  if (up_finish !== undefined){
    //console.log("Finish placement up with column", up_finish);
     return up_finish
    };

  // Invoke player 1 coins to detect finishing possibility
let up_defense = Detection_3Coins_Up(1);
  if (up_defense !== undefined){
    //console.log("Defense placement up with column", up_defense); 
    return up_defense
  };
  // console.log("No upwards 3 Coin chains detected.");
};

     /*  =========================  
!         ===  3 coin chains horitontal  ===
          =========================  */
function Detect_3_Coin_Chains_Sideways() {

//? === detect valid horizontal placements to finish or defend a winning move ===

// console.log("Detection of 3 Coins sideways started");

  // detection function
  function Detection_3Coins_sideways(player){
 // console.log(`Detect 3 Coin sideway chains for player ${player}...`);
  let playerPlacements;
  // get correct placements array
  player == 1 ? playerPlacements = Game.player1_coins : playerPlacements = Game.player2_coins;

  // loop trough placement array from left to right side
  for (let columnNumber = 1; columnNumber < Game.gameboard_size_x; columnNumber++) {
    // Starting with column 1, if there is a placement in given row  go to the next column and proof i there is a placement in given row, and so on....
    for(let placedRow of playerPlacements[`C${columnNumber}`]){
        if(playerPlacements[`C${columnNumber + 1}`]
            && playerPlacements[`C${columnNumber + 1}`].indexOf(placedRow) != -1){
          if(playerPlacements[`C${columnNumber + 2}`]
              && playerPlacements[`C${columnNumber + 2}`].indexOf(placedRow) != -1){
              // proof if placement is possible (so no empty space above or already played) left or right and if so, return correct column
              let basis, second, third, fourth, columnToFinish;
              // proof if right side exists & is free
              if(document.getElementById(`ID_C${columnNumber + 3}R${placedRow - 1}`)
              && document.getElementById(`ID_C${columnNumber + 3}R${placedRow - 1}`).getAttribute("data-isplayed") === "yes" 
              && document.getElementById(`ID_C${columnNumber + 3}R${placedRow}`).getAttribute("data-isplayed") === "no"){
                    columnToFinish = columnNumber + 3;
                    console.log(`Detected sideway chain with possible right placement in column  ${columnToFinish}.`);
                    // mark winchain
                    basis = document.getElementById(`ID_C${columnNumber}R${placedRow}`)
                    second = document.getElementById(`ID_C${columnNumber + 1}R${placedRow }`)
                    third = document.getElementById(`ID_C${columnNumber + 2}R${placedRow }`)
                    fourth = document.getElementById(`ID_C${columnNumber + 3}R${placedRow }`)
                    // return result if win or defend detected
                    return columnToFinish;
              };
              // proof if left side exists & is free
              if(document.getElementById(`ID_C${columnNumber - 1}R${placedRow - 1}`)
              && document.getElementById(`ID_C${columnNumber - 1}R${placedRow - 1}`).getAttribute("data-isplayed") === "yes"
              && document.getElementById(`ID_C${columnNumber - 1}R${placedRow}`).getAttribute("data-isplayed") === "no"){
                    columnToFinish = columnNumber - 1;
                    console.log(`Detected sideway chain with possible left placement in column  ${columnToFinish}.`);
                    // mark winchain
                    basis = document.getElementById(`ID_C${columnNumber}R${placedRow}`)
                    second = document.getElementById(`ID_C${columnNumber + 1}R${placedRow }`)
                    third = document.getElementById(`ID_C${columnNumber + 2}R${placedRow }`)
                    fourth = document.getElementById(`ID_C${columnNumber - 1}R${placedRow }`)
                    // return result if win or defend detected
                    return columnToFinish;                
          };           
        };
    };
  };
};

  // loop trough placement array from right to left side
  for (let columnNumber = Game.gameboard_size_x; columnNumber > 0 ; columnNumber--) {
    // Starting with column 1, if there is a placement in given row  go to the next column and proof i there is a placement in given row, and so on....
    for(let placedRow of playerPlacements[`C${columnNumber}`]){
        if(playerPlacements[`C${columnNumber - 1}`]
            && playerPlacements[`C${columnNumber - 1}`].indexOf(placedRow) != -1){
          if(playerPlacements[`C${columnNumber - 2}`]
              && playerPlacements[`C${columnNumber - 2}`].indexOf(placedRow) != -1){
              // proof if placement is possible (so no empty space above or already played) left or right and if so, return correct column
              let basis, second, third, fourth, columnToFinish;
              // proof if right side exists & is free
              if(document.getElementById(`ID_C${columnNumber - 3}R${placedRow - 1}`)
              && document.getElementById(`ID_C${columnNumber - 3}R${placedRow - 1}`).getAttribute("data-isplayed") === "yes" 
              && document.getElementById(`ID_C${columnNumber - 3}R${placedRow}`).getAttribute("data-isplayed") === "no"){
                    columnToFinish = columnNumber - 3;
                    console.log(`Detected sideway chain with possible right placement in column  ${columnToFinish}.`);
                    // mark winchain
                    basis = document.getElementById(`ID_C${columnNumber}R${placedRow}`)
                    second = document.getElementById(`ID_C${columnNumber - 1}R${placedRow }`)
                    third = document.getElementById(`ID_C${columnNumber - 2}R${placedRow }`)
                    fourth = document.getElementById(`ID_C${columnNumber - 3}R${placedRow }`)
                    // return result if win or defend detected
                    return columnToFinish;
              };
              // proof if left side exists & is free
              if(document.getElementById(`ID_C${columnNumber + 1}R${placedRow - 1}`)
              && document.getElementById(`ID_C${columnNumber + 1}R${placedRow - 1}`).getAttribute("data-isplayed") === "yes"
              && document.getElementById(`ID_C${columnNumber + 1}R${placedRow}`).getAttribute("data-isplayed") === "no"){
                    columnToFinish = columnNumber + 1;
                    console.log(`Detected sideway chain with possible left placement in column  ${columnToFinish}.`);
                    // mark winchain
                    basis = document.getElementById(`ID_C${columnNumber}R${placedRow}`)
                    second = document.getElementById(`ID_C${columnNumber - 1}R${placedRow }`)
                    third = document.getElementById(`ID_C${columnNumber - 2}R${placedRow }`)
                    fourth = document.getElementById(`ID_C${columnNumber + 1}R${placedRow }`)
                    // return result if win or defend detected
                    return columnToFinish;                
          };           
        };
    };
  };
};


};

  // Invoke first CPU coins to detect a possible finishing placement...
  let sideway_finish = Detection_3Coins_sideways(2);
  if (sideway_finish !== undefined){
   // console.log("Finish placement sideway with column", sideway_finish);
    return sideway_finish
  };
  // Invoke player 1 coins to detect finishing possibility
let sideway_defense = Detection_3Coins_sideways(1);
  if (sideway_defense !== undefined){
   // console.log("Defense placement up with column", sideway_defense);
     return sideway_defense
  };
  // if no chain detected, leave function
 // console.log("No sideways Coin chains detected.");
};

     /*  =======================  
!         ===  Upwards placements  ===
          =======================  */
function Get_Valid_Upwards_Placemement() {

//? === Try to make placement on top of an other CPU placement ===

// console.log(`Entered valid upwards placement.`);

let upwardsArray = [];
let lastPlacement;

 // First detect 2 coin chains to prefer them
    // loop trough columns
    for(let columnNumber = 1; columnNumber <= Game.gameboard_size_x; columnNumber++){
     // proof if there is a placement in collumn array  
     // get the last placement of column for valid placement upon single coin 
      lastPlacement = Game.player2_coins[`C${columnNumber}`].slice(-1);
     // console.log(`Found a last placement for upwards: ${lastPlacement[0]}`);
      // if there is a value & it is not the last cell & not played yet
      let row_minus_one = lastPlacement[0] - 1;
      if( lastPlacement[0] !== undefined
      && lastPlacement[0] !== 1
      && document.getElementById(`ID_C${columnNumber}R${row_minus_one}`).getAttribute("data-isplayed") === "no"){
       // console.log(`Last Placement in row ${lastPlacement[0]} & column ${columnNumber} pushed to upwards array.`);
        upwardsArray.push(columnNumber);
      };
    };
    // console.log(`Upwards array: ${upwardsArray}`);

  // if finished return all valid columns
    if(upwardsArray.length > 0) {
      // console.log(`Upwards returned array: ${upwardsArray}`);
      return upwardsArray
    }
        else 
        {// console.log("No upwards placement found.");
      };
};

     /*  =======================  
!         ===  Sideway placements  ===
          =======================  */
function Get_Valid_Sideways_Placement() {

 //? === This function let the CPU know if he can make a placement near (left or right) to an already placed coin ===

  // console.log(`Entered sideways placement detection.`);
 
 let sidewaysArray = [];
 let lastPlacement;
 const leftMinusOne = Game.gameboard_size_x - 1;
 
     // loop trough columns
     for(let columnNumber = 1; columnNumber <= Game.gameboard_size_x; columnNumber++){
      // proof if there is a placement in collumn array  
      // get the last placement of column for valid placement upon single coin 
       lastPlacement = Game.player2_coins[`C${columnNumber}`].slice(-1);
    // console.log(`Found a last placement for sideways in column ${columnNumber} and row ${lastPlacement[0]}.`);
       
      // left and right exceptions (trying placing outside of gameboard would cause error)
      //left side last row
      // if placement is in the first column, in the last row & on the right side it is free...
      if(lastPlacement[0] !== undefined 
          && columnNumber === 1 
          && lastPlacement[0] === Game.gameboard_size_y
          &&  document.getElementById(`ID_C${2}R${1}`).getAttribute("data-isplayed") === "no"){
            sidewaysArray.push(2);
      };
      // left side II
      // if placement is in the first column, is not in the last row, on the right side it is free & its possible to place there...
      if(lastPlacement[0] !== undefined 
        && columnNumber === 1 
        && lastPlacement[0] !== Game.gameboard_size_y
        &&  document.getElementById(`ID_C${2}R${lastPlacement[0]}`).getAttribute("data-isplayed") === "no"
        &&  document.getElementById(`ID_C${2}R${lastPlacement[0] - 1}`).getAttribute("data-isplayed") === "yes"){
          sidewaysArray.push(2);
    };

      //right side last row
      // if placement is in the first column, in the last row & on the right side it is free...
      if(lastPlacement[0] !== undefined 
        && columnNumber === Game.gameboard_size_x 
        && lastPlacement[0] === Game.gameboard_size_y
        &&  document.getElementById(`ID_C${leftMinusOne}R${1}`).getAttribute("data-isplayed") === "no"){
          sidewaysArray.push(leftMinusOne );
    };
    // right side II
    // if placement is in the first column, is not in the last row, on the right side it is free & its possible to place there...
    if(lastPlacement[0] !== undefined 
      && columnNumber === Game.gameboard_size_x 
      && lastPlacement[0] !== Game.gameboard_size_y
      &&  document.getElementById(`ID_C${leftMinusOne}R${lastPlacement[0]}`).getAttribute("data-isplayed") === "no"
      &&  document.getElementById(`ID_C${leftMinusOne}R${lastPlacement[0] - 1}`).getAttribute("data-isplayed") === "yes"){
        sidewaysArray.push(leftMinusOne );
  };

  // normal 
      //normal last row
      // proof placement to the left
      if(lastPlacement[0] !== undefined 
        &&  document.getElementById(`ID_C${columnNumber - 1}R${1}`)
        &&  document.getElementById(`ID_C${columnNumber - 1}R${1}`).getAttribute("data-isplayed") === "no"){
          sidewaysArray.push(columnNumber - 1);
    };
    // proof placemenmt to the right
    if(lastPlacement[0] !== undefined 
      &&  document.getElementById(`ID_C${columnNumber + 1}R${1}`)
      &&  document.getElementById(`ID_C${columnNumber + 1}R${1}`).getAttribute("data-isplayed") === "no"){
        sidewaysArray.push(columnNumber + 1);
  };
  
  //normal II
      // proof placement to the left
      if(lastPlacement[0] !== undefined 
        &&  document.getElementById(`ID_C${columnNumber - 1}R${lastPlacement[0]}`)
        &&  document.getElementById(`ID_C${columnNumber - 1}R${lastPlacement[0]}`).getAttribute("data-isplayed") === "no"
        &&  document.getElementById(`ID_C${columnNumber - 1}R${lastPlacement[0] - 1}`).getAttribute("data-isplayed") === "yes"){
          sidewaysArray.push(columnNumber - 1);
    };
      // proof placement to the right
      if(lastPlacement[0] !== undefined 
        &&  document.getElementById(`ID_C${columnNumber  + 1}R${lastPlacement[0]}`)
        &&  document.getElementById(`ID_C${columnNumber  + 1}R${lastPlacement[0]}`).getAttribute("data-isplayed") === "no"
        &&  document.getElementById(`ID_C${columnNumber  + 1}R${lastPlacement[0] - 1}`).getAttribute("data-isplayed") === "yes"){
          sidewaysArray.push(columnNumber +1);
    };
  // console.log(`Sideways array: ${sidewaysArray}`);
 
   // if finished return all valid columns
     if(sidewaysArray.length > 0) {
       // console.log(`Sideways returned array: ${sidewaysArray}`);
       return sidewaysArray
     }
         else 
         {// console.log("No sideways placement found.");
       };
};
};

//#endregion

//#region CPU placement

     /*  ====================  
!         ===  CPU placements  ===
          ====================  */
function CPU_Placement(columnNumber) {

//? === cpu makes a placement ===

 // console.log(`Entered CPU Placement Function. Column ${columnNumber} is clicked `);

 // to click correct subtract 1 from column number because an array starts with 0
clickNumber = columnNumber - 1;

  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName("topCells");

  // Make the Placement
  topCellsArray[clickNumber].click();
};

     /*  =================  
!         ===  Randomizer  ===
          =================  */
function Randomizer(arr1, arr2) {

//? === randomizes numbers from different arrays ===

// console.log("Randomizer getted arrays:", arr1,  arr2);

let randomizing_number;
const randomizing_array = [];

for (let i = 0; i < arr1.length; i++) {
randomizing_array.push(arr1[i]);
}

if (arr2 !== undefined) {
for (let i = 0; i < arr2.length; i++) {
randomizing_array.push(arr2[i]);
}
}

randomizing_number = getRandomInt(randomizing_array.length);
columnNumber = randomizing_array[randomizing_number];

//console.log("Randomizer has choosen a column: " + columnNumber);
return columnNumber;
};
  
//#endregion