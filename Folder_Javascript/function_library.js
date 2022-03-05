//#region Table of Content
/*
!                                Four-Wins-Online Function_Library-JS-File
?                                                         powered by
!                                                          Stefan Bartl
!                                               (WKDSteVIE / WKDMinerva)
?                                                               2021                                                                                                                                                                        
?                               ________________________________________                                                                                                                                                                                                  
!                                                         Table of content              
        open jobs
                                                       1) Helper Functions                                  
                                                                                                            
                                                        - Insert Element after Element                      
                                                                                                            
                                                        - Add choosing Animation                            
                                                                                                            
                                                        - Remove choosing Animation                          

                                                        - Lock Top Cells                                    
                                                                                                            
                                                        - Unlock Top Cells                                  
                                                                                                                
                                                        - "Thinking"-Effect           

                                                        - Get only unique Values from Array                 
                                                                                                                                                                                                                                                                                            
                                                        - Get a random Int number               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                                        - Push values to Local Storage                      
                                                                                                                
                                                        - Swap 2 Classes by 2 events on 1 Element           
                                                                                                            
                                                        - Change which Player is on turn                   
                                                                                                            
                                                        - Game Screen                                      
                                                                                                            
                                                        - Start Screen                                      
                                                                                                            
                                                        - Stats                                             

                                                        - Update Stats                                      

                                                        - New Window                                        
                                                                                                                                                                                                                                                                                            
                                                        - Correct Sound Setting                             
                                                                                                            
                                                        - Create new DOM Element                            
                                                                                                            
                                                        - Set attributes for Element                        
                                                                                                            
                                                        - Set attributes for Elements                       
                                                                                                                
                                                        - Fireworks                                                                                                                                                                    
                                                                                                   
                                                2) Callback, Promises, Async / Awair        

                                                2) My Javascript-Coding-Guideline                                                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                              */

//#endregion

//#region Open Jobs
/*
?                               Jobs To-do:

todo        -) Gameboard-Sizing Transition by change?
todo        -) Saving via local storage

?                               Finish
todo        -) Take a look at the Bonus Jobs - maybe you have enough passion to do one :-)
todo        -) Final formatation.
todo        -) Make sure all important is commented.
todo        -) Write a final Comment.

!                             Session progress
?-) 

                                                                                                                                                                                                                                                                                                                              */
//#endregion

//#region 1) Helper Functions

/* ============================
 !     Insert Element after Reference Node
         ============================ */
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

/* ========================
 !    Adding the Choosing-Animation 
        ========================= */
function Add_Choosing_Ani(column) {
  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName("Class_TopCells");

  column -= 1;

  if (Game.playerIsOnTurn === "left" && Game.player_Colour_Left === "yellow") {
    topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_1");
  } else if (
    Game.playerIsOnTurn === "left" &&
    Game.player_Colour_Left === "red"
  ) {
    topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_2");
  } else if (
    Game.playerIsOnTurn === "right" &&
    Game.player_Colour_Left === "yellow"
  ) {
    topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_2");
  } else if (
    Game.playerIsOnTurn === "right" &&
    Game.player_Colour_Left === "red"
  ) {
    topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_1");
  }
};

/* =========================
!     Remove the Choosing-Animation 
        ========================== */
function Remove_Choosing_Ani(column) {
  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName("Class_TopCells");

  column -= 1;

  if (Game.playerIsOnTurn === "left") {
    topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_1");
    topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_2");
  } else {
    topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_1");
    topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_2");
  }
};

/* ===============
!      Lock all Top-Cells 
         =============== */
function Lock_TopCells() {
  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName("Class_TopCells");

  for (let topCell of topCellsArray) {
    topCell.style.cursor = "none";
    topCell.style = "pointer-events:none";
  }
};

/* ================
!      Unlock all Top-Cells 
         ================ */
function Unlock_TopCells() {
  // Get all Top-Cells
  const topCellsArray = document.getElementsByClassName("Class_TopCells");

  for (let topCell of topCellsArray) {
    topCell.style.cursor = "pointer";
    if (Game.rowCounter[`${Game.clicked_column}`] >= 3) topCell.style = "pointer-events: all";
  }
};

/* ======================
!      Simulate a "Thinking-Effect" 
         ====================== */
