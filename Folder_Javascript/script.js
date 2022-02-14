                                                                                                                                                                        /*
========================================================================================================================================================================
 
                                          Four-Wins-Online Main-Javascript-File
                                                        powered by

                                                        Stefan Bartl
                                                   (WKDSteVIE / WKDMinerva)
        
                                                            2021

                                #################################################################
                                #                    _____________________                      #
                                #                       Table of content:                       #
                                #                                                               #
                                #            1) General Settings, Global Scoped & DOM           #
                                #                                                               #
                                #                    2) Main Game Functions                     #
                                #                                                               #
                                #                          3) KI                                #
                                #                                                               #
                                #                     4) Win-Validation                         #
                                #                                                               #   
                                #                    5) Helper-Functions                        #
                                #                                                               #
                                #           6) Translation Manager & Page Library               #
                                #                                                               #
                                #           7) Final Information and Comments                   #
                                #                                                               #
                                #                        8) Credits                             #
                                #                                                               #  
                                #################################################################

========================================================================================================================================================================
#######################################################################################################################################################################
========================================================================================================================================================================
 
                                    General Settings, Global Scoped Objects/Variables & DOM  
win val bugs, gameend screnn, new  reusable helper fundtionsw /creators)
========================================================================================================================================================================*/

                                                                                                                                                                        /*
            Jobs To-do:

1) Win div mit Ellypse positon absolute über win row
2) Choose which colour 
3) KI 
4) Styling 
5) Start screen playing animation
6) Stay Mobile & Responsive ! Do the Media queries.
7) Nicerer Table of content
8) Add some Audio

                                                                                                                                                                            */

//                      Important DOM-Elements
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
const info_h = document.getElementById("ID_info");
const starting_h = document.getElementById("ID_starting");
const colour_h = document.getElementById("ID_colour");
const language_h = document.getElementById("ID_language");
const select_deutsch = document.getElementById("ID_deutsch");
const select_english = document.getElementById("ID_english");
const contact_h = document.getElementById("ID_contact");
const credits_h = document.getElementById("ID_credits");
const sound_h = document.getElementById("ID_sound");

//                      Create an Gameboard Settings Object
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

//                      Setting the Counters for knowing in wich row of each column the game currently is
let column_1_Counter = 8;
let column_2_Counter = 8;
let column_3_Counter = 8;
let column_4_Counter = 8;
let column_5_Counter = 8;
let column_6_Counter = 8;
let column_7_Counter = 8;

//                      Setting variable to know who is on turn and the counter for the played rounds
let playerIsOnTurn = "left";
let roundCounter = 0;

//                      Set starting page-language
// Detect Browser language, if it can't (i. g. restrictions) set English
let browserLanguage = navigator.language || navigator.userLanguage || "English"; 
// Invoke the translation with the getted language
Translate_StartScreen(browserLanguage, "no");

//                      Get correct names and style this (naming) section
// Save names from input in local storage
Push_to_LocalStorage("ID_SVG_Player_1","ID_Player_1_Name", "Player_One_Name", "click");
Push_to_LocalStorage("ID_SVG_Player_2","ID_Player_2_Name", "Player_Two_Name", "click");
// Hover animations for circles after Name-Inputs
Swap_Two_Classes_by_Events("ID_SVG_Player_1", "mouseenter", "mouseleave", "Class_Buttons_Add_Hover_Animations_1", "Class_Buttons_Remove_Hover_Animations_1");
Swap_Two_Classes_by_Events("ID_SVG_Player_2", "mouseenter", "mouseleave", "Class_Buttons_Add_Hover_Animations_2", "Class_Buttons_Remove_Hover_Animations_2");

//                      Set-up the Settings Menu
// Remove Settings-Menu from Starting-Screen DOM
settings_menu.style.display = "none";
// Show / Hide & Style Event-Listener
settings_svg.addEventListener("click", ()=>{
    if(!settings_menu.classList.contains("Class_Showing_Settings")){
    settings_menu.classList.add("Class_Showing_Settings");
    settings_menu.style.display = "block";
    settings_menu.classList.add("Class_Settings_Animation");
}   else {
    settings_menu.classList.remove("Class_Showing_Settings");
    settings_menu.classList.remove("Class_Settings_Animation");
    settings_menu.style.display = "none";
}});

