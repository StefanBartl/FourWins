//#region Table of Content
/*
!                  Four-Wins-Online Validation-JS-File
?                                     powered by
!                                      Stefan Bartl
!                        (WKDSteVIE / WKDMinerva)
?                                            2021                                                                                                                                                                        
?                   ____________________________                                                                                                                                                                                                  
!                                    Table of content              
                                                                                                                             
?                                 1) Column-Locking Validator        
?                                 2) Diagonal Validator                                                                                                 
?                                 3) Column Validator                                                                             
?                                 4) Row Validator       

?                  Javascript - what a wonderful language!

*/
//#endregion

/* =====================
!     Lock Top-Cell if full Column 
            ===================== */
function Column_Locking_Validation(invokedForKiValidation) {
  //? === proof if column is full ===

  //console.log("Entered Top-Cell Validation.");

  const topCellsArray = document.getElementsByClassName("topCells");

  // important! Because the pointer events are also settet to "all" back after during the placement animations during the game, this function have to be after the coin placement section!
  // proof if the columnNumber was the last possible cell to play in the column
  if (Game.rowCounter[`C${Game.clicked_column}`] === 0) {
    // if it was lock it for further placements
    // console.log("TopCell-Validator locked cell.");
    document.getElementById(`ID_C${Game.clicked_column}R0`).innerText = "Full!";
    document
      .getElementById(`ID_C${Game.clicked_column}R0`)
      .setAttribute("data-columnfull", "yes");
    // give the rest of the TopCells free again
    for (let topCell = 0; topCell < topCellsArray.length; topCell++) {
      // (jump over the locked column)
      if (topCell === Game.clicked_column - 1) continue;

      topCellsArray[topCell].style = "pointer-events: all";
    }
    //console.log("Full Column " + `${Game.clicked_column}` + " locked, Top-Cells free again.");
    return;
  }

  // if the column is locked for placements, return false to CPU Placement, so they know they cant make a placement there. Else return true so they hav a valid column number.
  if (invokedForKiValidation === true) {
    // console.log("CPU Placement possible.");
    return true;
  }

  // if it passes the proofment, just give the TopCell free again which are not full and return
  for (let topCell of topCellsArray) {
    if (!topCell.getAttribute("data-columnfull")) {
      topCell.style = "pointer-events: all";
    }
  }
  //   console.log("Not full Top-Cells free again.");
  return;
}

/* ==================
!     Diagonal Win-Validation 
            ================== */
function Diagonal_Validator(player, columnNumber, row) {
  //? === validate if there are 4 coins diagonal ===

  // console.log("Diagonal Validation started.")

  const basis = document.getElementById(`ID_C${columnNumber}R${row}`),
    // get cells to validate gameboard cell for diagonal validation in right-up and left-down direction (which are in this context the same) based the basis (the played) cell
    second_plus = document.getElementById(`ID_C${columnNumber + 1}R${row + 1}`),
    third_plus = document.getElementById(`ID_C${columnNumber + 2}R${row + 2}`),
    fourth_plus = document.getElementById(`ID_C${columnNumber + 3}R${row + 3}`);

  // if there are 3 more cells for validation, check if they contain a players coin...
  if (
    basis != null &&
    second_plus != null &&
    third_plus != null &&
    fourth_plus != null
  ) {
    if (
      basis.classList.contains(`placedCoin__${player}`) &&
      second_plus.classList.contains(`placedCoin__${player}`) &&
      third_plus.classList.contains(`placedCoin__${player}`) &&
      fourth_plus.classList.contains(`placedCoin__${player}`)
    ) {
      // .. if yes, mark winning chain and invoke win"
      const arr = [basis, second_plus, third_plus, fourth_minus];
      setAttributesArr(arr, { "data-winchain": "yes" });
      Game_End_Screen(player, "Diagonal");
      return;
    }
  }

  // now same as above but in the other two diaggonals
  // get the to validate gameboard cell for diagonal validation in left-up and right-down direction
  const second_minus = document.getElementById(
      `ID_C${columnNumber - 1}R${row + 1}`
    ),
    third_minus = document.getElementById(`ID_C${columnNumber - 2}R${row + 2}`),
    fourth_minus = document.getElementById(
      `ID_C${columnNumber - 3}R${row + 3}`
    );

  // if there are 3 more cells for validation, check if they contain a players coin...
  if (
    basis != null &&
    second_minus != null &&
    third_minus != null &&
    fourth_minus != null
  ) {
    if (
      basis.classList.contains(`placedCoin__${player}`) &&
      second_minus.classList.contains(`placedCoin__${player}`) &&
      third_minus.classList.contains(`placedCoin__${player}`) &&
      fourth_minus.classList.contains(`placedCoin__${player}`)
    ) {
      // .. if yes, invoke win as above....
      const arr = [basis, second_minus, third_minus, fourth_minus];
      setAttributesArr(arr, { "data-winChain": "yes" });
      Game_End_Screen(player, "Diagonal");
      return true;
    }
  }
}

