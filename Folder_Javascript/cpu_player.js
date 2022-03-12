//#region Table of content
/*
!                  Four-Wins-Online CPU_Player-JS-File
?                                       powered by
!                                        Stefan Bartl
!                          (WKDSteVIE / WKDMinerva)
?                                              2021                                                                                                                                                                        
?                  ________________________________                                                                                                                                                                                                  
!                                       Table of content                                         
                                                   
?                                    1) CPU control algorithms
.                                         - CPU Easy                                           
.                                         - CPU Normal                                                                                                                                                
.                                         - CPU Hard 
?                                    2)  Detect placement opportunities 
.                                         - Detect 3 Coin Chains Diagonal                                                                                                                                                                                                                                                                                 
.                                         - Detect 3 Coin Chains Upwards                                                                                                                                                                                                                                                           
.                                         - Detect 3 Coin Chains Sideways                                                     
.                                         - Get Valid Upwards Placement                                                                                                                                                                                                                                                                                                                                                                                                                                                                
.                                         - Get Valid Sideways Placement    
?                                    3) CPU placements
.                                         - CPU Placement                        
.                                         - Placement Randomizer                                                                                                                                                                                          
*/
//#endregion

//#region Open Jobs
/*
?                  Jobs To-do:

todo    -) Update whole CPU Player!
todo    -) recode whole hardcoded C1 C2.. stuff

?                  Finish
todo    -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
todo    -) Final formatation.
todo    -) Make sure all important is commented.
todo    -) Write a final Comment.

!                  Session progress
?-)

*/
//#endregion
        
//#region  CPU control algorithms

/* ==================
!     Easy-CPU Algorhytmus 
            ================== */
function CPU_Easy() {
 /*
?                            Infobox
Function to let CPU Easy produce a random, but valid number for placement
*/

 // console.log("CPU Easy starts to thinking....");
  // Get a random number
  const random_number = getRandomInt(Game.gameboard_size_x);
  // Proof if in this column a placement is possible
  let proofed_number = random_number;
  Game.rowCounter[`C${random_number}`] > 0 ? proofed_number = true : proofed_number = false; 
  // console.log("Number to proof is valid:", proofed_number);

  // If proofed_number is true invoke "CPU_Thinking", if it isn't get a random number again and proof it as long as there is a valid number
  if (proofed_number === true) {
    // console.log("CPU Easy makes placement in column:", random number);
    Thinking_Effect(true, random_number);
  } else CPU_Easy();
};

/* ====================
!     Normal-CPU Algorhytmus 
            ==================== */
function CPU_Normal() {
  /* 
                                Infobox
Function to let CPU Normal make placements as near as its possible to other Coins from him,
try to avoid upwards and sideways finishing moves from Human Player and try to make them self.
*/

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
        let placeInColumn = diagonal - 1;
        Thinking_Effect(true, placeInColumn);
        return;
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
        let placeInColumn = upwards - 1;
        Thinking_Effect(true, placeInColumn);
        return;
      };
    };

    const sideways = Detect_3_Coin_Chains_Sideways();
    if (sideways !== undefined) {
      // console.log("CPU Normal: Sideway chain detected in column ", sideways);
      Thinking_Effect(true, sideways);
      return;
    }

    // If not, get possible placement upon a placed coin
    const numbers_upwards = Get_Valid_Upwards_Placemement();
    // Take the first one and proof it
    if (numbers_upwards !== undefined) {
     // console.log("Got posssible placements upon coins in column(s):", numbers_upwards);
     // randomize placement if there are more than 1 possibility
     const randomNumber = getRandomInt(numbers_upwards.length);
     const randomizedColumn = numbers_upwards[randomNumber];
     // proof top cell limit in this column
     const columnToProof = Game.rowCounter[`C${randomizedColumn}`];
     let upwards_topVal;
     columnToProof > 1 ? upwards_topVal = true : upwards_topVal = false; 
     //console.log(`In column ${randomizedColumn} top-cell is not locked: ${upwards_topVal}.`);
    // if all ok invoke placement
     if (upwards_topVal === true) {
        // console.log(`Number upwards placement in column ${randomizedColumn} made.`);
        let upwardsPlacement =  randomizedColumn - 1;
        Thinking_Effect(true, upwardsPlacement);
        return;
      };
    };

 // If not, get possible placement beside a placed coin
    const numbers_sideways = Get_Valid_Sideways_Placement();
    if (numbers_sideways !== undefined) {
      //! This is not valid
      console.log("Got posssible placements beside coins in column(s):", numbers_sideways);
      const proof_side = validator__column(numbers_sideways[0], true);
    //  console.log("Valid Sideways placement found:", proof_side);
      if (proof_side === true) {
        Thinking_Effect(true, numbers_sideways[0]);
        return;
      }
    }

    // console.log("CPU Normal does not have a valid placement. Submit this task to CPU Easy...");
    // If nothing is possible, make random placement
    // console.log("Nothing possible. Ask CPU Easy for valid placement...");
    CPU_Easy();
    return;
  };
};