function Thinking_Effect(invokerKI, valid_number) {
  // First make sure there is no "Thinking" Div attached
  if (!document.getElementById("ID_Thinking_Div")) {
    // If it isn't create DOM ELement for the thinking dots in the turning DIV
    const thinker_div = document.createElement("div");
    thinker_div.classList.add("Class_Thinking");
    thinker_div.id = "ID_Thinking_Div";
    document.getElementById("ID_Turn_Div").appendChild(thinker_div);
    // Set a Intervall which change the dots in the DOM Element. The changing is realised with setTiemouts, which fakes an text animation effect. This happens all 2 seconds again.
    window.thinking = setInterval(() => {
      const dot1 = setTimeout(() => {
        thinker_div.innerText = ".";
      }, 100);
      const dot2 = setTimeout(() => {
        thinker_div.innerText = ". .";
      }, 500);
      const dot3 = setTimeout(() => {
        thinker_div.innerText = ". . .";
      }, 1000);
      const dot4 = setTimeout(() => {
        thinker_div.innerText = ".....";
      }, 1500);
    }, 2000);
  }
  
  // If the invoker is KI do additional tasks...
  if (invokerKI === true) {
    // Get a random number
    const random_number = getRandomInt(7);
    // Multiplicy it with 1000 to get a correct time value to invoking setTimeout
    let thinking_duration = random_number * 1000;
    // If the random time was under 2 (seconds), set it to 2 seconds to make sure "thinking" is not "too fast"
    if (thinking_duration < 2000) thinking_duration = 2000;
    // Invoke Placement with the given valid number and clear the setted interval after the "thinking" time.
    setTimeout(() => {
      KI_Placement(valid_number);
      clearInterval(thinking);
      // Remove the "dots"-Div container from the turning Div if it exists
      if (document.getElementById("ID_Thinking_Div")) {
        document.getElementById("ID_Thinking_Div").remove();
        clearInterval(window.thinking);
      }
    }, thinking_duration);
  }
};

/* ======================
!     Get unique values from Array
        ======================= */
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
  // var unique = array.filter(onlyUnique);
};

/* ============================
!       Get a random Integer exklusive value
          ============================ */
function getRandomInt(max) {
return Math.floor(Math.random() * max);
};
        
/* ============================
!     Get a random Integer within 2 values
        ============================= */
function getRandomIntNoZero(minvalue, maxvalue) {
    return minvalue + Math.floor(Math.random() * (maxvalue - minvalue + 1));
  };

/* =====================
!     Push values to local Storage 
        ====================== */
function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event) {
  document
    .getElementById(`${IDfromTrigger}`)
    .addEventListener(`${event}`, () => {
      localStorage.setItem(
        `${key}`,
        document.getElementById(`${IDfromValue}`).value
      );
    });
};

/* ==========================
!     Swap between 2 Classes by Events 
        =========================== */
function Swap_Two_Classes_by_Events(
  element_ID,
  event_1,
  event_2,
  first_Class,
  second_Class
) {
  document
    .getElementById(`${element_ID}`)
    .addEventListener(`${event_1}`, () => {
      document
        .getElementById(`${element_ID}`)
        .classList.remove(`${second_Class}`);
      document.getElementById(`${element_ID}`).classList.add(`${first_Class}`);
    });
  document
    .getElementById(`${element_ID}`)
    .addEventListener(`${event_2}`, () => {
      document
        .getElementById(`${element_ID}`)
        .classList.remove(`${first_Class}`);
      document.getElementById(`${element_ID}`).classList.add(`${second_Class}`);
    });
};

/* =================
!     Changing Players turn 
        ================== */
