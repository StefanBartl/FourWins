                                                                                                                                                                                                                                                                                    /*
 
                                         Four-Wins-Online Main-Javascript-File                                                           
                                                       powered by
                            
                                                      Stefan Bartl
                                                  (WKDSteVIE / WKDMinerva)
                            
                                                          2021
                             ______________________________________________________________________                                                                                                                                                                                                                                                    
                            {                   ________________________________                   }                                                                                                                                                                                  
                            {                           Table of content                           }
                            {______________________________________________________________________} 
                            |                                                                      |
                            |                                                                      |
                            |                 1) DOM, Global Scoped & General Settings             |
                            |                                                                      |
                            |                 2) Main Game                                         |
                            |                                                                      |
                            |                 3) KI                                                |
                            |                                                                      |
                            |                 4) Validations                                       |
                            |                                                                      |
                            |                 5) Game-End Screen                                   |
                            |                                                                      | 
                            |                 5) Helper-Functions                                  |
                            |                                                                      |
                            |                 6) Translation Manager & Page Library                |
                            |                                                                      |
                            |                 7) Final Information and Comments                    |
                            |                                                                      |
                            |                 8) Credits                                           |   
                            |                                                                      | 
                            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ |
                                                                                                                                                                                                                                                                               */                                                                                                                                               
//#region Open Jobs                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                              /*
                                                Jobs To-do:

                                        -) KI Normal bug removing
                                        -) Bug with not showing new stats immidieatly
                                        -) Settings menu
                                        -) Test and repair responsivness
                                        -) Wrap as much in functions as its argueable
                                        -) Possible to make a placement section ? 
                                        -) Try to get the event listener outside and grouped together
                                        -) Code minimazing and fasten it, f.e. local storage needed or Game object ok? What make sense to do in a function? PRO Styles? 
                                           How much i can get in the Game object= row counter ... 
                                           Functions all return; CHECK (and for) Helper mthods like psuh to local storage 
                                           Global variables for DOM Objects possible which are caled often?;
                                        -) Close repatationing code
                                        -) Better Styling (find a real good one)
                                        -) CSS-Code minimizing 
                                           Bonus Features:
                                        -) Due Audio was so slow, get more infos to make it faster, than add some Audio, Ingame and
                                           something in the Settings Menu and also the functionality to control it
                                        -) Free Gameboard-Size possile?
                                        -) Start screen playing animation possible?
                                        -) Possible to go back from Game-Screen to Start-Screen to change Colours, Sound etc...? 
                                           Or is it easier to have the Settings-Menu Button Ingame?

                                                        Session progress:

                                                                                                                                                                                                                                                                                 */
//#endregion

//#region DOM, Global Scoped & General Settings  
                                                                                                                                                                                                                                                                              /*
===============================================================================================================================================================================================================================================================================
 
                                    DOM, Global Scoped & General Settings   

==============================================================================================================================================================================================================================================================================*/

//                                  _______________________
//                                   Section: DOM Elements
//#region DOM-Elements
//          Container & Wrapper
const header = document.getElementById("ID_Header");
const main_wrapper =  document.getElementById("ID_MainWrapper");
const left_sidebar = document.getElementById("ID_LeftSidebarWrapper");
const gameboard = document.getElementById("ID_GameboardWrapper");
const right_sidebar = document.getElementById("ID_RightSidebarWrapper");
const footer = document.getElementById("ID_FooterWrapper");
//          Text, Inputs, Images
const head_title = document.getElementById("ID_Head_Title");
const headline_top = document.getElementById("ID_Headline");
const headline_p = document.getElementById("ID_Header_p");
const player_1_headline = document.getElementById("ID_Player_1_Headline");
const player_1_name = document.getElementById("ID_Player_1_Name");
const player_2_headline = document.getElementById("ID_Player_2_Headline");
const player_2_name = document.getElementById("ID_Player_2_Name");
const start_button = document.getElementById("ID_Start_Button");
const play_against = document.getElementById("ID_Play_Against");
//            Settings menu
const settings_svg = document.getElementById("ID_Settings");
const settings_menu = document.getElementById("ID_Settings_Menu");
const info_h = document.getElementById("ID_Info");
const colour = document.querySelector(".Class_Colour_Toggle");
const language_h = document.getElementById("ID_Language");
const select_deutsch = document.getElementById("ID_Deutsch");
const select_english = document.getElementById("ID_English");
const contact_h = document.getElementById("ID_Contact");
const credits_h = document.getElementById("ID_Credits");
const sound_h = document.getElementById("ID_Sound");
const stats = document.getElementById("ID_Stats");
const stats_easy = document.getElementById("ID_Stats_Easy");
const stats_normal = document.getElementById("ID_Stats_Normal");
const stats_reset_easy = document.getElementById("ID_Reset_Easy");
const stats_reset_normal = document.getElementById("ID_Reset_Normal");
const delete_all = document.getElementById("ID_Delete_All");
const label_colour = document.getElementById("ID_Label_Colour");
//#endregion

//                                  _______
//                                   Audio 
//#region Audio
let warning_audio = new Audio("Folder_Audio/freesound_com/OneHits/chord-alert-notification.wav"); // Confirm Audio Sample
let lost_audio = new Audio("Folder_Audio/freesound_com/OneHits/loose.wav"); // Loose against KI Audio Sample
let win_audio = new Audio("Folder_Audio/freesound_com/OneHits/scratchers__cheer.wav"); // Winning Cheer Audio Sample
// Maybe can have a small audio player available (FM4 or something)- API ? -- give a try

/*
let placing_audio = new Audio("Folder_Audio/freesound_com/OneHits/garuda1982__plop-sound-effect.wav");  Placement Ausio Sample
placing_audio.play();     Dont konw why this sound does not work!         */ 
//#endregion

//                                  ____________________
//                                   Create Game-Object 
const Game = {
// Setting the Gameboard arrays to keep Coin placements
actualGameboardPlayer1: {
    C1: [],C2: [],C3: [],C4: [],C5: [],C6: [],C7: []},
actualGameboardPlayer2: {
    C1: [],C2: [],C3: [],C4: [],C5: [],C6: [],C7: []},
// Setting variable to know who is on turn 
playerIsOnTurn: "right",
// Setting a counter for the played rounds
roundCounter: 0,
Game_against_KI: false,
KI_Level: "none",
};

//                                  __________________________________
//                                   Section: Global Scoped Variables 

//#region Row-Counters for Coin placement   
/* Setting the Counters for let the Coin Placing Section know, 
   in which row / column the Game currently is to calculate by placement the correct position */
let row_Counter_C1 = 8;
let row_Counter_C2 = 8;
let row_Counter_C3 = 8;
let row_Counter_C4 = 8;
let row_Counter_C5 = 8;
let row_Counter_C6 = 8;
let row_Counter_C7 = 8;
//#endregion

//#region Counting wins on a row
let count_wins_player_one = 0;
let count_wins_player_two = 0;
//#endregion

//                                  __________________________
//                                   Section: General Settings
//                                  ___________________________________________
//                                   Proof which colour is choosen for Player 1
//#region Choosing Colour
// Standard is: Left Yellow / Right Red
let player_Colour_Left = "yellow";

// Make sure, after clicking the Colour choose checkbox and than refresh the page, the correct colour is setted
if(document.getElementById("ID_Colour_Checkbox").checked === true) player_Colour_Left = "red";
//#endregion

//                                  ________________________
//                                   Starting Page Language 
//#region Language at Starting-Page
// Detect Browser language, if it can't (i. g. restrictions) set English. Save information in Game Object
let isSetted = localStorage.LanguageIsSetttedByUser;
let lang = localStorage.Language;
if (isSetted == "true"){Translate_StartScreen(lang, true)}
else if (isSetted !== "true"){
let browserLanguage = navigator.language || navigator.userLanguage || "English";
Game.Language = browserLanguage; Game.LanguageIsSetttedByUser = false;
// Invoke the translation with the getted language
Translate_StartScreen(browserLanguage, false);
};
//#endregion

//                                  _________________________________
//                                   Naming / Correct Names 
//#region  Naming
//                                   Set Names of Players to stored names if they are some
if(localStorage.Player_One_Name) player_1_name.value = localStorage.Player_One_Name;
if(localStorage.Player_Two_Name) player_2_name.value = localStorage.Player_Two_Name;

