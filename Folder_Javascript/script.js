                                                                                                                                                                                                                                                                                    /*
 
                                         Four-Wins-Online Main-Javascript-File                                                           
                                                       powered by
                            
                                                      Stefan Bartl
                                                  (WKDSteVIE / WKDMinerva)
                            
                                                          2021
                            ________________________________________________________________________                                                                                                                                                                                                                                                    
                            #                                                                      #                                                                                                                                                                                  
                            #                           Table of content                           #
                            #______________________________________________________________________# 
                            |                                                                      |
                            |                                                                      |
                            |                 1) General Settings, Global Scoped & DOM             |
                            |                                                                      |
                            |                 2) Main Game Functions                               |
                            |                                                                      |
                            |                 3) KI                                                |
                            |                                                                      |
                            |                 4) Win-Validation                                    |
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



===============================================================================================================================================================================================================================================================================
 
                                    General Settings, Global Scoped Objects/Variables & DOM  

==============================================================================================================================================================================================================================================================================*/

                                                                                                                                                                                                                                                                                /*
                                                        Jobs To-do:

                                        -) KI
                                        -) Firework is not fullscreen on large displays and it was scrollable
                                        -) Code minimazing, f.e. local storage needed or Game object ok? What make sense to do in a function? PRO Styles?
                                        -) Better Styling (find a real good one) 
                                           Bonus Features:
                                        -)  Due Firefox AuDIO is heavy, need more infos and maybe write to players prolemAdd some Audio, Ingame and something in the Settings Menu and also the functionality to control it
                                        -) Free Gameboard-Size
                                        -) Start screen playing animation
                                        -) Go Back from Game Screen to Start screen to change colours, sound or something 

                                                        Session progress:
                                                  Removed small Bug about no valid naming variables where available by first game and no names were choosen. Fixed Game_End_Screen Bug: Gameboard was way to big on large displays and made the screen scrollable. Removed scrolling from starting screen.
                                                  Fixed positions on mobile,                                                                                                                                                                                                                                                             */

//                      Important DOM-Elements

// Container & Wrapper Wirklich NOTWENDIG?
const header = document.getElementById("ID_Header");
const main_wrapper =  document.getElementById("ID_MainWrapper");
const left_sidebar = document.getElementById("ID_LeftSidebarWrapper");
const gameboard = document.getElementById("ID_GameboardWrapper");
const right_sidebar = document.getElementById("ID_RightSidebarWrapper");
const footer = document.getElementById("ID_FooterWrapper");
// Text, Inputs, Images
const head_title = document.getElementById("ID_Head_Title");
const headline_top = document.getElementById("ID_Headline");
const headline_p = document.getElementById("ID_Header_p");
const settings_svg = document.getElementById("ID_Settings");
const settings_menu = document.getElementById("ID_Settings_Menu");
const player_1_headline = document.getElementById("ID_Player_1_Headline");
const player_1 = document.getElementById("ID_Player_1_Name");
const player_2_headline = document.getElementById("ID_Player_2_Headline");
const player_2 = document.getElementById("ID_Player_2_Name");
const start_button = document.getElementById("ID_Start_Button");
const info_h = document.getElementById("ID_Info");
const starting_h = document.getElementById("ID_Starting");
const colour_h = document.getElementById("ID_Colour");
// Settings menu
const language_h = document.getElementById("ID_Language");
const select_deutsch = document.getElementById("ID_Deutsch");
const select_english = document.getElementById("ID_English");
const contact_h = document.getElementById("ID_Contact");
const credits_h = document.getElementById("ID_Credits");
const sound_h = document.getElementById("ID_Sound");

//                                              Audio 
let warning_audio = new Audio("Folder_Audio/freesound_com/OneHits/chord-alert-notification.wav"); // Confirm Audio Sample
let lost_audio = new Audio("Folder_Audio/freesound_com/OneHits/loose.wav"); // Loose against KI Audio Sample
let win_audio = new Audio("Folder_Audio/freesound_com/OneHits/scratchers__cheer.wav"); // Winning Cheer Audio Sample
// Maybe can have a small audio player available (FM4 or something)- API ? -- give a try