//                      Choose Language Event in the settings menu
document.getElementById("ID_Language_Menu").addEventListener("change", ()=>{
// Save language in Local Storage
// Important: Because of only 2 Language supported, conditional statement is possible. With more languages, if/else if needed
let languageCode;
document.getElementById("ID_Language_Menu").value === "Deutsch" ? languageCode = "de" : languageCode  = "en";
localStorage.setItem("Language", languageCode);
// Make sure that a manually setted setted language is not overwritten by the default detected default browser language
localStorage.setItem("LanguageSettedByUser", "yes");
Translate_StartScreen(languageCode, "yes");
});

//                      Setting the Event-Listener to start the Game Button
document.getElementById("ID_Start_Button").addEventListener("click", MainGame);

                                                                                                                                                                        /*
========================================================================================================================================================================
                                 
                                    Main Game-Functions        

========================================================================================================================================================================*/

function MainGame(){

//                      DOM-Manipulation to get to the "Game-Screen"
// Remove the start screen elements
document.getElementById("ID_LeftSidebarWrapper").remove();
document.getElementById("ID_RightSidebarWrapper").remove();
document.getElementById("ID_Start_Button").remove();
document.getElementById("ID_Header").remove();
document.getElementById("ID_FooterWrapper").remove();
// Use the new free space for the Gameboard
document.getElementById("ID_GameboardWrapper").classList.add("Class_Gameboard_Wrapper_InGame");
document.getElementById("ID_MainWrapper").classList.add("Class_Main_Wrapper_InGame");

// Create DOM-Elements for switch which player is on turn  
let div_turnText = document.createElement("div"); 
div_turnText.id = "ID_div_turnText";                             
let h3_turnText = document.createElement("h3");
h3_turnText.id = "ID_h3_turnText";
h3_turnText.innerText = `Your turn, ${localStorage.getItem("Player_One_Name")}`;
div_turnText.classList.add("Class_Turn_Players");
document.getElementById("ID_MainWrapper").appendChild(div_turnText);
div_turnText.appendChild(h3_turnText);

//                      Adding choose & play algorhytmus
// Get the Top Cells for looping trough to put the event listeners on them  so the players can make there placements there
const topCellsArray = document.getElementsByClassName("Class_TopCells");

for(let topCell of topCellsArray){
    
// Adding & Removing the "Choose the Column" Animation by adding the correct CSS-Class via Event
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

// Add the Event listerner for the Game-flow function
topCell.addEventListener("click", GameFlow);
let ID_topCell = topCell.id;

//                      Here starts the logical function for jobs after one Player placed a coin

function GameFlow (){
    
// Make sure, placement only is allowed if the animation from the placement before is finished
if(topCell.firstChild) return;
// Get the played top cell for getting the right column to play
topCell = document.getElementById(ID_topCell);

// Increase round counter
roundCounter++;

//                      Get the correct played row
// First get the column number via the id of the top cell
let columnNumber = parseInt(ID_topCell[4]);

// Decrease the row counter by the total columns played in this row before and setting a variable for 
// the correct animations and the placement (to get the correct correct column)
let row;
     if(columnNumber === 1) {column_1_Counter--; row = column_1_Counter;}
else if(columnNumber === 2) {column_2_Counter--; row = column_2_Counter;}
else if(columnNumber === 3) {column_3_Counter--; row = column_3_Counter;}
else if(columnNumber === 4) {column_4_Counter--; row = column_4_Counter;}
else if(columnNumber === 5) {column_5_Counter--; row = column_5_Counter;}
else if(columnNumber === 6) {column_6_Counter--; row = column_6_Counter;}
else if(columnNumber === 7) {column_7_Counter--; row = column_7_Counter;};

//                      Create the correct coin, set correct position and append it to the DOM
let coin = document.createElement("img");
coin.id = "ID_Coin";
if(playerIsOnTurn === "left"){ coin.src = "./Folder_Graphics/freescg_org/diamond_Blue.svg"; Game.actualGameboardPlayer1[`C${columnNumber}`].push(row)};
if(playerIsOnTurn === "right"){ coin.src = "./Folder_Graphics/freescg_org/diamond_Violett.svg"; Game.actualGameboardPlayer2[`C${columnNumber}`].push(row)};
coin.style.height = "30%";
coin.style.width = "30%";
topCell.appendChild(coin);
// Trigger the correct animation (animation length)
coin.classList.add(`Class_PlacingAnimation_Cell_${row}`);

//                        After Animation, Win Validation and next turn
// Remove the coin with the animation after the animation time ended and place the coin on correct position
setTimeout(()=>{

// Remove the animated coin from DOM
topCell.firstChild.remove();

if(playerIsOnTurn === "left"){
    // Place the Coin as background image on the correct column (set by the decreased counter from before)
    document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_1");
    document.getElementById(`ID_C${columnNumber}R${row}`).style.backgroundColor = "yellow";
    document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";

    //  Invoke Winning-Validation for Player 1
    let valid_row = Row_Validator(1, row);
    let valid_column = Column_Validator(1, columnNumber, row);
    let valid_diagonal = Diagonal_Validator(1, columnNumber, row);
    if(valid_row === true || valid_column === true || valid_diagonal === true) return;

    // Next Player is on turn
    Turning_PlayerIsOnTurn();

} else {
    document.getElementById(`ID_C${columnNumber}R${row}`).classList.add("Class_PlacedCoin_2");
    document.getElementById(`ID_C${columnNumber}R${row}`).style.backgroundColor = "red";
    document.getElementById(`ID_C${columnNumber}R${row}`).style.opacity = "1";
    //  Invoke Winning-Validation for Player 2
    let valid_row = Row_Validator(2, row);
    let valid_column =Column_Validator(2);
    let valid_diagonal = Diagonal_Validator(2, columnNumber, row);
    if(valid_row === true || valid_column === true || valid_diagonal === true) return;

    // Next Player is on turn
    Turning_PlayerIsOnTurn();     
}

},
1000); // Next placement is possible!
};    // End Game-Flow-Function
};   // End Main Game For-Loop
};  // End Start Game Wrapper Function
                                                                                                                                                                                         /*
=======================================================================================================================================================================================================
                          
                                        Functions for Win-Validation            

=====================================================================================================================================================================================================================*/

