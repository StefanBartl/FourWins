                                                                                                                                                                                                                                                                                    /*
                                             Four-Wins-Online Screen-Changes  Javascript-File                                                           
                                                           powered by
                            
                                                          Stefan Bartl
                                                     (WKDSteVIE / WKDMinerva)
                            
                                                              2021
                             _______________________________________________________________________                                                                                                                                                                                                                                                    
                            {                   _________________________________                   }                                                                                                                                                                                  
                            {                            Table of content                           }
                            {_______________________________________________________________________} 
                            |                                                                       |
                            |                  1) Toggle Start / Game Screen                        |
                            |                                                                       |
                            |                  2) Game-End Screen Functions                         |
                            |                                                                       |
                            |                  3) Final Information and Comments                    |
                            |                                                                       |
                            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
                                                                                                                                                                                                                                                                               */                                                                                                                                               
//#region Toggle between Start and Game Screen
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
};

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
};
                                                                                                                                                                                                                                                                        //#endregion                            

//#region Game End Screen

//                                  ______________
//                                   Preparations
function Preparations(gameResult){

// console.log("Entered Game End Screen preparations.");

// Play correct Audio   
if(gameResult === 2 && Game.Game_against_KI === true && Game.Sound === true){
    lost_audio.play();
} else if (gameResult !== 3 && WebGLShaderPrecisionFormat.Sound === true){ 
        win_audio.play();
  };
        

// If the Game was against KI, update the stats in the local storage via invoking helper function Update_Stats()
if(Game.Game_against_KI === true )Update_Stats(gameResult);

// Loop trough TopCells to give them a better look in the black Game End Screen & Lock the placement function
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray) {
    topCell.classList.add("Class_Top_End");
    topCell.style = "pointer-events:none";
};

// Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it
document.getElementById("ID_h3_turnText").classList.add("Class_Invisible");
if(document.getElementById("ID_Thinking_Div")){
    document.getElementById("ID_Thinking_Div").classList.add("Class_Invisible");
    clearInterval(window.thinking);
};

// Assign correct names to the winner, loser or draw variables and return it
let winner, loser;
const names_from_result = [];
if(gameResult === 1){names_from_result.push(winner = Game.Player_One_Name, loser = Game.Player_Two_Name)}
    else if (gameResult === 2){names_from_result.push(winner = Game.Player_Two_Name, loser = Game.Player_One_Name)}
        else if(gameResult === 3)names_from_result.push(Game.Player_One_Name, Game.Player_Two_Name);

// console.log("Finished Game End Screen preparations and returned:", names_from_result);

return names_from_result

};

//                                  _________________________________
//                                   Creation of the Game-End-Screen
function Game_End_Screen(gameResult) {

// console.log("Entered Game End Screen Function.");

const result = Preparations(gameResult);

//#region Creation of End-Screen
// DIV Container for the End Screen (Fireworks, Text, Buttons and the Gameboard Animation)
const game_end_container = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Game_End_Container", Class: "Class_Game_End_Container"});

// Create the Containers for the texts
const winning_head = Create_DOM_Element({ ParentID: "ID_Game_End_Container", Element: "h1", ID: "ID_End_H1", Class: "Class_Game_End"});
const winning_text = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "p", ID: "ID_End_Text", Class: "Class_Game_End"});
const button_wrapper = Create_DOM_Element({ParentID: "ID_Game_End_Container", Element: "div", ID: "ID_End_Button_Div"});
const new_game_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_NewGame_Button", Class: "Class_Game_End"});
const back_button = Create_DOM_Element({ ParentID: "ID_End_Button_Div", Element: "button", ID: "ID_Back_Button", Class: "Class_Game_End"});