//                                   User storing names in localStorage
// Save names from input in local storage
Push_to_LocalStorage("ID_SVG_Player_1", "ID_Player_1_Name", "Player_One_Name", "click");
Push_to_LocalStorage("ID_SVG_Player_2", "ID_Player_2_Name", "Player_Two_Name", "click");
// Hover animations for circles after Name-Inputs
Swap_Two_Classes_by_Events("ID_SVG_Player_1", "mouseenter", "mouseleave", "Class_Buttons_Add_Hover_Animations_1", "Class_Buttons_Remove_Hover_Animations_1");
Swap_Two_Classes_by_Events("ID_SVG_Player_2", "mouseenter", "mouseleave", "Class_Buttons_Add_Hover_Animations_2", "Class_Buttons_Remove_Hover_Animations_2");
//                                  _________________________________________
//                                   Event Listener for setting correct names

document.getElementById("ID_Choose_KI").addEventListener("change", ()=>{
    // Set correct names after choosing "Play against"
        // If "Play against CPU = No" is selected, make sure "No" isn't the name of Player Two
        if(document.getElementById("ID_Choose_KI").value === "No") {document.getElementById("ID_Player_2_Name").value = localStorage.Player_Two_Name || document.getElementById("ID_Player_2_Name").placeholder;} 
        else // If it is a game against CPU, set Player Two Name to KI Level
        document.getElementById("ID_Player_2_Name").value = document.getElementById("ID_Choose_KI").value;
});
//                                  ________________________________________________
//                                   Event Listener for showing Player name is saved
document.getElementById("ID_SVG_Player_1").addEventListener("click", ()=>{
    //console.log("Player 1 name saved to local Storage.");
    // Create notiification element
    const notification = document.createElement("h3");
    notification.innerText = "Name saved!"
    notification.style.width = "100%";
    notification.classList.add("Class_LeftNot");
    // Push it to DOM
    left_sidebar.appendChild(notification);
    // Smooth showing
    notification.classList.add("Class_Smooth_In");
    // Smooth removing after 3 seconds
    setTimeout(()=>{
        notification.classList.remove("Class_Smooth_In");
        notification.classList.add("Class_Smooth_Out");
        }, 3000);
    // Remove it from DOM 
    setTimeout(()=>{notification.remove()}, 4000);
});
document.getElementById("ID_SVG_Player_2").addEventListener("click", ()=>{
    //console.log("Player 2 name saved to local Storage.");
    // Create notiification element
    const notification = document.createElement("h3");
    notification.innerText = "Name saved!"
    notification.style.width = "100%";
    notification.classList.add("Class_RightNot");
    // Push it to DOM
    right_sidebar.appendChild(notification);
    // Smooth showing
    notification.classList.add("Class_Smooth_In");
    // Smooth removing after 3 seconds
    setTimeout(()=>{
        notification.classList.remove("Class_Smooth_In");
        notification.classList.add("Class_Smooth_Out");
        }, 3000);
    // Remove it from DOM 
    setTimeout(()=>{notification.remove()}, 4000);
});

//#endregion

//                                  _______________________________
//                                   Set up Settings-Menu
//#region Settings-Menu Set up

// Show / Hide & Style Event-Listener
settings_svg.addEventListener("click", ()=>{
    if(!settings_menu.classList.contains("Class_Showing_Settings")){
    settings_menu.style.display = "block";
    settings_menu.classList.add("Class_Showing_Settings");
    settings_menu.classList.remove("Class_Hide_Settings");
}});

settings_menu.addEventListener("", ()=>{
    settings_menu.classList.remove("Class_Showing_Settings");
    settings_menu.classList.add("Class_Hide_Settings");
});


// Get up-tp-date stats for the Settings-Menu
Stats();

//#endregion
//                                  ______________________________________________________________________________________________________
//                                   Settings-Menu Event-Listener:  Choose Language (Menu), Choose Colour (Menu), Reset Stats (Menu)
//#region Event-Listeners Settings-Menu
document.getElementById("ID_Language_Menu").addEventListener("change", () => {
// Save language in Local Storage and Game Object
// Important maybe for later: With more languages, if/else needed!
let languageCode;
document.getElementById("ID_Language_Menu").value === "Deutsch" ? languageCode = "de" : languageCode = "en";
localStorage.Language = languageCode; localStorage.LanguageIsSetttedByUser = true;
Game.Language = languageCode; Game.LanguageIsSetttedByUser = true;
// Make sure that a manually setted setted language is not overwritten by the default detected default browser language
Translate_StartScreen(languageCode, true);
});
document.getElementById("ID_Colour_Checkbox").addEventListener("click", () => {
document.getElementById("ID_Colour_Checkbox").checked === true ? player_Colour_Left = "red" : player_Colour_Left = "yellow";
});
document.getElementById("ID_Reset_Easy").addEventListener("click", ()=>{
localStorage.KI_Easy_Wins = 0; localStorage.KI_Easy_CPUWins = 0; localStorage.KI_Easy_Draws = 0;
});
document.getElementById("ID_Reset_Normal").addEventListener("click", ()=>{
localStorage.KI_Normal_Wins = 0; localStorage.KI_Normal_CPUWins = 0; localStorage.KI_Normal_Draws = 0;
});
document.getElementById("ID_Delete_All").addEventListener("click", ()=>{
// Play warning sound
warning_audio.play();
// Confirm message
let warning;
if(Game.Language === "de"){
    warning =  confirm(`${localStorage.getItem("Player_One_Name") || "Spieler"}, willst du wirklich die gespeicherte Sprache, die Spieler Namen und die Statistiken von deinem local-Storage löschen? Diese Daten sind nur in deinem Browser gespeichert und können nach einer Löschung nicht wiederhergestellt werden.`)
} else warning =  confirm(`${localStorage.getItem("Player_One_Name") || "Player"}, do you really want do delete the saved language, saved Player names and the stats from your local Storage? The data is stored in your Browser and cannot be restored again after deleting it.`)
// Clear local storage
if(warning === true) {localStorage.clear();};
});
//#endregion

//                                  ______________________________
//                                   Event Listener to start Game
document.getElementById("ID_Start_Button").addEventListener("click", MainGame);
//#endregion

//#region Main Game
                                                                                                                                                                                                                                                                                /*
================================================================================================================================================================================================================================================================================
 
                                             Main Game

===============================================================================================================================================================================================================================================================================*/

//                                  ____________________
//                                   Main Game function