/* ==================
!     Hard-CPU Algorhytmus 
            ================== */
function CPU_Hard() {
  /*
                                Infobox / Ideas
Function to let CPU Normal make placements as near as its possible to other Coins from him,
try to avoid upwards, sideways and diagonal finishing moves from Human Player and try to make them self.
Also prefer make placements on a 2 Coin chain, also in all three directions.
*/
  // Code here... :-)
};

//#endregion

//#region Detect placement possibilities 

/* =======================
!     Detect diagonal 3 Coin-Chains 
            ======================= */
function Detect_3_Coin_Chains_Diagonal() {
  
//? Not adequately tested due to difficult test requirements

  console.log("Entered Diagonal 3 Coin Chains Detection");

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

/* ========================
!     Detect vertical 3 Coin-Chains 
            ======================== */
function Detect_3_Coin_Chains_Upwards() {
// console.log('Detection of 3 coins up started');

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
        // console.log('Values to validate, basis row: ' + arrayToValidate[row] + "  plus 1 : " + arrayToValidate[row + 1] + ' plus 2: ' + arrayToValidate[row + 2]);
        if(arrayToValidate[row] - arrayToValidate[row + 1] === 1){
            //console.log('2 coins upon each other.');
            if(arrayToValidate[row + 1] - arrayToValidate[row + 2] === 1){
             // console.log('3 coins upon each other, colum number', columnNumber)
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
    //console.log('Finish placement up with column', up_finish);
     return up_finish
    };

  // Invoke player 1 coins to detect finishing possibility
let up_defense = Detection_3Coins_Up(1);
  if (up_defense !== undefined){
    //console.log('Defense placement up with column', up_defense); 
    return up_defense
  };
  // console.log('No upwards 3 Coin chains detected.');
};

/* ======================
!     Detect horizontal 3 Coin-Chains 
            ====================== */
function Detect_3_Coin_Chains_Sideways() {
// console.log('Detection of 3 Coins sideways started');

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
              && document.getElementById(`ID_C${columnNumber + 3}R${placedRow - 1}`).getAttribute('data-isplayed') === 'yes' 
              && document.getElementById(`ID_C${columnNumber + 3}R${placedRow}`).getAttribute('data-isplayed') === 'no'){
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
              && document.getElementById(`ID_C${columnNumber - 1}R${placedRow - 1}`).getAttribute('data-isplayed') === 'yes'
              && document.getElementById(`ID_C${columnNumber - 1}R${placedRow}`).getAttribute('data-isplayed') === 'no'){
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
              && document.getElementById(`ID_C${columnNumber - 3}R${placedRow - 1}`).getAttribute('data-isplayed') === 'yes' 
              && document.getElementById(`ID_C${columnNumber - 3}R${placedRow}`).getAttribute('data-isplayed') === 'no'){
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
              && document.getElementById(`ID_C${columnNumber + 1}R${placedRow - 1}`).getAttribute('data-isplayed') === 'yes'
              && document.getElementById(`ID_C${columnNumber + 1}R${placedRow}`).getAttribute('data-isplayed') === 'no'){
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
   // console.log('Finish placement sideway with column', sideway_finish);
    return sideway_finish
  };
  // Invoke player 1 coins to detect finishing possibility
let sideway_defense = Detection_3Coins_sideways(1);
  if (sideway_defense !== undefined){
   // console.log('Defense placement up with column', sideway_defense);
     return sideway_defense
  };
  // if no chain detected, leave function
 // console.log('No sideways Coin chains detected.');
};

/* ======================
!     Upwards-Placement Detection 
            ======================= */
function Get_Valid_Upwards_Placemement() {
  // Try to make placement on top of an other CPU placement

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
      if( lastPlacement[0] !== undefined
      && lastPlacement[0] !== 1
      && document.getElementById(`ID_C${columnNumber}R${lastPlacement[0] - 1}`).getAttribute('data-isplayed') === 'no'){
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
        {// console.log('No upwards placement found.');
      };
};

/* ======================
!     Sideways-Placement Detection 
            ====================== */
function Get_Valid_Sideways_Placement() {
  let valid_number_array = [];

  // Get all placements from CPU in a column
  for (let a = 0; a < Game.actualGameboardPlayer2.C1.length; a++) {
    // Get 1 placement
    let i = Game.actualGameboardPlayer2.C1[a];
    // x is the row above, so i - 1
    let x = i + 1;
    if (i === 7) {
      // Also if the column next to the placement is free and its the bottom row,  make placement
      if (
        document.getElementById(`ID_C2R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(1);
    } else {
      // If the column next to the placement is free                                      and the column next to the placement and 1 row above is not free, so he can place on the row (coin needs a coin above), make placement
      if (
        document.getElementById(`ID_C2R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C2R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(1);
    }
  }

  for (let a = 0; a < Game.actualGameboardPlayer2.C2.length; a++) {
    let i = Game.actualGameboardPlayer2.C2[a];
    let x = i + 1;
    if (i === 7) {
      if (
        document.getElementById(`ID_C1R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(0);
      if (
        document.getElementById(`ID_C3R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(2);
    } else {
      if (
        document.getElementById(`ID_C1R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C1R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(0);
      if (
        document.getElementById(`ID_C3R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C3R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(2);
    }
  }

  for (let a = 0; a < Game.actualGameboardPlayer2.C3.length; a++) {
    let i = Game.actualGameboardPlayer2.C3[a];
    let x = i + 1;
    if (i === 7) {
      if (
        document.getElementById(`ID_C2R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(1);
      if (
        document.getElementById(`ID_C4R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(3);
    } else {
      if (
        document.getElementById(`ID_C2R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C2R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(1);
      if (
        document.getElementById(`ID_C4R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C4R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(3);
    }
  }

  for (let a = 0; a < Game.actualGameboardPlayer2.C4.length; a++) {
    let i = Game.actualGameboardPlayer2.C4[a];
    let x = i + 1;
    if (i === 7) {
      if (
        document.getElementById(`ID_C3R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(2);
      if (
        document.getElementById(`ID_C5R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(4);
    } else {
      if (
        document.getElementById(`ID_C3R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C3R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(2);
      if (
        document.getElementById(`ID_C5R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C5R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(4);
    }
  }

  for (let a = 0; a < Game.actualGameboardPlayer2.C5.length; a++) {
    let i = Game.actualGameboardPlayer2.C5[a];
    let x = i + 1;
    if (i === 7) {
      if (
        document.getElementById(`ID_C4R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(3);
      if (
        document.getElementById(`ID_C6R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(5);
    } else {
      if (
        document.getElementById(`ID_C4R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C4R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(3);
      if (
        document.getElementById(`ID_C6R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C6R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(5);
    }
  }

  for (let a = 0; a < Game.actualGameboardPlayer2.C6.length; a++) {
    let i = Game.actualGameboardPlayer2.C6[a];
    let x = i + 1;
    if (i === 7) {
      if (
        document.getElementById(`ID_C5R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(4);
      if (
        document.getElementById(`ID_C7R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(6);
    } else {
      if (
        document.getElementById(`ID_C5R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C5R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(4);
      if (
        document.getElementById(`ID_C7R${i}`).getAttribute("data-isPlayed") ===
          null &&
        document.getElementById(`ID_C7R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(6);
    }
  }

  for (let a = 0; a < Game.actualGameboardPlayer2.C7.length; a++) {
    let i = Game.actualGameboardPlayer2.C7[a];
    let x = i + 1;
    if (i === 7) {
      if (
        document.getElementById(`ID_C6R${7}`).getAttribute("data-isPlayed") ===
        null
      )
        valid_number_array.push(5);
    } else {
      if (
        document.getElementById(`ID_C6R${i}`).getAttribute("data-isPlayed") ===
          null &&
        !document.getElementById(`ID_C6R${x}`).getAttribute("data-isPlayed") !==
          null
      )
        valid_number_array.push(5);
    }
  }
  // console.log("Sideways array before filter out: " + valid_number_array);
  let unique_valid_number_array = valid_number_array.filter(onlyUnique);
  //console.log("Sideways array after filter out: " + unique_valid_number_array);
  if (unique_valid_number_array.length > 0) return unique_valid_number_array;
};

//#endregion

//#region CPU placement

/* ==========
!     CPU Placement 
            =========== */
function CPU_Placement(valid_number) {
  console.log("Entered CPU Placement Function. Number for clicking top-cell is:  ", valid_number);

  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName('topCells');

  // Make the Placement
  topCellsArray[valid_number].click();

  // If it was the last Cell in the Column, lock it
  const columnNumber = valid_number + 1;
  Column_Locking_Validation(true);
};

/* =================
!     Placement-Randomizer 
            ================= */
function Randomizer(arr1, arr2) {
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
valid_number = randomizing_array[randomizing_number];

//console.log("Randomizer has choosen a column: " + valid_number);
return valid_number;
};
  
//#endregion