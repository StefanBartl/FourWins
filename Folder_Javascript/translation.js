//#region Table of Content
/*
!                  Four-Wins-Online Translation-JS-File
?                                     powered by
!                                      Stefan Bartl
!                        (WKDSteVIE / WKDMinerva)
?                                            2021                                                                                                                                                                        
?                  _______________________________                                                                                                                                                                                                  
!                                     Table of content              
 
 ?                             1) Translation manager
.                                     - Set page language
.                                     - Translate start-screen                                                                                                             
 ?                              2) Page Library
.                                     - Deutsch
.                                     - English          
?                  Javascript - what a wonderful language!

*/
//#endregion

//#region Translation Manager

     /*  ========================  
!         ===  Detect & set language  ===
          ========================  */
function Set_Page_Language() {

  //? ===  Detect Browser language, if it can"t (i. g. restrictions) set English. Save information in Game Object ===
  
  // console.log("Setting Page Language...");

  const LanguageIsSettedByUser = localStorage.LanguageIsSetttedByUser;
  const language = localStorage.Language;
  if (LanguageIsSettedByUser == "true") {
    Translate_StartScreen(language, true);
    Game.Language = language;
    Game.LanguageIsSettedByUser = true;
  } else if (LanguageIsSettedByUser !== "true") {
    const browserLanguage =
      navigator.language || navigator.userLanguage || "English";
    Game.Language = browserLanguage;
    Game.LanguageIsSetttedByUser = false;
    // invoke the translation with the getted language
    Translate_StartScreen(browserLanguage, false);
  }
};

     /*  ===================  
!         ===  Translate page  ===
          ===================  */
function Translate_StartScreen(language, byUser) {

  //? === Make sure browser triggered invokes are not executed if the language was setted by user anytime before ===

  // console.log("Translate the Page to setted Language:", language, "Setted by User:", byUser);

  const setted_language = localStorage.Language;

  if (byUser === true) {
    setted_language === "de" ? Deutsch() : English();
  } else {
    language === "de" ? Deutsch() : English();
  }

  // never changing text
  credits_h.innerText = "Credits";
  sound_h.innerText = "Sound";

  // make sure the dropdown menu is always selected with the actual language
  localStorage.getItem("Language") === "de"
    ? (document.getElementById("select__language").value = "Deutsch")
    : (document.getElementById("select__language").value = "English");
};

//#endregion

//#region Page Library

     /*  ===================  
!         ===  Deutsch library  ===
          ===================  */
function Deutsch() {

// console.log("Entered Deutsch library.");

head_title.innerText = "+++ 4-Gewinnt +++";
headline.innerText = "Online 4-Gewinnt";
p__headline.innerText = "Spiele gegen deine Freunde oder gegen die CPU!";
player_1_headline.innerText = "Wähle einen Namen";
player_1_name.placeholder = "Spieler 1";
player_1_name.title = "Name Spieler 1";
player_1_svg.title = "Speichere den Namen für spätere Spiele!";
player_2_headline.innerText = "Wähle einen Namen";
player_2_name.placeholder = "CPU Einfach";
player_2_name.title = "Name Spieler 2";
player_2_svg.title = "Speichere den Namen für spätere Spiele!";
start_button.innerText = "Spiel Starten";
start_button.title = "Spiel Starten!";
settings_menu_headline.innerText = "Einstellungsmenu";
info_h.innerText = "Spielanleitung";
info_h.title = "Zur Spielanleitung";
gameboard_h.innerText = "Spielfeldgröße";
gameboard_h.alt = "Spielfeldgröße";
gameboard_size_button.innerText = "Ändern";
gameboard_size_button.title = "Spielfeldgröße ändern!";
label_colour.innerText = "Farbwahl";
colour.title = "Wähle eine Farbe für Spieler 1!";
sound_checkbox.title = "Sound ON / OFF";
language_h.innerText = "Spracheinstellung";
language_menu.title = "Wähle deine Sprache!";
aniToggle__h.innerText = "Animationen";
aniToggle_checkbox.title = "Schalte die Animation auf/ab ";
contact_h.innerText = "Kontakt";
contact_h.title = "Zu den Kontaktmöglichkeiten";
credits_h.title = "Zu den Credits";
stats_sum_easy.innerText = "Einfach";
stats.innerText = "Statistiken gegen den CPU";
stats_easy.title = "Statistik gegen CPU Easy";
stats_normal.title = "Statistik gegen CPU Normal";
stats_reset_easy.innerHTML = "Zurücksetzen";
stats_reset_easy.title = "Zum zurücksetzen klicken!";
stats_reset_normal.innerHTML = "Zurücksetzen";
stats_reset_normal.title = "Zum zurücksetzen klicken!";
delete_all.innerText = "Alle Daten löschen";
delete_all.title = "Lösche alle Daten!";
choose_ki.title = "Wähle deinen Gegner!";
play_against.innerText = "Gegen den Computer spielen?";
ki_level_dropdown_no.innerText = "Nein";
ki_level_dropdown_easy.innerHTML = "CPU Einfach";
ki_level_dropdown_normal.innerHTML = "CPU Normal";

// console.log("Page translated to Deutsch.");
};

     /*  ===================  
!         ===  English library  ===
          ===================  */
function English() {

// console.log("Entered English library");

head_title.innerText = "+++ 4-Wins +++";
headline.innerText = "Four Wins";
p__headline.innerText = "Play against friends or CPU!";
player_1_headline.innerText = "Choose Name";
player_1_name.placeholder = "Player 1";
player_1_name.title = "Player 1 Name";
player_1_svg.title = "Save Name for later Games!";
player_2_headline.innerText = "Choose Name";
player_2_name.title = "Player 2 Name";
player_2_name.placeholder = "CPU Easy";
start_button.innerText = "Start Game";
start_button.title = "Start Game!";
settings_menu_headline.innerText = "Settings-Menu";
info_h.innerText = "Instructions";
info_h.title = "To Instructions";
gameboard_h.innerText = "Gameboard-Size";
gameboard_size_button.innerText = "Change";
gameboard_size_button.title = "Change the size of the Gamebopard!";
colour.title = "Choose Colour for Player 1!";
label_colour.innerText = "Choose Colour";
sound_checkbox.title = "Sound ON / OFF";
language_h.innerText = "Language";
language_menu.title = "Choose your Language!";
aniToggle__h.innerText = "Animations";
aniToggle_checkbox.title = "Turn on/off animations";
contact_h.innerHTML = "Contact";
contact_h.title = "To Contact-Page";
credits_h.title = "To Credits";
stats.innerText = "Statistics against CPU";
stats_sum_easy.innerText = "Easy";
stats_easy.title = "Statistics against CPU Easy";
stats_normal.title = "Statistics against CPU Normal";
stats_reset_easy.innerHTML = "Reset";
stats_reset_easy.title = "Click to reset!";
stats_reset_normal.innerHTML = "Reset";
stats_reset_normal.title = "Click to reset!";
delete_all.innerText = "Delete all Data";
delete_all.title = "Delete all Data!";
choose_ki.title = "Choose your enemy!";
play_against.innerText = "Play against the CPU?";
ki_level_dropdown_no.innerText = "No";
ki_level_dropdown_easy.innerHTML = "CPU Easy";
ki_level_dropdown_normal.innerHTML = "CPU Normal";

// console.log("Page translated to english.");
}; 
            
//#endregion