/*
let placing_audio = new Audio("Folder_Audio/freesound_com/OneHits/garuda1982__plop-sound-effect.wav");  Placement Ausio Sample
placing_audio.play();     Dont konw why this sound does not work!         */ 

//                      Create an Gameboard Settings Object
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
};

let count_wins_player_one = 0;
let count_wins_player_two = 0;

//                      Global counters and variables          
let game_against_KI = false;
/* Setting the Counters for let the Coin Placing Section know, 
   in which row / column the Game currently is to calculate by placement the correct position */
let column_1_Counter = 8;
let column_2_Counter = 8;
let column_3_Counter = 8;
let column_4_Counter = 8;
let column_5_Counter = 8;
let column_6_Counter = 8;
let column_7_Counter = 8;

// Variable to proof which colour of the playing stones was selected by the Players. Standard is: Left Yellow / Right Red
let player_Colour_Left = "yellow";

// Make sure, after clicking the Colour choose checkbox and than refresh the page, the correct colour is setted. (Checkbox don't uncheck by refresh)
if(document.getElementById("ID_Colour_Checkbox").checked === true) player_Colour_Left = "red";

//                      Set starting page-language
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

// Get up-to-date stats for the settings menu
Stats(); 

//                      Get correct names and style this (naming) section
// Save names from input in local storage
Push_to_LocalStorage("ID_SVG_Player_1", "ID_Player_1_Name", "Player_One_Name", "click");
Push_to_LocalStorage("ID_SVG_Player_2", "ID_Player_2_Name", "Player_Two_Name", "click");
// Hover animations for circles after Name-Inputs
Swap_Two_Classes_by_Events("ID_SVG_Player_1", "mouseenter", "mouseleave", "Class_Buttons_Add_Hover_Animations_1", "Class_Buttons_Remove_Hover_Animations_1");
Swap_Two_Classes_by_Events("ID_SVG_Player_2", "mouseenter", "mouseleave", "Class_Buttons_Add_Hover_Animations_2", "Class_Buttons_Remove_Hover_Animations_2");

//                      Set-up the Settings Menu
// Remove Settings-Menu from Starting-Screen DOM
settings_menu.style.display = "none";
// Show / Hide & Style Event-Listener
settings_svg.addEventListener("click", () => {
if (!settings_menu.classList.contains("Class_Showing_Settings")) {
    if(settings_menu.classList.contains("Class_Showing_Settings")){
        settings_menu.classList.remove("Class_Showing_Settings");
        settings_menu.classList.add("Class_Hide_Settings");}

settings_menu.style.display = "block";
settings_menu.classList.add("Class_Showing_Settings");
settings_menu.classList.remove("Class_Hide_Settings");

}
});

settings_menu.addEventListener("mouseleave", () => {

});

//                      Choose Language Event in the settings menu
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

// Event-Listener to change the Colour of the playing stones in the Settings Menu
document.getElementById("ID_Colour_Checkbox").addEventListener("click", () => {
document.getElementById("ID_Colour_Checkbox").checked === true ? player_Colour_Left = "red" : player_Colour_Left = "yellow";
});

// Event listener to reset the stats against CPU
document.getElementById("ID_Reset_Easy").addEventListener("click", ()=>{
localStorage.KI_Easy_Wins = 0; localStorage.KI_Easy_CPUWins = 0; localStorage.KI_Easy_Draws = 0;
});
document.getElementById("ID_Reset_Normal").addEventListener("click", ()=>{
localStorage.KI_Normal_Wins = 0; localStorage.KI_Normal_CPUWins = 0; localStorage.KI_Normal_Draws = 0;
});
document.getElementById("ID_Delete_All").addEventListener("click", ()=>{
// Play warning sound
warning_audio.play();
// Audio is delayed, so delay the confirm
setTimeout(() => {
let warning =  confirm(`${localStorage.getItem("Player_One_Name")}, do you really want do delete the saved language, the Player names and the stats from your local Storage? The data is stored in your Browser and cannot be restored again after deleting it.`)
if(warning === true) localStorage.clear();
}, 750);
});


//                      Setting the Event-Listener to start the Game Button
document.getElementById("ID_Start_Button").addEventListener("click", MainGame);


