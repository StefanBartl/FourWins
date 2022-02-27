//#region Table of content
                                                                                                                                                                                                                                                                                    /*
                                             Four-Wins-Online CPU Player-Javascript-File                                                           
                                                           powered by
                            
                                                          Stefan Bartl
                                                     (WKDSteVIE / WKDMinerva)
                            
                                                              2021
                             _______________________________________________________________________                                                                                                                                                                                                                                                    
                            {                   _________________________________                   }                                                                                                                                                                                  
                            {                            Table of content                           }
                            {_______________________________________________________________________} 
                            |                                                                       |
                            |                  1) CPU Player Algorhytmus                            |  
                            |                                                                       |
                            |                   - KI Placement                                      |
                            |                                                                       |
                            |                   - KI Easy                                           |
                            |                                                                       | 
                            |                   - KI Normal                                         |
                            |                                                                       |
                            |                   - KI Hard                                           |
                            |                                                                       |
                            |                   - Randomizer                                        |                                                                                                                                                                                      
                            |                                                                       |
                            |                   - Detect 3 Coin Chains Diagonal                     |                                                                                                                                                                                                            
                            |                                                                       |
                            |                   - Detect 3 Coin Chains Upwards                      |                                                                                                                                                                                                               
                            |                                                                       |
                            |                   - Detect 3 Coin Chains Sideways                     |           
                            |                                                                       |
                            |                   - Get Valid Upwards Placement                       |                                                                                                                                                                                                           
                            |                                                                       |                                                                                                                                                                                
                            |                   - Get Valid Sideways Placement                      |                                                                                                                                                         
                            |                                                                       |
                            |                  2) Final Information and Comments                    |
                            |                                                                       |
                            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
                                                                                                                                                                                                                                                                               */                                                                                                                                               
                                                                                                                                                                                                                                                                               //#endregion

//#region 1) CPU Player Algrorhytm
                                                                                                                                                                                                                                                                                    
//                                  ___________________________
//                                   Placement function for KI
function KI_Placement(valid_number){
// console.log("Entered KI Placement Function. Random number for topCell is:  ", random_number);

// Make the Placement
const topCellsArray = document.getElementsByClassName("Class_TopCells");
topCellsArray[valid_number].click();  

// If it was the last Cell in the Column, lock it
const columnNumber = valid_number + 1;
TopCell_Validation(columnNumber, false);    
setTimeout(()=>{
    Unlock_TopCells();
}, 1000);
};

//                                  _______________________________
//                                   Algorhytmus for KI Level Easy
function KI_Easy(){
/*
                            Infobox
Function to let KI Easy produce a random, but valid number for placement
*/
// console.log("KI Easy starts to thinking....");
// Get a random number  
const random_number = getRandomInt(7);
// Proof if in this column a placement is possible
const number_proofing = TopCell_Validation(random_number, true);
// If it is possible, name it valid_number and invoke "KI_Thinking", if it isn't get a random number again and proof it as long as there is a valid number
if(number_proofing === true){
const valid_number = random_number;
// console.log("KI Easy makes placement:", valid_number - 1);
Thinking_Effect(true, valid_number);
} else (KI_Easy());
};

