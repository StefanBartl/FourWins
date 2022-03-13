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
 .                          - Game Object
 .                          - Game settings                                                                                                                      
 ?                    2) Main Game functions  
 .                          - Game preparations
 .                          - Play Game 
 ?                    3) Placements   
 .                          - Prepare placements
 .                          - Make placement
 .                          - End of placement
.                           - Finish played round   
 ?                    4) Final Information & Comments                                                                                                                           
 ?                    5) Credits                                                            
*/
//#endregion

//#region Open Jobs
/*
?                  Jobs To-do:
todo      
?                  Finish
todo    test all functions! all game variants! draw! 
todo    write comments and prrof existed ones, infoboxes for description if needed, update headlines, console.log the arguments and as much as make sense!
todo    finalize formatation. last update table of contents.
todo    make sure all important is commented. write final informations / comment if make sense.
todo    save default script files with the updatet script layout for later projects. also the index with the all new toggle slider and make a generic library for js & css !
todo    cleanout functions an minimize code as much as it make sense. do the guidelines.
todo    turn off console.logs
todo    fix top cell transparent in topCellsCanvas class
todo    take a look at the bonus jobs - maybe you have enough passion to do one :-)
!                  Session progress
?          
*/
//#endregion

//#region 1) general settings & set-up pages

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
  Sound: false,
  menuAnimation: 'true',
  state: 'startingScreen',
};

//#region Game settings

//Reset Gameboard size values and than create new gameboard
document.getElementById('settings_gameboard_sizeX').value = 7;
document.getElementById('settings_gameboard_sizeY').value = 6;
Create_Gameboard(document.getElementById('settings_gameboard_sizeX').value, document.getElementById('settings_gameboard_sizeY').value);

Set_Page_Language();

//#region Audio

// assign variables to the audio files 

// Confirm Audio Sample
const warning_audio = new Audio(
  'Folder_Audio/freesound_com/OneHits/chord-alert-notification.wav'
); 

 // Loose against CPU Audio Sample
const lost_audio = new Audio('Folder_Audio/freesound_com/loose.wav');

 // Winning Cheer Audio Sample
const win_audio = new Audio(
  'Folder_Audio/freesound_com/klankbeeld__choir-sing-a-final-01.wav'
);

 //Placement Audio Sample
const placing_audio = new Audio(
  'Folder_Audio/freesound_com/OneHits/garuda1982__plop-sound-effect.wav'
);

Game.Sound = localStorage.Sound || false;
Correct_Sound_Setting();

sound_checkbox.addEventListener('click', () => {
  if (sound_checkbox.checked === true) {
    localStorage.Sound = true;
    Game.Sound = true;
    starting_audio.muted = false;
  } else {
    localStorage.Sound = false;
    Game.Sound = false;
    starting_audio.muted = true;
  }
});

// only preload audio (to have it ready if needed) if sound is on
if(Game.Sound === true){
warning_audio.load();
lost_audio.load();
win_audio.load();
placing_audio.load();
};

//#endregion

//#region Set  Left Player Colour