/*
================================================================================================================================================================================================================================================================================
 
                                    Main Game-Functions        

===============================================================================================================================================================================================================================================================================*/

function MainGame() {

// Make sure at Game start are valid name variables available 
if(!localStorage.Player_One_Name) localStorage.Player_One_Name = document.getElementById("ID_Player_1_Name").value;
if(!localStorage.Player_Two_Name) localStorage.Player_Two_Name = document.getElementById("ID_Player_2_Name").value;

//                      DOM-Manipulation to get to the "Game-Screen"
Game_Screen();

// Create DOM-Elements for switch which player is on turn  
Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", Class: "Class_Turn_PLayers", ID: "ID_Turn_Div" });
Create_DOM_Element({ ParentID: "ID_Turn_Div", Element: "h3", ID: "ID_h3_turnText", Text: `Dein Zug, ${localStorage.getItem("Player_One_Name")}`});

// Show correct player is on turn message
Turning_PlayerIsOnTurn();

//                      Adding choose & play algorhytmus
// Get the Top Cells for looping trough to put the event listeners on them so the players can make there placements
const topCellsArray = document.getElementsByClassName("Class_TopCells");
// The whole placement and Game Flow is currently in this for loop
for (let topCell of topCellsArray) {

// Adding & Removing the "Choose the Column" Animation by adding the correct CSS-Class via Event
topCell.addEventListener("mouseover", () => {
Game.playerIsOnTurn === "left" ?
topCell.classList.add("Class_ChoosingAnimation_Coin_1") :
topCell.classList.add("Class_ChoosingAnimation_Coin_2")
});
topCell.addEventListener("mouseleave", () => {
Game.playerIsOnTurn === "left" ?
topCell.classList.remove("Class_ChoosingAnimation_Coin_1") :
topCell.classList.remove("Class_ChoosingAnimation_Coin_2")
});

topCell.addEventListener("click", () => {
// Make the other top cells unclickable for 1s (animation duration) so it cannont get overlapped
for (let topCellA of topCellsArray) {
topCellA.style = "pointer-events:none";
setTimeout(() => { topCellA.style = "pointer-events: auto" }, 1000);
}
});

// Add the Event listener for the Game-flow function
topCell.addEventListener("click", GameFlow);
let ID_topCell = topCell.id;

//                      Here starts the logical function for jobs after one Player placed a coin

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
if (columnNumber === 1) { column_1_Counter--; row = column_1_Counter; }
else if (columnNumber === 2) { column_2_Counter--; row = column_2_Counter; }
else if (columnNumber === 3) { column_3_Counter--; row = column_3_Counter; }
else if (columnNumber === 4) { column_4_Counter--; row = column_4_Counter; }
else if (columnNumber === 5) { column_5_Counter--; row = column_5_Counter; }
else if (columnNumber === 6) { column_6_Counter--; row = column_6_Counter; }
else if (columnNumber === 7) { column_7_Counter--; row = column_7_Counter; };

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

} else {
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_2");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
}
//  Invoke Winning-Validation for Player 1
let valid_row = Row_Validator(1, row);
let valid_column = Column_Validator(1, columnNumber, row);
let valid_diagonal = Diagonal_Validator(1, columnNumber, row);
if (valid_row === true || valid_column === true || valid_diagonal === true) return;
if (Game.roundCounter === 42){Game_End_Screen(3); return;}; 
// Next Player is on turn
Turning_PlayerIsOnTurn();
}
// Same for Player 2
else {
if (player_Colour_Left === "red") {
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_1");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
} else {
document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_2");
document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
}
//  Invoke Winning-Validation for Player 2
let valid_row = Row_Validator(2, row);
let valid_column = Column_Validator(2, columnNumber, row);
let valid_diagonal = Diagonal_Validator(2, columnNumber, row);
if (valid_row === true || valid_column === true || valid_diagonal === true) return;
if (Game.roundCounter === 42){Game_End_Screen(3); return;}; 
// Next Player is on turn
Turning_PlayerIsOnTurn();
}
},      // End of the anyonyme function of the setTimeout()
1000); // End of the setTimeout(), next placement is possible!
};    // End Game-Flow-Function
};   // End Main Game For-Loop
};  // End Start Game Wrapper Function
/*
===============================================================================================================================================================================================================================================================================

                            Functions for Win-Validation          

===============================================================================================================================================================================================================================================================================*/

