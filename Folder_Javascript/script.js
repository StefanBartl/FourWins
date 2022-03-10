//#region Table of Content
/*
!                  Four-Wins-Online Main-Javascript-File
?                                      powered by
!                                      Stefan Bartl
!                        (WKDSteVIE / WKDMinerva)
?                                            2021             
?                  ________________________________                                                                                                                                                                                                  
!                                     Table of content              

 ?                    1) General  Settings & Page Set-Up                                                                                                                            
 ?                    2) Main Game functions     
 ?                    3) Placements     
 ?                    4) Final Information & Comments                                                                                                                           
 ?                    5) Credits                                                            
*/
//#endregion

//#region Open Jobs
/*
?                  Jobs To-do:
todo    -)  CPU Game not give game back
?                  Finish
todo    -) Test all functions! All Game variants! Draw! Write the correct ' , infoboxes, headlines.
todo    -) Update Function Headlines and find a way for infoboxes with description and additional infos! Maybe like in CPU Easy.
todo    -) Final formatation.
todo    -) Make sure all important is commented.
todo    -) Write a final Comment.
todo    -) Save Default Script Files with the new Script Layout for later Projects. Also the index with the all new Toggle Slider and make a new 'gloabl' Library for JS & CSS !
todo    -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)

!                  Session progress
?-) 
*/
//#endregion

//#region 1) General Settings & Set-Up Pages

const Game = {
  // Game Object for storing important values in variables. Collected access via Game.[variable]
  // Setting the Gameboard arrays to keep Coin placements
  gameboard_size_x: 7,
  gameboard_size_y: 6,
  user_changed_gameboard: false,
  actualGameboardPlayer1: {

  },
  actualGameboardPlayer2: {
  },
  player1_coins: [],
  player2_coins: [],
 all_coins: [],
rowCounter: [],
clicked_column: undefined,
clicked_TopCell_ID: '',
  // Setting variable to know who is on turn
  playerIsOnTurn: 'right',
  // Setting a counter for the played rounds
  roundCounter: 0,
  // Hold if it is a game against CPU and the Level
  Game_against_CPU: false,
  CPU_Level: 'none',
  //Count the wins in this session
  Player_1_wins: 0,
  Player_2_wins: 0,
  Draws: 0,
  // Standard is: Left Yellow / Right Red
  player_Colour_Left: 'yellow',
  Sound: true,
  state: 'startingScreen',
};

Create_Gameboard(7, 6);

Set_Page_Language();

//#region Audio
const warning_audio = new Audio(
  'Folder_Audio/freesound_com/OneHits/chord-alert-notification.wav'
); // Confirm Audio Sample
warning_audio.load();
const lost_audio = new Audio('Folder_Audio/freesound_com/loose.wav'); // Loose against CPU Audio Sample
lost_audio.load();
const win_audio = new Audio(
  'Folder_Audio/freesound_com/klankbeeld__choir-sing-a-final-01.wav'
); // Winning Cheer Audio Sample
win_audio.load();
const placing_audio = new Audio(
  'Folder_Audio/freesound_com/OneHits/garuda1982__plop-sound-effect.wav'
); //Placement Audio Sample
placing_audio.load();

Game.Sound = localStorage.Sound || false;
Correct_Sound_Setting();

sound_checkbox.addEventListener('click', () => {
  if (sound_checkbox.checked === true) {
    localStorage.Sound = true;
    Game.Sound = true;
  } else {
    localStorage.Sound = false;
    Game.Sound = false;
  }
});

//#endregion

//#region Set  Left Player Colour

// Make sure, after clicking the Colour choose checkbox and than refresh the page, the correct colour is setted
Game.player_Colour_Left = localStorage.Player_Colour_Left || 'yellow';
if (Game.player_Colour_Left === 'red') {
  toggle_colour_button.classList.add('Class_Toggle');
  toggle_colour_slider.style.backgroundColor = 'red';
} else {
  toggle_colour_button.classList.remove('Class_Toggle');
  toggle_colour_slider.style.backgroundColor = 'yellow';
}

//#endregion