function Turning_PlayerIsOnTurn() {
  // Change Player
  Game.playerIsOnTurn === "left"
    ? (Game.playerIsOnTurn = "right")
    : (Game.playerIsOnTurn = "left");

  // Assign text message to Player and with the correct language
  if (Game.Language === "de") {
    // Deutsch

    if (Game.playerIsOnTurn === "left") {
      document.getElementById(
        "ID_h3_turnText"
      ).innerText = `Dein Zug, ${Game.Player_One_Name}`;
    } else if (
      Game.playerIsOnTurn === "right" &&
      Game.Game_against_KI === false
    ) {
      document.getElementById(
        "ID_h3_turnText"
      ).innerText = `Du bist dran, ${Game.Player_Two_Name}`;
    } else {
      document.getElementById(
        "ID_h3_turnText"
      ).innerText = `${Game.Player_Two_Name} denkt nach...`;
    }
  } else {
    // English

    if (Game.playerIsOnTurn === "left") {
      document.getElementById(
        "ID_h3_turnText"
      ).innerText = `Your turn, ${Game.Player_One_Name}`;
    } else if (
      Game.playerIsOnTurn === "right" &&
      Game.Game_against_KI === false
    ) {
      document.getElementById(
        "ID_h3_turnText"
      ).innerText = `Do you best, ${Game.Player_Two_Name}`;
    } else {
      document.getElementById(
        "ID_h3_turnText"
      ).innerText = `${Game.Player_Two_Name}'s is thinking...`;
    }
  }

  // Add correct positioning Class to div
  if (Game.playerIsOnTurn === "left") {
    document.getElementById("ID_Turn_Div").classList.remove("Class_Right_Pos");
    document.getElementById("ID_Turn_Div").classList.add("Class_Left_Pos");
  } else {
    document.getElementById("ID_Turn_Div").classList.remove("Class_Left_Pos");
    document.getElementById("ID_Turn_Div").classList.add("Class_Right_Pos");
  }

  // If there was a "Player thinking animation", end it, remove the Div Container from DOM, trigger the same effect for the other player. (KI Thinking is invoked in the KI-Function because of shorter delay)
  if (Game.Game_against_KI === false) {
    if (document.getElementById("ID_Thinking_Div")) {
      document.getElementById("ID_Thinking_Div").remove();
      clearInterval(window.thinking);
      setTimeout(Thinking_Effect, 8000);
    }
  }
  // Nearly the same in Game against KI, until no new timer is setted, because this makes the KI after his placement.
  if (Game.Game_against_KI === true) {
    if (document.getElementById("ID_Thinking_Div")) {
      document.getElementById("ID_Thinking_Div").remove();
      clearInterval(window.thinking);
    }
  }
}

/* ================
!     Create Starting Stats 
        ================= */
function Stats() {
  let value = localStorage.KI_Easy_Wins || 0;
  document.getElementById("ID_Easy_1").innerText = value;
  value = localStorage.KI_Easy_CPUWins || 0;
  document.getElementById("ID_Easy_3").innerText = value;
  value = localStorage.KI_Easy_Draws || 0;
  document.getElementById("ID_Easy_2").innerText = value;
  value = localStorage.KI_Normal_Wins || 0;
  document.getElementById("ID_Normal_1").innerText = value;
  value = localStorage.KI_Normal_CPUWins || 0;
  document.getElementById("ID_Normal_3").innerText = value;
  value = localStorage.KI_Normal_Draws || 0;
  document.getElementById("ID_Normal_2").innerText = value;
}

/* ========== 
!     Update Stats
        =========== */
function Update_Stats(winning_player) {
  // console.log("Updated Stats.");
  // To reduce repetition only the KI Easy section is commented out. It's basically the same in KI Normal.
  let value;
  // Easy Stats
  if (Game.KI_Level === "Easy") {
    //   if Player wins           Get value from storage or set to 0; increase value;  update storage with increased value; .....
    if (winning_player === 1) {
      value = localStorage.KI_Easy_Wins || 0;
      value++;
      localStorage.KI_Easy_Wins = value;
      // ...and set new value in Settings-Stats-Menu if it exists;
      if (document.getElementById("ID_Easy_1"))
      document.getElementById("ID_Easy_1").innerText = value;
    }
    //     if CPU Wins...
    if (winning_player === 2) {
      value = localStorage.KI_Easy_CPUWins || 0;
      value++;
      localStorage.Easy_CPUWins = value;
      if (document.getElementById("ID_Easy_3"))
      document.getElementById("ID_Easy_3").innerText = value;
    }
    //     if it is a draw...
    if (winning_player === 3) {
      value = localStorage.KI_Easy_Draws || 0;
      value++;
      localStorage.Easy_Draws = value;
      if (document.getElementById("ID_Easy_2"))
      document.getElementById("ID_Easy_2").innerText = value;
    }
  }
  // Normal Stats
  else if (Game.KI_Level === "Normal") {
    if (winning_player === 1 && Game.KI_Level === "Normal") {
      value = localStorage.KI_Normal_Wins || 0;
      value++;
      localStorage.KI_Normal_Wins = value;
      if (document.getElementById("ID_Normal_1"))
      document.getElementById("ID_Normal_1").innerText = value;
    }
    if (winning_player === 2 && Game.KI_Level === "Normal") {
      value = localStorage.KI_Normal_CPUWins || 0;
      value++;
      localStorage.Normal_CPUWins = value;
      if (document.getElementById("ID_Normal_2"))
      document.getElementById("ID_Normal_3").innerText = value;
    }
    if (winning_player === 3 && Game.KI_Level === "Normal") {
      value = localStorage.KI_Normal_Draws || 0;
      value++;
      localStorage.Normal_Draws = value;
      if (document.getElementById("ID_Normal_3"))
      document.getElementById("ID_Normal_2").innerText = value;
    }
  }
  // Enough space for a unbeatable level ??? :-)
}

