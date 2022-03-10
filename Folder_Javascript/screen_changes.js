//#region Table of Content
/*
!                  Four-Wins-Online Screen_Changes-JS-File
?                                       powered by
!                                       Stefan Bartl
!                         (WKDSteVIE / WKDMinerva)
?                                             2021                                                                                                                                                                        
?                  ____________________________________                                                                                                                                                                                                  
!                                     Table of content              

?                             1) Toggle Start / Game Screen                                                                                                       
?                             2) Game-End-Screen                     
?                             3) Start a new Game                                                                                                                                                                                                                                                                                                                                                                                                                          */
//#endregion

//#region Open Jobs
/*
?                  Jobs To-do:

?                  Finish
todo    -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
todo    -) Final formatation.
todo    -) Make sure all important is commented.
todo    -) Write a final Comment.

!                  Session progress
?-) 

*/
//#endregion

//#region 1) Toggle between Start and Game Screen
/* =================
!     Show the Game-Screen 
            ================= */
function Game_Screen() {
//console.log('Entering Game-Screen.');
Game.state = 'InGame';
document.getElementById('main__section').setAttribute('data-ingame', 'yes');
document.getElementById('wrapper__gameboard').setAttribute('data-ingame', 'yes');
document.body.setAttribute('data-gameend', 'no');
document.getElementById('main__section').setAttribute('data-gameend', 'no');
document.getElementById('main__section').setAttribute('data-canvasend', 'no');

if(Game.state === 'Game End'){
  document.getElementById('div__turnPlayers').classList.remove('Class_Invisible');

   // Disable Gameboard-Size changing
   document.getElementById('settings_span__gameboard').setAttribute('data-ingame',  'yes');
   Game.Language === 'de' ? document.getElementById('settings_gameboard_h').innerText = 'Nur zu Spielbeginn erlaubt!' :  document.getElementById('settings_gameboard_h').innerText = 'Only allowed at Start-Screen!' ; 
   return
};

  // Remove the start screen elements
  document.querySelector('header').style = 'display: none';
  document.getElementById('leftSidebar__wrapper').style = 'display: none';
  document.getElementById('sidebarRight__wrapper').style = 'display: none';
  document.getElementById('footer').style = 'display: none';
  

  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it. Hide win notivications.
  if(document.getElementById('div__turnPlayers') && document.getElementById('div__turnPlayers').classList.contains('Class_Invisible'))
      document.getElementById('div__turnPlayers').classList.remove('Class_Invisible');
  if(document.getElementById('ID_Win_Div One') && document.getElementById('div__wonGames_P1').classList.contains('Class_Invisible'))
      document.getElementById('div__wonGames_P1').classList.remove('Class_Invisible');
  if(document.getElementById('div__wonGames_P2') && document.getElementById('div__wonGames_P2').classList.contains('Class_Invisible'))
      document.getElementById('div__wonGames_P2').classList.remove('Class_Invisible');
  if(document.getElementById('div__drawGames') && document.getElementById('div__drawGames').classList.contains('Class_Invisible'))
      document.getElementById('div__drawGames').classList.remove('Class_Invisible');
  if (document.getElementById('h__turnDiv'))
      document.getElementById('h__turnDiv').style = 'display: block';

// Disable Gameboard-Size changing
document.getElementById('settings_span__gameboard').setAttribute('data-ingame',  'yes');
Game.Language === 'de' ? document.getElementById('settings_gameboard_h').innerText = 'Nur zu Spielbeginn erlaubt!' :  document.getElementById('settings_gameboard_h').innerText = 'Only allowed at Start-Screen!' ; 

};
/* ================
!     Show the Start-Screen 
            ================ */
