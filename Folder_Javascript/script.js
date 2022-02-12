
/*                              _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
                                |#                                                       #|
                                |                 Table of content:                       |
                                |                                                         |
                                |                    1)                            |
                                |                    2)                           |
                                |                    3)                        |
                                |                    4)            |
                                |                    5)                         |
                                |                    6)                      |
                                |                    7)                            |
                                |                                                         |
                                |#_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _#|


/*                                                       General                                                         */
// Save names from input in local storage
Push_to_LocalStorage("ID_SVG_Player_1","ID_Player_1_Name", "Player_One_Name", "click");
Push_to_LocalStorage("ID_SVG_Player_2","ID_Player_2_Name", "Player_Two_Name", "click");

// Create an Game Settings Object
const Game = {
    actualGameboardPlayer1: {
        C1: [],
        C2: [],
        C3: [],
        C4: [],
        C5: [],
        C6: [],
        C7: []
    },
    actualGameboardPlayer2: {
        C1: [],
        C2: [],
        C3: [],
        C4: [],
        C5: [],
        C6: [],
        C7: []
    }
};

// Setting the Counters for knowing in wich row of each column the game currently is
let column_1_Counter = 8;
let column_2_Counter = 8;
let column_3_Counter = 8;
let column_4_Counter = 8;
let column_5_Counter = 8;
let column_6_Counter = 8;
let column_7_Counter = 8;

// Setting variable to know who is on turn and the counter for the played rounds
let playerIsOnTurn = "right";
let roundCounter = 0;

// Setting the event listener to start the Game 
document.getElementById("ID_Start_Button").addEventListener("click", MainGame);

// Main Game Function
function MainGame(){

/// Remove the start screen elements
const startScreenElements_first = document.querySelectorAll(".Class_Players");
for (let element of startScreenElements_first)element.remove();
const startScreenElements_second = document.querySelectorAll(".Class_Naming_Span");
for (let element of startScreenElements_second)element.remove();

let h3_left = document.createElement("h3");
h3_left.innerText = `Your turn, ${localStorage.getItem("Player_One_Name")}`;
document.getElementById("ID_LeftSidebarWrapper").appendChild(h3_left);

let h3_right = document.createElement("h3");
h3_right.innerText = `Your turn, ${localStorage.getItem("Player_Two_Name")}`;
h3_right.id = "h3_right";
h3_right.classList.add("Class_Invisible");
document.getElementById("ID_RightSidebarWrapper").appendChild(h3_right);




// Get the Top Cells for looping trough
const topCellsArray = document.getElementsByClassName("Class_TopCells");

// Main Game (for-of-)-Loop
for(let topCell of topCellsArray){
    
// Adding & Removing the "Choose the Column" Animation just by adding the Class with the CSS-Animation
topCell.addEventListener("mouseover", ()=>{ 
    playerIsOnTurn === "left" ?
    topCell.classList.add("Class_ChoosingAnimation_Coin_1") :
    topCell.classList.add("Class_ChoosingAnimation_Coin_2")
});
topCell.addEventListener("mouseleave", ()=>{ 
    playerIsOnTurn === "left" ?
    topCell.classList.remove("Class_ChoosingAnimation_Coin_1") :
    topCell.classList.remove("Class_ChoosingAnimation_Coin_2")
});

// Make the other top cells unclickable for 1s (animation duration) so it cannont get overlapped
topCell.addEventListener("click", ()=>{
    for(let topCellA of topCellsArray){
topCellA.style = "pointer-events:none";
setTimeout(()=>{topCellA.style = "pointer-events: auto"}, 1000);
}
});

// Add the Event listerner for the main function / game flow
topCell.addEventListener("click", GameFlow);
let ID_topCell = topCell.id;

// Main function for the game

function GameFlow (){
if(topCell.firstChild)return;
topCell = document.getElementById(ID_topCell);
if(playerIsOnTurn === "left"){
    if(h3_left.classList.contains("Class_Invisible"))h3_left.classList.remove("Class_Invisible");
    if(!h3_right.classList.contains("Class_Invisible"))h3_right.classList.add("Class_Invisible");
  
    topCell.classList.remove("Class_ChoosingAnimation_Coin_1")
} else{
    if(h3_right.classList.contains("Class_Invisible"))h3_right.classList.remove("Class_Invisible");
    if(!h3_left.classList.contains("Class_Invisible"))h3_left.classList.add("Class_Invisible");
   
    topCell.classList.remove("Class_ChoosingAnimation_Coin_2")
}

roundCounter++;

// Get the correct rows of each cell in the column of the chosen top cell
// First get the column number via the id of the top cell
let columnNumber = parseInt(ID_topCell[4]);

// Decrease the row counter to count the total columns played in this row and setting a variable for 
// the correct animations and placement (to get the correct correct column)
let row;
     if(columnNumber === 1) {column_1_Counter--; row = column_1_Counter;}
else if(columnNumber === 2) {column_2_Counter--; row = column_2_Counter;}
else if(columnNumber === 3) {column_3_Counter--; row = column_3_Counter;}
else if(columnNumber === 4) {column_4_Counter--; row = column_4_Counter;}
else if(columnNumber === 5) {column_5_Counter--; row = column_5_Counter;}
else if(columnNumber === 6) {column_6_Counter--; row = column_6_Counter;}
else if(columnNumber === 7) {column_7_Counter--; row = column_7_Counter;};

// Create the correct coin, set correct position and append it to the DOM
let coin = document.createElement("img");
coin.id = "ID_Coin";
if(playerIsOnTurn === "left"){ coin.src = "./Folder_Graphics/freescg_org/diamond_Blue.svg"; Game.actualGameboardPlayer1[`C${columnNumber}`].push(row)};
if(playerIsOnTurn === "right"){ coin.src = "./Folder_Graphics/freescg_org/diamond_Violett.svg"; Game.actualGameboardPlayer2[`C${columnNumber}`].push(row)};
coin.style.height = "30%";
coin.style.width = "30%";
topCell.appendChild(coin);

// Trigger the correct animation (animation length) & the coin
coin.classList.add(`Class_PlacingAnimation_Cell_${row}`);



// Remove the coin with the animation after the animation time and set the coin on correct position
setTimeout(()=>{

topCell.firstChild.remove();

// Place the Coin as background image on the correct column (set by the counter decreasing with each coin)

if(playerIsOnTurn === "left"){
    document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_1");
    // Winning_Validations Player_1;
    Row_Validator(1, row);
    Column_Validator(1, columnNumber, row);
    Diagonal_Validator(1, columnNumber, row);

    // Next Player can place
    Turning_PlayerIsOnTurn();

    // console.log(Game.actualGameboardPlayer1);
} else {
    document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_2");
    // Winning_Validations Player 2;
    Row_Validator(2, row);
    Column_Validator(2);
    Diagonal_Validator(2, columnNumber, row);

    // Next Player can place
    Turning_PlayerIsOnTurn();

    // console.log(Game.actualGameboardPlayer2);
    
    
}

},
1000);
// Next placement is possible!

}; //  End Game-Flow-Function

}; // End Main Game For-Loop

}; // End Start Game Wrapper Function