/* ==============================================
!     Create own Notification / Alert /  Prompt / Confirm - Windows 
        =============================================== */
function New_Window(options) {
  // console.log("Entered New Window function.");

  // Set up parameter list
  const _id = options.ID,
    _name = options.Name,
    _text = options.Text,
    _alert = options.Alert,
    _confirm = options.Confirm,
    _prompt = options.Prompt,
    _variable = options.Variable;

  // Create all base Elements
  const window = document.createElement("div");
  window.id = _id;
  window.classList.add("Class_Window");
  window.draggable = true;

  if (_alert === true) {
    window.innerText = "Alert Window";
  } else if (_confirm === true) {
    window.innerText = "Confirm Window";
  } else if (_prompt === true) {
    window.innerText = "Prompt Window";
  } else {
    window.innerText = "Notification Window";
  }

  const inner_window = document.createElement("div");
  inner_window.classList.add("Class_Inner_Window");
  const headline = document.createElement("h3");
  headline.innerText = _name;

  const textfield = document.createElement("p");
  textfield.innerText = _text;

  // Create OK Button
  const button_div = document.createElement("div");
  button_div.classList.add("Class_Buttons_Div");
  const confirm_button = document.createElement("button");
  confirm_button.classList.add("Class_Window_Buttons");
  confirm_button.innerText = "OK";
  confirm_button.addEventListener("click", () => {
    window.remove();
    if (_confirm === true) {
      Windows[_variable] = true;
    } else if (_alert === true) {
      Windows[_variable] === true;
    } else if (_prompt === true) {
      Windows[_variable] === true;
    }
  });

  // Append it
  inner_window.appendChild(headline);
  inner_window.appendChild(textfield);
  inner_window.appendChild(button_div);

  // Create Cancel Button to make Confirm-Window
  if (_confirm === true || _prompt === true) {
    const cancel_button = document.createElement("button");
    cancel_button.innerText = "Cancel";
    cancel_button.addEventListener("click", () => {
      window.remove();
      if (_confirm === true) {
        Windows[_variable] = false;
      } else if (_prompt === true) {
        Windows[_variable] === false;
      }
    });
    button_div.appendChild(cancel_button);
  }
  // Invoke-Example Confirm: New_Window({ID: "ID_Test_Window", Name: "Test Window", Text: "Test Test Test", Confirm: true, Variable: "Tester"}); Find Confirm Boolean: Windows.Tester

  button_div.appendChild(confirm_button);
  window.appendChild(inner_window);
  document.body.appendChild(window);

  // Create Input-Text and add it
  if (_prompt === true) {
    const user_input = document.createElement("input");
    user_input.type = "text";
    inner_window.insertBefore(user_input, inner_window.children[2]);
    confirm_button.addEventListener("click", () => {
      window.remove();
      Windows[_variable] = user_input.value;
      // Invoke Example Prompt: New_Window({ID: "ID_Test_Window", Name: "Test Window", Text: "Test Test Test", Prompt: true, Variable: "Tester"}); Find Input value: Windows.Tester
    });
  }

  /*
                                                Info: 
 To know if User clicked "Confirm" or Cancel, you need a variable outside of the function which can be manipulated by the Event-Listeners. 
 --> Create an empty Windows{} Object. You find the "returns" than in the Windows.[variable]. You also can change the Event-Listeners for your needs.

 */

  //#region CSS for the Windows-Function:
  /*
  CSS: 
.
.Class_Window{
   min-height: 30vh;
   max-height: 75vh;
   width: 50%;
   z-index: 10;
   position: absolute;
   top: 10%;
   left: 25%;
   display: grid;
   grid: 1rem auto 1rem / 1fr;
   justify-items:center;
   text-align: center;
   background-color: grey;
   border: solid 1px black;
   font-size:xx-small;
   color: white;
   text-align: center;
   }

.Class_Inner_Window{
   width:  calc(100% - 2rem);
   display: grid;
   grid:  2rem auto 4rem / 1fr;
   max-block-size: 65vh;
   justify-items: center;
   align-items: center;
   background-color: white;
   color: black;
   border: solid 1px black;
   font-size: small;
}

.Class_Inner_Window p {
   align-self: center;
   margin-top: 2rem;
   height: 100%;
   overflow: scroll;  
   
}

.Class_Inner_Window input{
   height: 2rem;
   width: 60%;
   background-color: darkgray;
   text-align: center;
   border: solid 1px black;
}

.Class_Buttons_Div {
   display: flex;
   gap: 1rem;
   height: 2rem;
}

.Class_Inner_Window button{
   width: 5rem;
   height: 2rem;
   border: solid 1px black;
}
 */
  //#endregion

  // console.log("New Window created.");
}