function MainGame() {

// Make sure at Game start are valid name variables available 
if(player_1_name.value === "") player_1_name.value = player_1_name.placeholder;
if(player_2_name.value === "") player_2_name.value = player_2_name.placeholder;
Game.Player_One_Name = player_1_name.value;
Game.Player_Two_Name = player_2_name.value;

// Proof if Game is against KI
if(document.getElementById("ID_Choose_KI").value != "No") Game.Game_against_KI = true;
// And if it is, set the KI Level
if(Game.Game_against_KI === true){
if(document.getElementById("ID_Choose_KI").value === "KI_Easy") Game.KI_Level = "Easy"; else Game.KI_Level = "Normal";}

// DOM-Manipulation to get to the "Game-Screen"
Game_Screen();


// Create DOM-Elements for switch which player is on turn  
Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", Class: "Class_Turn_PLayers", ID: "ID_Turn_Div" });
Create_DOM_Element({ ParentID: "ID_Turn_Div", Element: "h3", ID: "ID_h3_turnText"});

// Show correct player is on turn message
Turning_PlayerIsOnTurn();

// After 8 seconds, smoothly remind the Player of time
setTimeout(Thinking_Effect, 8000);

//                      Adding choose & play algorhytmus
// Get the Top Cells for looping trough to put the event listeners on them so the players can make there placements
const topCellsArray = document.getElementsByClassName("Class_TopCells");
// The whole placement and Game Flow is currently in this for loop
for (let topCell of topCellsArray) {

// Get the ID & Column of the TopCell 
let ID_topCell = topCell.id;
let topCellColumn = ID_topCell[4];
//                                  __________________________________________________________
//                                  Event-Listener to make Top-Cells unclickable if neccesary
topCell.addEventListener("click", () => {
//  Make the other top cells unclickable for 1s (animation duration) so it cannont get overlapped
for (let topCellA of topCellsArray) {
topCellA.style = "pointer-events:none";
setTimeout(() => { topCellA.style = "pointer-events: auto" }, 1000);
}
});                            
//                                  __________________________________________
//                                  Event-Listener for the Choosing-Animation
topCell.addEventListener("mouseover", ()=>{Add_Choosing_Ani(topCellColumn)});
topCell.addEventListener("mouseleave", ()=>{Remove_Choosing_Ani(topCellColumn)});
//                                  ______________________________________________
//                                  Event-Listener to start the Game-flow function
topCell.addEventListener("click", GameFlow);
//                                 _______________________________________________
//                                  Placement function for Game and Human Players

function GameFlow() {

// Make sure, placement only is allowed if the animation from the placement before is finished
if (topCell.firstChild) return;
// Get the played top cell for getting the right column to play
topCell = document.getElementById(ID_topCell);

// Increase round counter
Game.roundCounter++;

//                      Get the correct played row
// First get the column number via the id of the top cell
let columnNumber = parseInt(ID_topCell[4]);

// Decrease the row counter by the total columns played in this row before and setting a variable for 
// the correct animations and the placement (to get the correct correct column)
let row;
if (columnNumber === 1) { row_Counter_C1--; row = row_Counter_C1; }
else if (columnNumber === 2) { row_Counter_C2--; row = row_Counter_C2; }
else if (columnNumber === 3) { row_Counter_C3--; row = row_Counter_C3; }
else if (columnNumber === 4) { row_Counter_C4--; row = row_Counter_C4; }
else if (columnNumber === 5) { row_Counter_C5--; row = row_Counter_C5; }
else if (columnNumber === 6) { row_Counter_C6--; row = row_Counter_C6; }
else if (columnNumber === 7) { row_Counter_C7--; row = row_Counter_C7; };

//                              Placing the Coin Section
// Create the correct coin, set correct position and append it to the DOM
let coin = document.createElement("div");

if (Game.playerIsOnTurn === "left") {coin.classList.add("Class_Coin_Yellow"); Game.actualGameboardPlayer1[`C${columnNumber}`].push(row) };
if (Game.playerIsOnTurn === "right") {coin.classList.add("Class_Coin_Red"); Game.actualGameboardPlayer2[`C${columnNumber}`].push(row) };
topCell.appendChild(coin);
// Trigger the correct animation (animation length)
coin.classList.add(`Class_PlacingAnimation_to_Row_${row}`);

//                        After placing Coin Animation, Win Validation and next turn
// Remove the coin with the animation after the animation time ended and place the coin on correct position
setTimeout(() => {

// Remove the animated coin from DOM
topCell.firstChild.remove();

if (Game.playerIsOnTurn === "left") {
// 2 IF Statements after another, first to check if placement was from left or right Player, second to check the choosed colour, which affects the correct placement
if (player_Colour_Left === "yellow") {
// Place the Coin as background image on the correct column (set by the decreased counter from before)
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_1");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
document.getElementById(`ID_C${columnNumber}R${row}`).setAttribute("data-isPlayed", "yes");

} else {
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_2");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
document.getElementById(`ID_C${columnNumber}R${row}`).setAttribute("data-isPlayed", "yes");
}
//  Invoke Winning-Validation for Player 1
let valid_row = Row_Validator(1, row);
let valid_column = Column_Validator(1, columnNumber, row);
let valid_diagonal = Diagonal_Validator(1, columnNumber, row);
if (valid_row === true || valid_column === true || valid_diagonal === true) return;
if (Game.roundCounter === 42){Game_End_Screen(3); return;}; 
TopCell_Validation(columnNumber);
//   If no win, next Player is on turn
Turning_PlayerIsOnTurn();
// If this is a KI, invoke correct KI
if (Game.KI_Level === "Easy") {KI_Easy(); Lock_TopCells()}
else if (Game.KI_Level === "Normal") {KI_Normal(); Lock_TopCells()};
}
// Same for Player 2
else {
if (player_Colour_Left === "red") {
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_1");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
document.getElementById(`ID_C${columnNumber}R${row}`).setAttribute("data-isPlayed", "yes");
} else {
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_2");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
document.getElementById(`ID_C${columnNumber}R${row}`).setAttribute("data-isPlayed", "yes");
}
//  Invoke Winning-Validation for Player 2
let valid_row = Row_Validator(2, row);
let valid_column = Column_Validator(2, columnNumber, row);
let valid_diagonal = Diagonal_Validator(2, columnNumber, row);
if (valid_row === true || valid_column === true || valid_diagonal === true) return;
if (Game.roundCounter === 42){Game_End_Screen(3); return;}; 
TopCell_Validation(columnNumber);
// Next Player is on turn
Turning_PlayerIsOnTurn();
}
},      // End of the anyonyme function of the setTimeout()
1000); // End of the setTimeout(), next placement is possible!
};    // End Game-Flow-Function
};   // End Main Game for-of Loop (topcell of topCellArray)
};  // End Main Game Wrapper Function
//#endregion

//#region KI Easy / KI Normal / KI Heavy
                                                                                                                                                                                                                                                                                    /*
================================================================================================================================================================================================================================================================================
 
                                    KI Easy / KI Normal / KI Heavy      

===============================================================================================================================================================================================================================================================================*/

//                                  ___________________________
//                                   Placement function for KI

function KI_Placement(valid_number){
    //console.log("Random number for topCell is:  ", random_number);
    const topCellsArray = document.getElementsByClassName("Class_TopCells");
    topCellsArray[valid_number].click();
};
//                                  _______________________________
//                                   Algorhytmus for KI Level Easy

function KI_Easy(){
/*
                            Infobox
Function to let KI Easy produce a random, but valid number for placement
*/
console.log("KI Easy starts to thinking....");
// Get a random number  
let random_number = getRandomInt(7);
// Proof if in this column a placement is possible
let number_proofing = TopCell_Validation(random_number, true);
// If it is possible, name it valid_number and invoke "KI_Thinking", if it isn't get a random number again and proof it as long as there is a valid number
if(number_proofing === true){
let valid_number = random_number;
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

Buggy because of the "3 Coin Chain" Functions (below) doesn't work as espected.I'm getting hands on soon.
*/

// If it is the first KI Normal Placement, make a random placement
if (Game.roundCounter === 1 || Game.roundCounter === 2) KI_Easy(); 
else {

// Proof if KI have to make or avoid vertial finishing move
let upwards = Detect_3_Coin_Chains_Upwards();
if (upwards !== undefined){
// If there is a possibility, proof if placement on top is possible
let upwards_topVal = TopCell_Validation(upwards, true);
if(upwards_topVal === false){ Thinking_Effect(true, upwards); return };};

let sideways = Detect_3_Coin_Chains_Sideways();
console.log("sideway", sideways);
if (sideways !== undefined){ Thinking_Effect(true, sideways); return};

// If not, get possible placements
let numbers_upwards = Get_Valid_Upwards_Placemement();
// Take the first one and proof it
let proof_up = TopCell_Validation(numbers_upwards[0],true);    
if(proof_up === false) { Thinking_Effect(true, numbers_upwards[0]); return };

let numbers_sideways = Get_Valid_Sideways_Placement();
let proof_side = TopCell_Validation(numbers_sideways[0], true);
if(proof_side === false){ Thinking_Effect(true, numbers_sideways[0]); return };

// If nothing is possible, make random placement
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
}
//                                  ________________________________________
//                                   Randomize values from different arrays

function Randomizer (arr1, arr2){
    console.log("Randomizer getted:", arr1,  arr2);
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
    console.log("Randomizer has choosen: " + valid_number);
    return valid_number;
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
return 0
};
array = Game.actualGameboardPlayer2.C2;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 1
};
array = Game.actualGameboardPlayer2.C3;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 2
};
array = Game.actualGameboardPlayer2.C4;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 3
};
array = Game.actualGameboardPlayer2.C5;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 4
};
array = Game.actualGameboardPlayer2.C6;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 5
};
array = Game.actualGameboardPlayer2.C7;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 6
};