//#region Set correct Names
//                                   Set Names of Players to stored names if they are some
if (localStorage.Player_One_Name)
  player_1_name.value = localStorage.Player_One_Name;
if (localStorage.Player_Two_Name)
  player_2_name.value = localStorage.Player_Two_Name;

//                                   User storing names in localStorage
// Save names from input in local storage
Push_to_LocalStorage(
  'player1_name_svg',
  'player1_name__input',
  'Player_One_Name',
  'click'
);
Push_to_LocalStorage(
  'player2_name_svg',
  'player2_name__input',
  'Player_Two_Name',
  'click'
);

// Hover animations for circles after Name-Inputs
Swap_Two_Classes_by_Events(
  'player1_name_svg',
  'mouseenter',
  'mouseleave',
  'Class_Buttons_Add_Hover_Animations_1',
  'Class_Buttons_Remove_Hover_Animations_1'
);
Swap_Two_Classes_by_Events(
  'player2_name_svg',
  'mouseenter',
  'mouseleave',
  'Class_Buttons_Add_Hover_Animations_2',
  'Class_Buttons_Remove_Hover_Animations_2'
);

/* ==================================
         Set correct Names Event-Listener 
         ================================= */
choose_ki.addEventListener('change', () => {
  // Set correct names after choosing 'Play against'
  // If 'Play against CPU = No' is selected, make sure 'No' isn't the name of Player Two
  if (choose_ki.value === 'No') {
    player_2_name.value = localStorage.Player_Two_Name || 'Player 2';
  }
  // If it is a game against CPU, set Player Two Name to CPU Level
  else if (Game.Language === 'de' && choose_ki.value === 'CPU Easy')
    document.getElementById('player2_name__input').value = 'Einfacher CPU Gegner';
  else if (Game.Language !== 'de' && choose_ki.value === 'CPU Easy')
    document.getElementById('player2_name__input').value = 'Easy CPU Opponent';
  else if (Game.Language === 'de' && choose_ki.value === 'CPU Normal')
    document.getElementById('player2_name__input').value = 'Normaler CPU Gegner';
  else if (Game.Language !== 'de' && choose_ki.value === 'CPU Normal')
    document.getElementById('player2_name__input').value = 'Normal CPU Opponent';
});
/* =======================================
         Showing Name is saved Event-Listeners 
         ====================================== */
player_1_svg.addEventListener('click', () => {
  //console.log('Player 1 name saved to local Storage.');
  // Create notiification element
  const notification = document.createElement('h3');
  notification.innerText = 'Name saved!';
  notification.style.width = '100%';
  notification.classList.add('Class_LeftNot');
  // Push it to DOM
  left_sidebar.appendChild(notification);
  // Smooth showing
  notification.classList.add('Class_Smooth_In');
  // Smooth removing after 3 seconds
  setTimeout(() => {
    notification.classList.remove('Class_Smooth_In');
    notification.classList.add('Class_Smooth_Out');
  }, 3000);
  // Remove it from DOM
  setTimeout(() => {
    notification.remove();
  }, 4000);
});
player_2_svg.addEventListener('click', () => {
  //console.log('Player 2 name saved to local Storage.');
  // Create notiification element
  const notification = document.createElement('h3');
  notification.innerText = 'Name saved!';
  notification.style.width = '100%';
  notification.classList.add('Class_RightNot');
  // Push it to DOM
  right_sidebar.appendChild(notification);
  // Smooth showing
  notification.classList.add('Class_Smooth_In');
  // Smooth removing after 3 seconds
  setTimeout(() => {
    notification.classList.remove('Class_Smooth_In');
    notification.classList.add('Class_Smooth_Out');
  }, 3000);
  // Remove it from DOM
  setTimeout(() => {
    notification.remove();
  }, 4000);
});

//#endregion

//#region Settings-Menu Setup

// Get up-tp-date stats for the Settings-Menu
Stats();

/* ====================================
 !        Show Settings-Menu Event-Listeners 
         =================================== */