/* ====================
!     Sound Settings Validation 
        ===================== */
function Correct_Sound_Setting() {
  // Make sure, User prefered Sound-Setting is also shown in the Settings-Menu after closed and reopened window
  const sound_checkbox = document.getElementById("ID_Sound_Checkbox");
  if (localStorage.Sound === "false" && sound_checkbox.checked === true) {
    sound_checkbox.click();
    Game.Sound = false;
  }
  if (localStorage.Sound === "true" && sound_checkbox.checked === false) {
    sound_checkbox.click();
    Game.Sound = true;
  }
}

/* ==================
!     Create new Gameboard
        ================== */
function Create_Gameboard(sizeX, sizeY){
  //console.log("Given",  sizeX, "x", sizeY, "to create a gameboard.");

  // Remove the old Gameboard cells if existing
 if(document.getElementById("ID_GameboardWrapper")){

const columnsArray = document.querySelectorAll(".Class_Columns");
const topCellsArray = document.querySelectorAll("Class_TopCells");
const cellsArray = document.querySelectorAll("Class_Cells");
for(column of  columnsArray) column.remove();
for(topCell of topCellsArray) topCell.remove();
for(cells of cellsArray) cells.remove();

  // Create Columns
  for (let columns = 1; columns <= sizeX; columns++) {
    // Create the Column Wrappers
    let column = document.createElement("div");
    column.classList.add("Class_Columns");
    column.id = `ID_Column${columns}`;
    document.getElementById("ID_GameboardWrapper").appendChild(column);
  };

  //Create Top Cells
  for (let column = 1; column <= sizeX; column++) {
    // Create the Top Cells
    let topcell = document.createElement("div");
    topcell.classList.add("Class_TopCells");
    topcell.id = `ID_C${column}R0`;
    topcell.setAttribute("data-column", column);
    document.getElementById(`ID_Column${column}`).appendChild(topcell);
    // Remove the leftz border of the first TopCell (styling issues)
    document.getElementById('ID_C1R0').style.borderLeft = "none"; 
        
        // Create the Cells
        for (let row = 1; row <= sizeY ; row++) {
          let cell = document.createElement("div");
          cell.classList.add("Class_Cells");
          cell.id = `ID_C${column}R${row}`;
          document.getElementById(`ID_Column${column}`).appendChild(cell);
        };
  };

  Game.gameboard_size_x = sizeX;
  Game.gameboard_size_y = sizeY;
return
};




  //Create a new Gameboard 
  // Create Wrapper
  const new_gameboard_wrapper = document.createElement("div");
  new_gameboard_wrapper.classList.add("Class_GameboardWrapper");
  new_gameboard_wrapper.id = "ID_GameboardWrapper";
  Game.state !== "InGame"
    ? new_gameboard_wrapper.setAttribute("data-ingame", "no")
    : new_gameboard_wrapper.setAttribute("data-ingame", "yes");

  if(Game.state === "Game End"){
document.getElementById("ID_Game_End_Container").appendChild(document.getElementById("ID_GameboardWrapper"));
document.getElementById("ID_GameboardWrapper").classList.add("Class_Gameboard_End");
document.getElementById("ID_GameboardWrapper").setAttribute("data-ingame", "no");
 // console.log("Appended to Game End Container!");
  } else  
  {
    insertAfter(left_sidebar, new_gameboard_wrapper); 
   // console.log("Appended to left sidebar");
};

  // Create Columns
  for (let columns = 1; columns <= sizeX; columns++) {
    // Create the Column Wrappers
    let column = document.createElement("div");
    column.classList.add("Class_Columns");
    column.id = `ID_Column${columns}`;
    document.getElementById("ID_GameboardWrapper").appendChild(column);
  };

  //Create Top Cells
  for (let column = 1; column <= sizeX; column++) {
    // Create the Top Cells
    let topcell = document.createElement("div");
    topcell.classList.add("Class_TopCells");
    topcell.id = `ID_C${column}R0`;
    topcell.setAttribute("data-column", column);
    document.getElementById(`ID_Column${column}`).appendChild(topcell);
        // Remove the leftz border of the first TopCell (styling issues)
        document.getElementById('ID_C1R0').style.borderLeft = "none";

        // Create the Cells
        for (let row = 1; row <= sizeY ; row++) {
          let cell = document.createElement("div");
          cell.classList.add("Class_Cells");
          cell.id = `ID_C${column}R${row}`;
          document.getElementById(`ID_Column${column}`).appendChild(cell);
        };
  };

  Game.gameboard_size_x = sizeX;
  Game.gameboard_size_y = sizeY;
  //console.log("Gameboard with",  sizeX, "x", sizeY, "created.");

};