// Avoid Human Player Upwards finishing moves section
array = Game.actualGameboardPlayer1.C1;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 0
};
array = Game.actualGameboardPlayer1.C2;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 1
};
array = Game.actualGameboardPlayer1.C3;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 2
};
array = Game.actualGameboardPlayer1.C4;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 3
};
array = Game.actualGameboardPlayer1.C5;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 4
};
array = Game.actualGameboardPlayer1.C6;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 5
};
array = Game.actualGameboardPlayer1.C7;
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 ){
return 6
};

};
//                                  _________________________________________________________________________
//                                   Detection of vertical "3 Coin Chain" to avoid/force finishing (!Buggy!)

function Detect_3_Coin_Chains_Sideways(){
// +++ Basically it depends hardly on the Row Validator from the Win-Validation Section +++
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
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === null) return 3;
} else { // If game is above row 7, ccheck if a finish move is possible 
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === null &&
document.getElementById(`ID_C4R${el - 1}`).getAttribute("data-isPlayed") !== null) return 3;
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer2.C2){
if (Game.actualGameboardPlayer2.C3.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer2.C4.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === null) return 4
// From Column 2 on maybe there is also a free valid slot before the 3 Coin  chain to finish
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el}`).getAttribute("data-isPlayed") === null) return 0;
} else {
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === null &&
countFor_Win === 2 && document.getElementById(`ID_C5R${el +1}`).getAttribute("data-isPlayed") !== null ) return 4; 
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el +1}`).getAttribute("data-isPlayed") !== null) return 0;   
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer2.C3){
if (Game.actualGameboardPlayer2.C4.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer2.C5.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === null) return 5
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el}`).getAttribute("data-isPlayed") === null) return 1;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === null &&
countFor_Win === 2 && document.getElementById(`ID_C6R${el +1}`).getAttribute("data-isPlayed") !== null ) return 5; 
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el +1}`).getAttribute("data-isPlayed") !== null) return 1; 
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer2.C4){
if (Game.actualGameboardPlayer2.C5.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer2.C6.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === null) return 6
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el}`).getAttribute("data-isPlayed") === null) return 2;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === null &&
countFor_Win === 2 && document.getElementById(`ID_C7R${el + 1}`).getAttribute("data-isPlayed") !== null ) return 6; 
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el + 1}`).getAttribute("data-isPlayed") !== null) return 2; 
};};

// Detect 3 Coin chains from Humans to avoid finishing moves 
countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C1){
if (Game.actualGameboardPlayer1.C2.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C3.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === null) return 3;
} else {
if(countFor_Win === 2 && document.getElementById(`ID_C4R${el}`).getAttribute("data-isPlayed") === null &&
document.getElementById(`ID_C4R${el + 1}`).getAttribute("data-isPlayed") !== null) return 3;    
};};


countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C2){
if (Game.actualGameboardPlayer1.C3.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C4.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === null) return 4
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el}`).getAttribute("data-isPlayed") === null) return 0;
} else {
if(countFor_Win === 2 && document.getElementById(`ID_C5R${el}`).getAttribute("data-isPlayed") === null &&
countFor_Win === 2 && document.getElementById(`ID_C5R${el +1}`).getAttribute("data-isPlayed") !== null ) return 4; 
else if (countFor_Win === 2 && document.getElementById(`ID_C1R${el + 1}`).getAttribute("data-isPlayed") !== null) return 0;   
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C3){
if (Game.actualGameboardPlayer1.C4.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C5.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === null) return 5
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el}`).getAttribute("data-isPlayed") === null) return 1;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C6R${el}`).getAttribute("data-isPlayed") === null &&
countFor_Win === 2 && document.getElementById(`ID_C6R${el + 1}`).getAttribute("data-isPlayed") !== null ) return 5; 
else if (countFor_Win === 2 && document.getElementById(`ID_C2R${el + 1}`).getAttribute("data-isPlayed") !== null) return 1; 
};};

countFor_Win = 0;
for(let el of Game.actualGameboardPlayer1.C4){
if (Game.actualGameboardPlayer1.C5.indexOf(el) !== -1) countFor_Win++;
if (Game.actualGameboardPlayer1.C6.indexOf(el) !== -1) countFor_Win++;
if(el === 7){
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === null) return 6
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el}`).getAttribute("data-isPlayed") === null) return 2;}
else {
if(countFor_Win === 2 && document.getElementById(`ID_C7R${el}`).getAttribute("data-isPlayed") === null &&
countFor_Win === 2 && document.getElementById(`ID_C7R${el + 1}`).getAttribute("data-isPlayed") !== null ) return 6; 
else if (countFor_Win === 2 && document.getElementById(`ID_C3R${el + 1}`).getAttribute("data-isPlayed") !== null) return 2; 
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
return valid_number_array
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
return unique_valid_number_array;
};
//#endregion

//#region Validation
                                                                                                                                                                                                                                                                               /*
===============================================================================================================================================================================================================================================================================

                                    Functions for Validations         

===============================================================================================================================================================================================================================================================================*/

//                                  _______________________________________________
//                                   Validate if there is a Diagonal triggered win

function Diagonal_Validator(player, columnNumber, row) {

let basis = document.getElementById(`ID_C${columnNumber}R${row}`);
// Get the to validate Gameboard cell for diagonal validation in right-up and left-down direction (which are in this context the same) based the basis (the played) cell
let second_plus = document.getElementById(`ID_C${columnNumber + 1}R${row + 1}`);
let third_plus = document.getElementById(`ID_C${columnNumber + 2}R${row + 2}`);
let fourth_plus = document.getElementById(`ID_C${columnNumber + 3}R${row + 3}`);

// If there are 3 more cells for validation, check if they contain a players coin...
if (basis != null && second_plus != null && third_plus != null && fourth_plus != null) {
if (basis.classList.contains(`Class_PlacedCoin_${player}`) &&
second_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
third_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
fourth_plus.classList.contains(`Class_PlacedCoin_${player}`)) {

// .. if yes, invoke win"
Game_End_Screen(player, "Diagonal");
return;
};
}

// Now same as above but in the other two diaggonals
// Get the to validate Gameboard cell for diagonal validation in left-up and right-down direction 
let second_minus = document.getElementById(`ID_C${columnNumber - 1}R${row + 1}`);
let third_minus = document.getElementById(`ID_C${columnNumber - 2}R${row + 2}`);
let fourth_minus = document.getElementById(`ID_C${columnNumber - 3}R${row + 3}`);

// If there are 3 more cells for validation, check if they contain a players coin...
if (basis != null && second_minus != null && third_minus != null && fourth_minus != null) {
if (basis.classList.contains(`Class_PlacedCoin_${player}`) &&
second_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
third_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
fourth_minus.classList.contains(`Class_PlacedCoin_${player}`)) {

// .. if yes, invoke win"
Game_End_Screen(player, "Diagonal");
return true;
};
}
};
//                                  ____________________________________________________________
//                                   Validate if the placement in a given Column triggers a 

function Column_Validator(player) {

// Get the actual state of the Gameboard 
let Players_Gameboard;
if (player === 1) Players_Gameboard = Game.actualGameboardPlayer1;
if (player === 2) Players_Gameboard = Game.actualGameboardPlayer2;

// Helper array with the pushed values from the Gameboard 
const validation_array = [];
validation_array.push(Players_Gameboard.C1, Players_Gameboard.C2, Players_Gameboard.C3, Players_Gameboard.C4, Players_Gameboard.C5, Players_Gameboard.C6, Players_Gameboard.C7);

// Now we have an iterable array and can loop trough
for (let obj of validation_array) {
// And we making an iterable array again which allows us to reduce()
let array = Array.from(obj);
// If every row number subtracted with the next row number is equal to 1, there are 4 coins upon each other.
if (array[0] - array[1] === 1 && array[1] - array[2] === 1 && array[2] - array[3] === 1 ||
    array[1] - array[2] === 1 && array[2] - array[3] === 1 && array[3] - array[4] === 1 ||
    array[2] - array[3] === 1 && array[3] - array[4] === 1 && array[4] - array[5] === 1) {

// Invoke a win
Game_End_Screen(player, "Column");
return true;
};
};
}; 
//                                  ________________________________________________________
//                                   Validate if the placement in a given Row triggers a win