// If it is not a draw or a loose against CPU, it is a win from a Human Playert, so add the fireworks
if(gameResult === 1 || gameResult === 2 && Game.Game_against_KI === false){
    // Canvas with fireworks layed in a div container, which is then pushed to the Main Wrapper, Now, everything which is pushed to the Main Wrapper
    // with a greater z-index is visible over the fireworks canvas
    const canvas_div = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Canvas_Div", Class: "Class_Game_End_Div"});
    const firework_canvas = Create_DOM_Element({ ParentID: "ID_Canvas_Div", Element: "canvas", ID: "ID_Firework", Class: "Class_Firework"});
    Fireworks("ID_Firework");
    
    // Add correct Language to Game End Screen 
    if(Game.Language === "de"){  // Deutsch for Games with a wining Human Player
        document.getElementById("ID_End_H1").innerText = `Gratulation, ${result[0]}!`;
        document.getElementById("ID_End_H1").alt = `${result[0]} hat das Spiel gewonnen`;
        document.getElementById("ID_End_Text").innerText = `Du hast das Spiel gewonnen!\n Gibst du ${result[1]} eine Chance auf Revanche oder wollt ihr zurück zur Startseite?`;
        document.getElementById("ID_End_H1").alt = "Willst du noch einmal spielen? Klicke auf den Button";
        }   else { // Else add English for Games with a winning Human Player
            document.getElementById("ID_End_H1").innerText = `Congratulations, ${result[0]}!`;
            document.getElementById("ID_End_H1").alt = `${result[0]} won the game.`;
            document.getElementById("ID_End_Text").innerText = `You have won the Game!\n Will you give ${result[1]} a chance to revanche or do you want back to Starting-Screen?`;
            document.getElementById("ID_End_H1").alt = "Another game or back to starting screen?";
            };
        };

// If the KI won against Player CPU is always Player 2 and if Game against KI is true >>> CPU won), add the lose text and screen
if(gameResult === 2 && Game.Game_against_KI === true){
    document.getElementById("ID_Game_End_Container").style.backgroundImage = "./Folder_Graphics/Folder_Icons/iconmonstr_com/tearsmiley.svg";
    if(Game.Language === "de"){
        document.getElementById("ID_End_H1").innerText = "Verloren!";
        document.getElementById("ID_End_Text").innerText = `${result[1]}, lass den Kopf nicht hängen. Dieses mal war der Computer sehr stark. Willst du eine Revanche?`;
        } else {
            document.getElementById("ID_End_H1").innerText = "Lost!";
            document.getElementById("ID_End_Text").innerText = `${result[1]}, keep your head held high. This time the computer was very strong. Do you want revenge?`;
                };
};

// ... for a Draw use this text
if(gameResult === 3){
    if(Game.Language === "de"){
        document.getElementById("ID_End_H1").innerText = "Unentschieden!";
        document.getElementById("ID_End_Text").innerText = `${result[0]} & ${result[1]}, seid ihr etwa gleich stark in 4-Gewinnt?\nWollt ihr es noch einmal ausprobieren und euch messen oder zurück zum Startbildchschirm?`;
    } else {
            document.getElementById("ID_End_H1").innerText = "Draw !";
            document.getElementById("ID_End_Text").innerText = `${result[0]} & ${result[1]}, are you same smart in 4-Wins?\nDo you want to find this out or back to the starting screen?`;
            };
};

// Doesnt matter if Game won, Draw or loose against CPU, this Elements hav to be the same (except of the language, ofc...)
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

                                                                                                                                                                                                                                                                                //#endregion

//#region Event-Listeners
//                                  _____________________________
//                                   Back to Starting Page Button 
// Back to the starting screen with page refresh
document.getElementById("ID_Back_Button").addEventListener("click", ()=>{
    document.location.reload();   
});