/* =============
!     Creator-Function
        ============== */
function Create_DOM_Element(options, arrayOne, arrayTwo) {
  // console.log("Entered Creator function.");

  // Define the possible Parameter-List with the associated variables declared
  const _parentID = options.ParentID,
    _element = options.Element,
    _type = options.Type,
    _id = options.ID,
    _class = options.Class,
    _text = options.Text,
    _for = options.For,
    _title = options.Title,
    _alt = options.Alt,
    _src = options.Src,
    _width = options.Width,
    _height = options.Height,
    _aspectRatio = options.AspectRatio,
    _min = options.Min,
    _max = options.Max,
    _value = options.Value,
    _placeholder = options.Placeholder,
    _optionsArray = arrayOne,
    _valuesArray = arrayTwo;

  const element = document.createElement(_element);

  // Important properties for "simple" DOM-Elements
  if (_id != undefined) element.id = _id;
  if (_class != undefined) element.classList.add(_class);
  if (_text != undefined) element.innerText = _text;
  if (_for != undefined) element.for = _for;
  if (_title != undefined) element.title = _text;
  if (_alt != undefined) element.alt = _alt;

  // Important properties for Image-DOM-Elements
  if (_src != undefined) element.src = _src;
  if (_width != undefined) element.width = _width;
  if (_height != undefined) element.height = _height;
  if (_aspectRatio != undefined) element.aspectRatio = _aspectRatio;

  // Important properties for Input-DOM-Elements
  if (_min != undefined) element.min = _min;
  if (_max != undefined) element.max = _max;
  if (_value != undefined) element.min = _value;
  if (_placeholder != undefined) element.min = _placeholder;

  // Dropdown-Menu Generator
  // Proof if both needed Arrays were passed
  if (
    Array.isArray(_optionsArray) === true &&
    Array.isArray(_valuesArray) === true
  ) {
    let elementsPointer = 0;
    // For every value in ther first/option Array, create a dropdown option and set the correct value from the second/values Array for it
    for (let el of _optionsArray) {
      element.options.add(
        new Option(`${el}`, `${_valuesArray}`[elementsPointer])
      );
      elementsPointer++;
    }
  }

  // Finally, push the complete dynamically created, finished object to the DOM!
  document.getElementById(_parentID).appendChild(element);

  /*
Creator-Functions Informations:
All types of Elements possible which you can create 'the normal way' too!
!Important: For correct functionality pass at least the ParentID (to defined where the element should appear in the DOM) & 
the Element argument (tor define which kind of element it is)! 

I recommend the following method for invoking:
Create_DOM_Element({ParentID: "anyId", Element: "div"});

Possible arguments:
parentID, Element-Type, Input-Type, ID, Class, Text, For, Title, Alt, Src, Width, Height, AspectRatio, Min, Max, Value, Placeholder, arrayOne, arrayTwo

*/

  // console.log("New DOM-Element created.");
}

/* ============================
!     Set multiple Attrubutes on 1 Element
        ============================= */
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
  // Call: setAttributes(elem, {"src": "http://example.com/something.jpeg", "height": "100%", ...});
}

/* =================================
!     Set multiple Attrubutes on multiple Elements
        ================================== */