function Row_Validator(player, column) {
 
// Get the actual state of the Gameboard
let Players_Gameboard;
if (player === 1) Players_Gameboard = Game.actualGameboardPlayer1;
if (player === 2) Players_Gameboard = Game.actualGameboardPlayer2;

// Set a counting Variable & a helper array with the pushed values from the Gameboard 
let countFor_Win = 0;
const validation_array = [];
validation_array.push(Players_Gameboard.C1, Players_Gameboard.C2, Players_Gameboard.C3, Players_Gameboard.C4, Players_Gameboard.C5, Players_Gameboard.C6, Players_Gameboard.C7);

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
};
};
};
//                                  ___________________________________________
//                                   After 6 placements in one column, lock it

function TopCell_Validation(columnNumber, invokedByKi){

let proof;
if(columnNumber === 1) proof = row_Counter_C1;
else if(columnNumber === 2) proof = row_Counter_C2;
else if(columnNumber === 3) proof = row_Counter_C3;
else if(columnNumber === 4) proof = row_Counter_C4;
else if(columnNumber === 5) proof = row_Counter_C5;
else if(columnNumber === 6) proof = row_Counter_C6;
else if(columnNumber === 7) proof = row_Counter_C7;

// Important! Because the pointer events are also settet to "all" back after during the placement animations during the game, this function have to be after the coin placement section! 
// Proof if the columnNumber was the last possible cell to play in the column
if (proof === 2 && invokedByKi === false){ // If it was lock it for further placements 
        document.getElementById(`ID_C${columnNumber}R1`).style = "pointer-events:none"; return}; 

// If the column is locked for placements, return false to KI Normal & KI Easy, so they know they cant make a placement there. Else return true so they hav a valid column number.
if(invokedByKi === true){
    if(proof === 2){return false} else return true;}

// If it passes the proofment, just return and do nothing
return;
};
//#endregion

//#region Game End Screen
                                                                                                                                                                                                                                                                               /*
===============================================================================================================================================================================================================================================================================

                                    Game End Screen 

===============================================================================================================================================================================================================================================================================*/

//                                  _________________________________
//                                   Creation of the Game-End-Screen

function Game_End_Screen(winning_player, winning_chain) {
// If the Game was against KI, update the stats in the local storage via invoking helper function
if(Game.Game_against_KI === true )Update_Stats(winning_player);

// Loop trough TopCells to give them a better look in the black Game End Screen & Lock the placement function
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray) {
    topCell.classList.add("Class_Top_End");
    topCell.style = "pointer-events:none";
};

// Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it
document.getElementById("ID_h3_turnText").classList.add("Class_Invisible");
if(document.getElementById("ID_Thinking_Div")){
document.getElementById("ID_Thinking_Div").remove();
clearInterval(window.thinking);
};

// Assign correct names to the winner, loser or draw variables
let winner, loser, drawOne, drawTwo;
if(winning_player === 1){winner = Game.Player_One_Name; loser = Game.Player_Two_Name}
else if (winning_player === 2){winner = Game.Player_Two_Name; loser = Game.Player_One_Name}
else drawOne = Game.Player_One_Name; drawTwo = Game.Player_Two_Name;

// DIV Container for the End Screen (Fireworks, Text, Buttons and the Gameboard Animation)
const game_end_container = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Game_End_Container", Class: "Class_Game_End_Container"});
// Create the Containers for the texts
const winning_head = Create_DOM_Element({ ParentID: "ID_Game_End_Container", Element: "h1", ID: "ID_End_H1", Class: "Class_Game_End"});
const winning_text = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "p", ID: "ID_End_Text", Class: "Class_Game_End"});
const button_wrapper = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "div", ID: "ID_End_Button_Div"});
const new_game_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_NewGame_Button", Class: "Class_Game_End"});
const back_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_Back_Button", Class: "Class_Game_End"});

// If it is not a draw or a loose against KI, it is a win from a Human Playert, so add the fireworks
if(winning_player === 1 || winning_player === 2 && Game.Game_against_KI === false){
// Canvas with fireworks layed in a div container, which is then pushed to the Main Wrapper, Now, everything which is pushed to the Main Wrapper
// with a greater z-index is visible over the fireworks canvas
const canvas_div = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Canvas_Div", Class: "Class_Game_End_Div"});
const firework_canvas = Create_DOM_Element({ ParentID: "ID_Canvas_Div", Element: "canvas", ID: "ID_Firework", Class: "Class_Firework"});
Fireworks("ID_Firework");
                                                                                            /*  AUDIO NOT WORKING ON FIREFOX
                                                                                            win_audio.loop = true;
                                                                                            win_audio.play(); */

// Add correct Language to Game End Screen 
if(Game.Language === "de"){
// Deutsch for Games with a wining Human Player
document.getElementById("ID_End_H1").innerText = `Gratulation, ${winner}!`;
document.getElementById("ID_End_H1").alt = `${winner} hat das Spiel gewonnen`;
document.getElementById("ID_End_Text").innerText = `Du hast das Spiel gewonnen!\n Gibst du ${loser} eine Chance auf Revanche oder wollt ihr zurück zur Startseite?`;
document.getElementById("ID_End_H1").alt = "Willst du noch einmal spielen? Klicke auf den Button";
} else { // Else add English for Games with a winning Human Player
document.getElementById("ID_End_H1").innerText = `Congratulations, ${winner}!`;
document.getElementById("ID_End_H1").alt = `${winner} won the game.`;
document.getElementById("ID_End_Text").innerText = `You have won the Game!\n Will you give ${loser} a chance to revanche or do you want back to Starting-Screen?`;
document.getElementById("ID_End_H1").alt = "Another game or back to starting screen?";
};};

// If the KI won against Player (KI is always Player 2 and if Game against KI is true >>> CPU won), add the lose text and screen
if(winning_player === 2 && Game.Game_against_KI === true){
document.getElementById("ID_Game_End_Container").style.backgroundImage = "./Folder_Graphics/Folder_Icons/iconmonstr_com/tearsmiley.svg";
if(Game.Language === "de"){
document.getElementById("ID_End_H1").innerText = "Verloren!";
document.getElementById("ID_End_Text").innerText = `${loser}, lass den Kopf nicht hängen. Dieses mal war der Computer sehr stark. Willst du eine Revanche?`;
} else {
document.getElementById("ID_End_H1").innerText = "Lost!";
document.getElementById("ID_End_Text").innerText = `${loser}, keep your head held high. This time the computer was very strong. Do you want revenge?`;
};
};


// ... for a Draw use this text
if(winning_player === 3){
    if(Game.Language === "de"){
document.getElementById("ID_End_H1").innerText = "Unentschieden!";
document.getElementById("ID_End_Text").innerText = `${drawOne} & ${drawTwo}, seid ihr etwa gleich stark in 4-Gewinnt?\nWollt ihr es noch einmal ausprobieren und euch messen oder zurück zum Startbildchschirm?`;
} else {
document.getElementById("ID_End_H1").innerText = "Draw !";
document.getElementById("ID_End_Text").innerText = `${drawOne} & ${drawTwo}, are you same smart in 4-Wins?\nDo you want to find this out or back to the starting screen?`;
};};

// Back to the starting screen with page refresh
document.getElementById("ID_Back_Button").addEventListener("click", ()=>{
    document.location.reload();   
});

// Doesnt matter if Game won, Draw or loose against KI, this Elements hav to be the same (except of the language, ofc...)
if(Game.Language === "de"){
document.getElementById("ID_NewGame_Button").innerText = "Neues Spiel";
document.getElementById("ID_NewGame_Button").alt = "Neues Spiel - Button";
document.getElementById("ID_Back_Button").innerText = "Zur Startseite";
document.getElementById("ID_Back_Button").alt = "Zur Startseite - Button";
} else {
document.getElementById("ID_NewGame_Button").innerText = "New Game";
document.getElementById("ID_NewGame_Button").alt = "New Game - Button";
document.getElementById("ID_Back_Button").innerText = "Starting Screen";
document.getElementById("ID_Back_Button").alt = "To Starting-Screen - Button";
};

