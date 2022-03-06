//#region Table of Content
/*
!                             Four-Wins-Online Screen_Changes-JS-File
?                                                       powered by
!                                                       Stefan Bartl
!                                         (WKDSteVIE / WKDMinerva)
?                                                             2021                                                                                                                                                                        
?                          ________________________________________                                                                                                                                                                                                  
!                                                        Table of content              
open jobs
                                             1) Toggle Start / Game Screen                        
                                                                                                  
                                             2) Game-End Screen Functions                         
                                                                                                                                                                                                                                                                                                                                                                                                                           */
//#endregion

//#region Open Jobs
/*
?                               Jobs To-do:

todo    -) Win Div in Game-End-Screen / Text infos
todo    -) Win Divs Player 2! Design! 
todo    -) Game 3 doesnt start
todo    -) Bring text to Library!

?                               Finish
todo        -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
todo        -) Final formatation.
todo        -) Make sure all important is commented.
todo        -) Write a final Comment.

!                             Session progress
?-) 

                                                                                                                                                                                                                                                                                                                              */
//#endregion

//#region 1) Toggle between Start and Game Screen
/* ======================
!         Show the Game-Screen 
         ===================== */
function Game_Screen() {
//console.log("Entering Game-Screen.");
Game.state = "InGame";
document.getElementById('ID_MainWrapper').setAttribute('data-ingame', 'yes');
document.getElementById('ID_GameboardWrapper').setAttribute('data-ingame', 'yes');

if(Game.state === "Game End"){
  document.getElementById("ID_Turn_Div").classList.remove("Class_Invisible");

   // Disable Gameboard-Size changing
   document.getElementById("ID_Gameboard_Span").setAttribute("data-ingame",  "yes");
   Game.Language === "de" ? document.getElementById("ID_Gameboard_h").innerText = "Nur zu Spielbeginn erlaubt!" :  document.getElementById("ID_Gameboard_h").innerText = "Only allowed at Start-Screen!" ; 
   return
};

  // Remove the start screen elements
  document.getElementById("ID_Header").style = "display: none";
  document.getElementById("ID_LeftSidebarWrapper").style = "display: none";
  document.getElementById("ID_RightSidebarWrapper").style = "display: none";
  document.getElementById("ID_FooterWrapper").style = "display: none";
  

  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it. Hide win notivications.
  if(document.getElementById('ID_Turn_Div') && document.getElementById('ID_Turn_Div').classList.contains('Class_Invisible'))
      document.getElementById('ID_Turn_Div').classList.remove('Class_Invisible');
  if(document.getElementById('ID_Win_Div One') && document.getElementById('ID_Win_Div_One').classList.contains('Class_Invisible'))
      document.getElementById('ID_Win_Div_One').classList.remove('Class_Invisible');
  if(document.getElementById('ID_Win_Div_Two') && document.getElementById('ID_Win_Div_Two').classList.contains('Class_Invisible'))
      document.getElementById('ID_Win_Div_Two').classList.remove('Class_Invisible');
  if(document.getElementById('ID_Draw_Div') && document.getElementById('ID_Draw_Div').classList.contains('Class_Invisible'))
      document.getElementById('ID_Draw_Div').classList.remove('Class_Invisible');
  if (document.getElementById('ID_h3_turnText'))
      document.getElementById('ID_h3_turnText').style = 'display: block';

// Disable Gameboard-Size changing
document.getElementById("ID_Gameboard_Span").setAttribute("data-ingame",  "yes");
Game.Language === "de" ? document.getElementById("ID_Gameboard_h").innerText = "Nur zu Spielbeginn erlaubt!" :  document.getElementById("ID_Gameboard_h").innerText = "Only allowed at Start-Screen!" ; 

};
/* =======================
!         Show the Start-Screen 
         ====================== */