settings_span.addEventListener('mouseenter', () => {
  //If the settíngs icon is clicked and there isnt the showing class attached, remove the Hide Class if attached, then trigger show animatiom
  if (!settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Hide_Settings');
    settings_span.classList.add('Class_Show_Settings');
    return;
  }
});

settings_span.addEventListener('touchstart', () => {
  //If the settíngs icon is clicked and there isnt the showing class attached, remove the Hide Class if attached, then trigger show animatiom
  if (!settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Hide_Settings');
    settings_span.classList.add('Class_Show_Settings');
    return;
  }
});

/* ====================================
!         Hide Settings-Menu Event-Listeners 
         =================================== */
main_wrapper.addEventListener('mouseenter', () => {
  //If the settíngs menu is leaved to the main wrapper and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
  if (settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Show_Settings');
    settings_span.classList.add('Class_Hide_Settings');
    return;
  }
});

main_wrapper.addEventListener('touchstart', () => {
  //If the settíngs menu is leaved to the main wrapper and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
  if (settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Show_Settings');
    settings_span.classList.add('Class_Hide_Settings');
    return;
  }
});

document.querySelector('header').addEventListener('mousemove', () => {
  //If the settíngs menu is leaved to the header and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
  if (settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Show_Settings');
    settings_span.classList.add('Class_Hide_Settings');
    return;
  }
});
//#endregion

//#region Settings Menu Event-Listeners

info_h.addEventListener('click', () => {
  if (Game.Language === 'de') {
    New_Window({
      ID: 'ID_Info_Window',
      Name: info_h.innerText,
      Alert: true,
      Variable: 'Game Info',
      Text: `Online-4-Gewinnt

1) Das Ziel des Spiels ist es 4 Spielsteine (Coins) nebeneinander, übereinander oder diagonal legen zu können.
Die/der erste SpielerIn, welche dies schafft hat die Runde gewonnen.
2) Die darauffolgende Runde beginnt der/die Verlierer_in aus der Vorrunde. (Gleicht spielerische Vorteile aus)
3) Ein Unentschieden tritt ein, wenn kein Stein mehr spielbar ist und nimmt gewonnen hat. In diesem Fall beginnt derjenige, der nicht den letzten Spielzug machte.

Informationen & Einstellungs-Menü:
Es ist nur jeweils vor dem Spiel möglich die Größe des Gameboards zu verändern. Andererseits würde es die Möglichkeit eröffnen sich unfaire Vorteile zu verschaffen!
Standardgröße ist 7 Spalten und 6 Reihen - Einwurfreihe exklusive.
Jede Zelle hat ein 1:1 Höhen und Seitenverhältniss, deswegen werden die Spielfeldzellen kleiner  je mehr Spalten gewählt werden.

Eine Farbwahl der Spielsteine ist möglich - auch während des Spieles. 
Grundeinstellung ist Gelb für den / die linke Spieler_in und Rot für das Gegenüber.

Der Sound hat eine On/Off Funktion. und es ist möglich zwischen Deutscher und Englischer Sprache zu wählen.
Bei Spielen gegen den Computer wird der Spielausgang in einer Statistik aufgezeichnet. Diesen findet man in den Spieleinstellungen unter 'Statistiken gegen den CPU'.
Diese Statistiken kann man separat zurücksetzen.

Die Einstellungen Sound, Sprache, Statistiken gegen den CPU sowie gespeicherte Spielernamen werden in Ihrem Browser gespeichert. So ist es möglich, dass Sie den Browser schließen
und die Einstellungen trotzdem erhalten bleiben. Wollen Sie diese Einstellungen löschen, so können Sie dies im Einstellungs-Menü ganz unten mit Klick auf 'Alles löschen' tun.
`,
    });
  } else {
    New_Window({
      ID: 'ID_Info_Window',
      Name: info_h.innerText,
      Alert: true,
      Text: `Online-4-Wins

      1) The aim of the game is to be able to place 4 tokens (coins) next to each other, on top of each other or diagonally.
      The first player to do this wins the round.
      2) The following round starts with the loser from the previous round. (Balances game advantages)
      3) A tie occurs when there is no more playable checker and has won. In this case, the player who did not make the last move begins.
      
      Information & Settings menu:
      It is only possible to change the size of the gameboard before each game. On the other hand, it would open up the possibility of gaining unfair advantages!
      Standard size is 7 columns and 6 rows - excluding throw-in row.
      Each cell has a 1:1 height and aspect ratio, so the more columns you choose, the smaller the gamefield cells will be.
      
      A color choice of the game pieces is possible - even during the game.
      The basic setting is yellow for the player on the left and red for the opponent.
      
      The sound has an on/off function. and it is possible to choose between German and English language.
      When playing against the computer, the outcome of the game is recorded in a statistic. This can be found in the game settings under 'Stats vs. CPU'.
      These statistics can be reset separately.
      
      The settings sound, language, statistics against the CPU and saved player names are saved in your browser. So it is possible that you close the browser
      and the settings are retained. If you want to delete these settings, you can do this in the settings menu at the bottom by clicking on 'Delete all'.
`,
    });
  }
});