function setAttributesArr(arr, attrs) {
  for (let el of arr) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
  // Call: setAttributesArr(arr with (DOM-Objects!), {"src": "http://example.com/something.jpeg", "height": "100%", ...});
}

/* =======================
!     Fireworks-Canvas-Animation 
        ======================= */
function Fireworks(canvasID) {
  // Firework Function not from me, so special thanks goes to Adam, which published it at codepen! Link below!
  // Fireworks from Adam: https://codepen.io/Adam12132/pen/gOGrwMR
  const canvas = document.getElementById(canvasID);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  function Firework(x, y, height, yVol, R, G, B) {
    this.x = x;
    this.y = y;
    this.yVol = yVol;
    this.height = height;
    this.R = R;
    this.G = G;
    this.B = B;
    this.radius = 2;
    this.boom = false;
    var boomHeight = Math.floor(Math.random() * 200) + 50;
    this.draw = function () {
      ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
      ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
      ctx.beginPath();
      //   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, Math.PI * 2, 0, false);
      ctx.fill();
    };
    this.update = function () {
      this.y -= this.yVol;
      if (this.radius < 20) {
        this.radius += 0.35;
      }
      if (this.y < boomHeight) {
        this.boom = true;

        for (var i = 0; i < 120; i++) {
          particleArray.push(
            new Particle(
              this.x,
              this.y,
              // (Math.random() * 2) + 0.5//
              Math.random() * 2 + 1,
              this.R,
              this.G,
              this.B,
              1
            )
          );
        }
      }
      this.draw();
    };
    this.update();
  }

  window.addEventListener("click", (e) => {
    var x = e.clientX;
    var y = canvas.height;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    var height = Math.floor(Math.random() * 20) + 10;
    fireworkArray.push(new Firework(x, y, height, 5, R, G, B));
  });

  function Particle(x, y, radius, R, G, B, A) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.R = R;
    this.G = G;
    this.B = B;
    this.A = A;
    this.timer = 0;
    this.fade = false;

    // Change random spread
    this.xVol = Math.random() * 10 - 4;
    this.yVol = Math.random() * 10 - 4;

    // console.log(this.xVol,this.yVol)
    this.draw = function () {
      //   ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
      ctx.save();
      ctx.beginPath();
      // ctx.fillStyle = "white"
      ctx.globalCompositeOperation = "screen";
      ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
      ctx.fill();

      ctx.restore();
    };
    this.update = function () {
      this.x += this.xVol;
      this.y += this.yVol;

      // Comment out to stop gravity.
      if (this.timer < 200) {
        this.yVol += 0.12;
      }
      this.A -= 0.02;
      if (this.A < 0) {
        this.fade = true;
      }
      this.draw();
    };
    this.update();
  }

  var fireworkArray = [];
  var particleArray = [];
  for (var i = 0; i < 6; i++) {
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    var height = Math.floor(Math.random() * 20) + 10;
    fireworkArray.push(new Firework(x, y, height, 5, R, G, B));
  }

  function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < fireworkArray.length; i++) {
      fireworkArray[i].update();
    }
    for (var j = 0; j < particleArray.length; j++) {
      particleArray[j].update();
    }
    if (fireworkArray.length < 4) {
      var x = Math.random() * canvas.width;
      var y = canvas.height;
      var height = Math.floor(Math.random() * 20);
      var yVol = 5;
      var R = Math.floor(Math.random() * 255);
      var G = Math.floor(Math.random() * 255);
      var B = Math.floor(Math.random() * 255);
      fireworkArray.push(new Firework(x, y, height, yVol, R, G, B));
    }

    fireworkArray = fireworkArray.filter((obj) => !obj.boom);
    particleArray = particleArray.filter((obj) => !obj.fade);
  }
  animate();

  window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
//#endregion

//#region 2) Callback, Promises, Async/Await

/* =======
!     Callback
        =======*/

// Standard Callback function
function myCallback(name, callback) {
  // name = "Setting Parameters here overwrites arguments in invoking! (Scope)";
  // After 1 second the callback function gets invoked, which in this examle creates a Object username with either the 1 argument by invoking or the name in this function
  setTimeout(() => {
    callback({ username: name });
  }, 1000);
}
// Second argument  have acces to the callback function, so acces to the Object where username: name. With that variables you can work. (.then)
//const myName = myCallback("Steve", (username) => {
// console.log(username);
//});

/* =======
!     Promise
        =======*/
