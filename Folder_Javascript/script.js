                                                                                                                                                                                                                                                                                    /*
                                             Four-Wins-Online Main-Javascript-File                                                           
                                                           powered by
                            
                                                          Stefan Bartl
                                                     (WKDSteVIE / WKDMinerva)
                            
                                                              2021
                             _______________________________________________________________________                                                                                                                                                                                                                                                    
                            {                   _________________________________                   }                                                                                                                                                                                  
                            {                            Table of content                           }
                            {_______________________________________________________________________} 
                            |                                                                       |
                            |                                                                       |
                            |                  1) DOM, Global Scoped & General Settings             |
                            |                                                                       |
                            |                  2) Main Game                                         |
                            |                                                                       |
                            |                  8) Final Information and Comments                    |
                            |                                                                       |
                            |                  9) Credits                                           |   
                            |                                                                       | 
                            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
                                                                                                                                                                                                                                                                               */                                                                                                                                               

//#region Open Jobs                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                              /*
                                                Jobs To-do:

                                        -) Test and repair responsivness in all sizes
                                                                                                                                                                                                                           
                                        -) Wrap as much in functions as its argueable
                                        -) Reduce document.getE with the DOM assigned variables
                                        -) Try to make the Window Function with Prmoises a "real" confirm Window
                                        -) use more const
                                        -) Try to get the event listener outside and grouped together
                                        -) Code minimazing and fasten it, f.e. local storage needed or Game object ok? What make sense to do in a function? PRO Styles? 
                                           How much i can get in the Game object= row counter ... 
                                           Functions all return; CHECK (and for) Helper mthods like psuh to local storage 
                                           Global variables for DOM Objects possible which are caled often?;
                                        -) Close repatationing code

                                        -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
                                        -) Write a final Comment 

                                        -) Save Default Scripot Files with the new Script Layout for later Projects. Also the index with the all new Toggle Slider and make a new "gloabl" Library for JS & CSS.

                                                   Session progress
                                                                                                                                                                                                                                                                             */
//#endregion

//#region DOM, Global Scoped & General Settings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    #region DOM, Global Scoped & General Settings  
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
const player_1_svg = document.getElementById("ID_SVG_Player_1");
const player_2_headline = document.getElementById("ID_Player_2_Headline");
const player_2_name = document.getElementById("ID_Player_2_Name");
const player_2_svg = document.getElementById("ID_SVG_Player_2");
const start_button = document.getElementById("ID_Start_Button");
const play_against = document.getElementById("ID_Play_Against");
const choose_ki = document.getElementById("ID_Choose_KI");
const ki_level_dropdown_no = document.getElementById("ID_No");
const ki_level_dropdown_easy = document.getElementById("ID_Easy_Text");
const ki_level_dropdown_normal = document.getElementById("ID_Normal_Text");
//            Settings menu
const settings_menu = document.getElementById("ID_Settings_Menu");
const settings_span = document.getElementById("ID_Setting_Span");
const info_h = document.getElementById("ID_Info");
const colour = document.querySelector(".Class_Colour_Toggle");
const language_h = document.getElementById("ID_Language");
const language_menu = document.getElementById("ID_Language_Menu");
const select_deutsch = document.getElementById("ID_Deutsch");
const select_english = document.getElementById("ID_English");
const contact_h = document.getElementById("ID_Contact");
const credits_h = document.getElementById("ID_Credits");
const sound_h = document.getElementById("ID_Sound");
const sound_checkbox = document.getElementById("ID_Sound_Checkbox");
const stats = document.getElementById("ID_Stats");
const stats_easy = document.getElementById("ID_Stats_Easy");
const stats_normal = document.getElementById("ID_Stats_Normal");
const stats_reset_easy = document.getElementById("ID_Reset_Easy");
const stats_sum_easy = document.getElementById("ID_Stats_Summary_Easy");
const stats_reset_normal = document.getElementById("ID_Reset_Normal");
const delete_all = document.getElementById("ID_Delete_All");
const label_colour = document.getElementById("ID_Label_Colour");
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
// Standard is: Left Yellow / Right Red
player_Colour_Left: "yellow",
Sound: true
};