// After Creating the End Screen Container and pushing text to it, remove the Gameboard from the MainWrapper Div to the End Screen Container and assign the class with the End Animation
gameboard.classList.add("Class_Gameboard_End");
main_wrapper.removeChild(gameboard);
document.getElementById("ID_Game_End_Container").appendChild(gameboard);


                                    // New Game Event Listener with important function
document.getElementById("ID_NewGame_Button").addEventListener("click", ()=>{

// Remove TopCell Style class during the End-Screen & unlock the placement function again
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray) {
    topCell.classList.remove("Class_Top_End");
    topCell.style = "pointer-events:auto";

};

// Show the Player is on turn Infobox
document.getElementById("ID_h3_turnText").classList.remove("Class_Invisible");

// Next Player is on turn
Turning_PlayerIsOnTurn();
// If the win was from Human Player 1, KI starts in next round
if(winning_player === 1){
if (Game.KI_Level === "Easy")KI_Easy();
else if (Game.KI_Level === "Normal") KI_Normal();
};

// Reset Game Object    
for (let x = 1; x < 8; x++){
    Game.actualGameboardPlayer1[`C${x}`].length = 0;
    Game.actualGameboardPlayer2[`C${x}`].length = 0;
};

// Reset Gameboard
for (let a = 1; a < 8; a++){
    for ( let b = 2; b < 8; b++){
        document.getElementById(`ID_C${a}R${b}`).classList.remove("Class_PlacedCoin_1");
        document.getElementById(`ID_C${a}R${b}`).classList.remove("Class_PlacedCoin_2");
        document.getElementById(`ID_C${a}R${b}`).style.opacity = 0.7;
    };
};

// Reset round & column counters
Game.roundCounter = 0; 
column_1_Counter = 8;
column_2_Counter = 8;
column_3_Counter = 8;
column_4_Counter = 8;
column_5_Counter = 8;
column_6_Counter = 8;
column_7_Counter = 8;

// Remove the Game End Screen
if(document.getElementById("ID_Firework")){
document.getElementById("ID_Firework").remove();
document.getElementById("ID_Canvas_Div").remove();
};
document.getElementById("ID_Game_End_Container").remove();

// Back to the Ingame screen, pushing the Gameboard to the MainWrapper Div back
gameboard.classList.remove("Class_Gameboard_End");
main_wrapper.appendChild(gameboard);

// Add won game notificiations
if (!document.getElementById("ID_Win_Div_One")) win_div_one = Create_DOM_Element({ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Win_Div_One"});
if (!document.getElementById("ID_Win_Div_Two")) win_div_two = Create_DOM_Element({ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Win_Div_Two"});
// If Player 1 wins, increase player 1 win counter. If it is the first win, add the notification to screen, else update notification 
if(winning_player === 1){
    count_wins_player_one++;
    if (count_wins_player_one === 1)document.getElementById("ID_Win_Div_One").innerText = `${count_wins_player_one} Win`;
    if(count_wins_player_one >= 2)document.getElementById("ID_Win_Div_One").innerText = `${count_wins_player_one} Wins`;
};
// Same as above
if(winning_player === 2){
    count_wins_player_two++;
    if (count_wins_player_two === 1)document.getElementById("ID_Win_Div_Two").innerText = `${count_wins_player_two} Win`;
    if (count_wins_player_two >= 2)document.getElementById("ID_Win_Div_Two").innerText = `${count_wins_player_two} Wins`;
};

}); // Mew Game Event Listener End

};
//#endregion

//#region Helper Functions

                                                                                                                                                                                                                                                                                /*            
================================================================================================================================================================================================================================================================================
 
                                    Helper-Functions               

================================================================================================================================================================================================================================================================================*/

//                                  __________________________________________
//                                  Insert Element after Reference Node in DOM

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};
//                                  _______________________________________
//                                  Add Choosing-Animation from Top-Cells

function Add_Choosing_Ani(column){
    column -= 1;
    const topCellsArray = document.getElementsByClassName("Class_TopCells");
    Game.playerIsOnTurn === "left" ?
    topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_1") :
    topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_2")
};
//                                  __________________________________________
//                                  Remove Choosing-Animation from Top-Cells

function Remove_Choosing_Ani(column){
    column -= 1;
    const topCellsArray = document.getElementsByClassName("Class_TopCells");
Game.playerIsOnTurn === "left" ?
topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_1") :
topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_2")
};
//                                 _______________
//                                  Lock topCells

function Lock_TopCells(){
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray){
topCell.style.cursor = "none"; 
topCell.style = "pointer-events:none"; 
topCell.classList.remove("Class_ChoosingAnimation_Coin_1"); 
topCell.classList.remove("Class_ChoosingAnimation_Coin_2");
};
};
//                                  ______________________________
//                                   Simulate a "Thinking"-Effect

function Thinking_Effect(invokerKI, valid_number){

// First make sure there is no "Thinking" Div attached
if (!document.getElementById("ID_Thinking_Div")){
// If it isn't create DOM ELement for the thinking dots in the turning DIV
const thinker_div = document.createElement("div");
thinker_div.classList.add("Class_Thinking");
thinker_div.id = "ID_Thinking_Div";
document.getElementById("ID_Turn_Div").appendChild(thinker_div);
// Set a Intervall which change the dots in the DOM Element. The changing is realised with setTiemouts, which fakes an text animation effect. This happens all 2 seconds again.
window.thinking = setInterval(()=>{
const dot1 = setTimeout(()=>{
    thinker_div.innerText = ".";
}, 100);
const dot2 = setTimeout(()=>{
    thinker_div.innerText = ". .";
}, 500);
const dot3 = setTimeout(()=>{
    thinker_div.innerText = ". . .";
}, 1000);
const dot4 = setTimeout(()=>{
    thinker_div.innerText = ".....";
}, 1500);
}, 2000);
};
// If the invoker is KI do additional tasks...
if(invokerKI === true){
// Get a random number
const random_number = getRandomInt(7);
// Multiplicy it with 1000 to get a correct time value to invoking setTimeout
let thinking_duration = random_number * 1000;
// If the random time was under 2 (seconds), set it to 2 seconds to make sure "thinking" is not "too fast"
if(thinking_duration < 2000) thinking_duration = 2000;
// Invoke Placement with the given valid number and clear the setted interval after the "thinking" time. 
setTimeout(()=>{
KI_Placement(valid_number)
clearInterval(thinking);
// Remove the "dots"-Div container from the turning Div if it exists
if(document.getElementById("ID_Thinking_Div")){document.getElementById("ID_Thinking_Div").remove();};
}, thinking_duration);
};
};
//                                  ___________________________________
//                                   Filter array to get unique values

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
    // var unique = array.filter(onlyUnique);
};
//                                  __________________
//                                   Get a random Int

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};
//                                  ______________________
//                                   Push to localStorage

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event) {
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, () => {
localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});
}
//                                  __________________________________________
//                                   Swapping classes on element via 2 events

function Swap_Two_Classes_by_Events(element_ID, event_1, event_2, first_Class, second_Class) {
document.getElementById(`${element_ID}`).addEventListener(`${event_1}`, () => {
document.getElementById(`${element_ID}`).classList.remove(`${second_Class}`);
document.getElementById(`${element_ID}`).classList.add(`${first_Class}`);
})
document.getElementById(`${element_ID}`).addEventListener(`${event_2}`, () => {
document.getElementById(`${element_ID}`).classList.remove(`${first_Class}`);
document.getElementById(`${element_ID}`).classList.add(`${second_Class}`);
})
};
//                                  ________________________________
//                                   Change which Player is on turn