function Start_Screen() {
  //console.log('Entering Game-Screen.');
  document.getElementById('main__section').setAttribute('data-ingame', 'no');
  document.getElementById('wrapper__gameboard').setAttribute('data-ingame', 'no');
  document.body.setAttribute('data-gameend', 'no');
  document.getElementById('main__section').setAttribute('data-gameend', 'no');
  document.getElementById('main__section').setAttribute('data-canvasend', 'no');
  
  // Add the start screen elements
  document.querySelector('header').style = 'display: block';
  document.getElementById('leftSidebar__wrapper').style = 'display: block';
  document.getElementById('sidebarRight__wrapper').style = 'display: block';
  document.getElementById('footer').style = 'display: block';


  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it. Hide win notivications.
  if(document.getElementById('div__turnPlayers') && !document.getElementById('div__turnPlayers').classList.contains('Class_Invisible'))
      document.getElementById('div__turnPlayers').classList.add('Class_Invisible');
  if(document.getElementById('div__wonGames_P1') && !document.getElementById('div__wonGames_P1').classList.contains('Class_Invisible'))
      document.getElementById('div__wonGames_P1').classList.add('Class_Invisible');
  if(document.getElementById('div__wonGames_P2') && !document.getElementById('div__wonGames_P2').classList.contains('Class_Invisible'))
      document.getElementById('div__wonGames_P2').classList.add('Class_Invisible');
  if(document.getElementById('div__drawGames') && !document.getElementById('div__drawGames').classList.contains('Class_Invisible'))
      document.getElementById('div__drawGames').classList.add('Class_Invisible');
  if (document.getElementById('h__turnDiv'))
       document.getElementById('h__turnDiv').style = 'display: none';

    // Enable Gameboard-Size changing
    document.getElementById('settings_span__gameboard').setAttribute('data-ingame',  'no');

};
//#endregion

//#region 2) Game-End-Screen

/* =========================
!     Preparations for Game-End-Screen 
           ========================= */
function Preparations(gameResult) {
  // console.log('Entered Game End Screen preparations.');

  // Play correct Audio
  if (
    gameResult === 2 &&
    Game.Game_against_CPU === true &&
    Game.Sound === true
  ) {
    lost_audio.play();
  } else if (gameResult !== 3 && Game.Sound === true) {
    win_audio.play();
  }

  // If the Game was against CPU, update the stats in the local storage via invoking helper function Update_Stats()
  if (Game.Game_against_CPU === true) Update_Stats(gameResult);

  // Loop trough TopCells to give them a better look in the black Game End Screen & Lock the placement function
  const topCellsArray = document.getElementsByClassName('topCells');
  for (let topCell of topCellsArray) {
    topCell.classList.add('Class_Top_End');
    topCell.style = 'pointer-events:none';
  }

  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it. Hide win notivications.
  if(document.getElementById('div__turnPlayers') && !document.getElementById('div__turnPlayers').classList.contains('Class_Invisible'))
  document.getElementById('div__turnPlayers').classList.add('Class_Invisible');
  
 // Make Settings Menu visible during End-Screen
 if(document.getElementById('settings_menu__section'))  document.getElementById('settings_menu__section').setAttribute('data-endscreen',  'yes');
 if(document.getElementById('settings_span'))  document.getElementById('settings_span').setAttribute('data-endscreen',  'yes');
  // Enable Gameboard-Size changing
  document.getElementById('wrapper__gameboard').setAttribute('data-ingame', 'no');

  Game.state = 'Game End';
  document.body.setAttribute('data-gameend', 'yes');
  document.getElementById('wrapper__gameboard').setAttribute('data-gameend', 'yes');
  document.getElementById('main__section').setAttribute('data-gameend', 'yes');


  // Assign correct names to the winner, loser or draw variables and return it, also set  the wins counter
  let winner, loser;
  const names_from_result = [];
  if (gameResult === 1) {
    Game.Player_1_wins++;
    names_from_result.push(
      (winner = Game.Player_One_Name),
      (loser = Game.Player_Two_Name)
    );
  } else if (gameResult === 2) {
    Game.Player_2_wins++;
    names_from_result.push(
      (winner = Game.Player_Two_Name),
      (loser = Game.Player_One_Name)
    );
  } else if (gameResult === 3){
   Game.Draws++;
    names_from_result.push(Game.Player_One_Name, Game.Player_Two_Name);
  }
  // console.log('Finished Game End Screen preparations and returned:', names_from_result);

  return names_from_result;
}