//                                  ___________________
//                                   Play another Game 
document.getElementById("ID_NewGame_Button").addEventListener("click", ()=>{
// console.log("New Game selected, preparations will be done...");

const topCellsArray = document.getElementsByClassName("Class_TopCells");
const cellsArray = document.getElementsByClassName("Class_Cells");

// Remove TopCell Style classes collected during the Game and End-Screen & unlock the placement function again
for (let topCell of topCellsArray) {
    topCell.classList.remove("Class_Top_End");
    topCell.innerText = "";
    topCell.style = "pointer-events:auto";
    topCell.classList.remove("Class_Full_Column");
};

// Set the "isPlayed"-Attribute to "no"
for (let cell of cellsArray) {
    cell.setAttribute("isPlayed", "no");
};

// Show the "Player ... is on turn"-Infobox and the "Thinking-Effectt" again
if(document.getElementById("ID_h3_turnText").classList.contains("Class_Invisible")) document.getElementById("ID_h3_turnText").classList.remove("Class_Invisible");

// Treigger next Player is on turn, so the loser of this reound starts the next round.
Turning_PlayerIsOnTurn();

// If the win was from Human Player 1 and it is a game against the CPU, start next round
if(gameResult === 1 && Game.Game_against_KI === true){
    if (Game.KI_Level === "Easy")KI_Easy();
    else if (Game.KI_Level === "Normal") KI_Normal();
};

// Reset the Gameboard in Game Object    
for (let x = 1; x < 8; x++){
    Game.actualGameboardPlayer1[`C${x}`].length = 0;
    Game.actualGameboardPlayer2[`C${x}`].length = 0;
};

// Reset Gameboard on screen
for (let a = 1; a < 8; a++){
    for ( let b = 2; b < 8; b++){
        document.getElementById(`ID_C${a}R${b}`).classList.remove("Class_PlacedCoin_1");
        document.getElementById(`ID_C${a}R${b}`).classList.remove("Class_PlacedCoin_2");
        document.getElementById(`ID_C${a}R${b}`).style.opacity = 0.7;
    };
};

// Reset round & column counters
Game.roundCounter = 0; row_Counter_C1 = 8; row_Counter_C2 = 8; row_Counter_C3 = 8; row_Counter_C4 = 8; row_Counter_C5 = 8; row_Counter_C6 = 8; row_Counter_C7 = 8;

// If there was firwork, remove it
if(document.getElementById("ID_Firework")){
    document.getElementById("ID_Firework").remove();
    document.getElementById("ID_Canvas_Div").remove();
};

// Remove the Game End Screen
document.getElementById("ID_Game_End_Container").remove();

// Back to the Ingame screen, remove the Gameboard End Screen Class and push it to the MainWrapper Div back
gameboard.classList.remove("Class_Gameboard_End");
main_wrapper.appendChild(gameboard);

// Add Games won Notificiations-Container
if (!document.getElementById("ID_Win_Div_One")) win_div_one = Create_DOM_Element({ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Win_Div_One"});
if (!document.getElementById("ID_Win_Div_Two")) win_div_two = Create_DOM_Element({ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Win_Div_Two"});
if (!document.getElementById("ID_Draw_Div")) draw_div = Create_DOM_Element({ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Draw_Div"});

// If Player 1 had won, increase player 1 win counter. If it is the first win, add the notification to screen, else update notification 
if(gameResult === 1){
    Game.Player_1_wins++;
    if(Game.Language === "de"){
        if (Game.Player_1_wins === 1)document.getElementById("ID_Win_Div_One").innerText = `${Game.Player_1_wins} gewonnenes Spiel.`;
        if(Game.Player_1_wins >= 2)document.getElementById("ID_Win_Div_One").innerText = `${Game.Player_1_wins} gewonnene Spiele.`;
    }
    else if (Game.Language === "en"){
        if (Game.Player_1_wins === 1)document.getElementById("ID_Win_Div_One").innerText = `${Game.Player_1_wins} won game.`;
    if(Game.Player_1_wins >= 2)document.getElementById("ID_Win_Div_One").innerText = `${Game.Player_1_wins} won games.`;
    };
};

// Same as above for Player 2
if(gameResult === 2){
    Game.Player_2_wins++;
    if(Game.Language === "de"){
        if (Game.Player_2_wins === 1)document.getElementById("ID_Win_Div_Two").innerText = `${Game.Player_2_wins} gewonnenes Spiel.`;
        if (Game.Player_2_wins >= 2)document.getElementById("ID_Win_Div_Two").innerText = `${Game.Player_2_wins} gewonnene Spiele.`;
    }
    else if (Game.Language === "en"){
        if (Game.Player_2_wins === 1)document.getElementById("ID_Win_Div_Two").innerText = `${Game.Player_2_wins} won game.`;
        if (Game.Player_2_wins >= 2)document.getElementById("ID_Win_Div_Two").innerText = `${Game.Player_2_wins} won games.`;
    };
};

// Same as above for Draws
if(gameResult === 3){
    Game.Draws++;
    if(Game.Language === "de"){
        if (Game.Draws === 1)document.getElementById("ID_Draw_Div").innerText = `${Game.Draws} Spiel unentschieden.`;
        if (Game.Draws >= 2)document.getElementById("ID_Draw_Div").innerText = `${Game.Draws} Spiele unentschieden.`;
    }
    else if (Game.Language === "en"){
        if (Game.Draws === 1)document.getElementById("ID_Draw_Div").innerText = `${Game.Draws} draw game.`;
        if (Game.Draws >= 2)document.getElementById("ID_Draw_Div").innerText = `${Game.Draws} draw games.`;
    };
};

});
                                                                                                                                                                                                                                                                                //#endregion
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
