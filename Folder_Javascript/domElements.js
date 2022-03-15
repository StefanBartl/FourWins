//#region Table of Content
/*
!                  Four-Wins-Online DOM-Elements-JS-File
?                                        powered by
!                                        Stefan Bartl
!                           (WKDSteVIE / WKDMinerva)
?                                               2021             
?                  ___________________________________                                                                                                                                                                                                  
!                                        Table of content              
 
?                                 1) Container & Wrapper                                                                                                                              
?                                 2) Text, Inputs, Images,...
?                                 3) Settings-Menu
?                                 4) Global Counters                                                                                                                                                    
*/
//#endregion

//#region Open Jobs
/*
?                  Jobs To-do:
todo        -)

?                  Finish
todo        -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
todo        -) Final formatation.
todo        -) Make sure all important is commented.
todo        -) Write a final Comment.
!                             Session progress
?-) 

*/
//#endregion

//#region 1) container & wrapper
const header = document.querySelector("header");
const main_wrapper = document.getElementById("section__main");
const left_sidebar = document.getElementById("wrapper__leftSidebar");
const gameboard = document.getElementById("wrapper__gameboard");
const right_sidebar = document.getElementById("wrapper__rightSidebar");
//#endregion

//#region 2) text, inputs, images
const head_title = document.getElementById("title__page");
const headline = document.getElementById("headline");
const p__headline = document.getElementById("p__headline");
const player_1_headline = document.getElementById("player1__headline");
const player_1_name = document.getElementById("input__player1_name");
const player_1_svg = document.getElementById("player1_name_svg");
const player_2_headline = document.getElementById("player2__headline");
const player_2_name = document.getElementById("input__player2_name");
const player_2_svg = document.getElementById("player2_name_svg");
const start_button = document.getElementById("button__start");
const play_against = document.getElementById("choosing_cpu_headline");
const choose_ki = document.getElementById("select__choosing_cpu");
const ki_level_dropdown_no = document.getElementById("cpu_opt_no");
const ki_level_dropdown_easy = document.getElementById("cpu_easy");
const ki_level_dropdown_normal = document.getElementById("cpu_normal");
const turn_text = document.getElementById("h__turnDiv");
const thinking_div = document.getElementById("div__thinking");
//#endregion

//#region 3) settings-menu
const settings_menu = document.getElementById("section__settings_menu");
const settings_menu_headline = document.getElementById("settings_menu__headline");
const settings_span = document.getElementById("settings_span");
const info_h = document.getElementById("info_h");
const gameboard_h = document.getElementById("settings_gameboard_h");
const gameboard_size_button = document.getElementById("settings_gameboard_button");
const colour = document.getElementById("container__toggleColour");
const toggle_colour_button = document.getElementById("button__toggle");
const toggle_colour_slider = document.getElementById("colour_slider");
const language_h = document.getElementById("h__language");
const language_menu = document.getElementById("select__language");
const aniToggle__h = document.getElementById("h__aniToggle");
const aniToggle_checkbox = document.getElementById("checkbox__aniToggle");
const contact_h = document.getElementById("h__contact");
const credits_h = document.getElementById("h__credits");
const sound_h = document.getElementById("h__sound");
const sound_checkbox = document.getElementById("checkbox__sound");
const stats = document.getElementById("h__stats");
const stats_easy = document.getElementById("stats_easy");
const stats_normal = document.getElementById("stats_normal");
const stats_reset_easy = document.getElementById("reset__easy");
const stats_sum_easy = document.getElementById("h__stats_easy");
const stats_reset_normal = document.getElementById("reset__normal");
const delete_all = document.getElementById("button__delete");
const label_colour = document.getElementById("colour_h");
//#endregion

//#region 4) global counters
// Counters to count wins if more Games are played
let count_wins_player_one = 0,
  count_wins_player_two = 0;

let player1_coins = [],
  player2_coins = [];
//#endregion