//                      Function to validate if there is a Diagonal-Triggered Win
function Diagonal_Validator(player, columnNumber, row){

let basis = document.getElementById(`ID_C${columnNumber}R${row}`);
// Get the to validate Gameboard cell for diagonal validation in right-up and left-down direction (which are in this context the same) based the basis (the played) cell
let second_plus = document.getElementById(`ID_C${columnNumber + 1}R${row + 1}`);
let third_plus = document.getElementById(`ID_C${columnNumber + 2}R${row + 2}`);
let fourth_plus = document.getElementById(`ID_C${columnNumber + 3}R${row + 3}`);

// If there are 3 more cells for validation, check if they contain a players coin...
if(basis != null && second_plus != null && third_plus != null && fourth_plus != null){
if(basis.classList.contains(`Class_PlacedCoin_${player}`) && 
second_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
third_plus.classList.contains(`Class_PlacedCoin_${player}`) &&
fourth_plus.classList.contains(`Class_PlacedCoin_${player}`)){

// .. if yes, invoke win"
Game_End_Screen(player, "Diagonal");
return; 
};}

// Now same as above but in the other two diaggonals
// Get the to validate Gameboard cell for diagonal validation in left-up and right-down direction 
let second_minus = document.getElementById(`ID_C${columnNumber - 1}R${row + 1}`);
let third_minus = document.getElementById(`ID_C${columnNumber  - 2}R${row + 2}`);
let fourth_minus= document.getElementById(`ID_C${columnNumber  - 3}R${row + 3}`);

// If there are 3 more cells for validation, check if they contain a players coin...
if(basis != null && second_minus != null && third_minus != null && fourth_minus != null){
if(basis.classList.contains(`Class_PlacedCoin_${player}`) && 
second_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
third_minus.classList.contains(`Class_PlacedCoin_${player}`) &&
fourth_minus.classList.contains(`Class_PlacedCoin_${player}`)){

// .. if yes, invoke win"
Game_End_Screen(player, "Diagonal");
return true; 
};}}; // Diagonal_Validator End

//                      Function to validate if there is a Column-Triggered Win
function Column_Validator(player){

// Get the actual stat of the Gameboardgameboard
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
    if(array[0] - array[1]  === 1 && array[1] - array[2] === 1 && array[2] - array[3] === 1){
        
        // Invoke a win
        Game_End_Screen(player, "Column"); 
        return true;
};};}; // Column_Validator End

