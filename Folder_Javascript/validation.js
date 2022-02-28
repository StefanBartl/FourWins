//#region Table of Content
/*
!                                             Four-Wins-Online Main-CSS-Stylsheet
                                                               powered by
!                                                                Stefan Bartl
!                                                     (WKDSteVIE / WKDMinerva)
                                                                     2021                                                                                                                                                                        
                                              ________________________________________                                                                                                                                                                                                  
!                                                           Table of content              

                                                            1) Validators                                       
                                                                                                                
                                                                - Diagonal Validator                                
                                                                                                                    
                                                                - Column Validator                                  
                                                                                                                    
                                                                - Row Validator                                     
                                                                                                                    
                                                                - Top-Cell Validator                                
                                                                                                                                                             
                                                                                                                                                                                                                                                                               */
//#endregion

//#region 1) Validators

/*     =================
!        Diagonal Win-Validation 
           ================= */
function Diagonal_Validator(player, columnNumber, row) {
  // console.log("Diagonal Validation started.")

  const basis = document.getElementById(`ID_C${columnNumber}R${row}`),
    // Get the to validate Gameboard cell for diagonal validation in right-up and left-down direction (which are in this context the same) based the basis (the played) cell
    second_plus = document.getElementById(`ID_C${columnNumber + 1}R${row + 1}`),
    third_plus = document.getElementById(`ID_C${columnNumber + 2}R${row + 2}`),
    fourth_plus = document.getElementById(`ID_C${columnNumber + 3}R${row + 3}`);

  // If there are 3 more cells for validation, check if they contain a players coin...
  if (
    basis != null &&
    second_plus != null &&
    third_plus != null &&
    fourth_plus != null
  ) {
    if (
      basis.classList.contains(`Class_PlacedCoin_${player}`) &&
      second_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
      third_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
      fourth_plus.classList.contains(`Class_PlacedCoin_${player}`)
    ) {
      // .. if yes, mark winning chain and invoke win"
      const arr = [basis, second_plus, third_plus, fourth_minus];
      setAttributesArr(arr, { "data-winChain": "yes" });

      Game_End_Screen(player, "Diagonal");
      return;
    }
  }

  // Now same as above but in the other two diaggonals
  // Get the to validate Gameboard cell for diagonal validation in left-up and right-down direction
  const second_minus = document.getElementById(
      `ID_C${columnNumber - 1}R${row + 1}`
    ),
    third_minus = document.getElementById(`ID_C${columnNumber - 2}R${row + 2}`),
    fourth_minus = document.getElementById(
      `ID_C${columnNumber - 3}R${row + 3}`
    );

  // If there are 3 more cells for validation, check if they contain a players coin...
  if (
    basis != null &&
    second_minus != null &&
    third_minus != null &&
    fourth_minus != null
  ) {
    if (
      basis.classList.contains(`Class_PlacedCoin_${player}`) &&
      second_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
      third_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
      fourth_minus.classList.contains(`Class_PlacedCoin_${player}`)
    ) {
      // .. if yes, invoke win as above....
      const arr = [basis, second_minus, third_minus, fourth_minus];
      setAttributesArr(arr, { "data-winChain": "yes" });
      Game_End_Screen(player, "Diagonal");
      return true;
    }
  }
}

/*      ================
!         Column Win-Validation 
           ================= */