/* ======================
 !    Creation of Game-End-Screen 
            ====================== */
function Game_End_Screen(gameResult) {
  // console.log('Entered Game End Screen Function.');

  const result = Preparations(gameResult);
 
  //#region Creation of End-Screen

  // Create the Containers for the texts
  const winning_head = Create_DOM_Element({
    ParentID: 'main__section',
    Element: 'h1',
    ID: 'h__gameEnd',
    Class: 'animation__GameEnd',
  });
  const winning_text = Create_DOM_Element({
    ParentID: 'main__section',
    Element: 'p',
    ID: 'p__gameEnd',
    Class: 'animation__GameEnd',
  });
  const button_wrapper = Create_DOM_Element({
    ParentID: 'main__section',
    Element: 'div',
    ID: 'button__gameEnd',
  });
  const new_game_button = Create_DOM_Element({
    ParentID: 'button__gameEnd',
    Element: 'button',
    ID: 'button__newGame',
    Class: 'animation__GameEnd',
  });
  const back_button = Create_DOM_Element({
    ParentID: 'button__gameEnd',
    Element: 'button',
    ID: 'button__startingScreen',
    Class: 'animation__GameEnd',
  });

  insertAfter(left_sidebar, document.getElementById('wrapper__gameboard'));

  // If it is not a draw or a loose against CPU, it is a win from a Human Playert, so add the fireworks
  if (
    gameResult === 1 || (gameResult === 2 && Game.Game_against_CPU === false)
  ) {
    // Canvas with fireworks layed in a div container, which is then pushed to the Main Wrapper, Now, everything which is pushed to the Main Wrapper
    // with a greater z-index is visible over the fireworks canvas
    const canvas_div = Create_DOM_Element({ ParentID: 'main__section', Element: 'div', ID: 'div__canvas', Class: 'div__canvas' });
    const firework_canvas = Create_DOM_Element({ ParentID: 'div__canvas',  Element: 'canvas', ID: 'firework' });
    Fireworks('firework');
    document.getElementById('main__section').setAttribute('data-gameend', 'no');
    document.getElementById('main__section').setAttribute('data-canvasend', 'yes');

    // Add correct Language to Game End Screen
    if (Game.Language === 'de') {
      // Deutsch for Games with a wining Human Player
      document.getElementById(
        'h__gameEnd'
      ).innerText = `Gratulation, ${result[0]}!`;
      document.getElementById(
        'h__gameEnd'
      ).alt = `${result[0]} hat das Spiel gewonnen`;
      document.getElementById(
        'p__gameEnd'
      ).innerText = `Du hast das Spiel gewonnen!\n Gibst du ${result[1]} eine Chance auf Revanche oder wollt ihr zurück zur Startseite?`;
      document.getElementById('h__gameEnd').alt =
        'Willst du noch einmal spielen? Klicke auf den Button';
    } else {
      // Else add English for Games with a winning Human Player
      document.getElementById(
        'h__gameEnd'
      ).innerText = `Congratulations, ${result[0]}!`;
      document.getElementById('h__gameEnd').alt = `${result[0]} won the game.`;
      document.getElementById(
        'p__gameEnd'
      ).innerText = `You have won the Game!\n Will you give ${result[1]} a chance to revanche or do you want back to Starting-Screen?`;
      document.getElementById('h__gameEnd').alt =
        'Another game or back to starting screen?';
    }
  }

  // If the CPU won against Player CPU is always Player 2 and if Game against CPU is true >>> CPU won), add the lose text and screen
  if (gameResult === 2 && Game.Game_against_CPU === true) {
    if (Game.Language === 'de') {
      document.getElementById('h__gameEnd').innerText = 'Verloren!';
      document.getElementById(
        'p__gameEnd'
      ).innerText = `${result[1]}, lass den Kopf nicht hängen. Dieses mal war der Computer sehr stark. Willst du eine Revanche?`;
    } else {
      document.getElementById('h__gameEnd').innerText = 'Lost!';
      document.getElementById(
        'p__gameEnd'
      ).innerText = `${result[1]}, keep your head held high. This time the computer was very strong. Do you want revenge?`;
    }
  }

  // ... for a Draw use this text
  if (gameResult === 3) {
    if (Game.Language === 'de') {
      document.getElementById('h__gameEnd').innerText = 'Unentschieden!';
      document.getElementById(
        'p__gameEnd'
      ).innerText = `${result[0]} & ${result[1]}, seid ihr etwa gleich stark in 4-Gewinnt?\nWollt ihr es noch einmal ausprobieren und euch messen oder zurück zum Startbildschirm?`;
    } else {
      document.getElementById('h__gameEnd').innerText = 'Draw !';
      document.getElementById(
        'p__gameEnd'
      ).innerText = `${result[0]} & ${result[1]}, are you same smart in 4-Wins?\nDo you want to find this out or back to the starting screen?`;
    }
  }

  // Doesnt matter if Game won, Draw or loose against CPU, this Elements hav to be the same (except of the language, ofc...)
  if (Game.Language === 'de') {
    document.getElementById('button__newGame').innerText = 'Neues Spiel';
    document.getElementById('button__newGame').alt = 'Neues Spiel - Button';
    document.getElementById('button__startingScreen').innerText = 'Zur Startseite';
    document.getElementById('button__startingScreen').alt = 'Zur Startseite - Button';
  } else {
    document.getElementById('button__newGame').innerText = 'New Game';
    document.getElementById('button__newGame').alt = 'New Game - Button';
    document.getElementById('button__startingScreen').innerText = 'Starting Screen';
    document.getElementById('button__startingScreen').alt =
      'To Starting-Screen - Button';
  }

    // Enable Gameboard-Size changing and append it
    document.getElementById('settings_span__gameboard').setAttribute('data-ingame',  'no');

  //#endregion

  //#region Event-Listeners

  document.getElementById('button__startingScreen').addEventListener('click', () => {
    // Back to the starting screen with page refresh
    document.location.reload();
  });

  document.getElementById('button__newGame').addEventListener('click', ()=>{Start_New_Game(gameResult)});
  //#endregion

//#region Win/Draw Notifications
// Add Notificiation how many times a player have won / game was draw

// Container
if (!document.getElementById('div__wonGames_P1'))
win_div_one = Create_DOM_Element({
ParentID: 'main__section',
Element: 'div',
ID: 'div__wonGames_P1'
});
if (!document.getElementById('div__wonGames_P2'))
win_div_two = Create_DOM_Element({
ParentID: 'main__section',
Element: 'div',
ID: 'div__wonGames_P2'
});
if (!document.getElementById('div__drawGames'))
draw_div = Create_DOM_Element({
ParentID: 'main__section',
Element: 'div',
ID: 'div__drawGames'
});

// Add Text
if(Game.Language === 'de'){
if(document.getElementById('div__wonGames_P1')) document.getElementById('div__wonGames_P1').innerText = 'Spiele gewonnen:';
if(document.getElementById('div__wonGames_P2'))   document.getElementById('div__wonGames_P2').innerText = 'Spiele gewonnen:';
if(document.getElementById('div__drawGames'))  document.getElementById('div__drawGames').innerText = 'Unentschieden:';
} else if (Game.Language === 'en'){
if(document.getElementById('div__wonGames_P1')) document.getElementById('div__wonGames_P1').innerText = 'Wons:';
if(document.getElementById('div__wonGames_P2')) document.getElementById('div__wonGames_P2').innerText = 'Wons:';
if(document.getElementById('div__drawGames')) document.getElementById('div__drawGames').innerText = 'Draws:';
}
const p1_value = document.createElement('h3');
document.getElementById('div__wonGames_P1').appendChild(p1_value);
p1_value.innerText = `${Game.Player_1_wins }`;
const p2_value = document.createElement('h3');
document.getElementById('div__wonGames_P2').appendChild(p2_value);
p2_value.innerText = `${Game.Player_2_wins }`;
const draw_value = document.createElement('h3');
document.getElementById('div__drawGames').appendChild(draw_value);
draw_value.innerText = `${Game.Draws}`;

document.getElementById('div__wonGames_P1').classList.add('Class_Invisible');
document.getElementById('div__wonGames_P2').classList.add('Class_Invisible');
document.getElementById('div__drawGames').classList.add('Class_Invisible');
if(Game.Player_1_wins > 0){
  document.getElementById('div__wonGames_P1').classList.remove('Class_Invisible');
};
if(Game.Player_2_wins > 0){
  document.getElementById('div__wonGames_P2').classList.remove('Class_Invisible');
};
if(Game.Draws > 0){
  document.getElementById('div__drawGames').classList.remove('Class_Invisible');
};


// // Increas won games counter in Settings-Menu amd create correct notification on Game Screen
// const tally_img = document.createElement('img');
// tally_img.setAttribute('data-wincounter', 'yes');

// // Get correct counter-values
// // Calculate correct tally: Because we only have 5 tallys and a Player can have f.e. 12 wins, we must calculated the corect tally. In this example: there have to be two 5er tally and one 2 tally.... 
// // My solution: Reset the counter variable to 1 every time it goes over 5
// let tally_counter_p1, tally_counter_p2, tally_counter_draws;
// Game.Player_1_wins !== 0 ? tally_counter_p1 = Game.Player_1_wins : tally_counter_p1 = 1;
// Game.Player_2_wins !== 0 ? tally_counter_p2 = Game.Player_2_wins : tally_counter_p2 = 1;
// Game.Draws !== 0 ? tally_counter_draws = Game.Draws : tally_counter_draws= 1;

// if (gameResult === 1){
// tally_img.id = 'ID_Tally_IMG_P1';    
// if(Game.Player_1_wins === 6){
// tally_counter_p1 = 1;
// }
// } else if (gameResult === 2){
// tally_img.id = 'ID_Tally_IMG_P2';   
// if(Game.Player_2_wins === 6){
// tally_counter_p2 = 1;
// }
// } else if (gameResult === 3){
// tally_img.id = 'ID_Tally_IMG_Draw';    
// if(Game.Draws === 6){
// tally_counter_draws = 1;
// }
// };
// if (tally_counter_p1 ===  1 || tally_counter_p2 ===  1 || tally_counter_draws ===  1) {tally_img.src =  './Folder_Graphics/tally/1.png'; tally_img.setAttribute('data-winstays', 'no');};
// if (tally_counter_p1 ===  2 || tally_counter_p1 ===  2 || tally_counter_draws ===  2) {tally_img.src =  './Folder_Graphics/tally/2.png'; tally_img.setAttribute('data-winstays', 'no');};
// if (tally_counter_p1 ===  3 || tally_counter_p1 ===  3 || tally_counter_draws ===  3) {tally_img.src =  './Folder_Graphics/tally/3.png'; tally_img.setAttribute('data-winstays', 'no');};
// if (tally_counter_p1 ===  4 || tally_counter_p1 ===  4 || tally_counter_draws ===  4) {tally_img.src =  './Folder_Graphics/tally/4.png'; tally_img.setAttribute('data-winstays', 'no');};
// if (tally_counter_p1 ===  5 || tally_counter_p1 ===  5 || tally_counter_draws ===  5) {tally_img.src =  './Folder_Graphics/tally/5.png'; tally_img.setAttribute('data-winstays', 'yes')};


// if (gameResult === 1){
// // First proof if there is a taly in the Container and if it should be removed. If yes, remove the 1er, 2er, 3er and 4er tallys so if ist the 6 win, tally 5 + tally 1 are appended
// if(document.getElementById('div__wonGames_P1').lastElementChild && document.getElementById('div__wonGames_P1').lastElementChild.getAttribute('data-winstays') === 'no')
// if(Game.Player_1_wins < 5 || Game.Player_1_wins > 5){
// document.getElementById('div__wonGames_P1').lastElementChild.remove();
// }
// // Append tally to DIV
// document.getElementById('div__wonGames_P1').appendChild(tally_img);
// };

// if (gameResult === 2){
// if(document.getElementById('div__wonGames_P2').lastElementChild && document.getElementById('div__wonGames_P2').lastElementChild.getAttribute('data-winstays') === 'no')
// document.getElementById('div__wonGames_P2').lastElementChild.remove();
// document.getElementById('div__wonGames_P2').appendChild(tally_img);
// }; 

// if (gameResult === 3){
// if(document.getElementById('div__drawGames').lastElementChild && document.getElementById('div__drawGames').lastElementChild.getAttribute('data-winstays') === 'no')
// document.getElementById('div__drawGames').lastElementChild.remove();
// document.getElementById('div__drawGames').appendChild(tally_img);
// };
//#endregion

};

