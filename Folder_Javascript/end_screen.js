                                                                                                                                                                                                                                                                                    /*
                                             Four-Wins-Online Game End-Screen-Javascript-File                                                           
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
                            |                  1) Game End Screen Function                          |
                            |                                                                       |
                            |                  2) Final Information and Comments                    |
                            |                                                                       |
                            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
                                                                                                                                                                                                                                                                               */                                                                                                                                               

//#region Game End Screen
                                                                                                                                                                                                                                                                               /*
===============================================================================================================================================================================================================================================================================

                                    Game End Screen 

===============================================================================================================================================================================================================================================================================*/

//                                  _________________________________
//                                   Creation of the Game-End-Screen

function Game_End_Screen(winning_player) {

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

// Remove TopCell Style classes collected during the Game and End-Screen & unlock the placement function again
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray) {
    topCell.classList.remove("Class_Top_End");
    topCell.style = "pointer-events:auto";
    topCell.classList.remove("Class_Full_Cell");
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

//#region Final informations and Comments

                                                                                                                                                                                                                                                                                /*
================================================================================================================================================================================================================================================================================
 
                                    Final information and Comments          

================================================================================================================================================================================================================================================================================

     Bonus Jobs to-do:

-) 
                                                                                                                                                                                                                                                                                */
//#endregion