function Column_Validator(player) {
  // Get the actual state of the Gameboard
  let Players_Gameboard;
  if (player === 1) Players_Gameboard = Game.actualGameboardPlayer1;
  if (player === 2) Players_Gameboard = Game.actualGameboardPlayer2;

  // Helper array with the pushed values from the Gameboard
  const validation_array = [
    Players_Gameboard.C1,
    Players_Gameboard.C2,
    Players_Gameboard.C3,
    Players_Gameboard.C4,
    Players_Gameboard.C5,
    Players_Gameboard.C6,
    Players_Gameboard.C7,
  ];

  // Now we have an iterable array and can loop trough
  for (let obj of validation_array) {
    // And we making an iterable array again which allows us to reduce()
    const array = Array.from(obj);
    // If every row number subtracted with the next row number is equal to 1, there are 4 coins upon each other.
    if (
      (array[0] - array[1] === 1 &&
        array[1] - array[2] === 1 &&
        array[2] - array[3] === 1) ||
      (array[1] - array[2] === 1 &&
        array[2] - array[3] === 1 &&
        array[3] - array[4] === 1) ||
      (array[2] - array[3] === 1 &&
        array[3] - array[4] === 1 &&
        array[4] - array[5] === 1)
    ) {
      // Invoke a win
      Game_End_Screen(player, "Column");
      return true;
    }
  }
  //(Under construction for winChain!)
}

/*     ==============
!        Row Win-Validation 
          =============== */
function Row_Validator(player, column) {
  // Get the actual state of the Gameboard
  let Players_Gameboard;
  if (player === 1) Players_Gameboard = Game.actualGameboardPlayer1;
  if (player === 2) Players_Gameboard = Game.actualGameboardPlayer2;

  // Set a counting Variable & a helper array with the pushed values from the Gameboard
  let countFor_Win = 0;
  const validation_array = [
    Players_Gameboard.C1,
    Players_Gameboard.C2,
    Players_Gameboard.C3,
    Players_Gameboard.C4,
    Players_Gameboard.C5,
    Players_Gameboard.C6,
    Players_Gameboard.C7,
  ];

  // Now we have an iterable array and can loop trough
  for (let el of validation_array) {
    // If the array element (f.e. Column 2) have given value (f.e. Row 5) inrease counter and  . So, if 4 ColumnArrays from the actual Gamebpoard have a coin from this player in the same row, its a
    if (el.indexOf(column) != -1) countFor_Win++;
    // Decrease the counter if there is an empty value in the column, but only do that if there was ab positive value before (this makes it possible to detect rows / 4 after another)
    if (el.indexOf(column) === -1 && countFor_Win != 0) countFor_Win--;
    // Invoke win if thera are 4 coins after another
    if (countFor_Win === 4) {
      // Invoke a win
      Game_End_Screen(player, "Row");
      return true;
    }
  }
  //(Under construction for winChain!)
}

/*       ==================
!          Lock Top-Cell if full Column 
            =================== */
function TopCell_Validation(columnNumber, invokedForKiValidation) {
  let proof;
  if (columnNumber === 1) proof = row_Counter_C1;
  else if (columnNumber === 2) proof = row_Counter_C2;
  else if (columnNumber === 3) proof = row_Counter_C3;
  else if (columnNumber === 4) proof = row_Counter_C4;
  else if (columnNumber === 5) proof = row_Counter_C5;
  else if (columnNumber === 6) proof = row_Counter_C6;
  else if (columnNumber === 7) proof = row_Counter_C7;
  // console.log(columnNumber);
  // console.log(proof);

  // Important! Because the pointer events are also settet to "all" back after during the placement animations during the game, this function have to be after the coin placement section!
  // Proof if the columnNumber was the last possible cell to play in the column
  if (proof === 2 && invokedForKiValidation === false) {
    // If it was lock it for further placements
    // console.log("TopCell-Validator locked cell.");
    document.getElementById(`ID_C${columnNumber}R1`).innerText = "Full!";
    document
      .getElementById(`ID_C${columnNumber}R1`)
      .classList.add("Class_Full_Column");
    return;
  }

  // If the column is locked for placements, return false to KI Normal & KI Easy, so they know they cant make a placement there. Else return true so they hav a valid column number.
  if (invokedForKiValidation === true) {
    if (proof < 3) {
      return false;
    } else return true;
  }

  // If it passes the proofment, just return and do nothing
  return;
}

//#endregion
