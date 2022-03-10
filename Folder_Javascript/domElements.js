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

//#region 1) Container & Wrapper
const header = document.querySelector('header');
const main_wrapper = document.getElementById('main__section');
const left_sidebar = document.getElementById('leftSidebar__wrapper');
const gameboard = document.getElementById('wrapper__gameboard');
const right_sidebar = document.getElementById('sidebarRight__wrapper');
const footer = document.getElementById('footer');
//#endregion

//#region 2) Text, Inputs, Images
const head_title = document.getElementById('page__title');
const headline = document.getElementById('headline');
const headline_p = document.getElementById('headline_p');
const player_1_headline = document.getElementById('player1__headline');
const player_1_name = document.getElementById('player1_name__input');
const player_1_svg = document.getElementById('player1_name_svg');
const player_2_headline = document.getElementById('player2__headline');
const player_2_name = document.getElementById('player2_name__input');
const player_2_svg = document.getElementById('player2_name_svg');
const start_button = document.getElementById('start__button');
const play_against = document.getElementById('choosing_cpu_headline');
const choose_ki = document.getElementById('choosing_cpu__select');
const ki_level_dropdown_no = document.getElementById('cpu_opt_no');
const ki_level_dropdown_easy = document.getElementById('cpu_easy');
const ki_level_dropdown_normal = document.getElementById('cpu_normal');
const turn_text = document.getElementById('h__turnDiv');
const thinking_div = document.getElementById('div__thinking');
//#endregion

//#region 3) Settings menu
const settings_menu = document.getElementById('settings_menu__section');
const settings_menu_headline = document.getElementById('settings_menu__headline');
const settings_span = document.getElementById('settings_span');
const info_h = document.getElementById('info_h');
const gameboard_h = document.getElementById('settings_gameboard_h');
const gameboard_size_button = document.getElementById('settings_gameboard_button');
const colour = document.querySelector('.container_colour_toggle');
const toggle_colour_button = document.getElementById('button__toggle');
const toggle_colour_slider = document.getElementById('colour_slider');
const language_h = document.getElementById('h__language');
const language_menu = document.getElementById('select__language');
const contact_h = document.getElementById('h__contact');
const credits_h = document.getElementById('h__credits');
const sound_h = document.getElementById('h__sound');
const sound_checkbox = document.getElementById('checkbox__sound');
const stats = document.getElementById('h__stats');
const stats_easy = document.getElementById('stats_easy');
const stats_normal = document.getElementById('stats_normal');
const stats_reset_easy = document.getElementById('reset__easy');
const stats_sum_easy = document.getElementById('h__stats_easy');
const stats_reset_normal = document.getElementById('reset__normal');
const delete_all = document.getElementById('button__delete');
const label_colour = document.getElementById('colour_h');
//#endregion

//#region 4) Global Counters
// Counters to count wins if more Games are played
let count_wins_player_one = 0,
  count_wins_player_two = 0;

let player1_coins = [],
  player2_coins = [];
//#endregion