//                      Function to validate if there is a Diagonal-Triggered Win
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
}; // Diagonal_Validator End

//                      Function to validate if there is a Column-Triggered Win
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
}; // Column_Validator End

//                      Function to validate if the placement in a given row triggers a win
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
}; // Row_Validator End


/*
===============================================================================================================================================================================================================================================================================

                            Game End Screen 

===============================================================================================================================================================================================================================================================================*/

//                                  Game-End Screen Function
function Game_End_Screen(winning_player, winning_chain) {
// If the Game was against KI, update the stats in the local storage via invoking helper function
if(game_against_KI === true )Update_Stats(winning_player);


// Loop trough TopCells to give them a better look in the black Game End Screen & Lock the placement function
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray) {
    topCell.classList.add("Class_Top_End");
    topCell.style = "pointer-events:none";
};

// Hide the Player is on turn Infobox
document.getElementById("ID_h3_turnText").classList.add("Class_Invisible");

// Assign correct names to the winner, loser or draw variables
let winner, loser, drawOne, drawTwo;
if(winning_player === 1){winner = localStorage.getItem("Player_One_Name"), loser = localStorage.getItem("Player_Two_Name")}
else if (winning_player === 2){winner = localStorage.getItem("Player_Two_Name"), loser = localStorage.getItem("Player_One_Name")}
else drawOne = localStorage.getItem("Player_Two_Name"), drawTwo = localStorage.getItem("Player_One_Name");

// If it is not a draw, add the fireworks
if(winning_player != 3){
// Canvas with fireworks layed in a div container, which is then pushed to the Main Wrapper, Now, everything which is pushed to the Main Wrapper
// with a greater z-index is visible over the fireworks canvas
const canvas_div = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Canvas_Div", Class: "Class_Game_End_Div"});
const firework_canvas = Create_DOM_Element({ ParentID: "ID_Canvas_Div", Element: "canvas", ID: "ID_Firework", Class: "Class_Firework"});
Fireworks("ID_Firework");};

// DIV Container for the End Screen (Fireworks, Text, Buttons and the Gameboard Animation)
const game_end_container = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Game_End_Container", Class: "Class_Game_End_Container"});

/*  AUDIO NOT WORKING ON FIREFOX
win_audio.loop = true;
win_audio.play(); */

let setted_language = localStorage.Language;
// If Language is Deutsch, add this to Game End Screen 
if(setted_language === "de"){
// Deutsch for Games with a wining player
const winning_head = Create_DOM_Element({ ParentID: "ID_Game_End_Container", Element: "h1", ID: "ID_End_H1", Class: "Class_Game_End",
Text: `Gratulation, ${winner}!`, Alt: `${winner} hat das Spiel gewonnen`,});
const winning_text = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "p", ID: "ID_End_Text", Class: "Class_Game_End", Text: `Du hast das Spiel gewonnen!\n Gibst du ${loser} eine Chance auf Revanche oder wollt ihr zurück zur Startseite?`, Alt: "Willst du noch einmal spielen? Klicke auf den Button"})
const button_wrapper = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "div", ID: "ID_End_Button_Div"});
const new_game_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_NewGame_Button", Class: "Class_Game_End",  Text: "Neues Spiel", Alt:"Neues Spiel - Button"});
const back_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_Back_Button", Class: "Class_Game_End", Text: "Zur Startseite", Alt: "Zur Startseite - Button"});
// ... for a Draw change created text and headline
if(winning_player === 3){
document.getElementById("ID_End_H1").innerText = "Unentschieden!";
document.getElementById("ID_End_Text").innerText = `${drawOne} & ${drawTwo}, seid ihr etwa gleich stark in 4-Gewinnt?\nWollt ihr es noch einmal ausprobieren und euch messen oder zurück zum Startbildchschirm?`;
};}
// Else add English
else {
const winning_head = Create_DOM_Element({ ParentID: "ID_Game_End_Container", Element: "h1", ID: "ID_End_H1", Class: "Class_Game_End",
Text: `Congratulations, ${winner}!`, Alt: `${winner} won the game.`,});
const winning_text = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "p", ID: "ID_End_Text", Class: "Class_Game_End", Text: `You have won the Game!\n Will you give ${loser} a chance to revanche or do you want back to Starting-Screen?`, Alt: "Another game or back to starting screen?"})
const button_wrapper = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "div", ID: "ID_End_Button_Div"});
const new_game_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_NewGame_Button", Class: "Class_Game_End",  Text: "New Game", Alt:"New Game Button"});
const back_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_Back_Button", Class: "Class_Game_End", Text: "Back to Start", Alt: "To Start-Screen"});
// ... for a Draw
if(winning_player === 3){
document.getElementById("ID_End_H1").innerText = "Draw !";
document.getElementById("ID_End_Text").innerText = `${drawOne} & ${drawTwo}, are you same smart in 4-Wins?\nDo you want to find this out or back to the starting screen?`;
};
};