//                                  ___________________________________________
//                                   Algorhytmus for KI Level Normal (!Buggy!)
function KI_Normal(){
/* 
                                Infobox
Function to let KI Normal make placements as near as its possible to other Coins from him,
try to avoid upwards and sideways finishing moves from Human Player and try to make them self.

Buggy because of the "3 Coin Chain Diagonal" Functions (below) doesn't work as espected.I'm getting hands on soon.
*/

// console.log("KI Normal startzs to thinking...");

// If it is the first KI Normal Placement, make a random placement
if (Game.roundCounter === 1 || Game.roundCounter === 2) KI_Easy(); 
else {

// Proof if KI have to make or avoid diagonal finishing move
const diagonal = Detect_3_Coin_Chains_Diagonal();
if (diagonal !== undefined){
console.log("Diagonal Chain Detected in column:", diagonal);
// If there is a possibility, proof if placement on top is possible
const diagonal_topVal = TopCell_Validation(diagonal, true);
console.log("Diagonal placement possible:", diagonal_topVal);
if(diagonal_topVal === true){ Thinking_Effect(true, diagonal - 1); return };};

// Proof if KI have to make or avoid vertial finishing move
const upwards = Detect_3_Coin_Chains_Upwards();
if (upwards !== undefined){
console.log("Upwards Chain detected in column:", upwards);
// If there is a possibility, proof if placement on top is possible
const upwards_topVal = TopCell_Validation(upwards, true);
console.log("Upwards placement possible:", upwards_topVal);
if(upwards_topVal === true){ Thinking_Effect(true, upwards - 1); return };};

const sideways = Detect_3_Coin_Chains_Sideways();
if (sideways !== undefined){ console.log("Sideway chain detected in column:", sideways); Thinking_Effect(true, sideways); return};

// If not, get possible placements
const numbers_upwards = Get_Valid_Upwards_Placemement();
console.log("Upwards placements found in columns:", numbers_upwards);
// Take the first one and proof it
if(numbers_upwards !== undefined){
const proof_up = TopCell_Validation(numbers_upwards[0],true);
console.log("Valid Upwards placement found:", proof_up);
if(proof_up === true) { Thinking_Effect(true, numbers_upwards[0]); return };
};

const numbers_sideways = Get_Valid_Sideways_Placement();
console.log("Sideways placements found in columns:", numbers_sideways);
if(numbers_sideways !== undefined){
const proof_side = TopCell_Validation(numbers_sideways[0], true);
console.log("Valid Sideways placement found:", proof_side);
if(proof_side === true){ Thinking_Effect(true, numbers_sideways[0]); return };
};

console.log("KI Normal does not have a valid placement. Submit this task to CPU Easy...");
// If nothing is possible, make random placement
// console.log("Nothing possible. Ask KI Easy for valid placement...");
KI_Easy(); return};

};

//                                  ________________________________________________________________
//                                   Algorhytmus for KI Level Hard (!Placeholder. Not written yet.!)
function KI_Hard(){
/*
                                Infobox / Ideas
Function to let KI Normal make placements as near as its possible to other Coins from him,
try to avoid upwards, sideways and diagonal finishing moves from Human Player and try to make them self.
Also prefer make placements on a 2 Coin chain, also in all three directions.
*/
// Code here... :-)
};

//                                  ________________________________________
//                                   Randomize values from different arrays
function Randomizer (arr1, arr2){
console.log("Randomizer getted arrays:", arr1,  arr2);
let randomizing_number, randomizing_array = [];

for ( let i = 0; i < arr1.length; i++ ){
    randomizing_array.push(arr1[i]);
};

if  ( arr2 !== undefined ){
for ( let i = 0; i < arr2.length; i++ ){
    randomizing_array.push(arr2[i]);
};}; 

randomizing_number = getRandomInt(randomizing_array.length);
valid_number = randomizing_array[randomizing_number];
console.log("Randomizer has choosen a column: " + valid_number);
return valid_number;
};

//                                  _______________________________________________
//                                   Validate if there is a Diagonal triggered winw
function Detect_3_Coin_Chains_Diagonal() {

//#region Detect KI Diagonal 3 Coin Chains
       // Detect KI Diagonal 3 Coin Chains to right-up

for (cell of Game.actualGameboardPlayer2.C1){
if(Game.actualGameboardPlayer2.C2.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer2.C3.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C4R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C4R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 4};};};};};

for (cell of Game.actualGameboardPlayer2.C2){
if(Game.actualGameboardPlayer2.C3.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer2.C4.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C5R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C5R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 5};};};};};

for (cell of Game.actualGameboardPlayer2.C3){
if(Game.actualGameboardPlayer2.C4.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer2.C5.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C6R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C6R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 6};};};};};

for (cell of Game.actualGameboardPlayer2.C4){
if(Game.actualGameboardPlayer2.C5.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer2.C6.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C7R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C7R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 7};};};};};