// Standard Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ var: "My Test" });
  }, 2000);
});

//myPromise
//  .then(myTest => {console.log(myTest)} );

// Get values from muitple Promises at the same time
const myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ var: "+ my second Test in Promise.all!" });
  }, 2000);
});
//? You have to pass an array!
//Promise.all([myPromise, myPromise2])
//  .then(result => {console.log(result)});

/* ===========
!     Async / Await
        ===========*/
// Get functions which return a promise
function firstPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ var: "Code after 3 seconds" });
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ var: "Code after 4 seconds" });
    }, 4000);
  });
}

// Async / Await can handle those fuinctions
async function result() {
  const first = await firstPromise();
  const second = await secondPromise();
  console.log(first, second);
}
//result();

/* ================
!     Await with Promises
        ================= */
const testAwait = function AwaitPromise() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Inside test await");
    }, 2000);
  });
  return promise;
};
/*
testAwait().then((data) => {console.log(data);});
*/

//#endregion

//#region Create CSS-Class and apply it to Element
function createClass(name,rules){
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if(!(style.sheet||{}).insertRule) 
      (style.styleSheet || style.sheet).addRule(name, rules);
  else
      style.sheet.insertRule(name+"{"+rules+"}",0);
}
//createClass('.whatever',"background-color: green;");
function applyClass(name,element,doRemove){
  if(typeof element.valueOf() == "string"){
      element = document.getElementById(element);
  }
  if(!element) return;
  if(doRemove){
      element.className = element.className.replace(new RegExp("\\b" + name + "\\b","g"));
  }else{      
      element.className = element.className + " " + name;
  }
}
//#endregion

                                                                                                  /* ========================
                                                                                                  ?     My Javascript-Coding Guideline
                                                                                                          =========================*/

//#region  My Javascript-Coding-Guideline
/*
================================================================================================================================================================================================================================================================================ 

?                                          Better Coding Checklist:

-) Chrome Extension Visbug hilft beim Page designen!

-) insomnia.rest hilft beimn api schreiben!

-) bundlephobia.com zeigt dir die Package-Ladezeiten

-) Ternäre Operatoren nutzen ! --> x >10 ? "Wenn x größer ist als 10" : "Wenn nicht, dann mach dies"

-) Verwende "conditionales": const user = user_name || "Player 1"

-) Array.from() konvertiert iterierbare Objekte zu arrays!

-) String to number: let int = "14" --> neueZahl = +int / Number to string: const stringZahl = 5 + ""; in concentation --> double tilde ~~

-) Array alle "strings" zu "numbers" --> values = array.map(Number) /  Boolean: array.map(Boolean)

-) 2 << 3 = 16 ist gleich wie 2 ** 4 = 16 oder old style Math.pow(2, 3)

-) Konvertiere eine float zu Int mit "zahl | 0" => rundet auf wenn negativ und ab wenn positiv. Doppelt tilde ~~ macht das gleiche!
 
-) | 0 rundet ja eine positive float auf eine Int ab, also "1222 / 10 | 0" ist das gleiche wie "1220 / 10 ==> 122.0 | 0 ==> 122"
 
-) Object oder Array destructing: const {name, age, ...} = user --> und die variablen haben die Werte von den zugehörigen user-Objekt. Also statt name = this name...
 
-) Console.time("") ...... console.timeEnd("") misst die Dauer der Ausführung des Codes dazwischen und gibt ihn in der Konsole aus. Praktisch für zb.: Loops oder Funktionen!

-) slice() kann auch negative values haben und damit bekommt man die letzten values eines arrays
 
-) "...rest"-Parameter sammelt alle werte ab diesem Parameter in einem gleichnamigen Array. Kann auch anders benannt werden! 

-) Variablen zb.: so zuweisen: n = n + n + (options.number || 5) 
      Wichtig: wird hier für options.number 0 eingesetzt, ist es false (aufgrund OR) und es wird immer + 5 gerechnet. Außerdem bekommt man einen Error bei null, undefined bzw. false value wenn options.number gar nicht übergeben wird. Das muss alles mit if statements abgefangen werden"
 
-) Keine reduntatn if statements; if (n < 0){....} else if (n >= 0){...}  -> Zweites if ist nicht notwendig!

-) So wenig nesting wie möglich: Vermeide else if und returne nach jedem if 

-) Variablen in return: return `(${variable})`

==============================================================================================================================================================================================================================================================================================*/

//#endregion