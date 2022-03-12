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
todo    -) Win-Screen to new layout
todo    -) improve winchain animation

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

  // Hide the Player is on turn Infobox and proof if there is the thinking animation attached, if so, remove it.. Show Win Notifications
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
if(document.getElementById('div__wonGames_P1')) document.getElementById('div__wonGames_P1').classList.add('Class_Invisible');
if(document.getElementById('div__wonGames_P2')) document.getElementById('div__wonGames_P2').classList.add('Class_Invisible');
if(document.getElementById('div__drawGames')) document.getElementById('div__drawGames').classList.add('Class_Invisible');
  
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

  insertAfter(document.getElementById('button__gameEnd'), document.getElementById('wrapper__gameboard'));

  // If it is not a draw or a loose against CPU, it is a win from a Human Playert, so add the fireworks
  if (
    gameResult === 1 || (gameResult === 2 && Game.Game_against_CPU === false)
  ) {
    // Canvas with fireworks layed in a div container, which is then pushed to the Main Wrapper, Now, everything which is pushed to the Main Wrapper
    // with a greater z-index is visible over the fireworks canvas
    const canvas_div = Create_DOM_Element({ ParentID: 'main__section', Element: 'div', ID: 'div__canvas', Class: 'div__canvas' });
    const firework_canvas = Create_DOM_Element({ ParentID: 'div__canvas',  Element: 'canvas', ID: 'firework' });
    // Fireworks('firework');
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
  
// add winchain highlight animation
const cellsArray = document.querySelectorAll('.cells');
for(let cell of cellsArray){
if(cell.getAttribute('data-winchain') === 'yes')cell.animate(
  [
    // keyframes
    { backgroundColor: 'purble' },
    { backgroundColor: 'green' },
    { backgroundColor: 'orange' },
    { backgroundColor: 'black' },
    { backgroundColor: 'green' },
  ],
  {
    // timing options
    duration: 10000,
    iterations: Infinity,
    direction: "alternate-reverse"
  }
)
};
};

//#endregion

//#endregion

//#region 3) Start a new Game
  /* ============== 
!       Start a New Game
              ============== */
function Start_New_Game(gameResult){
// console.log('Entered New Game function.');

//Make sure the stats are up to date
Stats();
Won_Games_Counter();
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