function Turning_PlayerIsOnTurn() {
// Change Player
Game.playerIsOnTurn === "left" ? Game.playerIsOnTurn = "right" : Game.playerIsOnTurn = "left";
// Assign text message to the correct Player and with the correct language
if(localStorage.getItem("Language") === "de"){
    Game.playerIsOnTurn === "left" ? document.getElementById("ID_h3_turnText").innerText = `Dein Zug, ${Game.Player_One_Name}` :
    document.getElementById("ID_h3_turnText").innerText = `Dein Zug, ${Game.Player_Two_Name}`;
} else {
Game.playerIsOnTurn === "left" ? document.getElementById("ID_h3_turnText").innerText = `Your turn, ${Game.Player_One_Name}` :
document.getElementById("ID_h3_turnText").innerText = `Your turn, ${Game.Player_Two_Name}`;
};
// Add correct positioning Class to div
if (Game.playerIsOnTurn === "left") {
document.getElementById("ID_Turn_Div").classList.remove("Class_Right_Pos");
document.getElementById("ID_Turn_Div").classList.add("Class_Left_Pos");
} else {
document.getElementById("ID_Turn_Div").classList.remove("Class_Left_Pos");
document.getElementById("ID_Turn_Div").classList.add("Class_Right_Pos");
};

// If there was a "Player thinking animation", end it, remove the Div Container from DOM, trigger the same effect for the other player. (KI Thinking is invoked in the KI-Function because of shorter delay)
if(Game.Game_against_KI === false){
if(document.getElementById("ID_Thinking_Div")){
document.getElementById("ID_Thinking_Div").remove();
clearInterval(window.thinking);
setTimeout(Thinking_Effect, 8000);
};};
// Nearly the same in Game against KI, until no new timer is setted, because this makes the KI after his placement.
if(Game.Game_against_KI === true){
if(document.getElementById("ID_Thinking_Div")){
document.getElementById("ID_Thinking_Div").remove();
clearInterval(window.thinking);
};};
};
//                                  __________________
//                                   Show Game-Screen

function Game_Screen(){
// Remove the start screen elements
document.getElementById("ID_Header").style = "display: none";
document.getElementById("ID_LeftSidebarWrapper").style = "display: none"; 
document.getElementById("ID_RightSidebarWrapper").style = "display: none";
document.getElementById("ID_FooterWrapper").style = "display: none";
// Use the new free space for the Gameboard
document.getElementById("ID_MainWrapper").classList.add("Class_Main_Wrapper_InGame");
document.getElementById("ID_GameboardWrapper").classList.add("Class_Gameboard_Wrapper_InGame");
if(document.getElementById("ID_h3_turnText")) document.getElementById("ID_h3_turnText").style = "display: block";
}
//                                  ___________________
//                                   Show Start-Screen

function Start_Screen(){
// Add the start screen elements
document.getElementById("ID_Header").style = "display: block";
document.getElementById("ID_LeftSidebarWrapper").style = "display: block";
document.getElementById("ID_RightSidebarWrapper").style = "display: block";
document.getElementById("ID_FooterWrapper").style = "display: block";

document.getElementById("ID_MainWrapper").classList.remove("Class_Main_Wrapper_InGame");
document.getElementById("ID_GameboardWrapper").classList.remove("Class_Gameboard_Wrapper_InGame");
document.getElementById("ID_h3_turnText").style = "display: none";
}
//                                  ________________________
//                                   Keep stats up-to-date

function Stats(){
let value = localStorage.KI_Easy_Wins || 0; document.getElementById("ID_Easy_1").innerText = value;
value = localStorage.KI_Easy_CPUWins || 0; document.getElementById("ID_Easy_3").innerText = value;
value = localStorage.KI_Easy_Draws || 0; document.getElementById("ID_Easy_2").innerText = value;
value = localStorage.KI_Normal_Wins || 0; document.getElementById("ID_Normal_1").innerText = value;
value = localStorage.KI_Normal_CPUWins || 0; document.getElementById("ID_Normal_3").innerText = value;
value = localStorage.KI_Normal_Draws || 0; document.getElementById("ID_Normal_2").innerText = value;
}
//                                  __________________________
//                                   Increase Stats after Win

function Update_Stats(winning_player){
// To reduce repetition only the KI Easy section is commented out. It's basically the same in KI Normal.
let value;
// Easy Stats
if(Game.KI_Level === "Easy"){
//   if Player wins           Get value from storage or set to 0; increase value;  update storage with increased value; .....
if(winning_player === 1){ value = localStorage.KI_Easy_Wins || 0; value++; localStorage.KI_Easy_Wins = value;
        // ...and set new value in Settings-Stats-Menu;
document.getElementById("ID_Easy_1").innerText = value;};
//     if CPU Wins...
if(winning_player === 2){ value = localStorage.KI_Easy_CPUWins || 0; value++; localStorage.Easy_CPUWins = value;
document.getElementById("ID_Easy_3").innerText = value;};
//     if it is a draw...
if(winning_player === 3){ value = localStorage.KI_Easy_Draws || 0; value++; localStorage.Easy_Draws = value;
    document.getElementById("ID_Easy_2").innerText = value;};
}
// Normal Stats
else if (Game.KI_Level === "Normal"){
if(winning_player === 1 && KI_Level === "Normal"){ value = localStorage.KI_Normal_Wins || 0; value++; localStorage.KI_Normal_Wins = value;
document.getElementById("ID_Normal_1").innerText = value;};
if(winning_player === 2 && KI_Level === "Normal"){ value = localStorage.KI_Normal_CPUWins || 0; value++; localStorage.Normal_CPUWins = value;
document.getElementById("ID_Normal_3").innerText = value;};
if(winning_player === 3 && KI_Level === "Normal"){ value = localStorage.KI_Normal_Draws || 0; value++; localStorage.Normal_Draws = value;
document.getElementById("ID_Normal_2").innerText = value;};
};
// Enough space for a unbeatable level ??? :-)
};
//                                  _____________________
//                                   "Creator"-Function

function Create_DOM_Element(options, arrayOne, arrayTwo) {

// Define the possible Parameter-List with the associated variables declared
const _parentID = options.ParentID, _element = options.Element, _type = options.Type, _id = options.ID, _class = options.Class, _text = options.Text, _for = options.For,
_title = options.Title, _alt = options.Alt, _src = options.Src, _width = options.Width, _height = options.Height, _aspectRatio = options.AspectRatio,
_min = options.Min, _max = options.Max, _value = options.Value, _placeholder = options.Placeholder, _optionsArray = arrayOne, _valuesArray = arrayTwo;

const element = document.createElement(_element);

// Important properties for "simple" DOM-Elements
if (_id != undefined) element.id = _id;
if (_class != undefined) element.classList.add(_class);
if (_text != undefined) element.innerText = _text;
if (_for != undefined) element.for = _for;
if (_title != undefined) element.title = _text;
if (_alt != undefined) element.alt = _alt;

// Important properties for Image-DOM-Elements
if (_src != undefined) element.src = _src;
if (_width != undefined) element.width = _width;
if (_height != undefined) element.height = _height;
if (_aspectRatio != undefined) element.aspectRatio = _aspectRatio;

// Important properties for Input-DOM-Elements
if (_min != undefined) element.min = _min;
if (_max != undefined) element.max = _max;
if (_value != undefined) element.min = _value;
if (_placeholder != undefined) element.min = _placeholder;

// Dropdown-Menu Generator
// Proof if both needed Arrays were passed
if (Array.isArray(_optionsArray) === true && Array.isArray(_valuesArray) === true) {
let elementsPointer = 0;
// For every value in ther first/option Array, create a dropdown option and set the correct value from the second/values Array for it
for (let el of _optionsArray) {
element.options.add(new Option(`${el}`, `${_valuesArray}`[elementsPointer]));
elementsPointer++;
};
};

// Finally, push the complete dynamically created, finished object to the DOM!
document.getElementById(_parentID).appendChild(element);

                                                                                                                                                                                                                                                                    /*
Creator-Functions Informations:
All types of Elements possible which you can create 'the normal way' too!
!Important: For correct functionality pass at least the ParentID (to defined where the element should appear in the DOM) & 
the Element argument (tor define which kind of element it is)! 

I recommend the following method for invoking:
Create_DOM_Element({ParentID: "anyId", Element: "div"});

Possible arguments:
parentID, Element-Type, Input-Type, ID, Class, Text, For, Title, Alt, Src, Width, Height, AspectRatio, Min, Max, Value, Placeholder, arrayOne, arrayTwo

*/
};

//                                  ____________________________
//                                   Fireworks Canvas-Animation                                