document.getElementById('settings_gameboard_button').addEventListener('click', ()=>{
  const sizeX = document.getElementById('settings_gameboard_sizeX').value;
  const sizeY = document.getElementById('settings_gameboard_sizeY').value;
  Create_Gameboard(sizeX, sizeY);
});

document.querySelector('.container_colour_toggle').addEventListener('click', () => {
  //console.log('Colour toggle clicked');
  if (
    localStorage.Player_Colour_Left === 'yellow' ||
    localStorage.Player_Colour_Left === undefined
  ) {
    //console.log('Set colour toggle to red.');
    localStorage.Player_Colour_Left = 'red';
    Game.player_Colour_Left = 'red';
    toggle_colour_button.classList.add('Class_Toggle');
    toggle_colour_slider.style.backgroundColor = 'red';
    // console.log('Colour toggle changed colour for future coins to red.')
  } else if (localStorage.Player_Colour_Left === 'red') {
    // console.log('Set colour toggle to yellow.')
    localStorage.Player_Colour_Left = 'yellow';
    Game.player_Colour_Left = 'yellow';
    toggle_colour_button.classList.remove('Class_Toggle');
    toggle_colour_slider.style.backgroundColor = 'yellow';
    // console.log('Colour toggle changed colour for future coins to yellow.')
  }

  // Changing colour of existing coins
  if (Game.state == 'InGame') {
    const cellsArray = document.getElementsByClassName('cells');
    //Loops trough cellsArray
    for (let cell of cellsArray) {
      // If one cell have tht Class with a red or yellow Coin Background attached, change it to the other colored background (PNG)
      if (cell.classList.contains('placedCoin__1')) {
        cell.classList.remove('placedCoin__1');
        cell.classList.add('placedCoin__2');
      } else if (cell.classList.contains('placedCoin__2')) {
        cell.classList.remove('placedCoin__2');
        cell.classList.add('placedCoin__1');
      }
      // console.log('Existing coins changed colour.');
    }
  }
});

language_menu.addEventListener('change', () => {
  // Save language in Local Storage and Game Object
  // Important maybe for later: With more languages, if/else needed!
  let languageCode;
  language_menu.value === 'Deutsch'
    ? (languageCode = 'de')
    : (languageCode = 'en');
  localStorage.Language = languageCode;
  localStorage.LanguageIsSetttedByUser = true;
  Game.Language = languageCode;
  Game.LanguageIsSetttedByUser = true;
  // Make sure that a manually setted setted language is not overwritten by the default detected default browser language
  Translate_StartScreen(languageCode, true);

  // If exist yet, translate actual Turning Div
  if (document.getElementById('h__turnDiv')) {
    if (Game.Language === 'de') {
      // Deutsch

      if (Game.playerIsOnTurn === 'left') {
        document.getElementById(
          'h__turnDiv'
        ).innerText = `Dein Zug, ${Game.Player_One_Name}`;
      } else if (
        Game.playerIsOnTurn === 'right' &&
        Game.Game_against_CPU === false
      ) {
        document.getElementById(
          'h__turnDiv'
        ).innerText = `Du bist dran, ${Game.Player_Two_Name}`;
      } else {
        document.getElementById(
          'h__turnDiv'
        ).innerText = `${Game.Player_Two_Name} denkt nach...`;
      }
    } else {
      // English

      if (Game.playerIsOnTurn === 'left') {
        document.getElementById(
          'h__turnDiv'
        ).innerText = `Your turn, ${Game.Player_One_Name}`;
      } else if (
        Game.playerIsOnTurn === 'right' &&
        Game.Game_against_CPU === false
      ) {
        document.getElementById(
          'h__turnDiv'
        ).innerText = `Do you best, ${Game.Player_Two_Name}`;
      } else {
        document.getElementById(
          'h__turnDiv'
        ).innerText = `${Game.Player_Two_Name}'s is thinking...`;
      }
    }
  }
});