function Start_Screen() {
  //console.log("Entering Game-Screen.");
  document.getElementById('ID_MainWrapper').setAttribute('data-ingame', 'no');
  document.getElementById('ID_GameboardWrapper').setAttribute('data-ingame', 'no');
  
  // Add the start screen elements
  document.getElementById("ID_Header").style = "display: block";
  document.getElementById("ID_LeftSidebarWrapper").style = "display: block";
  document.getElementById("ID_RightSidebarWrapper").style = "display: block";
  document.getElementById("ID_FooterWrapper").style = "display: block";


  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it. Hide win notivications.
  if(document.getElementById('ID_Turn_Div') && !document.getElementById('ID_Turn_Div').classList.contains('Class_Invisible'))
      document.getElementById('ID_Turn_Div').classList.add('Class_Invisible');
  if(document.getElementById('ID_Win_Div_One') && !document.getElementById('ID_Win_Div_One').classList.contains('Class_Invisible'))
      document.getElementById('ID_Win_Div_One').classList.add('Class_Invisible');
  if(document.getElementById('ID_Win_Div_Two') && !document.getElementById('ID_Win_Div_Two').classList.contains('Class_Invisible'))
      document.getElementById('ID_Win_Div_Two').classList.add('Class_Invisible');
  if(document.getElementById('ID_Draw_Div') && !document.getElementById('ID_Draw_Div').classList.contains('Class_Invisible'))
      document.getElementById('ID_Draw_Div').classList.add('Class_Invisible');
  if (document.getElementById('ID_h3_turnText'))
       document.getElementById('ID_h3_turnText').style = 'display: none';

    // Enable Gameboard-Size changing
    document.getElementById("ID_Gameboard_Span").setAttribute("data-ingame",  "no");

};
//#endregion

//#region 2) Game End Screen

/*     ======================
!        Preparations for Game-End-Screen 
         ======================= */
function Preparations(gameResult) {
  // console.log("Entered Game End Screen preparations.");

  Game.state = "Prepare Game-End";

  // Play correct Audio
  if (
    gameResult === 2 &&
    Game.Game_against_KI === true &&
    Game.Sound === true
  ) {
    lost_audio.play();
  } else if (gameResult !== 3 && Game.Sound === true) {
    win_audio.play();
  }

  // If the Game was against KI, update the stats in the local storage via invoking helper function Update_Stats()
  if (Game.Game_against_KI === true) Update_Stats(gameResult);

  // Loop trough TopCells to give them a better look in the black Game End Screen & Lock the placement function
  const topCellsArray = document.getElementsByClassName("Class_TopCells");
  for (let topCell of topCellsArray) {
    topCell.classList.add("Class_Top_End");
    topCell.style = "pointer-events:none";
  }

  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it. Hide win notivications.
  if(document.getElementById('ID_Turn_Div') && !document.getElementById('ID_Turn_Div').classList.contains('Class_Invisible'))
  document.getElementById('ID_Turn_Div').classList.add('Class_Invisible');
  if(document.getElementById('ID_Win_Div_One') && !document.getElementById('ID_Win_Div_One').classList.contains('Class_Invisible'))
  document.getElementById('ID_Win_Div_One').classList.add('Class_Invisible');
  if(document.getElementById('ID_Win_Div_Two') && !document.getElementById('ID_Win_Div_Two').classList.contains('Class_Invisible'))
  document.getElementById('ID_Win_Div_Two').classList.add('Class_Invisible');
  if(document.getElementById('ID_Draw_Div') && !document.getElementById('ID_Draw_Div').classList.contains('Class_Invisible'))
  document.getElementById('ID_Draw_Div').classList.add('Class_Invisible');
  
 // Make Settings Menu visible during End-Screen
 if(document.getElementById("ID_Settings_Menu"))  document.getElementById("ID_Settings_Menu").setAttribute("data-endscreen",  "yes");
 if(document.getElementById("ID_Setting_Span"))  document.getElementById("ID_Setting_Span").setAttribute("data-endscreen",  "yes");
  // Enable Gameboard-Size changing
  document.getElementById('ID_GameboardWrapper').setAttribute('data-ingame', 'no');

  // Assign correct names to the winner, loser or draw variables and return it
  let winner, loser;
  const names_from_result = [];
  if (gameResult === 1) {
    names_from_result.push(
      (winner = Game.Player_One_Name),
      (loser = Game.Player_Two_Name)
    );
  } else if (gameResult === 2) {
    names_from_result.push(
      (winner = Game.Player_Two_Name),
      (loser = Game.Player_One_Name)
    );
  } else if (gameResult === 3)
    names_from_result.push(Game.Player_One_Name, Game.Player_Two_Name);

  // console.log("Finished Game End Screen preparations and returned:", names_from_result);

  return names_from_result;
}