/*                                                       Functions for Win-Validation                                                         */


// Function to validate if there is a diagonal win
function Diagonal_Validator(player, columnNumber, row){
// Get the to validate Gameboard cell for diagonal validation in right-up and left-down direction (which are in this context the same) based the basis (the played) cell
let basis_plus = document.getElementById(`ID_C${columnNumber}R${row}`);
let second_plus = document.getElementById(`ID_C${columnNumber + 1}R${row + 1}`);
let third_plus = document.getElementById(`ID_C${columnNumber + 2}R${row + 2}`);
let fourth_plus = document.getElementById(`ID_C${columnNumber + 3}R${row + 3}`);

// If there are 3 more cells for validation, check if they contain a players coin...
if(basis_plus != null && second_plus != null && third_plus != null && fourth_plus != null){
if(basis_plus.classList.contains(`Class_PlacedCoin_${player}`) && 
second_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
third_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
fourth_plus.classList.contains(`Class_PlacedCoin_${player}`)){
// .. if yes, invoke win"
prompt("Player " + player + " Diagonal-PLus-Win! Nice"); return; };}

// Now same as above but in the other two diaggonals
// Get the to validate Gameboard cell for diagonal validation in left-up and right-down direction 
let basis_minus = document.getElementById(`ID_C${columnNumber}R${row}`);
let second_minus = document.getElementById(`ID_C${columnNumber - 1}R${row + 1}`);
let third_minus = document.getElementById(`ID_C${columnNumber  - 2}R${row + 2}`);
let fourth_minus= document.getElementById(`ID_C${columnNumber  - 3}R${row + 3}`);

// If there are 3 more cells for validation, check if they contain a players coin...
if(basis_minus!= null && second_minus != null && third_minus != null && fourth_minus != null){
if(basis_minus.classList.contains(`Class_PlacedCoin_${player}`) && 
second_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
third_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
fourth_minus.classList.contains(`Class_PlacedCoin_${player}`)){
// .. if yes, invoke win"
prompt("Player " + player + " Diagonal-PLus-Win! Nice"); return; };}
}  // Diagonal_Validator End