stats_reset_easy.addEventListener('click', () => {
  localStorage.CPU_Easy_Wins = 0;
  localStorage.CPU_Easy_CPUWins = 0;
  localStorage.CPU_Easy_Draws = 0;
  Stats();
});

stats_reset_normal.addEventListener('click', () => {
  localStorage.CPU_Normal_Wins = 0;
  localStorage.CPU_Normal_CPUWins = 0;
  localStorage.CPU_Normal_Draws = 0;
  Stats();
});

contact_h.addEventListener('click', () => {
  window.open('https://stefanbartl.github.io/StefanBartl_Portfolio/');
});

credits_h.addEventListener('click', () => {
  window.open('https://github.com/StefanBartl/FourWins/blob/main/README.md');
});

delete_all.addEventListener('click', () => {
  // Play warning sound
  warning_audio.play();

  // Create Confirm Window
  if (Game.Language === 'de') {
    const confirm =  New_Window({ID: 'newWindow__delete', Name: 'Notification', Text: `${
      localStorage.getItem('Player_One_Name') || 'Spieler'
    }, willst du wirklich die gespeicherte Sprache, die Spieler Namen und die Statistiken von deinem local-Storage löschen? Diese Daten sind nur in deinem Browser gespeichert und können nach einer Löschung nicht wiederhergestellt werden.`, 
    Confirm: true}); 
  } else {
    const confirm =  New_Window({ID: 'newWindow__delete', Name: 'Notification', Text: `${
      localStorage.getItem('Player_One_Name') || 'Player'
    }, do you really want do delete the saved language, saved Player names and the stats from your local Storage? The data is stored in your Browser and cannot be restored again after deleting it.`, 
    Confirm: true}); 
  }
    // If user clicked OK after notification, delete local storage
    document.getElementById('newWindow__delete_OK_Button').addEventListener('click', ()=>{
      localStorage.clear();
      //console.log('Local Storage deleted');
    });

    //Reset name inputs
    player_1_name.value = player_1_name.placeholder;
    Game.player_1_name = player_1_name.placeholder;
    player_2_name.value = player_2_name.placeholder;
    Game.player_2_name = player_2_name.placeholder;
});  

//#endregion

/* ========================== 
?        Start-Game Event-Listener
       ========================== */
start_button.addEventListener('click', Game_Preparations);

//#endregion

//#region 2) Main Game

/* ============
!     Preparing to Play 
            ============= */