// Detect KI Diagonal 3 Coin Chains to right-down

for (cell of Game.actualGameboardPlayer2.C1){
if(Game.actualGameboardPlayer2.C2.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer2.C3.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C4R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C4R${cell + 2}`).getAttribute("isPlayed") === "yes"){
    return 4};};};};};

for (cell of Game.actualGameboardPlayer2.C2){
if(Game.actualGameboardPlayer2.C3.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer2.C4.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C5R${cell + 3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C5R${cell + 2}`).getAttribute("isPlayed") === "yes"){
    return 5};};};};};

for (cell of Game.actualGameboardPlayer2.C3){
if(Game.actualGameboardPlayer2.C4.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer2.C5.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C6R${cell + 3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C6R${cell + 2}`).getAttribute("isPlayed") === "yes"){
    return 6};};};};};

for (cell of Game.actualGameboardPlayer2.C4){
if(Game.actualGameboardPlayer2.C5.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer2.C6.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C7R${cell + 3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C7R${cell + 2}`).getAttribute("isPlayed") === "yes"){
    return 7};};};};};
//#endregion

//#region Detect Human Player Diagonal 3 Coin Chains
// Detect Human Player Diagonal 3 Coin Chains to right-down

for (cell of Game.actualGameboardPlayer1.C1){
if(Game.actualGameboardPlayer1.C2.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer1.C3.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C4R${cell -3}`).getAttribute("isPlayed") === "no"){
    if(document.getElementById(`ID_C4R${cell + 2}`).getAttribute("isPlayed") === "yes"){
        return 4};};};};};

for (cell of Game.actualGameboardPlayer2.C2){
if(Game.actualGameboardPlayer1.C3.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer1.C4.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C5R${cell + 3}`).getAttribute("isPlayed") === "no"){
    if(document.getElementById(`ID_C5R${cell + 2}`).getAttribute("isPlayed") === "yes"){
        return 5};};};};};

