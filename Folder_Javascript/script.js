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



console.log();

// Setting the Counters for knowing in wich row of each column the game currently is

let column_1_Counter = 8;
let column_2_Counter = 8;
let column_3_Counter = 8;
let column_4_Counter = 8;
let column_5_Counter = 8;
let column_6_Counter = 8;
let column_7_Counter = 8;

// Setting variable to know who is on turn
let playerIsOnTurn = "left";

// Get the Top Cells for looping trough

const topCellsArray = document.getElementsByClassName("Class_TopCells");

// Main Game (for-of-)-Loop

for(let topCell of topCellsArray){

// Adding & Removing the "Choose the Column" Animation just by adding the Class with the CSS-Animation

topCell.addEventListener("mouseover", ()=>{ 
    if(playerIsOnTurn === "left") topCell.classList.add("Class_ChoosingAnimation_Coin_2")
    else topCell.classList.add("Class_ChoosingAnimation_Coin_1")
});
topCell.addEventListener("mouseleave", ()=>{ 
    if(playerIsOnTurn === "left") topCell.classList.remove("Class_ChoosingAnimation_Coin_2")
    else topCell.classList.remove("Class_ChoosingAnimation_Coin_1")
});

topCell.addEventListener("click", ()=>{ 
    
    if(playerIsOnTurn === "left") topCell.classList.remove("Class_ChoosingAnimation_Coin_2")
    else topCell.classList.remove("Class_ChoosingAnimation_Coin_1")

    if(playerIsOnTurn === "left")playerIsOnTurn = "right"
    else if(playerIsOnTurn === "right")playerIsOnTurn = "left";
});

// Adding the "Coin fly trough the Gameboard" animation

topCell.addEventListener("click", function GameFlow (){

// Get the correct rows of each cell in the column of the chosen top cell
// First get the column number via the id of the top cell

let topCellID = topCell.getAttribute("id");
let columnNumber = parseInt(topCellID[4]);

// Next invoke the Main Game function which must stay inside the event listener, because of the later 
// neccesary removing of an eventassign the CSS-Animations & DOM-Manipulations
// Giving the second parameter to control the CSS-Animations & DOM-Manipulations (f.e. getting the correct rows)

Main_Game_Function(topCell, columnNumber);

// Main Game Function

function Main_Game_Function(cell, columnNumber){
console.log(playerIsOnTurn);
// console.log(" Played cell: " + cell.id + " in the " + columnNumber + " column.");
// Decrease the row counter to count the columns played in this row and setting a variable for 
// the correct animations and placement (to get the correct correct column)

let animationVar;
     if(columnNumber === 1) {column_1_Counter--; animationVar = column_1_Counter;}
else if(columnNumber === 2) {column_2_Counter--; animationVar = column_2_Counter;}
else if(columnNumber === 3) {column_3_Counter--; animationVar = column_3_Counter;}
else if(columnNumber === 4) {column_4_Counter--; animationVar = column_4_Counter;}
else if(columnNumber === 5) {column_5_Counter--; animationVar = column_5_Counter;}
else if(columnNumber === 6) {column_6_Counter--; animationVar = column_6_Counter;}
else if(columnNumber === 7) {column_7_Counter--; animationVar = column_7_Counter;};

// Remove the event-listener for this function on the played cell so it's not possible to invoke 
// the it again and again by clicking often (what causes errors & bugs because of the timeout function)

topCell.removeEventListener("click", GameFlow);

// Creat the coin and set correct position

let coin = document.createElement("img");
coin.id = "ID_Coin";
if(playerIsOnTurn === "left")coin.src = "./Folder_Graphics/freescg_org/diamond_Blue.svg"
else coin.src = "./Folder_Graphics/freescg_org/diamond_Violett.svg";
coin.style.height = "3rem";
coin.style.width = "3rem";

// If  there is no coin appended to the cell, add the coin &  the correct animation (animation length)

if(!cell.firstChild){ 
coin.classList.add(`Class_PlacingAnimation_Cell_${animationVar}`);
cell.appendChild(coin);
}

// After the animation to the last free column finished (giving 1 second time), 
// remove the coin from the top cell, remove the Choosing Animation and place the Coin as background image 
// on the correct column (with the counter decrasing with each coin)

setTimeout(()=>{
    cell.firstChild.remove()
    coin.classList.remove("Class_PlacingAnimation");
    if(playerIsOnTurn === "left") document.getElementById(`ID_C${columnNumber}R${animationVar}`).classList.add("Class_PlacedCoin_1")
    else document.getElementById(`ID_C${columnNumber}R${animationVar}`).classList.add("Class_PlacedCoin_2");

    // If placement is finished, ad the event listener with gameflow back again: Next placement is possible

    topCell.addEventListener("click", GameFlow);

}, 1000); // End of the setTimeout function

}; // End of the Main Game function

}); // End Event-Listener with main Game-Function

}; // End Main Game For-Loop


// Jobs:
// Game settings like names ...
// Player change placements
// Styling 
// Code improvement
// Mobile & Responisve if possible
// Baue einen zähler ein bei gerade darf nu rrot undbei ungerde nur blau damit eine zweite schleife drinne ist---
// Win Validation
// Win div mit Ellypse positon absolute über wim row


// Ternäre operatore x>100 ? "x größer als hundert" : "nicht größer"
// Conditonales setzen einer Variablen statt if  const user = user_name || "Player 1"
// Number to string: let int = "14"; neueZahl = +int / umgekehrt zu string: const zahlString = 5 + ""; in einer concntatiom zwei tilde ~~
// In array alle strings zu nummer = values = array.map(Number); Bollean: array.map(Boolean)
// 2 << 3 = 16 ist gleich wie 2 ** 4 = 16 oder old style Math.pow(2, 3)
// float to int mit zahl | 0 = rundet auf wenn negativ und ab wen negativ. get auch mit doppelt tilde so
// |0 rundet ja eine positive float auf eine int ab. also 1222 / 10 | 0 --> 1220 / 10 = 122,0 | 0 = 122
// Destructing von objekten oder arrays: const {name, age, ...} = user --> und die variablen haben die werte vo m user objekt
// Console.time("loop")  for loop console.timeEnd("loop") gibt den loop aus
// slice kann auch negative values und damit bekommt man di eletzten values einen arrays

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