//                                  ____________________
//                                  Windows-Object
const Windows = {
// Object for storing returned Values from own Alert / Confirm / Prompt Windows
};

//                                  _______
//                                   Audio 
//#region Audio
let warning_audio = new Audio("Folder_Audio/freesound_com/OneHits/chord-alert-notification.wav"); // Confirm Audio Sample
warning_audio.load();
let lost_audio = new Audio("Folder_Audio/freesound_com/loose.wav"); // Loose against KI Audio Sample
lost_audio.load();
let win_audio = new Audio("Folder_Audio/freesound_com/klankbeeld__choir-sing-a-final-01.wav"); // Winning Cheer Audio Sample
win_audio.load();
let placing_audio = new Audio("Folder_Audio/freesound_com/OneHits/garuda1982__plop-sound-effect.wav");  //Placement Audio Sample
placing_audio.load();

Game.Sound = localStorage.Sound || true;
Correct_Sound_Setting();

//#endregion

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

// Make sure, after clicking the Colour choose checkbox and than refresh the page, the correct colour is setted
Game.player_Colour_Left = localStorage.Player_Colour_Left || "yellow";
if (Game.player_Colour_Left === "red") {document.getElementById("ID_Toggle_Button").classList.add("Class_Colour_Red"); document.getElementById("ID_Colour_Slider").style.backgroundColor = "red";} 
else {document.getElementById("ID_Toggle_Button").classList.remove("Class_Colour_Red"); document.getElementById("ID_Colour_Slider").style.backgroundColor = "yellow";} 

// Toggle Button in Colour Change Slider Event Listener
document.getElementById("ID_Toggle_Button").addEventListener("click", ()=>{
    console.log("Clicked");
    if(localStorage.Player_Colour_Left === "yellow") {localStorage.Player_Colour_Left = "red"; Game.player_Colour_Left = "red"; document.getElementById("ID_Toggle_Button").classList.add("Class_Colour_Red"); document.getElementById("ID_Colour_Slider").style.backgroundColor = "red"; console.log("Changed Colour to red.")}
    else if (localStorage.Player_Colour_Left === "red") {localStorage.Player_Colour_Left = "yellow"; Game.player_Colour_Left = "yellow"; document.getElementById("ID_Toggle_Button").classList.remove("Class_Colour_Red"); document.getElementById("ID_Colour_Slider").style.backgroundColor = "yellow";console.log("Changed Colour to yellow.")}
});
//#endregion