/* =================
 !     Column Win-Validation 
            ================= */
function validator__column(player) {
  //? === validate if there are 4 coins vertical ===

  //console.log(`Entered column win validation for player ${player}.`)

  let playerPlacements, arrayToValidate;

  // get correct placements array
  player == 1
    ? (playerPlacements = Game.player1_coins)
    : (playerPlacements = Game.player2_coins);
  // loop trough columns
  for (
    let columnNumber = 1;
    columnNumber <= Game.gameboard_size_x;
    columnNumber++
  ) {
    // get current array
    arrayToValidate = playerPlacements[`C${columnNumber}`];
    // validate only if there are at least 4 coins
    if (arrayToValidate.length >= 4) {
      // loop trough array to validate
      for (let row = 0; row < arrayToValidate.length; row++) {
        // console.log("Values to validate, basis row: " + arrayToValidate[row] + "  plus 1 : " + arrayToValidate[row + 1] + " plus 2: " + arrayToValidate[row + 2]);
        if (arrayToValidate[row] - arrayToValidate[row + 1] === 1) {
          //console.log("2 coins upon each other.");
          if (arrayToValidate[row + 1] - arrayToValidate[row + 2] === 1) {
            //console.log("3 coins upon each other")
            if (arrayToValidate[row + 2] - arrayToValidate[row + 3]) {
              //console.log("Column WIN detected!");
              // mark winning chain
              let basis, second, third, fourth;
              basis = document.getElementById(
                `ID_C${columnNumber}R${arrayToValidate[row]}`
              );
              second = document.getElementById(
                `ID_C${columnNumber}R${arrayToValidate[row + 1]}`
              );
              third = document.getElementById(
                `ID_C${columnNumber}R${arrayToValidate[row + 2]}`
              );
              fourth = document.getElementById(
                `ID_C${columnNumber}R${arrayToValidate[row + 3]}`
              );
              const arr = [basis, second, third, fourth];
              setAttributesArr(arr, { "data-winchain": "yes" });
              // invoke win
              Game_End_Screen(player, "Column");
              return true;
            }
          }
        }
      }
    }
  }
}

/* ===============
!     Row Win-Validation 
            =============== */
function Row_Validator(player, placedRow) {
  //? === validate if there are 4 coins horizonal ===

  //console.log(`Entered row validator for player ${player}, clicked column ${clickedColumn} and placed row ${placedRow}.`)
  let playerPlacements;
  // get correct placements array
  player == 1
    ? (playerPlacements = Game.player1_coins)
    : (playerPlacements = Game.player2_coins);
  // loop trough placement array
  for (
    let columnNumber = 1;
    columnNumber < Game.gameboard_size_x;
    columnNumber++
  ) {
    // Starting with column 1, if there is a placement in given row  go to the next column and proof i there is a placement in given row, and so on....
    if (playerPlacements[`C${columnNumber}`].indexOf(placedRow) != -1) {
      if (
        playerPlacements[`C${columnNumber + 1}`] &&
        playerPlacements[`C${columnNumber + 1}`].indexOf(placedRow) != -1
      ) {
        if (
          playerPlacements[`C${columnNumber + 2}`] &&
          playerPlacements[`C${columnNumber + 2}`].indexOf(placedRow) != -1
        ) {
          if (
            playerPlacements[`C${columnNumber + 3}`] &&
            playerPlacements[`C${columnNumber + 3}`].indexOf(placedRow) != -1
          ) {
            //console.log("Row win detected!");
            // mark winning chain
            let basis, second, third, fourth;
            basis = document.getElementById(`ID_C${columnNumber}R${placedRow}`);
            second = document.getElementById(
              `ID_C${columnNumber + 1}R${placedRow}`
            );
            third = document.getElementById(
              `ID_C${columnNumber + 2}R${placedRow}`
            );
            fourth = document.getElementById(
              `ID_C${columnNumber + 3}R${placedRow}`
            );
            const arr = [basis, second, third, fourth];
            setAttributesArr(arr, { "data-winchain": "yes" });
            // invoke win
            Game_End_Screen(player, "Row");
            return true;
          }
        }
      }
    }
  }
}