function Fireworks(canvasID){
// Firework Function not from me, so special thanks goes to Adam, which published it at codepen! Link below!
// Fireworks from Adam: https://codepen.io/Adam12132/pen/gOGrwMR
const canvas = document.getElementById(canvasID);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
function Firework(x,y,height,yVol,R,G,B){
this.x = x;
this.y = y;
this.yVol = yVol;
this.height = height;
this.R = R;
this.G = G;
this.B = B;
this.radius = 2;
this.boom = false;
var boomHeight = Math.floor(Math.random() * 200) + 50;
this.draw = function(){

ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
ctx.beginPath();
//   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
ctx.stroke();
ctx.beginPath();
ctx.arc(this.x,this.y,3,Math.PI * 2,0,false);
ctx.fill();
}
this.update = function(){
this.y -= this.yVol;
if(this.radius < 20){
    this.radius += 0.35;
}
if(this.y < boomHeight){
    this.boom = true;
    
    for(var i = 0; i < 120; i++){
    particleArray.push(new Particle(
        this.x,
        this.y,
        // (Math.random() * 2) + 0.5//
        (Math.random() * 2) + 1,
        this.R,
        this.G,
        this.B,
        1,
    ))

    }
}
this.draw();
}
this.update()
}

window.addEventListener("click", (e)=>{
var x = e.clientX;
var y = canvas.height;
var R = Math.floor(Math.random() * 255)
var G = Math.floor(Math.random() * 255)
var B = Math.floor(Math.random() * 255)
var height = (Math.floor(Math.random() * 20)) + 10;
fireworkArray.push(new Firework(x,y,height,5,R,G,B))
})

function Particle(x,y,radius,R,G,B,A){
this.x = x;
this.y = y;
this.radius = radius;
this.R = R;
this.G = G;
this.B = B;
this.A = A;
this.timer = 0;
this.fade = false;

// Change random spread
this.xVol = (Math.random() * 10) - 4
this.yVol = (Math.random() * 10) - 4


// console.log(this.xVol,this.yVol)
this.draw = function(){
//   ctx.globalCompositeOperation = "lighter"
ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
ctx.save();
ctx.beginPath(); 
// ctx.fillStyle = "white"
ctx.globalCompositeOperation = "screen"
ctx.arc(this.x,this.y,this.radius,Math.PI * 2,0,false);
ctx.fill();

ctx.restore();
}
this.update = function(){
this.x += this.xVol;
this.y += this.yVol;

// Comment out to stop gravity. 
if(this.timer < 200){
    this.yVol += 0.12;
}
this.A -= 0.02;
if(this.A < 0){
    this.fade = true;
}
this.draw();
}
this.update();
}

var fireworkArray = [];
var particleArray = [];
for(var i = 0; i < 6; i++){
var x = Math.random() * canvas.width;
var y = canvas.height;
var R = Math.floor(Math.random() * 255)
var G = Math.floor(Math.random() * 255)
var B = Math.floor(Math.random() * 255)
var height = (Math.floor(Math.random() * 20)) + 10;
fireworkArray.push(new Firework(x,y,height,5,R,G,B))
}


function animate(){
requestAnimationFrame(animate);
// ctx.clearRect(0,0,canvas.width,canvas.height)
ctx.fillStyle = "rgba(0,0,0,0.1)"
ctx.fillRect(0,0,canvas.width,canvas.height);
for(var i = 0; i < fireworkArray.length; i++){
fireworkArray[i].update();
}
for(var j = 0; j < particleArray.length; j++){
particleArray[j].update();
}
if(fireworkArray.length < 4){
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var height = Math.floor(Math.random() * 20);
    var yVol = 5;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);          
    var B = Math.floor(Math.random() * 255);
    fireworkArray.push(new Firework(x,y,height,yVol,R,G,B));
}


fireworkArray = fireworkArray.filter(obj => !obj.boom);
particleArray = particleArray.filter(obj => !obj.fade);
}
animate();

window.addEventListener("resize", (e) => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
})
};
//#endregion

//#region Translation-Manager & Page Library
                                                                                                                                                                                                                                                                                /*
===============================================================================================================================================================================================================================================================================
 
                                    Translation-Manager & Page Library           

===============================================================================================================================================================================================================================================================================*/

//                                 __________________________________
//                                   Translation Managing Function 

function Translate_StartScreen(language, byUser) {
// Make sure browser triggered invokes are not executed if the language was setted manually anytime before
let setted_language = localStorage.Language, settedByUserInStorage = localStorage.LanguageIsSetttedByUser;

if (byUser === true){
    if(setted_language === "de") Deutsch(); else English();
}
else{ 
    if(language === "de") Deutsch(); else English();
}

// Never changing text
credits_h.innerText = "Credits";
sound_h.innerText = "Sound";

// Make sure the dropdown menu is always selected with the actual languag
if (localStorage.getItem("Language") === "de") document.getElementById("ID_Language_Menu").value === "Deutsch";
else if (localStorage.getItem("Language") === "en") document.getElementById("ID_Language_Menu").value === "English"; 
};

//                                  ___________________
//                                    Deutsch Library 

function Deutsch() {
    head_title.innerText = "+++ 4-Gewinnt +++";
    settings_svg.title = "Einstellungen";
    headline_top.innerText = "Online 4-Gewinnt";
    headline_p.innerText = "Spiele gegen deine Freunde oder gegen die KI!";
    player_1_headline.innerText = "Wähle einen Namen";
    player_1_name.placeholder = "Spieler 1";
    player_2_headline.innerText = "Wähle einen Namen";
    player_2_name.placeholder = "Spieler 2";
    play_against.innerText =  "Gegen den Computer spielen?"
    start_button.innerText = "Spiel Starten";
    info_h.innerText = "Spielanleitung";
    language_h.innerText = "Spracheinstellung";
    contact_h.innerText = "Kontakt";
    stats.innerText = "Statistiken gegen den CPU";
    delete_all.innerText = "Alles löschen";
    label_colour.innerText = "Farbwahl";
    // Dropdown
    document.getElementById("ID_No").innerText = "Nein";
    document.getElementById("ID_Easy_Text").innerText = "KI Einfach";
    
};
//                                   ___________________
//                                    English Library 

function English() {
    head_title.innerText = "+++ 4-Wins +++";
    settings_svg.title = "Settings";
    headline_top.innerText = "Four Wins";
    headline_p.innerText = "Play against friends or KI!";
    player_1_headline.innerText = "Choose Name";
    player_1_name.placeholder = "Player 1";
    player_2_headline.innerText = "Choose Name";
    player_2_name.placeholder = "Player 2";
    play_against.innerText =  "Play against the CPU?"
    start_button.innerText = "Start Game";
    info_h.innerText = "Instructions";
    language_h.innerText = "Language";
    contact_h.innerHTML = "Contact";
    stats.innerText = "Statistics against CPU";
    delete_all.innerText = "Delete all";
    label_colour.innerText = "Choose Colour";
    document.getElementById("ID_No").innerText = "No";
    document.getElementById("ID_Easy_Text").innerText = "KI Easy";
 
};
//#endregion

//#region Final informations and Comments

                                                                                                                                                                                                                                                                                /*
================================================================================================================================================================================================================================================================================
 
                                    Final information and Comments          

================================================================================================================================================================================================================================================================================

     Bonus Jobs to-do:

-) Highlight the winning chain!

                                                                                                                                                                                                                                                                                */
//#endregion

//#region Credits
                                                                                                                                                                                                                                                                                /*
    
######################################################################################################################
#                                                                                                                    #
#                                       Credits & Special Thanks to:                                                 #
#                                                                                                                    #
#    Special thanks to the "Odin Project"-Team who did a great job in giving advice for learning Web-Development.    #
#                                      https://www.theodinproject.com/                                               #
#                                                                                                                    #
#                   Greetings to the many, many programmers who take the time to write blogs,                        #
#        Of course also big thanks to all photographers and graphic designers who make their works available.        #
#                                                                                                                    #
#                                      CSS - what a wonderful language.                                              #
#                                                                                                                    #
#                                                                                                                    #
######################################################################################################################                                                                                                                                                               */

//#endregion