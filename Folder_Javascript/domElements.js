/* ==============================
!         DOM-Elements for accesing in Javascript-Files 
        =============================== */

//#region Container & Wrapper
const header = document.getElementById("ID_Header");
const main_wrapper = document.getElementById("ID_MainWrapper");
const left_sidebar = document.getElementById("ID_LeftSidebarWrapper");
const gameboard = document.getElementById("ID_GameboardWrapper");
const right_sidebar = document.getElementById("ID_RightSidebarWrapper");
const footer = document.getElementById("ID_FooterWrapper");
//#endregion

//#region Text, Inputs, Images
const head_title = document.getElementById("ID_Head_Title");
const headline_top = document.getElementById("ID_Headline");
const headline_p = document.getElementById("ID_Header_p");
const player_1_headline = document.getElementById("ID_Player_1_Headline");
const player_1_name = document.getElementById("ID_Player_1_Name");
const player_1_svg = document.getElementById("ID_SVG_Player_1");
const player_2_headline = document.getElementById("ID_Player_2_Headline");
const player_2_name = document.getElementById("ID_Player_2_Name");
const player_2_svg = document.getElementById("ID_SVG_Player_2");
const start_button = document.getElementById("ID_Start_Button");
const play_against = document.getElementById("ID_Play_Against");
const choose_ki = document.getElementById("ID_Choose_KI");
const ki_level_dropdown_no = document.getElementById("ID_No");
const ki_level_dropdown_easy = document.getElementById("ID_Easy_Text");
const ki_level_dropdown_normal = document.getElementById("ID_Normal_Text");
const turn_text = document.getElementById("ID_h3_turnText");
const thinking_div = document.getElementById("ID_Thinking_Div");
//#endregion

//#region Settings menu
const settings_menu = document.getElementById("ID_Settings_Menu");
const settings_span = document.getElementById("ID_Setting_Span");
const info_h = document.getElementById("ID_Info");
const gameboard_size_button = document.getElementById(
  "ID_Gameboard_Size_Button"
);
const colour = document.querySelector(".Class_Colour_Toggle");
const toggle_colour_button = document.getElementById("ID_Toggle_Button");
const toggle_colour_slider = document.getElementById("ID_Colour_Slider");
const language_h = document.getElementById("ID_Language");
const language_menu = document.getElementById("ID_Language_Menu");
const select_deutsch = document.getElementById("ID_Deutsch");
const select_english = document.getElementById("ID_English");
const contact_h = document.getElementById("ID_Contact");
const credits_h = document.getElementById("ID_Credits");
const sound_h = document.getElementById("ID_Sound");
const sound_checkbox = document.getElementById("ID_Sound_Checkbox");
const stats = document.getElementById("ID_Stats");
const stats_easy = document.getElementById("ID_Stats_Easy");
const stats_normal = document.getElementById("ID_Stats_Normal");
const stats_reset_easy = document.getElementById("ID_Reset_Easy");
const stats_sum_easy = document.getElementById("ID_Stats_Summary_Easy");
const stats_reset_normal = document.getElementById("ID_Reset_Normal");
const delete_all = document.getElementById("ID_Delete_All");
const label_colour = document.getElementById("ID_Label_Colour");
//#endregion

//#region Global
// Counters to count wins if more Games are played
let count_wins_player_one = 0,
  count_wins_player_two = 0;

let player1_coins = [],
  player2_coins = [];
//#endregion