//                      Function to validate if the placement in a given row triggers a win
function Row_Validator(player, column){

// Get the actual state of the Gameboard
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
if(countFor_Win === 4) {
 
    // Invoke a win
    Game_End_Screen(player, "Row"); 
    return true;
};};}; // Row_Validator End


//                                  Game-End Screen Function
function Game_End_Screen(winning_player, winning_chain){
document.getElementById("ID_MainWrapper").remove();
const game_end_div = document.createElement("div");
game_end_div.id = "ID_Game_End_Screen";
const winning_headline = document.createElement("h3");
winning_headline.innerText = "WIIIIN";
game_end_div.appendChild(winning_headline);
document.body.appendChild(game_end_div);

const winning_head = Create_DOM_Element({ParentID: "ID_Game_End_Screen", Element: "h1", ID: "ID_New_H1", Class: "dv", Text: "Wenn das gehen würde, wäre es schon geil", Title: "dvc", Alt: "Headline of the Game-End/Winning ScreenS"});


}
                                                                                                                                                                                        /*            
==============================================================================================================================================================================================
                                          
                                    Helper-Functions               

==============================================================================================================================================================================================*/

// Function to push the names from the input to the local storage

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event){
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, ()=>{
    localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});
}

// Function for swaping trough two classes on a element initiate by two events 
function Swap_Two_Classes_by_Events(element_ID, event_1, event_2, first_Class, second_Class){
document.getElementById(`${element_ID}`).addEventListener(`${event_1}`, ()=>{
    document.getElementById(`${element_ID}`).classList.remove(`${second_Class}`);
    document.getElementById(`${element_ID}`).classList.add(`${first_Class}`);
})
document.getElementById(`${element_ID}`).addEventListener(`${event_2}`, ()=>{
    document.getElementById(`${element_ID}`).classList.remove(`${first_Class}`);
    document.getElementById(`${element_ID}`).classList.add(`${second_Class}`);
})};    

// Helper function to change Player
function Turning_PlayerIsOnTurn(){
    playerIsOnTurn === "left" ? playerIsOnTurn = "right" : playerIsOnTurn = "left";
    playerIsOnTurn === "left" ? document.getElementById("ID_h3_turnText").innerText = `Your turn, ${localStorage.getItem("Player_One_Name")}` : document.getElementById("ID_h3_turnText").innerText = `Your turn, ${localStorage.getItem("Player_Two_Name")}`;
}
                                                                                                                                                                        /*
========================================================================================================================================================================
                                            
                                    Translation-Manager & Page Library      
                     for language translation of the starting screen and the Settings-Menu      

========================================================================================================================================================================*/

//                      Translation Manager

function Translate_StartScreen(language, byUser){

// Make sure browser triggered invokes are not executed if the language was setted manually anytime before
if(byUser === "no" && localStorage.getItem("LanguageSettedByUser") === "yes"){
if(localStorage.getItem("Language") === "de") Deutsch();
else if(localStorage.getItem("Language") === "en") English();
return
}

if (language === "de") { 
Deutsch(); 
localStorage.setItem("Language", "de")
}
else { 
English(); 
localStorage.setItem("Language", "en")
}; 

// Bonus: Make sure the dropdown menu is always selected with the actual languag
if(localStorage.getItem("Language") === "de")document.getElementById("ID_Language_Menu").value === "Deutsch";
else if(localStorage.getItem("Language") === "en")document.getElementById("ID_Language_Menu").value === "English";
};

//                      Library
    
// Never changing text
credits_h.innerText = "Credits";
sound_h.innerText  = "Sound";

// Set language to Deutsch
function Deutsch(){
head_title.innerText = "+++ 4-Gewinnt +++";
settings_svg.title = "Einstellungen";
headline_top.innerText = "Online 4-Gewinnt";
headline_p.innerText  = "Spiele gegen deine Freunde oder gegen die KI!"; 
player_1_headline.innerText  = "Wähle einen Namen";
player_1.placeholder = "Spieler 1";
player_2_headline.innerText  = "Wähle einen Namen";
player_2.placeholder = "Spieler 2";
start_button.innerText  = "Spiel Starten";
info_h.innerText  = "Spielanleitung";
starting_h.innerText = "Wer soll starten?";
colour_h.innerText  = "Wähle deine Farbe";
language_h.innerText  = "Spracheinstellung";
contact_h.innerText  = "Kontakt";
};