//                                  ________________________
//                                   Starting Page Language 
//#region Language at Starting-Page
// Detect Browser language, if it can't (i. g. restrictions) set English. Save information in Game Object
let LangauageIsSettedByUser = localStorage.LanguageIsSetttedByUser;
let language = localStorage.Language;
if (LangauageIsSettedByUser == "true"){Translate_StartScreen(language, true); Game.Language = language; Game.LangauageIsSettedByUser = true}
else if (LangauageIsSettedByUser !== "true"){
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
// Get up-tp-date stats for the Settings-Menu
Stats();
// Show Settins-Menu Event-Listener
settings_span.addEventListener("mouseenter", ()=>{
    //If the settíngs icon is clicked and there isnt the showing class attached, remove the Hide Class if attached, then trigger show animatiom
    if(!settings_span.classList.contains("Class_Showing_Settings")){
    settings_span.classList.remove("Class_Hide_Settings");;
    settings_span.classList.add("Class_Showing_Settings");
    return
};}
);

settings_span.addEventListener("touchstart", ()=>{
    //If the settíngs icon is clicked and there isnt the showing class attached, remove the Hide Class if attached, then trigger show animatiom
    if(!settings_span.classList.contains("Class_Showing_Settings")){
    settings_span.classList.remove("Class_Hide_Settings");;
    settings_span.classList.add("Class_Showing_Settings");
    return
};}
);

// Hide Settings-Menu Event-Listener I
document.querySelector("#ID_MainWrapper").addEventListener("mouseenter", ()=>{
       //If the settíngs menu is leaved to the main wrapper and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
if(settings_span.classList.contains("Class_Showing_Settings")){
    settings_span.classList.remove("Class_Showing_Settings");
    settings_span.classList.add("Class_Hide_Settings");
    return
};}
);

document.querySelector("#ID_MainWrapper").addEventListener("touchstart", ()=>{
    //If the settíngs menu is leaved to the main wrapper and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
if(settings_span.classList.contains("Class_Showing_Settings")){
 settings_span.classList.remove("Class_Showing_Settings");
 settings_span.classList.add("Class_Hide_Settings");
 return
};}
);

// Hide Settings-Menu Event-Listener II
document.querySelector("#ID_Head_Text").addEventListener("mousemove", ()=>{
           //If the settíngs menu is leaved to the header and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
if(settings_span.classList.contains("Class_Showing_Settings")){
    settings_span.classList.remove("Class_Showing_Settings");
    settings_span.classList.add("Class_Hide_Settings");
    return
};}
);
//#endregion
//                                  ______________________________________________________________________________________________________
//                                   Settings-Menu Event-Listener for: Info, Choose Language, Choose Colour, Sound On/Off, Reset Stats
//#region Event-Listeners Settings-

document.getElementById("ID_Info").addEventListener("click", ()=>{
    if(Game.Language === "de"){
    New_Window({ID: "ID_Info_Window", Name: document.getElementById("ID_Info").innerText, Alert: true, Variable: "Game Info", Text: 
`Online-4-Gewinnt

1) Das Ziel des Spiels ist es 4 Spielsteine (Coins) nebeneinander, übereinander oder diagonal legen zu können.
Die/der erste SpielerIn, welche dies schafft hat die Runde gewonnen.
2) Die darauffolgende Runde beginnt der/die Verlierer_in aus der Vorrunde. (Gleicht spielerische Vorteile aus)
3) Ein Unentschieden tritt ein, wenn kein Stein mehr spielbar ist und nimmt gewonnen hat. In diesem Fall beginnt derjenige, der nicht den letzten Spielzug machte.

Informationen & Einstellungs-Menü:
Eine Farbwahl ist möglich. Grundeinstellung ist Gelb für den / die linke Spieler_in und Rot für das Gegenüber.
Der Sound hat eine On/Off Funktion und es ist möglich zwischen Deutsch und English zu wöhlen.
Bei Spielen gegen den Computer wird der Spielausgang in einer Statistik aufgezeichnet. Diesen findet man in den Spieleinstellungen unter "Statistiken gegen den CPU".
Diese Statistiken kann man separat zurücksetzen.

Die Einstellungen Sound, Sprache, Statistiken gegen den CPU sowie gespeicherte Spielernamen werden in Ihrem Browser gespeichert. So ist es möglich, dass Sie den Browser schließen
und die Einstellungen trotzdem erhalten bleiben. Wollen Sie diese Einstellungen löschen, so können Sie dies im Einstellungs-Menü ganz unten mit Klick auf "Alles löschen" tun.
`
})} else {
    New_Window({ID: "ID_Info_Window", Name: document.getElementById("ID_Info").innerText, Alert: true, Text: 
`Online-4-Wins

1) The aim of the game is to be able to place 4 tokens (coins) next to each other, on top of each other or diagonally.
The first player to do this wins the round.
2) The following round starts with the loser from the previous round. (Balances game advantages)
3) A tie occurs when there is no more playable checker and has won. In this case, the player who did not make the last move begins.

Information & Settings menu:
A color choice is possible. The basic setting is yellow for the player on the left and red for the opponent.
The sound has an on/off function and it is possible to choose between German and English.
In games against the computer, the outcome of the game is recorded in a statistic. This can be found in the game settings under "Stats vs. CPU".
These statistics can be reset separately.

The settings sound, language, statistics against the CPU and saved player names are saved in your browser. So it is possible that you close the browser
and the settings are retained. If you want to delete these settings, you can do this in the settings menu at the bottom by clicking on "Delete all".
`
})}
});
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
document.getElementById("ID_Sound_Checkbox").addEventListener("change", ()=>{
    if(document.getElementById("ID_Sound_Checkbox").checked === true){
        localStorage.Sound = true;
        Game.Sound = true;
    } else {
        localStorage.Sound = false;
        Game_Sound = false;
    };
});
document.getElementById("ID_Reset_Easy").addEventListener("click", ()=>{
localStorage.KI_Easy_Wins = 0; localStorage.KI_Easy_CPUWins = 0; localStorage.KI_Easy_Draws = 0;
Stats();
});
document.getElementById("ID_Reset_Normal").addEventListener("click", ()=>{
localStorage.KI_Normal_Wins = 0; localStorage.KI_Normal_CPUWins = 0; localStorage.KI_Normal_Draws = 0;
Stats();
});
document.getElementById("ID_Contact").addEventListener("click", ()=>{
    window.open("https://stefanbartl.github.io/StefanBartl_Portfolio/");
});
document.getElementById("ID_Credits").addEventListener("click", ()=>{
    window.open("https://github.com/StefanBartl/FourWins/blob/main/README.md");
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
//#region Start Game
document.getElementById("ID_Start_Button").addEventListener("click", MainGame);
//#endregion

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

const cells_Array = document.getElementsByClassName("Class_Cells");
for (let cell of cells_Array){
    cell.setAttribute("data-isPlayed", "no");
};

// Proof if Game is against KI
if(document.getElementById("ID_Choose_KI").value != "No") Game.Game_against_KI = true;
// And if it is, set the KI Level
if(Game.Game_against_KI === true){
if(document.getElementById("ID_Choose_KI").value === "KI Easy") Game.KI_Level = "Easy"; else Game.KI_Level = "Normal";}

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
if(Game.Sound === true){
placing_audio.play();}
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

if (Game.playerIsOnTurn === "left" && Game.player_Colour_Left === "yellow") {coin.classList.add("Class_Coin_Yellow"); Game.actualGameboardPlayer1[`C${columnNumber}`].push(row)}
else if (Game.playerIsOnTurn === "left" && Game.player_Colour_Left === "red") {coin.classList.add("Class_Coin_Red"); Game.actualGameboardPlayer1[`C${columnNumber}`].push(row)};
if (Game.playerIsOnTurn === "right" && Game.player_Colour_Left === "yellow") {coin.classList.add("Class_Coin_Red"); Game.actualGameboardPlayer2[`C${columnNumber}`].push(row)}
else if (Game.playerIsOnTurn === "right" && Game.player_Colour_Left === "red") {coin.classList.add("Class_Coin_Yellow"); Game.actualGameboardPlayer2[`C${columnNumber}`].push(row)};
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
if (Game.player_Colour_Left === "yellow") {
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
TopCell_Validation(columnNumber, false);
//   If no win, next Player is on turn
Turning_PlayerIsOnTurn();
// If this is a KI, invoke correct KI
if (Game.KI_Level === "Easy") {KI_Easy(); Lock_TopCells()}
else if (Game.KI_Level === "Normal") {KI_Normal(); Lock_TopCells()};
}
// Same for Player 2
else {
if (Game.player_Colour_Left === "red") {
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
TopCell_Validation(columnNumber, false);
// Next Player is on turn
Turning_PlayerIsOnTurn();
}
},      // End of the anyonyme function of the setTimeout()
1000); // End of the setTimeout(), next placement is possible!
};    // End Game-Flow-Function
};   // End Main Game for-of Loop (topcell of topCellArray)
}; 
//#endregion

//#region Final informations and Comments

                                                                                                                                                                                                                                                                                /*
================================================================================================================================================================================================================================================================================
 
                                    Final information and Comments          

================================================================================================================================================================================================================================================================================

     Bonus Jobs to-do:

-) Highlight the winning chain!
-) Improve KI Normal, especially the Diagonal Detection!
-) Write a KI Heavy Algorhytmus!
-) Make it possible to switch from Game Mode to the Starting Screen to change Settings, Names etc...
-) Design a Starting Screen Animation to make it more interesting to play!  
-) Think about a other Design for the Page and the Gameboard!
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