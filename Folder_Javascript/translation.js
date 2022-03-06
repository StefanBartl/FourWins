//#region Table of Content
/*
!                  Four-Wins-Online Translation-JS-File
?                                     powered by
!                                      Stefan Bartl
!                        (WKDSteVIE / WKDMinerva)
?                                            2021                                                                                                                                                                        
?                  _______________________________                                                                                                                                                                                                  
!                                     Table of content              
 
 ?                          1) Setting Page Language                                                                                                                  
 ?                          2) Page Library                                                                  
                          
*/
//#endregion

//#region Open Jobs
/*
?                  Jobs To-do:

todo    -) 

?                  Finish
todo    -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
todo    -) Final formatation.
todo    -) Make sure all important is commented.
todo    -) Write a final Comment.

!                  Session progress
?-) 
*/
//#endregion

//#region 1) Translation-Manager

/* ===================
!     Detect Language and set it 
            =================== */
function Set_Page_Language() {
  // Detect Browser language, if it can't (i. g. restrictions) set English. Save information in Game Object
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
    // Invoke the translation with the getted language
    Translate_StartScreen(browserLanguage, false);
  }
};

/* ========================
!     Translate Page to setted Language 
            ======================== */
function Translate_StartScreen(language, byUser) {
  // console.log("Translate the Page to setted Language:", language, "Setted by User:", byUser);
  // Make sure browser triggered invokes are not executed if the language was setted manually anytime before
  const setted_language = localStorage.Language;

  if (byUser === true) {
    setted_language === "de" ? Deutsch() : English();
  } else {
    language === "de" ? Deutsch() : English();
  }

  // Never changing text
  credits_h.innerText = "Credits";
  sound_h.innerText = "Sound";

  // Make sure the dropdown menu is always selected with the actual language
  localStorage.getItem("Language") === "de"
    ? (document.getElementById("ID_Language_Menu").value = "Deutsch")
    : (document.getElementById("ID_Language_Menu").value = "English");
};

//#endregion

//#region Page-Library

/* ============
!     Library Deutsch 
            ============ */
function Deutsch() {
// console.log("Entered Deutsch library.");
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
player_2_name.placeholder = "CPU Einfach";
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
gameboard_h.innerText = "Spielfeldgröße";
gameboard_h.alt = "Spielfeldgröße";
gameboard_size_button.innerText = "Ändern";
gameboard_size_button.title = "Spielfeldgröße ändern!";
gameboard_size_button.alt = "Button zum ändern der Spielfeldgröße.";
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
play_against.innerText = "Gegen den Computer spielen?";
play_against.alt = "Gegen den Computer spielen?";
ki_level_dropdown_no.innerText = "Nein";
ki_level_dropdown_no.alt = "Nein";
ki_level_dropdown_easy.innerHTML = "CPU Einfach";
ki_level_dropdown_easy.alt = "Auswahl CPU Einfach";
ki_level_dropdown_normal.innerHTML = "CPU Normal";
ki_level_dropdown_normal.alt = "Auswahl CPU Normal";

// console.log("Page translated to Deutsch.");
};

/* ===========
!     Library English 
            =========== */
function English() {
// console.log("Entered English library");
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
player_2_name.placeholder = "CPU Easy";
start_button.innerText = "Start Game";
start_button.title = "Start Game!";
start_button.alt = "Start Game Button";
settings_menu.title = "Settings";
settings_menu.alt = "Settings";
info_h.innerText = "Instructions";
info_h.title = "To Instructions";
info_h.alt = "To Instructions";
gameboard_h.innerText = "Gameboard-Size";
gameboard_h.alt = "Gameboard-Size";
gameboard_size_button.innerText = "Change";
gameboard_size_button.title = "Change the size of the Gamebopard!";
gameboard_size_button.alt = "Button to change the size of the Gameboard.";
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
play_against.innerText = "Play against the CPU?";
play_against.alt = "Play agaiinst CPU";
ki_level_dropdown_no.innerText = "No";
ki_level_dropdown_no.alt = "Selection No";
ki_level_dropdown_easy.innerHTML = "CPU Easy";
ki_level_dropdown_easy.alt = "Selection Easy";
ki_level_dropdown_normal.innerHTML = "CPU Normal";
ki_level_dropdown_normal.alt = "Selection CPU Normal";

// console.log("Page translated to english.");
}; 
            
//#endregion