// Set language to English
function English(){   
head_title.innerText = "+++ 4-Wins +++";
settings_svg.title = "Settings";
headline_top.innerText  = "Four Wins";
headline_p.innerText  = "Play against friends or KI!";
player_1_headline.innerText  = "Choose Name";
player_1.placeholder = "Player 1";
player_2_headline.innerText  = "Choose Name";
player_2.placeholder = "Player 2";
start_button.innerText  = "Start Game";
info_h.innerText  = "Instructions";
starting_h.innerText  = "Starter";
colour_h.innerText  = "Choose your Colour";
language_h.innerText  = "Language";
contact_h.innerHTML  = "Contact";
};


//              "Creator-Function" - for creating DOM-Elements and push it to DOM

function Create_DOM_Element(options, arrayOne, arrayTwo){

// Define the possible Parameter-List with the associated variables declared
const _parentID = options.ParentID, _element = options.Element, _type = options.Type, _id = options.ID, _class = options.Class, _text = options.Text, _for = options.For,
_title = options.Title, _alt = options.Alt, _src = options.Src, _width = options.Width, _height  = options.Height, _aspectRatio = options.AspectRatio,
_min = options.Min, _max = options.Max, _value = options.Value, _placeholder = options.Placeholder, _optionsArray = arrayOne, _valuesArray = arrayTwo;

const element = document.createElement(_element);

// Important properties for "simple" DOM-Elements
if(_id != undefined) element.id = _id;
if(_class !=  undefined) element.classList.add(_class);
if(_text != undefined) element.innerText  = _text;
if(_for != undefined) element.for  = _for;
if(_title != undefined) element.title = _text;
if(_alt != undefined) element.alt = _alt;

// Important properties for Image-DOM-Elements
if(_src != undefined) element.src = _src;
if(_width != undefined) element.width = _width;
if(_height != undefined) element.height = _height;
if(_aspectRatio != undefined) element.aspectRatio = _aspectRatio;

// Important properties for Input-DOM-Elements
if(_min != undefined) element.min = _min;
if(_max != undefined) element.max = _max;
if(_value != undefined) element.min = _value;
if(_placeholder != undefined) element.min = _placeholder;
// Dropdown-Menu Generator
// Proof if both needed Arrays were passed
if(Array.isArray(_optionsArray) === true  && Array.isArray(_valuesArray) === true){
let elementsPointer = 0;
// For every value in ther first/option Array, create a dropdown option and set the correct value from the second/values Arrayfor it
for(let el of _optionsArray){
element.options.add( new Option(`${el}`, `${_valuesArray}`[elementsPointer]));
elementsPointer++; };};

// Finally, push the complete dynamically created, finished object to the DOM!
document.getElementById(_parentID).appendChild(element);
};
/*                                Creator-Functions Infobox:
All types of Elements possible which you can create 'the normal way' too!
!Important: For correct functionality pass at least the ParentID (to defined where the element should appear in the DOM) & 
the Element argument (tor define which kind of element it is)! 

I recommend the following method for invoking:
                                        Create_DOM_Element({ParentID: "anyId", Element: "div"});

Possible arguments:
parentID, Element-Type, Input-Type, ID, Class, Text, For, Title, Alt, Src, Width, Height, AspectRatio, Min, Max, Value, Placeholder, arrayOne, arrayTwo

*/

                                                                                                                                                                        /*
========================================================================================================================================================================
                                            
                                    Final information and Comments          

========================================================================================================================================================================*/


    



/*
########################################################################################################################################################################
#                                                                                                                                                                      #
#                                                                     Credits & Special Thanks to:                                                                     #
#                                                                                                                                                                      #
#                                                        Special thanks to the "Odin Project"-Team who did a great job.                                                #
#                                                    Greetings to the many, many programmers who take the time to write blogs,                                         #
#                                      Of course also big thanks to all photographers and graphic designers who make their works available.                            #
#                                                                                                                                                                      #
#                                                                    CSS - what a wonderful language.                                                                  #
#                                                                                                                                                                      #
#                                                                                                                                                                      #
########################################################################################################################################################################*/