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
                            |                  3) KI                                                |
                            |                                                                       |
                            |                  4) Validations                                       |
                            |                                                                       |
                            |                  5) Game-End Screen                                   |
                            |                                                                       | 
                            |                  6) Helper-Functions                                  |
                            |                                                                       |
                            |                  7) Translation Manager & Page Library                |
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
 
                                        -) Try mylibrary using and update it                                                                                                                                                                                                                                 
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

//#region KI Easy / KI Normal / KI Heavy
                                                                                                                                                                                                                                                                                    /*
================================================================================================================================================================================================================================================================================
 
                                    KI Easy / KI Normal / KI Heavy      

===============================================================================================================================================================================================================================================================================*/

//                                  ___________________________
//                                   Placement function for KI

function KI_Placement(valid_number){
    // console.log("Random number for topCell is:  ", random_number);

    // Make the Placement
    const topCellsArray = document.getElementsByClassName("Class_TopCells");
    topCellsArray[valid_number].click();  

    // If it was the last Cell in the Column, lock it
    let columnNumber = valid_number + 1;
    TopCell_Validation(columnNumber, false);    
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
console.log("KI Easy makes placement:", valid_number - 1);
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

// If it is the first KI Normal Placement, make a random placement
if (Game.roundCounter === 1 || Game.roundCounter === 2) KI_Easy(); 
else {

// Proof if KI have to make or avoid diagonal finishing move
let diagonal = Detect_3_Coin_Chains_Diagonal();
if (diagonal !== undefined){
console.log("Diagonal:", diagonal);
// If there is a possibility, proof if placement on top is possible
let diagonal_topVal = TopCell_Validation(diagonal, true);
console.log("Diagonal Top Validation:", diagonal_topVal);
if(diagonal_topVal === true){ Thinking_Effect(true, diagonal - 1); return };};

// Proof if KI have to make or avoid vertial finishing move
let upwards = Detect_3_Coin_Chains_Upwards();
if (upwards !== undefined){
console.log("Upwards:", upwards);
// If there is a possibility, proof if placement on top is possible
let upwards_topVal = TopCell_Validation(upwards, true);
console.log("Upwards Top Validation:", upwards_topVal);
if(upwards_topVal === true){ Thinking_Effect(true, upwards - 1); return };};

let sideways = Detect_3_Coin_Chains_Sideways();
if (sideways !== undefined){ console.log("Sideway:", sideways); Thinking_Effect(true, sideways); return};

// If not, get possible placements
let numbers_upwards = Get_Valid_Upwards_Placemement();
console.log("Valid Upwards:", numbers_upwards);
// Take the first one and proof it
if(numbers_upwards !== undefined){
let proof_up = TopCell_Validation(numbers_upwards[0],true);
console.log("Valid Upwards TopCell Validation result:", proof_up);
if(proof_up === true) { Thinking_Effect(true, numbers_upwards[0]); return };
};

let numbers_sideways = Get_Valid_Sideways_Placement();
console.log("Valid Sideways:", numbers_sideways);
if(numbers_sideways !== undefined){
let proof_side = TopCell_Validation(numbers_sideways[0], true);
console.log("Valid Sideways Top Cell Validation result:", proof_side);
if(proof_side === true){ Thinking_Effect(true, numbers_sideways[0]); return };
};

console.log("KI Normal does not have a valid placement. Let KI Easy try...");
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

function TopCell_Validation(columnNumber, invokedForKiValidation){

let proof;
if(columnNumber === 1) proof = row_Counter_C1;
else if(columnNumber === 2) proof = row_Counter_C2;
else if(columnNumber === 3) proof = row_Counter_C3;
else if(columnNumber === 4) proof = row_Counter_C4;
else if(columnNumber === 5) proof = row_Counter_C5;
else if(columnNumber === 6) proof = row_Counter_C6;
else if(columnNumber === 7) proof = row_Counter_C7;
// console.log(columnNumber);
// console.log(proof);

// Important! Because the pointer events are also settet to "all" back after during the placement animations during the game, this function have to be after the coin placement section! 
// Proof if the columnNumber was the last possible cell to play in the column
if (proof === 2 && invokedForKiValidation === false){ // If it was lock it for further placements 
        // console.log("Lock it");
        document.getElementById(`ID_C${columnNumber}R1`).innerText = "Full!";
        document.getElementById(`ID_C${columnNumber}R1`).style = "pointer-events: none";
        return}; 

// If the column is locked for placements, return false to KI Normal & KI Easy, so they know they cant make a placement there. Else return true so they hav a valid column number.
if(invokedForKiValidation === true){
    if(proof < 3){return false} else return true;}

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

// Play correct Audio   
if (Game.Sound === true){
if(winning_player === 2 && Game.Game_against_KI === true){
    lost_audio.play();} else {win_audio.play();};
};
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
    headline_top.innerText = "Online 4-Gewinnt";
    headline_p.innerText = "Spiele gegen deine Freunde oder gegen die KI!";
    player_1_headline.innerText = "Wähle einen Namen";
    player_1_name.placeholder = "Spieler 1";
    player_1_name.title = "Name Spieler 1";
    player_1_name.alt = "Gib Spieler 1 Namen ein";
    player_1_svg.title = "Speichere den Namen für spätere Spiele!";
    player_1_svg.alt = "Button zum speichern des Namens.";
    player_2_headline.innerText = "Wähle einen Namen";
    player_2_name.placeholder = "Spieler 2";
    player_2_name.title = "Name Spieler 2";
    player_2_name.alt = "Gib Spieler 2 Namen ein";
    player_2_svg.title = "Speichere den Namen für spätere Spiele!";
    player_2_svg.alt = "Button zum speichern des Namens.";
    start_button.innerText = "Spiel Starten";
    start_button.title = "Spiel Starten!";
    start_button.alt = "Spiel Starten Button";
    settings_menu.title = "Einstellungen";
    settings_menu.alt = "Einstellungen";
    info_h.innerText = "Spielanleitung";
    info_h.title = "Zur Spielanleitung";
    info_h.alt = "Zur Spielanleitung";
    label_colour.innerText = "Farbwahl";
    colour.title = "Wähle eine Farbe für Spieler 1!";
    colour.alt = "Wähle eine Farbe für Spieler 1";
    sound_checkbox.title = "Sound ON / OFF";
    sound_checkbox.alt = "Sound ON / OFF";
    language_h.innerText = "Spracheinstellung";
    language_menu.title = "Wähle deine Sprache!";
    language_menu.alt = "Wähle deine Sprache";
    contact_h.innerText = "Kontakt";
    contact_h.title = "Zu den Kontaktmöglichkeiten";
    contact_h.alt = "Zu den Kontaktmöglichkeiten";
    credits_h.title = "Zu den Credits";
    credits_h.alt = "Zu den Credits";
    stats_sum_easy.innerText = "Einfach";
    stats_sum_easy.alt = "Statistik Einfach";
    stats.innerText = "Statistiken gegen den CPU";
    stats_easy.title = "Statistik gegen KI Easy";
    stats_easy.alt = "Statistik gegen KI Easy";
    stats_normal.title = "Statistik gegen KI Normal";
    stats_normal.alt = "Statistik gegen KI Normal";
    stats_reset_easy.innerHTML = "Zurücksetzen";
    stats_reset_easy.title = "Zum zurücksetzen klicken!";
    stats_reset_easy.alt = "Button zum zurücksetzen";
    stats_reset_normal.innerHTML = "Zurücksetzen";
    stats_reset_normal.title = "Zum zurücksetzen klicken!";
    stats_reset_normal.alt = "Button zum zurücksetzen";
    delete_all.innerText = "Alle Daten löschen";
    delete_all.title = "Lösche alle Daten!";
    delete_all.alt = "Lösche alle Daten";
    choose_ki.title = "Wähle deinen Gegner!";
    choose_ki.alt = "Wähle deinen Gegner Auswahlmenü!";
    play_against.innerText =  "Gegen den Computer spielen?";
    play_against.alt = "Gegen den Computer spielen?";
    ki_level_dropdown_no.innerText = "Nein"; 
    ki_level_dropdown_no.alt = "Nein";
    ki_level_dropdown_easy.innerText = "CPU Einfach"
    ki_level_dropdown_easy.alt = "Auswahl CPU Einfach";
    ki_level_dropdown_normal.innerText = "CPU Normal";
    ki_level_dropdown_normal.alt = "Auswahl CPU Normal";
};
//                                   ___________________
//                                    English Library 

function English() {
    head_title.innerText = "+++ 4-Wins +++";
    headline_top.innerText = "Four Wins";
    headline_p.innerText = "Play against friends or KI!";
    player_1_headline.innerText = "Choose Name";
    player_1_name.placeholder = "Player 1";
    player_1_name.title = "Player 1 Name";
    player_1_name.alt = "Write Player 1 Name";
    player_1_svg.title = "Save Name for later Games!";
    player_1_svg.alt = "Save Name for later Games!";
    player_2_svg.alt = "Save Name for later Games!";
    player_2_headline.innerText = "Choose Name";
    player_2_svg.title = "Save Name for later Games!";
    player_2_name.title = "Player 2 Name";
    player_2_name.alt = "Write Player 2 Name";
    player_2_name.placeholder = "Player 2";
    start_button.innerText = "Start Game";
    start_button.title = "Start Game!";
    start_button.alt = "Start Game Button";
    settings_menu.title = "Settings";
    settings_menu.alt = "Settings";
    info_h.innerText = "Instructions";
    info_h.title = "To Instructions";
    info_h.alt = "To Instructions";
    colour.title = "Choose Colour for Player 1!";
    label_colour.innerText = "Choose Colour";
    sound_checkbox.title = "Sound ON / OFF";
    sound_checkbox.alt = "Sound ON / OFF";
    language_h.innerText = "Language";
    language_menu.title = "Choose your Language!";
    language_menu.alt = "Choose your Language";
    contact_h.innerHTML = "Contact";
    contact_h.title = "To Contact-Page";
    contact_h.alt = "To Contact-Page";
    credits_h.title = "To Credits";
    credits_h.alt = "To Credits";
    stats.innerText = "Statistics against CPU";
    stats_sum_easy.innerText = "Easy";
    stats_sum_easy.alt = "Statistics Easy";
    stats_easy.title = "Statistics against KI Easy";
    stats_easy.alt = "Statistics against KI Easy";
    stats_normal.title = "Statistics against KI Normal";
    stats_normal.alt = "Statistics against KI Normal";
    stats_reset_easy.innerHTML = "Reset";
    stats_reset_easy.title = "Click to reset!";
    stats_reset_easy.alt = "Reset-Button";
    stats_reset_normal.innerHTML = "Reset";
    stats_reset_normal.title = "Click to reset!";
    stats_reset_normal.alt = "Reset-Button";
    delete_all.innerText = "Delete all Data";
    delete_all.title = "Delete all Data!";
    delete_all.alt = "Delete all Data Button";
    choose_ki.title = "Choose your enemy!";
    choose_ki.alt = "Choose your Enemy Dropdown-Menu";
    play_against.innerText =  "Play against the CPU?";
    play_against.alt = "Play agaiinst CPU";
    ki_level_dropdown_no.innerText = "No"; 
    ki_level_dropdown_no.alt = "Selection No";
    ki_level_dropdown_easy.innerText = "CPU Easy"
    ki_level_dropdown_easy.alt = "Selection Easy";
    ki_level_dropdown_normal.innerText = "CPU Normal";
    ki_level_dropdown_normal.alt = "Selection CPU Normal";
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