//#endregion

//#region 3) Start a new Game
  /* ============== 
!       Start a New Game
              ============== */
function Start_New_Game(gameResult){
// console.log('Entered New Game function.');

//Make sure the stats are up to date
Stats();

Game.state = 'InGame';

//#region Reset Game
const topCellsArray = document.getElementsByClassName('topCells');
const cellsArray = document.getElementsByClassName('cells');
// Remove TopCell Style classes collected during the Game and End-Screen & unlock the placement function again
for (let topCell of topCellsArray) {
topCell.classList.remove('Class_Top_End');
topCell.innerText = '';
topCell.style = 'pointer-events:auto';
topCell.classList.remove('Class_Full_Column');
}

// Set the collected sttributes to 'no'
for (let cell of cellsArray) {
cell.setAttribute('isPlayed', 'no');
cell.setAttribute('winChain', 'no');
}

// Show the 'Player ... is on turn'-Infobox and the 'Thinking-Effectt' again
if (turn_text && turn_text.classList.contains('Class_Invisible'))
turn_text.classList.remove('Class_Invisible');
if (
document.getElementById('div__thinking') &&
document
.getElementById('div__thinking')
.classList.contains('Class_Invisible')
)
document
.getElementById('div__thinking')
.classList.remove('Class_Invisible');

// Trigger next Player is on turn, so the loser of this reound starts the next round.
Turning_PlayerIsOnTurn();

// If the win was from Human Player 1 and it is a game against the CPU, start next round
if (gameResult === 1 && Game.Game_against_CPU === true) {
Game.CPU_Level === 'Easy' ? CPU_Easy() : CPU_Normal();
}

// Reset the Gameboard in Game Object
for (let x = 1; x < 8; x++) {
Game.actualGameboardPlayer1[`C${x}`].length = 0;
Game.actualGameboardPlayer2[`C${x}`].length = 0;
}

// Reset Gameboard on screen
for (let cell of cellsArray) {
if (cell.classList.contains('placedCoin__1'))
cell.classList.remove('placedCoin__1');
if (cell.classList.contains('placedCoin__2'))
cell.classList.remove('placedCoin__2');
cell.style.opacity = 0.7;
}

// Reset round
Game.roundCounter = 0;
//#endregion

// If there was firework, remove it
if (document.getElementById('firework')) {
document.getElementById('firework').remove();
document.getElementById('div__canvas').remove();
}

// Remove the Game End Screen
document.body.setAttribute('data-gameend', 'no');
document.getElementById('main__section').setAttribute('data-gameend', 'no');
document.getElementById('main__section').setAttribute('data-canvasend', 'no');
document.getElementById('h__gameEnd').remove();
document.getElementById('p__gameEnd').remove();
document.getElementById('button__gameEnd').remove();

// Disable special styling for Settings Menu during End-Screen
document.getElementById('settings_menu__section').setAttribute('data-endscreen',  'no');
document.getElementById('settings_span').setAttribute('data-endscreen',  'no');

// Creat a new Gameboard!
Create_Gameboard(Game.gameboard_sizeX, Game.gameboard_sizeY);
document.getElementById('wrapper__gameboard').setAttribute('data-ingame', 'yes');


// Invoke next Placement & make sure correct Player is on turn
if(gameResult === 1 && Game.playerIsOnTurn === 'left') Turning_PlayerIsOnTurn();
if(gameResult === 2 && Game.playerIsOnTurn === 'right') Turning_PlayerIsOnTurn();

PlayGame();


};
//#endregion