function Game_Preparations() {
  // Function to do all the preparations to start the Game
  // console.log('Entered Game Preparations');

  Game.state = 'Preparations';

  // Disable Gameboard-Size changing
  document.getElementById('settings_span__gameboard').setAttribute('data-ingame',  'yes');
  
  // Make sure at Game start are valid name variables available
  if (player_1_name.value === '')
    player_1_name.value = player_1_name.placeholder;
  if (player_2_name.value === '')
    player_2_name.value = player_2_name.placeholder;
  Game.Player_One_Name = player_1_name.value;
  Game.Player_Two_Name = player_2_name.value;
  // console.log('Setted Names:', Game.Player_One_Name, Game.Player_Two_Name);

  // Get all Cells
  const cellsArray = document.getElementsByClassName('cells');

  // Give all cells samedata-isplayed attribute
  for (let cell of cellsArray) {
    cell.setAttribute('data-isplayed', 'no');
  }

  // Proof if Game is against CPU
  if (choose_ki.value != 'No') Game.Game_against_CPU = true;
  // And if it is, set the CPU Level
  if (Game.Game_against_CPU === true) {
    if (choose_ki.value === 'CPU Easy') {
      Game.CPU_Level = 'Easy';
    } 
    if (choose_ki.value === 'CPU Normal') {
      Game.CPU_Level = 'Normal';
    } 
    if (choose_ki.value === 'CPU Hard') {
      Game.CPU_Level = 'Hard';
    } 
  };

  for (let i = 1; i <= Game.gameboard_size_x; i++) {
    // Create the Arrays to validate placements
    let arr = [];
    Game.player1_coins[`C${i}`] = [];
    Game.player2_coins[`C${i}`] = [];
    Game.actualGameboardPlayer1[`C${i}`] = [];
    Game.actualGameboardPlayer2[`C${i}`] = [];
    // Create row counter for easy calculation of the correct row for  placement
    Game.rowCounter[`C${i}`] = `${Game.gameboard_size_y}`;
  };

  // console.log('Game against CPU:', Game.Game_against_ki, 'CPU Level:', Game.CPU_Level);
  // DOM-Manipulation to get to the 'Game-Screen'
  Game_Screen();

  // Create DOM-Elements for show the switching which player is on turn
  Create_DOM_Element({
    ParentID: 'main__section',
    Element: 'div',
    ID: 'div__turnPlayers',
  });
  Create_DOM_Element({
    ParentID: 'div__turnPlayers',
    Element: 'h3',
    ID: 'h__turnDiv',
  });

  // Show correct player is on turn message
  Turning_PlayerIsOnTurn();

  // After 8 seconds, smoothly remind the Player of time
  setTimeout(Thinking_Effect, 8000);

  // After preparations Start Game
  PlayGame();

  // console.log('Finished Game preparations.');
}
/* ========
!     Play Game 
            ========= */
function PlayGame() {
  // console.log('Entered Play Game Function.');

  // Let Game Objects know we are in Game know
  Game.state = 'InGame';
  document.getElementById('wrapper__gameboard').setAttribute('data-inGame', 'yes');

  // Detect the correct the Top Cells for looping trough to put the event listeners on them so the players can make there placements

  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName('topCells');
  for (let topCell of topCellsArray) {

    let topCellColumn = parseInt(topCell.getAttribute('data-column'));
    //                                  __________________________________________
    //                                  Event-Listener for the Choosing-Animation
    topCell.addEventListener('mouseover', () => {
      Add_Choosing_Ani(topCellColumn);
     // console.log(`Triggered choosing animation in top cell ${topCellColumn}`);
    });
    topCell.addEventListener('mouseleave', () => {
      Remove_Choosing_Ani(topCellColumn);
    });


    //                                  ____________________________________________________
    //                                  Event-Listener for actions if a Top Cell is clicked
    topCell.addEventListener('click', () => {
      // Play placement sound if on:
      if (Game.Sound === true) {
        placing_audio.play();
      }
      // Get the ID & Column of the played TopCell:
      Game.clicked_TopCell_ID = topCell.id;

      let clicked_column = parseInt(topCell.getAttribute('data-column'));
      // Get the correct column of the clicked Top Cell:
      Game.clicked_column  = clicked_column;

      for (let topCell of topCellsArray) {
      topCell.style = 'pointer-events:none';
      };
      // Start placement function
      Prepare_Placement();
    });
  }
  // console.log('Leaving Play Game Function.');
};
//#endregion

//#region 3) Placements
/* ==============
!     Prepare Placement
            ============== */
function Prepare_Placement() {
  // console.log('Entered Function for preparing new Placement.');

  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName('topCells');

  // Get the played top cell for getting the right column
  topCell = document.getElementById(`${Game.clicked_TopCell_ID}`);

  // Make sure, placement only is allowed if the animation from the placement before is finished
  if (topCell.firstChild) return;

  // Increase round counter
  Game.roundCounter++;

  Game.coin_placement_row =  parseInt(Game.rowCounter[`C${Game.clicked_column}`] ) ;
  Game.coin_placement_id = `ID_C${Game.clicked_column}R${Game.coin_placement_row}` ;
 
   Make_Placement();
};