for (cell of Game.actualGameboardPlayer1.C3){
if(Game.actualGameboardPlayer1.C4.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer1.C5.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C6R${cell + 3}`).getAttribute("isPlayed") === "no"){
    if(document.getElementById(`ID_C6R${cell + 2}`).getAttribute("isPlayed") === "yes"){
        return 6};};};};};

for (cell of Game.actualGameboardPlayer1.C4){
if(Game.actualGameboardPlayer1.C5.indexOf(cell + 1) !== -1){
if(Game.actualGameboardPlayer1.C6.indexOf(cell + 2) !== -1){
if (document.getElementById(`ID_C7R${cell + 3}`).getAttribute("isPlayed") === "no"){
    if(document.getElementById(`ID_C7R${cell + 2}`).getAttribute("isPlayed") === "yes"){
        return 7};};};};};

// Detect Human Player Diagonal 3 Coin Chains to right-up

for (cell of Game.actualGameboardPlayer1.C1){
if(Game.actualGameboardPlayer1.C2.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer1.C3.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C4R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C4R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 4};};};};};

for (cell of Game.actualGameboardPlayer1.C2){
if(Game.actualGameboardPlayer1.C3.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer1.C4.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C5R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C5R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 5};};};};};

for (cell of Game.actualGameboardPlayer1.C3){
if(Game.actualGameboardPlayer1.C4.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer1.C5.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C6R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C6R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 6};};};};};

for (cell of Game.actualGameboardPlayer1.C4){
if(Game.actualGameboardPlayer1.C5.indexOf(cell - 1) !== -1){
if(Game.actualGameboardPlayer1.C6.indexOf(cell -2) !== -1){
if (document.getElementById(`ID_C7R${cell -3}`).getAttribute("isPlayed") === "no"){
if(document.getElementById(`ID_C7R${cell - 2}`).getAttribute("isPlayed") === "yes"){
    return 7};};};};};
//#endregion

};

//                                  __________________________________________________________________________
//                                   Detection of horizontal "3 Coin Chain" to avoid/force finishing (!Buggy!)
function Detect_3_Coin_Chains_Upwards(){
// +++ Basically it depends hardly of the Column Validator from the Win-Validation section +++

// Job: Is there any way to make that code smaller? So much repetition, but not possible to build a autmatism because of Game.actualGameboard is a Object, nnot an array an i fdind no way to iterate trough....

// KI Finishing Upwards Section
let array = Game.actualGameboardPlayer2.C1;
// If every row number subtracted with the next row number is equal to 1, there are 3 coins upon each other.
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
// Than make placement in this column (minus 1 due to topCell array starts with 0)
return 1
};
array = Game.actualGameboardPlayer2.C2;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 2
};
array = Game.actualGameboardPlayer2.C3;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 3
};
array = Game.actualGameboardPlayer2.C4;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 4
};
array = Game.actualGameboardPlayer2.C5;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 5
};
array = Game.actualGameboardPlayer2.C6;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 6
};
array = Game.actualGameboardPlayer2.C7;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 7
};

// Avoid Human Player Upwards finishing moves section
array = Game.actualGameboardPlayer1.C1;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 1
};
array = Game.actualGameboardPlayer1.C2;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 2
};
array = Game.actualGameboardPlayer1.C3;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 3
};
array = Game.actualGameboardPlayer1.C4;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 4
};
array = Game.actualGameboardPlayer1.C5;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 5
};
array = Game.actualGameboardPlayer1.C6;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 6
};
array = Game.actualGameboardPlayer1.C7;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 7
};

};

//                                  _________________________________________________________________________
//                                   Detection of vertical "3 Coin Chain" to avoid/force finishing (!Buggy!)
function Detect_3_Coin_Chains_Sideways(){
// +++ Basically it depends hardly on the Row Validator from the Win-Validation Section +++
// INFO: This algorithm does not take into account, for example, if two coins are next to each other, then one cell is free and then another coin, that this leads to a winning chain. This should be removed in KI Hard
// Detect possible finishing move  from KI
let countFor_Win = 0;
// For every made placement in the column
for(let el of Game.actualGameboardPlayer2.C1){
// If in the next column and the same row  there also a placement, increase counter
if (Game.actualGameboardPlayer2.C2.indexOf(el) !== -1) countFor_Win++;
// Same in the third column from the basis placement...
if (Game.actualGameboardPlayer2.C3.indexOf(el) !== -1) countFor_Win++;
// There are 3 Coins after another from the KI. If the next (4.) column is free, finish and win
if(el === 7){ // If game is in row 7, finish
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === "no") return 3;
} else { // If game is above row 7, ccheck if a finish move is possible 
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === "no" &&
document.getElementById(`ID_C4R${el - 1}`).getAttribute("data-isPlayed") !== "no") return 3;
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer2.C2){
if (Game.actualGameboardPlayer2.C3.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer2.C4.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === "no") return 4
// From Column 2 on maybe there is also a free valid slot before the 3 Coin  chain to finish
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el}`).getAttribute("data-isPlayed") === "no") return 0;
} else {
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === "no" &&
countFor_Win === 2 && document.getElementById(`ID_C5R${el +1}`).getAttribute("data-isPlayed") !== "no" ) return 4; 
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el +1}`).getAttribute("data-isPlayed") !== "no") return 0;   
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer2.C3){
if (Game.actualGameboardPlayer2.C4.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer2.C5.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === "no") return 5
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el}`).getAttribute("data-isPlayed") === "no") return 1;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === "no" &&
countFor_Win === 2 && document.getElementById(`ID_C6R${el +1}`).getAttribute("data-isPlayed") !== "no" ) return 5; 
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el +1}`).getAttribute("data-isPlayed") !== "no") return 1; 
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer2.C4){
if (Game.actualGameboardPlayer2.C5.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer2.C6.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === "no") return 6
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el}`).getAttribute("data-isPlayed") === "no") return 2;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === "no" &&
countFor_Win === 2 && document.getElementById(`ID_C7R${el + 1}`).getAttribute("data-isPlayed") !== "no" ) return 6; 
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el + 1}`).getAttribute("data-isPlayed") !== "no") return 2; 
};};

// Detect 3 Coin chains from Humans to avoid finishing moves 
countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C1){
if (Game.actualGameboardPlayer1.C2.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C3.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === "no") return 3;
} else {
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === "no" &&
document.getElementById(`ID_C4R${el + 1}`).getAttribute("data-isPlayed") !== "no") return 3;    
};};


countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C2){
if (Game.actualGameboardPlayer1.C3.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C4.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === "no") return 4
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el}`).getAttribute("data-isPlayed") === "no") return 0;
} else {
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === "no" &&
countFor_Win === 2 && document.getElementById(`ID_C5R${el +1}`).getAttribute("data-isPlayed") !== "no" ) return 4; 
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el + 1}`).getAttribute("data-isPlayed") !== "no") return 0;   
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C3){
if (Game.actualGameboardPlayer1.C4.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C5.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === "no") return 5
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el}`).getAttribute("data-isPlayed") === "no") return 1;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === "no" &&
countFor_Win === 2 && document.getElementById(`ID_C6R${el + 1}`).getAttribute("data-isPlayed") !== "no" ) return 5; 
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el + 1}`).getAttribute("data-isPlayed") !== "no") return 1; 
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C4){
if (Game.actualGameboardPlayer1.C5.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C6.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === "no") return 6
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el}`).getAttribute("data-isPlayed") === "no") return 2;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === "no" &&
countFor_Win === 2 && document.getElementById(`ID_C7R${el + 1}`).getAttribute("data-isPlayed") !== "no" ) return 6; 
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el + 1}`).getAttribute("data-isPlayed") !== "no") return 2; 
};};
};

//                                  ____________________________________________________
//                                   Get a valid placement focused on column => upwards
function Get_Valid_Upwards_Placemement(){
// Try to make placement on top of an other KI placement if there is enough space to can finish it
let value, valid_number_array = [];
// If in one Column is a KI Placement... (slice is not undefined)
value = Game.actualGameboardPlayer2.C1.slice(-1)[0];
if(value !== undefined){ value -= 1;   //...and in there is no higher placement from Player 2 in this column (slice value -1), push column value (Column x Minus 1 due to KI Placement array begin with 0 for C1, so push this number), else try next column
    if(Game.actualGameboardPlayer1.C1.indexOf(value) === -1) valid_number_array.push(0)};
value = Game.actualGameboardPlayer2.C2.slice(-1)[0];
if(value !== undefined){ value -= 1;
    if(Game.actualGameboardPlayer1.C2.indexOf(value) === -1) valid_number_array.push(1)}; 
value = Game.actualGameboardPlayer2.C3.slice(-1)[0]
if(value !== undefined){ value -= 1;
    if(Game.actualGameboardPlayer1.C3.indexOf(value) === -1) valid_number_array.push(2)}; 
value = Game.actualGameboardPlayer2.C4.slice(-1)[0]
if(value !== undefined){ value -= 1;
    if(Game.actualGameboardPlayer1.C4.indexOf(value) === -1) valid_number_array.push(3)};
value = Game.actualGameboardPlayer2.C5.slice(-1)[0]
    if(value !== undefined){ value -= 1;
    if(Game.actualGameboardPlayer1.C5.indexOf(value) === -1) valid_number_array.push(4)};
value = Game.actualGameboardPlayer2.C6.slice(-1)[0]
    if(value !== undefined){ value -= 1;
    if(Game.actualGameboardPlayer1.C6.indexOf(value) === -1) valid_number_array.push(5)};
value = Game.actualGameboardPlayer2.C7.slice(-1)[0]
    if(value !== undefined){ value -= 1;
    if(Game.actualGameboardPlayer1.C7.indexOf(value) === -1) valid_number_array.push(6)};

// If finished return all valid columns 
if(valid_number_array.length > 0) return valid_number_array
};

//                                  __________________________________________________
//                                   Get a valid placement focused on row => sideways
function Get_Valid_Sideways_Placement(){
let valid_number_array = [];

// Get all placements from KI in a column
for (let a = 0; a < Game.actualGameboardPlayer2.C1.length; a++){
    // Get 1 placement
    let i = Game.actualGameboardPlayer2.C1[a];
    // x is the row above, so i - 1
    let x = i +1
if( i === 7){
// Also if the column next to the placement is free and its the bottom row,  make placement
if(document.getElementById(`ID_C2R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(1);
} else {
// If the column next to the placement is free                                      and the column next to the placement and 1 row above is not free, so he can place on the row (coin needs a coin above), make placement
if(document.getElementById(`ID_C2R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C2R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(1);
};
};

for (let a = 0; a < Game.actualGameboardPlayer2.C2.length; a++){
    let i = Game.actualGameboardPlayer2.C2[a];
    let x = i +1
if( i === 7){
if(document.getElementById(`ID_C1R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(0);
if(document.getElementById(`ID_C3R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(2);
} else {
if(document.getElementById(`ID_C1R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C1R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(0);
if(document.getElementById(`ID_C3R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C3R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(2);
};
};

for (let a = 0; a < Game.actualGameboardPlayer2.C3.length; a++){
    let i = Game.actualGameboardPlayer2.C3[a];
    let x = i +1
if (i === 7){
if(document.getElementById(`ID_C2R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(1);   
if(document.getElementById(`ID_C4R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(3);
} else {
if(document.getElementById(`ID_C2R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C2R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(1);
if(document.getElementById(`ID_C4R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C4R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(3);
};
};

for (let a = 0; a < Game.actualGameboardPlayer2.C4.length; a++){
    let i = Game.actualGameboardPlayer2.C4[a];
    let x = i +1
if (i === 7){
if(document.getElementById(`ID_C3R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(2);   
if(document.getElementById(`ID_C5R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(4);
} else {
if(document.getElementById(`ID_C3R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C3R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(2);
if(document.getElementById(`ID_C5R${i}`).getAttribute("data-isPlayed") === null&& document.getElementById(`ID_C5R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(4);
};
};

for (let a = 0; a < Game.actualGameboardPlayer2.C5.length; a++){
    let i = Game.actualGameboardPlayer2.C5[a];
    let x = i +1
if (i === 7){
if(document.getElementById(`ID_C4R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(3);   
if(document.getElementById(`ID_C6R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(5);
} else{
if(document.getElementById(`ID_C4R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C4R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(3);
if(document.getElementById(`ID_C6R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C6R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(5);
};
};

for (let a = 0; a < Game.actualGameboardPlayer2.C6.length; a++){
    let i = Game.actualGameboardPlayer2.C6[a];
    let x = i +1
if (i === 7){
if(document.getElementById(`ID_C5R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(4);   
if(document.getElementById(`ID_C7R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(6);
} else {
if(document.getElementById(`ID_C5R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C5R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(4);
if(document.getElementById(`ID_C7R${i}`).getAttribute("data-isPlayed") === null && document.getElementById(`ID_C7R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(6);
};
};

for (let a = 0; a < Game.actualGameboardPlayer2.C7.length; a++){
    let i = Game.actualGameboardPlayer2.C7[a];
    let x = i +1
if (i === 7){
if(document.getElementById(`ID_C6R${7}`).getAttribute("data-isPlayed") === null) valid_number_array.push(5);
} else {
if(document.getElementById(`ID_C6R${i}`).getAttribute("data-isPlayed") === null && !document.getElementById(`ID_C6R${x}`).getAttribute("data-isPlayed") !== null) valid_number_array.push(5);
};


};
// console.log("Sideways array before filter out: " + valid_number_array);
let unique_valid_number_array = valid_number_array.filter(onlyUnique);
//console.log("Sideways array after filter out: " + unique_valid_number_array);
if (unique_valid_number_array.length > 0) return unique_valid_number_array;
};
//#endregion

//#region 2) Final informations and Comments
                                                                                                                                                                                                                                                                              /*

     Bonus Jobs to-do:

-) 
                                                                                                                                                                                                                                                                              */
                                                                                                                                                                                                                                                                              
//#endregion