// Function to validate if the placement in a given column triggers a win
function Column_Validator(player){
// Getting the correct gameboard
let Players_Gameboard;
if(player === 1)Players_Gameboard = Game.actualGameboardPlayer1;
if(player === 2)Players_Gameboard = Game.actualGameboardPlayer2;

// Helper array with the pushed values from the Gameboard 
const validation_array = [];
validation_array.push(Players_Gameboard.C1, Players_Gameboard.C2, Players_Gameboard.C3, Players_Gameboard.C4, Players_Gameboard.C5, Players_Gameboard.C6, Players_Gameboard.C7);

// Now we have an iterable array an can loop trough
for (let obj of validation_array){
    // And we making an iterable array again which allows us to reduce()
    let array = Array.from(obj);
    // If every row number subtracted with the next row number is equal to 1, there are 4 coins upon each other.
    if(array[0] - array[1]  === 1 && array[1] - array[2] === 1 && array[2] - array[3] === 1)
    // Invoke win!
    {prompt("Player " + player + " Column-Win! Perfect!"); return; };
}; // Loop end
}; // Column_Validator End

// Function to validate if the placement in a given row triggers a win
function Row_Validator(player, column){
let Players_Gameboard;
if(player === 1)Players_Gameboard = Game.actualGameboardPlayer1;
if(player === 2)Players_Gameboard = Game.actualGameboardPlayer2;
// Set a counting Variable & a helper array with the pushed values from the Gameboard 
let countFor_Win = 0;
const validation_array = [];
validation_array.push(Players_Gameboard.C1, Players_Gameboard.C2, Players_Gameboard.C3, Players_Gameboard.C4, Players_Gameboard.C5, Players_Gameboard.C6, Players_Gameboard.C7);
// Now we have an iterable array an can loop trough
for (let el of validation_array){
// If the array element have given value inrease counter 
if(el.indexOf(column) != -1)countFor_Win++;
// Decrease the counter if there is an empty value in the column, but only do that if there was ab positive value before (this makes it possible to detect rows / 4 after another)
if(el.indexOf(column) === -1 && countFor_Win != 0)countFor_Win--;
// Invoke win if thera are 4 coins after another
if(countFor_Win === 4) {prompt("Player " + player + " Row-Win! Wow"); return };
}; // Loop end
}; // Row_Validator End



/*                                                       Helper Functions                                               */

// Function to push the names from the input to the local storage

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event){
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, ()=>{
    localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});
}

// Helper function to change Player
function Turning_PlayerIsOnTurn(){
    playerIsOnTurn === "left" ? playerIsOnTurn = "right" : playerIsOnTurn = "left";
}



// Jobs:
// Win div mit Ellypse positon absolute über wim row
// Write a function for Language Translation
// Styling 
// Code improvement
// Mobile & Responisve if possible


                                                                                                                                                                            /*
_____________________________________________________________________________________________________________________________________________________________________________
/############################################################################################################################################################################ 
#
#                                          Better Coding Checklist:
#
#   Ternäre Operatoren nutzen ! --> x >10 ? "Wenn x größer ist als 10" : "Wenn nicht, dann mach dies"
#
#   Verwende "conditionales": const user = user_name || "Player 1"
#
#   String to number: let int = "14" --> neueZahl = +int / Number to string: const stringZahl = 5 + ""; in concentation --> double tilde ~~
#
#   Array alle "strings" zu "numbers" --> values = array.map(Number) /  Boolean: array.map(Boolean)
#
#   2 << 3 = 16 ist gleich wie 2 ** 4 = 16 oder old style Math.pow(2, 3)
#
#   Konvertiere eine float zu Int mit "zahl | 0" => rundet auf wenn negativ und ab wenn positiv. Doppelt tilde ~~ macht das gleiche!
#
#   | 0 rundet ja eine positive float auf eine Int ab, also "1222 / 10 | 0" ist das gleiche wie "1220 / 10 ==> 122.0 | 0 ==> 122"
#
#   Object oder Array destructing: const {name, age, ...} = user --> und die variablen haben die Werte von den zugehörigen user-Objekt. Also statt name = this name...
#
#  Console.time("") ...... console.timeEnd("") misst die Dauer der Ausführung des Codes dazwischen und gibt ihn in der Konsole aus. Praktisch für zb.: Loops oder Funktionen!
#
#   slice() kann auch negative values haben und damit bekommt man die letzten values eines arrays
#
#   "...rest"-Parameter sammelt alle werte ab diesem Parameter in einem gleichnamigen Array. Kann auch anders benannt werden! 
#
\___________________________________________________________________________________________________________________________________________________________________________
                                                                                                                                                                    */
/*####################################################################################################################################################################*\
#                                                                                                                                                                      #
#                                                                     Credits & Special Thanks to:                                                                                 #
#                                                                                                                                                                      #
#                                                        Special thanks to the "Odin Project"-Team who did a great job.                                                #
#                                                    Greetings to the many, many programmers who take the time to write blogs,                                         #
#                                      Of course also big thanks to all photographers and graphic designers who make their works available.                            #
#                                                                                                                                                                      #
#                                                                    CSS - what a wonderful language.                                                                  #
#                                                                                                                                                                      #
#                                                                                                                                                                      #
\*####################################################################################################################################################################*/