/* =============
!     do the Placement 
            ============= */
function Make_Placement() {
  /*                 console.log(
    'Make placement on coin placement id:',
    Game.coin_placement_id,
    'in row:',
    Game.coin_placement_row,
    'and column:',
    Game.clicked_column
  );
*/

  // Create the correct coin, set correct position and append it to the DOM
  const coin = document.createElement('div');

  if (Game.playerIsOnTurn === 'left' && Game.player_Colour_Left === 'yellow') {
    coin.classList.add('coin__yellow');
    Game.actualGameboardPlayer1[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    // to try:
    // Push row placement in a newly player array to get rid auf the actual Gameboard Objec
    Game.player1_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    // Collect all placements in one array
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  };

  if (
    Game.playerIsOnTurn === 'left' &&
    Game.player_Colour_Left === 'red'
  ) {
    coin.classList.add('coin__red');
    Game.actualGameboardPlayer1[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    // to try:
    Game.player1_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  };
  
  if (Game.playerIsOnTurn === 'right' && Game.player_Colour_Left === 'yellow') {
    coin.classList.add('coin__red');
    Game.actualGameboardPlayer2[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    // to try:
    Game.player2_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  }; 

  if (
    Game.playerIsOnTurn === 'right' &&
    Game.player_Colour_Left === 'red'
  ) {
    coin.classList.add('coin__yellow');
    Game.actualGameboardPlayer2[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
    // to try:
    Game.player2_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  };

  // Get the played top cell for getting the right column and append the coin
  topCell = document.getElementById(`${Game.clicked_TopCell_ID}`);
  topCell.appendChild(coin);

  // Trigger the correct animation (animation length) from total 52vh  (/ 6 * x)
  let ratio_value = (48 / (Game.gameboard_size_y - 1)) * Game.coin_placement_row;

  coin.animate(
    [
      // keyframes
      { transform: 'translateY(0)' },
      { transform: `translateY(${ratio_value}vh)` },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
    }
  );

  //                        After placing Coin Animation, Win Validation and next turn
  // Remove the coin with the animation after the animation time ended and place the coin on correct position
  setTimeout(
    () => {
      Placement_End();
    }, // End of the anyonyme function of the setTimeout()
    1000
  ); // End of the setTimeout(), next placement is possible!
  // console.log('Placement done.');
}

/* ============
!     Placement Done 
            ============ */
function Placement_End() {
 // console.log('Entered End of Placement');

   // First remove the coin from the Top Cell
  document.getElementById(`${Game.clicked_TopCell_ID}`).firstChild.remove();

  // Proof is user changed Gameboard size. If true, adjust ID_Variable
  coin_destination = document.getElementById(`ID_C${Game.clicked_column}R${Game.coin_placement_row}`);

  // Make the Placement
  if (Game.playerIsOnTurn === 'left') {
    // Place the Coin as background image on the correct column (set by the decreased row counter)
    if (Game.player_Colour_Left === 'yellow') {
      coin_destination.classList.add('placedCoin__1');
      coin_destination.style.opacity = '1';
      coin_destination.setAttribute('data-isPlayed', 'yes');
    } else {
      coin_destination.classList.add('placedCoin__2');
      coin_destination.style.opacity = '1';
      coin_destination.setAttribute('data-isPlayed', 'yes');
    }
  } else {
    // If Placement was from Human  Player 2

    if (Game.player_Colour_Left === 'red') {
      coin_destination.classList.add('placedCoin__1');
      coin_destination.style.opacity = '1';
      coin_destination.setAttribute('data-isPlayed', 'yes');
    } else {
      coin_destination.classList.add('placedCoin__2');
      coin_destination.style.opacity = '1';
      coin_destination.setAttribute('data-isPlayed', 'yes');
    }
  }
  Game.rowCounter[`C${Game.clicked_column}`]--;

  Game.playerIsOnTurn === 'left'
    ? Player_1_Placement_Finish()
    : Player_2_Placement_Finish();
}

/* ==================
!     Finish Placement  Player 1 
            =================== */
function Player_1_Placement_Finish() {
  //  Invoke Winning-Validation for Player 1  and stop this loop if win.
  const valid_row = Row_Validator(1, Game.coin_placement_row);
  const valid_column = Column_Validator(
    1,
    Game.clicked_column,
    Game.coin_placement_row
  );
  const valid_diagonal = Diagonal_Validator(
    1,
    Game.clicked_column,
    Game.coin_placement_row
  );
  if (valid_row === true || valid_column === true || valid_diagonal === true) return;

  // If there are no more cells to  play invoke draw 
  if (Game.roundCounter === (Game.gameboard_size_x * Game.gameboard_size_y)) {
    Game_End_Screen(3);
    return;
  };

// If no win..
// Proof if Column is full and Unlock the TopCells
  if (Game.Game_against_CPU === false) Unlock_TopCells();

  Column_Locking_Validation(false);

  //  Next Player is on turn
  Turning_PlayerIsOnTurn();

  // If Game is against CPU invoke correct CPU
  if (Game.CPU_Level === 'Easy' || Game.CPU_Level === 'Einfach') {
    CPU_Easy();
    Lock_TopCells();
  } else if (Game.CPU_Level === 'Normal') {
    CPU_Normal();
    Lock_TopCells();
  } else if  (Game.CPU_Level === 'Hard' || Game.CPU_Level === 'Schwer')  {
    CPU_Hard();
    Lock_TopCells();
  };
}

/* =================
!   Finish Placement Player 2
          =================== */
function Player_2_Placement_Finish() {
  //  Invoke Winning-Validation for Player 2 and stop this loop if win.
  const valid_row = Row_Validator(2, Game.coin_placement_row);
  const valid_column = Column_Validator(2,  Game.clicked_column, Game.coin_placement_row);
  const valid_diagonal = Diagonal_Validator(2, Game.clicked_column, Game.coin_placement_row);
  if (valid_row === true || valid_column === true || valid_diagonal === true) return;

// If there are no more cells to  play invoke draw 
  if (Game.roundCounter === (Game.gameboard_size_x * Game.gameboard_size_y)) {
    Game_End_Screen(3);
    return;
  }

// If no win...
// If placement was from human, proof if Column is full and Unlock the TopCells
  if (Game.Game_against_CPU === false) {
    Column_Locking_Validation(false);
    Unlock_TopCells();
  };

    // Next Player is on turn
  Turning_PlayerIsOnTurn();
  Unlock_TopCells();
}
//#endregion

//#region 3) Final informations and Comments

/*
?                     Bonus Jobs to-do:

-) Highlight the winning chain!
-) Beautify the win notifications with images, f.e.: with tally's!
-) Make the Coin Images a variable _> User could choice between coin appearance!
-) Implement Classic and Personal style!
-) Save /Load Game function via saving cell-states in localStorage!
-) Improve CPU Normal, especially the Diagonal Detection!
-) Write a CPU Heavy Algorhytmus!
-) Make it possible to switch from Game Mode to the Starting Screen to change Settings, Names etc...
-) Design a Starting Screen Animation to make it more interesting to play!  
-) Think about a other Design for the Page and the Gameboard!
                                                                                                                                                                                                                                                                                */
//#endregion

//#region 4) Credits
/*
    
====================================================================================================================
                                                                                                                    
                                       Credits & Special Thanks to:                                                 
                                                                                                                    
    Special thanks to the 'Odin Project'-Team who did a great job in giving advice for learning Web-Development.    
                                      https://www.theodinproject.com/                                               
                                                                                                                    
                   Greetings to the many, many programmers who take the time to put there knowledge online!         
        Of course also big thanks to all photographers and graphic designers who make their works available.        
                                                                                                                    
                                  Javascript - what a wonderful language.                                              
                                                                                                                    
                                                                                                                    
====================================================================================================================                                                                                                                                                               */

//#endregion