// Make sure, after clicking the Colour choose checkbox and than refresh the page, the correct colour is setted
Game.player_Colour_Left = localStorage.Player_Colour_Left || 'yellow';
if (Game.player_Colour_Left === 'red') {
  toggle_colour_button.classList.add('toggle__colour');
  toggle_colour_slider.style.backgroundColor = 'red';
} else {
  toggle_colour_button.classList.remove('toggle__colour');
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

// set and proof to fire menu animation
Game.menuAnimation = localStorage.menuAnimation || 'true';
if(Game.menuAnimation === 'true'){
  settings_span.classList.add('colourAnimation');
  start_button.classList.add('colourAnimation');
  aniToggle_checkbox.checked = true;
} else {
  aniToggle_checkbox.checked = false;
};

/* ====================================
 !        Show Settings-Menu Event-Listeners 
         =================================== */
settings_span.addEventListener('mouseenter', () => {
  //If the settíngs icon is clicked and there isnt the showing class attached, remove the Hide Class if attached, then trigger show animatiom
  if (!settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Hide_Settings');
    settings_span.classList.remove('colourAnimation');
    settings_span.classList.add('Class_Show_Settings');
  };
});

settings_span.addEventListener('touchstart', () => {
  //If the settíngs icon is clicked and there isnt the showing class attached, remove the Hide Class if attached, then trigger show animatiom
  if (!settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Hide_Settings');
    settings_span.classList.remove('colourAnimation');
    settings_span.classList.add('Class_Show_Settings');
  };
});

/* ====================================
!         Hide Settings-Menu Event-Listeners 
         =================================== */
main_wrapper.addEventListener('mouseenter', () => {
  //If the settíngs menu is leaved to the main wrapper and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
  if (settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Show_Settings');
    settings_span.classList.add('Class_Hide_Settings');

  }
  // If menu animation is not setted of, attach animation class after small delay to make sure the triggered hide animation is fired
  if(Game.menuAnimation === 'true'){
  setTimeout(()=>{
    settings_span.classList.remove('Class_Hide_Settings');
    settings_span.classList.add('colourAnimation');
  }, 10);
  };

});

main_wrapper.addEventListener('touchstart', () => {
  //If the settíngs menu is leaved to the main wrapper and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
  if (settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Show_Settings');
    settings_span.classList.add('Class_Hide_Settings');

    if(Game.menuAnimation === 'true'){
      setTimeout(()=>{
        settings_span.classList.remove('Class_Hide_Settings');
        settings_span.classList.add('colourAnimation');
      }, 10);
      };
  };
  
});

document.querySelector('header').addEventListener('mousemove', () => {
  //If the settíngs menu is leaved to the header and there is the showing class attached, remove the showing Class is attached, then trigger hide animatiom
  if (settings_span.classList.contains('Class_Show_Settings')) {
    settings_span.classList.remove('Class_Show_Settings');
    settings_span.classList.add('Class_Hide_Settings');

    if(Game.menuAnimation === 'true'){
      setTimeout(()=>{
        settings_span.classList.remove('Class_Hide_Settings');
        settings_span.classList.add('colourAnimation');
      }, 10);
      };
  };
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
  Game.user_changed_gameboard = true;
});

document.getElementById('container__toggleColour').addEventListener('click', () => {
  //console.log('Colour toggle clicked');
  if (
    localStorage.Player_Colour_Left === 'yellow' ||
    localStorage.Player_Colour_Left === undefined
  ) {
    //console.log('Set colour toggle to red.');
    localStorage.Player_Colour_Left = 'red';
    Game.player_Colour_Left = 'red';
    toggle_colour_button.classList.add('toggle__colour');
    toggle_colour_slider.style.backgroundColor = 'red';
    // console.log('Colour toggle changed colour for future coins to red.')
  } else if (localStorage.Player_Colour_Left === 'red') {
    // console.log('Set colour toggle to yellow.')
    localStorage.Player_Colour_Left = 'yellow';
    Game.player_Colour_Left = 'yellow';
    toggle_colour_button.classList.remove('toggle__colour');
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

aniToggle_checkbox.addEventListener('click', ()=>{
      if(localStorage.menuAnimation === 'true' || localStorage.menuAnimation === undefined){
          localStorage.menuAnimation = 'false' 
          Game.menuAnimation = 'false';
          start_button.classList.remove('colourAnimation');
        } else {
             localStorage.menuAnimation = 'true';
             Game.menuAnimation = 'true';
             start_button.classList.add('colourAnimation');
}});

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

//#endregion

/* ========================== 
?        Start-Game Event-Listener
       ========================== */
start_button.addEventListener('click', Game_Preparations);

//#endregion

//#region 2) main game

/* ============
!     Preparing to Play 
            ============= */
function Game_Preparations() {
  // function to do all the preparations to start the game
  // console.log('Entered Game Preparations');

  Game.state = 'Preparations';

  // stop playing starting screen sound
  if (Game.Sound === true) starting_audio.pause(); 

  // disable gameboard-size changing during game
  document.getElementById('settings_span__gameboard').setAttribute('data-ingame',  'yes');
  
  // make sure at game start are valid name variables available
  if (player_1_name.value === '')
    player_1_name.value = player_1_name.placeholder;
  if (player_2_name.value === '')
    player_2_name.value = player_2_name.placeholder;
  Game.Player_One_Name = player_1_name.value;
  Game.Player_Two_Name = player_2_name.value;
  // console.log('Setted Names:', Game.Player_One_Name, Game.Player_Two_Name);

  // get all cells and give them same data-isplayed attribute
  const cellsArray = document.getElementsByClassName('cells');
  for (let cell of cellsArray) {
    cell.setAttribute('data-isplayed', 'no');
  }

  // proof if game is against CPU and if set correct level
  if (choose_ki.value != 'No') Game.Game_against_CPU = true;
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

  // create important objects
  for (let i = 1; i <= Game.gameboard_size_x; i++) {
    // create the arrays to validate the placements later
    let arr = [];
    Game.player1_coins[`C${i}`] = [];
    Game.player2_coins[`C${i}`] = [];
    Game.actualGameboardPlayer1[`C${i}`] = [];
    Game.actualGameboardPlayer2[`C${i}`] = [];
    // create row counter for easy calculation of the correct row for  placement
    Game.rowCounter[`C${i}`] = `${Game.gameboard_size_y}`;
  };

  // console.log('Game against CPU:', Game.Game_against_ki, 'CPU Level:', Game.CPU_Level);
  // DOM-manipulations to get to the 'Game-Screen'
  Game_Screen();

  // create DOM-elements for show the switching which player is on turn
  Create_DOM_Element({
    ParentID: 'main__section',
    Element: 'div',
    ID: 'div__turnPlayers',
  });
  Create_DOM_Element({
    ParentID: 'div__turnPlayers',
    Element: 'h2',
    ID: 'h__turnDiv',
  });

  // show correct player is on turn message
  Turning_PlayerIsOnTurn();

  // after 8 seconds, smoothly remind the player of time
  setTimeout(Thinking_Effect, 8000);

  // after finished the preparations start game
  PlayGame();

  // console.log('Finished Game preparations.');
}
/* ========
!     Play Game 
            ========= */
function PlayGame() {
  // console.log('Entered Play Game Function.');

  Game.state = 'InGame';
  document.getElementById('wrapper__gameboard').setAttribute('data-inGame', 'yes');

  // detection of the correct top-cells  to put the event listeners on them so the players can make there placements
  // get all top-cells
  const topCellsArray = document.getElementsByClassName('topCells');
  for (let topCell of topCellsArray) {
    let topCellColumn = parseInt(topCell.getAttribute('data-column'));
    
    //?  Event-Listener for the Choosing-Animation
    topCell.addEventListener('mouseover', () => {
      Add_Choosing_Ani(topCellColumn);
     // console.log(`Triggered choosing animation in top cell ${topCellColumn}`);
    });
    topCell.addEventListener('mouseleave', () => {
      Remove_Choosing_Ani(topCellColumn);
    });

    //?  Event-Listener for actions if a Top Cell is clicked
    topCell.addEventListener('click', () => {
      
      // play placement sound if on:
      if (Game.Sound === true) {
        placing_audio.play();
      };
      
      // get the id & column of the played top-cell:
      Game.clicked_TopCell_ID = topCell.id;

      let clicked_column = parseInt(topCell.getAttribute('data-column'));
      // get the correct column of the clicked top-cell:
      Game.clicked_column  = clicked_column;

      for (let topCell of topCellsArray) {
      topCell.style = 'pointer-events:none';
      };

      // start placement function
      Prepare_Placement();
    });
  };
  // console.log('Leaving Play Game Function.');
};
//#endregion

//#region 3) placements
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
!     do the placement 
            ============= */
function Make_Placement() {
  
  /*                 console.log(
    'Make placement on coin. The placement id is:',
    Game.coin_placement_id,
    'in row:',
    Game.coin_placement_row,
    'and column:',
    Game.clicked_column
  );
*/

  //? create the correct coin, note correct position and append it to the DOM
  
  const coin = document.createElement('div');

  // if left player is on turn
  if (Game.playerIsOnTurn === 'left' && Game.player_Colour_Left === 'yellow') {
    coin.classList.add('coin__yellow');
    Game.actualGameboardPlayer1[`C${Game.clicked_column}`].push(Game.coin_placement_row );
   Game.player1_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
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
    Game.player1_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  };
  
  //if player right is on turn
  if (Game.playerIsOnTurn === 'right' && Game.player_Colour_Left === 'yellow') {
    coin.classList.add('coin__red');
    Game.actualGameboardPlayer2[`C${Game.clicked_column}`].push(
      Game.coin_placement_row
    );
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
    Game.player2_coins[`C${Game.clicked_column}`].push(Game.coin_placement_row);
    Game.all_coins.push(`C${Game.clicked_column}R${Game.coin_placement_row}`);
  };

  // get the played top cell for getting the right column and append the coin
  topCell = document.getElementById(`${Game.clicked_TopCell_ID}`);
  topCell.appendChild(coin);

  // trigger the correct animation (animated coin route-length) for the placement row in all gameboard sizes
  let gameboard__height = document.getElementById('wrapper__gameboard').clientHeight;
  let cell__height = gameboard__height / (Game.gameboard_size_x + 1) * 10;
  let animation__length =  cell__height *  Game.coin_placement_row;
// animate coin
  coin.animate(
    [
      // keyframes
      { transform: 'translateY(0)' },
      { transform: `translateY(${animation__length}px)` },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
    }
  );

  // ? after placing coin animation, validate possible win and next turn
  // remove the coin with the animation after the animation time ended and place the coin on correct position
  setTimeout(
    () => {
      Placement_End();
    }, 
    1000
  ); 
  
  // console.log('Placement done.');
};

/* ====================
!      placement marks and notes 
            =================== */
function Placement_End() {
 // console.log('Entered End of Placement');

   //  first remove the coin from the top-cell to get rid of the animated coin
  document.getElementById(`${Game.clicked_TopCell_ID}`).firstChild.remove();

  // get the destination of the coin
  coin_destination = document.getElementById(`ID_C${Game.clicked_column}R${Game.coin_placement_row}`);
  
// set general properties
  coin_destination.style.opacity = '1';
  coin_destination.setAttribute('data-isPlayed', 'yes');

  // set player specific properties
  if (Game.playerIsOnTurn === 'left') {
    // place the coin as background image on the correct column (get the correct row/value from the decreased row counter)
    if (Game.player_Colour_Left === 'yellow') {
      coin_destination.classList.add('placedCoin__1');
      coin_destination.setAttribute('data-isPlayedFrom', 'player_1');
    } else {
      coin_destination.classList.add('placedCoin__2');
      coin_destination.setAttribute('data-isPlayedFrom', 'player_2');
    };
  } else {
    if (Game.player_Colour_Left === 'red') {
      coin_destination.classList.add('placedCoin__1');
      coin_destination.setAttribute('data-isPlayedFrom', 'player_1');
    } else {
      coin_destination.classList.add('placedCoin__2');
      coin_destination.setAttribute('data-isPlayedFrom', 'player_2');
    };
  };
  // decrease row counter so next placement can calculate correct row position
  Game.rowCounter[`C${Game.clicked_column}`]--;

  // invoke 
  Game.playerIsOnTurn === 'left'
    ? Player_1_Placement_Finish()
    : Player_2_Placement_Finish();
};

/* ===================
!     finish placement  player 1 
            =================== */
function Player_1_Placement_Finish() {
  //  invoke winning-validation for player 1 and if true invoke game-end function
  const valid_row = Row_Validator(1,  Game.coin_placement_row);
  const valid_column = validator__column(
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

  // if there are no more cells to  play invoke draw 
  if (Game.roundCounter === (Game.gameboard_size_x * Game.gameboard_size_y)) {
    Game_End_Screen(3);
    return;
  };

// if no win or draw proof if column is full and unlock the top-cells
  if (Game.Game_against_CPU === false) Unlock_TopCells();

  Column_Locking_Validation(false);

  //  next player is on turn
  Turning_PlayerIsOnTurn();

  // if game is against CPU invoke correct CPU-Level
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
};

/* ==================
!   finish placement player 2
          =================== */
function Player_2_Placement_Finish() {
  const valid_row = Row_Validator(2,  Game.coin_placement_row);
  const valid_column = validator__column(2,  Game.clicked_column, Game.coin_placement_row);
  const valid_diagonal = Diagonal_Validator(2, Game.clicked_column, Game.coin_placement_row);
  if (valid_row === true || valid_column === true || valid_diagonal === true) return;

  if (Game.roundCounter === (Game.gameboard_size_x * Game.gameboard_size_y)) {
    Game_End_Screen(3);
    return;
  }

  if (Game.Game_against_CPU === false) {
    Column_Locking_Validation(false);
    Unlock_TopCells();
  };

  Turning_PlayerIsOnTurn();
  Unlock_TopCells();
};
//#endregion

//#region 4) final informations and comments

/*
?                     Bonus Jobs to-do:

-) Make the Coin Images a variable _> User could choice between coin appearance 
-) Implement Classic and Personal style!
-) Save /Load Game function via saving cell-states in localStorage!
-) Write a CPU Heavy Algorhytmus!
-) Make it possible to switch from Game Mode to the Starting Screen to change Settings, Names etc...
-) Design a Starting Screen Animation to make it more interesting to play!  
-) Think about a other Design for the Page and the Gameboard!
                                                                                                                                                                                                                                                                                */
//#endregion

//#region 5) credits
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