// Back to the starting screen with page refresh
document.getElementById("ID_Back_Button").addEventListener("click", ()=>{
    document.location.reload();   
});

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
document.getElementById("ID_Firework").remove();
document.getElementById("ID_Canvas_Div").remove();
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

}; // Game End Screen End


/*            
================================================================================================================================================================================================================================================================================
 
                                    Helper-Functions               

==============================================================================================================================================================================================================================================================================*/

// Function to push the names from the input to the local storage

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event) {
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, () => {
localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});
}

// Function for swaping trough two classes on a element initiate by two events 
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

// Helper function to change Player
function Turning_PlayerIsOnTurn() {
// Change Player
Game.playerIsOnTurn === "left" ? Game.playerIsOnTurn = "right" : Game.playerIsOnTurn = "left";
// Assign text message to the correct Player and with the correct language
if(localStorage.getItem("Language") === "de"){
    Game.playerIsOnTurn === "left" ? document.getElementById("ID_h3_turnText").innerText = `Dein Zug, ${localStorage.getItem("Player_One_Name")}` :
    document.getElementById("ID_h3_turnText").innerText = `Dein Zug, ${localStorage.getItem("Player_Two_Name")}`;
} else {
Game.playerIsOnTurn === "left" ? document.getElementById("ID_h3_turnText").innerText = `Your turn, ${localStorage.getItem("Player_One_Name")}` :
document.getElementById("ID_h3_turnText").innerText = `Your turn, ${localStorage.getItem("Player_Two_Name")}`;
};
// Add correct positioning Class to div
if (Game.playerIsOnTurn === "left") {
document.getElementById("ID_Turn_Div").classList.remove("Class_Right_Pos");
document.getElementById("ID_Turn_Div").classList.add("Class_Left_Pos");
} else {
document.getElementById("ID_Turn_Div").classList.remove("Class_Left_Pos");
document.getElementById("ID_Turn_Div").classList.add("Class_Right_Pos");
};
};

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

// Keep the STats in the Settings Menu Up-to-Date via local Storage
function Stats(){
let value = localStorage.KI_Easy_Wins || 0; document.getElementById("ID_Easy_1").innerText = value;
value = localStorage.KI_Easy_CPUWins || 0; document.getElementById("ID_Easy_3").innerText = value;
value = localStorage.KI_Easy_Draws || 0; document.getElementById("ID_Easy_2").innerText = value;
value = localStorage.KI_Normal_Wins || 0; document.getElementById("ID_Normal_1").innerText = value;
value = localStorage.KI_Normal_CPUWins || 0; document.getElementById("ID_Normal_3").innerText = value;
value = localStorage.KI_Normal_Draws || 0; document.getElementById("ID_Normal_2").innerText = value;
}