/*     ====================
 !       Creation of Game-End-Screen 
          ==================== */
function Game_End_Screen(gameResult) {
  // console.log("Entered Game End Screen Function.");

  const result = Preparations(gameResult);

  Game.state = "Game End";
  document.getElementById("ID_GameboardWrapper").setAttribute("data-gameend", "yes");
  
  //#region Creation of End-Screen

  // Create the Containers for the texts
  const winning_head = Create_DOM_Element({
    ParentID: "ID_MainWrapper",
    Element: "h1",
    ID: "ID_End_H1",
    Class: "Class_Game_End_Animation",
  });
  const winning_text = Create_DOM_Element({
    ParentID: "ID_MainWrapper",
    Element: "p",
    ID: "ID_End_Text",
    Class: "Class_Game_End_Animation",
  });
  const button_wrapper = Create_DOM_Element({
    ParentID: 'ID_MainWrapper',
    Element: "div",
    ID: "ID_End_Button_Div",
  });
  const new_game_button = Create_DOM_Element({
    ParentID: "ID_End_Button_Div",
    Element: "button",
    ID: "ID_NewGame_Button",
    Class: "Class_Game_End_Animation",
  });
  const back_button = Create_DOM_Element({
    ParentID: "ID_End_Button_Div",
    Element: "button",
    ID: "ID_Back_Button",
    Class: "Class_Game_End_Animation",
  });

  insertAfter(left_sidebar, document.getElementById('ID_GameboardWrapper'));

  // If it is not a draw or a loose against CPU, it is a win from a Human Playert, so add the fireworks
  if (
    gameResult === 1 || (gameResult === 2 && Game.Game_against_KI === false)
  ) {
    // Canvas with fireworks layed in a div container, which is then pushed to the Main Wrapper, Now, everything which is pushed to the Main Wrapper
    // with a greater z-index is visible over the fireworks canvas
    const canvas_div = Create_DOM_Element({ ParentID: "ID_MainWrapper", Element: "div", ID: "ID_Canvas_Div", Class: "Class_Canvas_Div" });
    const firework_canvas = Create_DOM_Element({ ParentID: "ID_Canvas_Div",  Element: "canvas", ID: "ID_Firework", Class: "Class_Firework" });
    Fireworks("ID_Firework");
    document.getElementById('ID_MainWrapper').setAttribute('data-canvasend', 'yes');

    // Add correct Language to Game End Screen
    if (Game.Language === "de") {
      // Deutsch for Games with a wining Human Player
      document.getElementById(
        "ID_End_H1"
      ).innerText = `Gratulation, ${result[0]}!`;
      document.getElementById(
        "ID_End_H1"
      ).alt = `${result[0]} hat das Spiel gewonnen`;
      document.getElementById(
        "ID_End_Text"
      ).innerText = `Du hast das Spiel gewonnen!\n Gibst du ${result[1]} eine Chance auf Revanche oder wollt ihr zurück zur Startseite?`;
      document.getElementById("ID_End_H1").alt =
        "Willst du noch einmal spielen? Klicke auf den Button";
    } else {
      // Else add English for Games with a winning Human Player
      document.getElementById(
        "ID_End_H1"
      ).innerText = `Congratulations, ${result[0]}!`;
      document.getElementById("ID_End_H1").alt = `${result[0]} won the game.`;
      document.getElementById(
        "ID_End_Text"
      ).innerText = `You have won the Game!\n Will you give ${result[1]} a chance to revanche or do you want back to Starting-Screen?`;
      document.getElementById("ID_End_H1").alt =
        "Another game or back to starting screen?";
    }
  }

  // If the KI won against Player CPU is always Player 2 and if Game against KI is true >>> CPU won), add the lose text and screen
  if (gameResult === 2 && Game.Game_against_KI === true) {
    document.getElementById("ID_MainWrapper").style.backgroundImage =
      "url('./Folder_Graphics/Folder_Icons/freesvg_com/SadSmileyWhite.svg')";
    document.getElementById("ID_MainWrapper").style.backgroundPosition =
      "center";
    document.getElementById("ID_MainWrapper").style.backgroundSize =
      "3%";
    document.getElementById("ID_MainWrapper").style.backgroundRepeat =
      "no-repeat";
    if (Game.Language === "de") {
      document.getElementById("ID_End_H1").innerText = "Verloren!";
      document.getElementById(
        "ID_End_Text"
      ).innerText = `${result[1]}, lass den Kopf nicht hängen. Dieses mal war der Computer sehr stark. Willst du eine Revanche?`;
    } else {
      document.getElementById("ID_End_H1").innerText = "Lost!";
      document.getElementById(
        "ID_End_Text"
      ).innerText = `${result[1]}, keep your head held high. This time the computer was very strong. Do you want revenge?`;
    }
  }

  // ... for a Draw use this text
  if (gameResult === 3) {
    if (Game.Language === "de") {
      document.getElementById("ID_End_H1").innerText = "Unentschieden!";
      document.getElementById(
        "ID_End_Text"
      ).innerText = `${result[0]} & ${result[1]}, seid ihr etwa gleich stark in 4-Gewinnt?\nWollt ihr es noch einmal ausprobieren und euch messen oder zurück zum Startbildchschirm?`;
    } else {
      document.getElementById("ID_End_H1").innerText = "Draw !";
      document.getElementById(
        "ID_End_Text"
      ).innerText = `${result[0]} & ${result[1]}, are you same smart in 4-Wins?\nDo you want to find this out or back to the starting screen?`;
    }
  }

  // Doesnt matter if Game won, Draw or loose against CPU, this Elements hav to be the same (except of the language, ofc...)
  if (Game.Language === "de") {
    document.getElementById("ID_NewGame_Button").innerText = "Neues Spiel";
    document.getElementById("ID_NewGame_Button").alt = "Neues Spiel - Button";
    document.getElementById("ID_Back_Button").innerText = "Zur Startseite";
    document.getElementById("ID_Back_Button").alt = "Zur Startseite - Button";
  } else {
    document.getElementById("ID_NewGame_Button").innerText = "New Game";
    document.getElementById("ID_NewGame_Button").alt = "New Game - Button";
    document.getElementById("ID_Back_Button").innerText = "Starting Screen";
    document.getElementById("ID_Back_Button").alt =
      "To Starting-Screen - Button";
  }

    // Enable Gameboard-Size changing and append it
    document.getElementById("ID_Gameboard_Span").setAttribute("data-ingame",  "no");

  //#endregion

  //#region Event-Listeners

  document.getElementById("ID_Back_Button").addEventListener("click", () => {
    // Back to the starting screen with page refresh
    document.location.reload();
  });

  /*    ================== 
?        New Game Event-Listener
            ==================== */
  document.getElementById("ID_NewGame_Button").addEventListener("click", () => {
    // console.log("New Game selected, preparations will be done...");

     // Disable special styling for Settings Menu during End-Screen
     document.getElementById("ID_Settings_Menu").setAttribute("data-endscreen",  "no");
     document.getElementById("ID_Setting_Span").setAttribute("data-endscreen",  "no");

    //Make sure the stas are up to date
     Stats();

    Game.state = "InGame";

    //#region Reset Game
    const topCellsArray = document.getElementsByClassName("Class_TopCells");
    const cellsArray = document.getElementsByClassName("Class_Cells");
    // Remove TopCell Style classes collected during the Game and End-Screen & unlock the placement function again
    for (let topCell of topCellsArray) {
      topCell.classList.remove("Class_Top_End");
      topCell.innerText = "";
      topCell.style = "pointer-events:auto";
      topCell.classList.remove("Class_Full_Column");
    }

    // Set the collected sttributes to "no"
    for (let cell of cellsArray) {
      cell.setAttribute("isPlayed", "no");
      cell.setAttribute("winChain", "no");
    }

    // Show the "Player ... is on turn"-Infobox and the "Thinking-Effectt" again
    if (turn_text && turn_text.classList.contains("Class_Invisible"))
      turn_text.classList.remove("Class_Invisible");
    if (
      document.getElementById("ID_Thinking_Div") &&
      document
        .getElementById("ID_Thinking_Div")
        .classList.contains("Class_Invisible")
    )
      document
        .getElementById("ID_Thinking_Div")
        .classList.remove("Class_Invisible");

    // Trigger next Player is on turn, so the loser of this reound starts the next round.
    Turning_PlayerIsOnTurn();

    // If the win was from Human Player 1 and it is a game against the CPU, start next round
    if (gameResult === 1 && Game.Game_against_KI === true) {
      Game.KI_Level === "Easy" ? KI_Easy() : KI_Normal();
    }

    // Reset the Gameboard in Game Object
    for (let x = 1; x < 8; x++) {
      Game.actualGameboardPlayer1[`C${x}`].length = 0;
      Game.actualGameboardPlayer2[`C${x}`].length = 0;
    }

    // Reset Gameboard on screen
    for (let cell of cellsArray) {
      if (cell.classList.contains("Class_PlacedCoin_1"))
        cell.classList.remove("Class_PlacedCoin_1");
      if (cell.classList.contains("Class_PlacedCoin_2"))
        cell.classList.remove("Class_PlacedCoin_2");
      cell.style.opacity = 0.7;
    }

    // Reset round
    Game.roundCounter = 0;
    //#endregion

    // If there was firework, remove it
    if (document.getElementById("ID_Firework")) {
      document.getElementById("ID_Firework").remove();
      document.getElementById("ID_Canvas_Div").remove();
    }

    // Remove the Game End Screen
    document.getElementById('ID_MainWrapper').setAttribute('data-canvasend', 'no');
    document.getElementById('ID_End_H1').remove();
    document.getElementById('ID_End_Text').remove();
    document.getElementById('ID_End_Button_Div').remove();

    // Creat a new one!
    Create_Gameboard(Game.gameboard_sizeX, Game.gameboard_sizeY);
    document.getElementById('ID_GameboardWrapper').setAttribute('data-ingame', 'yes');

    // Add Games won Notificiations-Container
    if (!document.getElementById("ID_Win_Div_One"))
      win_div_one = Create_DOM_Element({
        ParentID: "ID_MainWrapper",
        Element: "div",
        ID: "ID_Win_Div_One",
      });
    if (!document.getElementById("ID_Win_Div_Two"))
      win_div_two = Create_DOM_Element({
        ParentID: "ID_MainWrapper",
        Element: "div",
        ID: "ID_Win_Div_Two",
      });
    if (!document.getElementById("ID_Draw_Div"))
      draw_div = Create_DOM_Element({
        ParentID: "ID_MainWrapper",
        Element: "div",
        ID: "ID_Draw_Div",
      });

    // Increas won games counter in Settings-Menu amd create correct notification on Game Screen
    const tally_img = document.createElement("img");
    tally_img.setAttribute("data-wincounter", "yes");

    // Get correct counter-values
    // Calculate correct tally: Because we only have 5 tallys and a Player can have f.e. 12 wins, we must calculated the corect tally. In this example: there have to be two 5er tally and one 2 tally.... 
    // My solution: Reset the counter variable to 1 every time it goes over 5
    let tally_counter_p1, tally_counter_p2, tally_counter_draws;
    Game.Player_1_wins !== 0 ? tally_counter_p1 = Game.Player_1_wins : tally_counter_p1 = 1;
    Game.Player_2_wins !== 0 ? tally_counter_p2 = Game.Player_2_wins : tally_counter_p2 = 1;
    Game.Draws !== 0 ? tally_counter_draws = Game.Draws : tally_counter_draws= 1;

    if (gameResult === 1){
      tally_img.id = "ID_Tally_IMG_P1";    
      Game.Player_1_wins++;
      if(Game.Player_1_wins === 6){
            tally_counter_p1 = 1;
          }
    } else if (gameResult === 2){
      tally_img.id = "ID_Tally_IMG_P2";   
      Game.Player_2_wins++;
      if(Game.Player_2_wins === 6){
        tally_counter_p2 = 1;
      }
    } else if (gameResult === 3){
      tally_img.id = "ID_Tally_IMG_Draw";    
      Game.Draw++;
      if(Game.Draws === 6){
        tally_counter_draws = 1;
      }
    };
                  if (tally_counter_p1 ===  1 || tally_counter_p2 ===  1 || tally_counter_draws ===  1) {tally_img.src =  './Folder_Graphics/tally/1.png'; tally_img.setAttribute("data-winstays", "no");
        } else if (tally_counter_p1 ===  2 || tally_counter_p1 ===  2 || tally_counter_draws ===  2) {tally_img.src =  './Folder_Graphics/tally/2.png'; tally_img.setAttribute("data-winstays", "no");
        } else if (tally_counter_p1 ===  3 || tally_counter_p1 ===  3 || tally_counter_draws ===  3) {tally_img.src =  './Folder_Graphics/tally/3.png'; tally_img.setAttribute("data-winstays", "no");
        } else if (tally_counter_p1 ===  4 || tally_counter_p1 ===  4 || tally_counter_draws ===  4) {tally_img.src =  './Folder_Graphics/tally/4.png'; tally_img.setAttribute("data-winstays", "no");
        } else if (tally_counter_p1 ===  5 || tally_counter_p1 ===  5 || tally_counter_draws ===  5) {tally_img.src =  './Folder_Graphics/tally/5.png'; tally_img.setAttribute("data-winstays", "yes");
      };

      if (gameResult === 1){
        // First proof iof there is a taly in the Container and if it should be removed. If yes, remove the 1er, 2er, 3er and 4er tallys so if ist the 6 win, tally 5 + tally 1 are appended
      if(document.getElementById("ID_Win_Div_One").lastElementChild && document.getElementById("ID_Win_Div_One").lastElementChild.getAttribute("data-winstays") === "yes")
      document.getElementById("ID_Win_Div_One").lastElementChild.remove();
      // Append tally to DIV
      document.getElementById("ID_Win_Div_One").appendChild(tally_img);

      } else if (gameResult === 2){
                if(document.getElementById("ID_Win_Div_Two").lastElementChild && document.getElementById("ID_Win_Div_Two").lastElementChild.getAttribute("data-winstays") === "yes")
                document.getElementById("ID_Win_Div_Two").lastElementChild.remove();
                document.getElementById("ID_Win_Div_Two").appendChild(tally_img);

      } else if (gameResult === 3){
        if(document.getElementById("ID_Draw_Div").lastElementChild && document.getElementById("ID_Draw_Div").lastElementChild.getAttribute("data-winstays") === "yes")
        document.getElementById("ID_Draw_Div").lastElementChild.remove();
        document.getElementById("ID_Draw_Div").appendChild(tally_img);
      };
  });
  //#endregion
}
//#endregion