// Function for increasing the stats after a win
function Update_Stats(winning_player){
// Easy Stats
//      Player wins                              Get value from storage or set to 0      increase            update storage
if(winning_player === 1 && KI_Level === "Easy"){ let value = localStorage.KI_Easy_Wins || 0; value++; localStorage.KI_Easy_Wins = value;
            // Set new value in Settings menu
document.getElementById("ID_Easy_1").innerText = value;}
// CPU Wins
if(winning_player === 2 && KI_Level === "Easy"){ let value = localStorage.KI_Easy_CPUWins || 0; value++; localStorage.Easy_CPUWins = value;
document.getElementById("ID_Easy_3").innerText = value;}
// Draws
if(winning_player === 3 && KI_Level === "Easy"){ let value = localStorage.KI_Easy_Draws || 0; value++; localStorage.Easy_Draws = value;
    document.getElementById("ID_Easy_2").innerText = value;}

// Normal Stats
//      Player wins                              Get value from storage or set to 0      increase            update storage
if(winning_player === 1 && KI_Level === "Normal"){ let value = localStorage.KI_Normal_Wins || 0; value++; localStorage.KI_Normal_Wins = value;
    // Set new value in Settings menu
document.getElementById("ID_Normal_1").innerText = value;}
// CPU Wins
if(winning_player === 2 && KI_Level === "Normal"){ let value = localStorage.KI_Normal_CPUWins || 0; value++; localStorage.Normal_CPUWins = value;
document.getElementById("ID_Normal_3").innerText = value;}
// Draws
if(winning_player === 3 && KI_Level === "Normal"){ let value = localStorage.KI_Normal_Draws || 0; value++; localStorage.Normal_Draws = value;
document.getElementById("ID_Normal_2").innerText = value;}

// Enough space for a unbeatable level ??? :-)
}; // Update Stats End


//              "Creator-Function" - for creating DOM-Elements and push it to DOM

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
};
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


/*
===============================================================================================================================================================================================================================================================================
 
                                    Translation-Manager & Page Library           

===============================================================================================================================================================================================================================================================================*/

//                      Translation Manager

function Translate_StartScreen(language, byUser) {
// Make sure browser triggered invokes are not executed if the language was setted manually anytime before
let setted_language = localStorage.Language, settedByUserInStorage = localStorage.LanguageIsSetttedByUser;

if (byUser === true){
    if(setted_language === "de") Deutsch(); else English();
}
else{ 
    if(language === "de") Deutsch(); else English();
}

// Bonus: Make sure the dropdown menu is always selected with the actual languag
if (localStorage.getItem("Language") === "de") document.getElementById("ID_Language_Menu").value === "Deutsch";
else if (localStorage.getItem("Language") === "en") document.getElementById("ID_Language_Menu").value === "English"; 
};

//                      Library

// Never changing text
credits_h.innerText = "Credits";
sound_h.innerText = "Sound";

// Set language to Deutsch
function Deutsch() {
    head_title.innerText = "+++ 4-Gewinnt +++";
    settings_svg.title = "Einstellungen";
    headline_top.innerText = "Online 4-Gewinnt";
    headline_p.innerText = "Spiele gegen deine Freunde oder gegen die KI!";
    player_1_headline.innerText = "Wähle einen Namen";
    player_1.placeholder = "Spieler 1";
    player_2_headline.innerText = "Wähle einen Namen";
    player_2.placeholder = "Spieler 2";
    start_button.innerText = "Spiel Starten";
    info_h.innerText = "Spielanleitung";
    starting_h.innerText = "Wer soll starten?";
    language_h.innerText = "Spracheinstellung";
    contact_h.innerText = "Kontakt";
};

// Set language to English
function English() {
    head_title.innerText = "+++ 4-Wins +++";
    settings_svg.title = "Settings";
    headline_top.innerText = "Four Wins";
    headline_p.innerText = "Play against friends or KI!";
    player_1_headline.innerText = "Choose Name";
    player_1.placeholder = "Player 1";
    player_2_headline.innerText = "Choose Name";
    player_2.placeholder = "Player 2";
    start_button.innerText = "Start Game";
    info_h.innerText = "Instructions";
    starting_h.innerText = "Starter";
    language_h.innerText = "Language";
    contact_h.innerHTML = "Contact";
 
};

// Firework Function which is not from me, so special thanks goes to Adam, which published it at codepen! Link below!
// Fireworks from Adam 
// https://codepen.io/Adam12132/pen/gOGrwMR
function Fireworks(canvasID){
// Fireworks
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



/*
================================================================================================================================================================================================================================================================================
 
                                    Final information and Comments          

================================================================================================================================================================================================================================================================================

    
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