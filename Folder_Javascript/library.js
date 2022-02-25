
//#region Table of Content
                                                                                                                                                                                                                                                                                /*
                                             Four-Wins-Online Library-Javascript-File                                                           
                                                           powered by
                            
                                                          Stefan Bartl
                                                     (WKDSteVIE / WKDMinerva)
                            
                                                              2021
                             _______________________________________________________________________                                                                                                                                                                                                                                                    
                            {                   _________________________________                   }                                                                                                                                                                                  
                            {                            Table of content                           }
                            {_______________________________________________________________________} 
                            |                                                                       |
                            |                                                                       |
                            |                  1) Insert Element after Element                      |
                            |                                                                       |
                            |                  2) Add choosing Animation                            |
                            |                                                                       |
                            |                  3) Remove choosing Animation                         |
                            |                                                                       |
                            |                  4) Lock Top Cells                                    |
                            |                                                                       |
                            |                  5) Unlock Top Cells                                  |
                            |                                                                       | 
                            |                  6) "Thinking"-Effect                                 |
                            |                                                                       |
                            |                  7) Get only unique Values from Array                 |
                            |                                                                       |                                                                                                                                                                               
                            |                  8) Get a random Int number                           |
                            |                                                                       |
                            |                  9) Push values to Local Storage                      |
                            |                                                                       | 
                            |                 10) Swap 2 Classes by 2 events on 1 Element           |
                            |                                                                       |
                            |                 11) Change which Player is on turn                    |
                            |                                                                       |
                            |                 12) Game Screen                                       |
                            |                                                                       |
                            |                 13) Start Screen                                      |
                            |                                                                       |
                            |                 14) Stats                                             |
                            |                                                                       | 
                            |                 15) Update Stats                                      |
                            |                                                                       |
                            |                 16) New Window                                        |
                            |                                                                       |                                                                                                                                                                               
                            |                 17) Correct Sound Setting                             |
                            |                                                                       |
                            |                 18) Create new DOM Element                            |
                            |                                                                       | 
                            |                 19) Fireworks                                         |
                            |                                                                       |
                            |                 20) Final Information and Comments                    |
                            |                                                                       |                                                                                                                                                                                   
                            |                 21) Coding Guidelines & Tipps                         |                                                                                                                                                                                                                                                            
                            |                                                                       |                                                                                                                                                                                                               
                            |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _|
                                                                                                                                                                                                                                                                               */      

//#endregion

//#region Helper Functions
                                                                                                                                                                                                                                                                                /*            
================================================================================================================================================================================================================================================================================
 
                                    Helper-Functions for the Game Four-Wins              

================================================================================================================================================================================================================================================================================*/

//                                  __________________________________________
//                                  Insert Element after Reference Node in DOM

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};
//                                  _______________________________________
//                                  Add Choosing-Animation from Top-Cells

function Add_Choosing_Ani(column){
column -= 1;
const topCellsArray = document.getElementsByClassName("Class_TopCells");
if(Game.playerIsOnTurn === "left"  && Game.player_Colour_Left === "yellow"){
topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_1");}
else if (Game.playerIsOnTurn === "left"  && Game.player_Colour_Left === "red"){
topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_2");}
else if (Game.playerIsOnTurn === "right"  && Game.player_Colour_Left === "yellow"){
topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_2");
} else if(Game.playerIsOnTurn === "right"  && Game.player_Colour_Left === "red"){
topCellsArray[column].classList.add("Class_ChoosingAnimation_Coin_1");};
};
//                                  __________________________________________
//                                  Remove Choosing-Animation from Top-Cells

function Remove_Choosing_Ani(column){
column -= 1;
const topCellsArray = document.getElementsByClassName("Class_TopCells");
if(Game.playerIsOnTurn === "left"){
topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_1");
topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_2"); 
}else {  
topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_1"); 
topCellsArray[column].classList.remove("Class_ChoosingAnimation_Coin_2");}
};
//                                 _______________
//                                  Lock topCells

function Lock_TopCells(){
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for (let topCell of topCellsArray){
topCell.style.cursor = "none"; 
topCell.style = "pointer-events:none"; 
};
};
//                                 _______________
//                                  Unlock topCells

function Unlock_TopCells(){
    const topCellsArray = document.getElementsByClassName("Class_TopCells");
    for (let topCell of topCellsArray){
    topCell.style.cursor = "pointer"; 
    topCell.style = "pointer-events: all"; 
    };
};
//                                  ______________________________
//                                   Simulate a "Thinking"-Effect

function Thinking_Effect(invokerKI, valid_number){

// First make sure there is no "Thinking" Div attached
if (!document.getElementById("ID_Thinking_Div")){
// If it isn't create DOM ELement for the thinking dots in the turning DIV
const thinker_div = document.createElement("div");
thinker_div.classList.add("Class_Thinking");
thinker_div.id = "ID_Thinking_Div";
document.getElementById("ID_Turn_Div").appendChild(thinker_div);
// Set a Intervall which change the dots in the DOM Element. The changing is realised with setTiemouts, which fakes an text animation effect. This happens all 2 seconds again.
window.thinking = setInterval(()=>{
const dot1 = setTimeout(()=>{
    thinker_div.innerText = ".";
}, 100);
const dot2 = setTimeout(()=>{
    thinker_div.innerText = ". .";
}, 500);
const dot3 = setTimeout(()=>{
    thinker_div.innerText = ". . .";
}, 1000);
const dot4 = setTimeout(()=>{
    thinker_div.innerText = ".....";
}, 1500);
}, 2000);
};
// If the invoker is KI do additional tasks...
if(invokerKI === true){
// Get a random number
const random_number = getRandomInt(7);
// Multiplicy it with 1000 to get a correct time value to invoking setTimeout
let thinking_duration = random_number * 1000;
// If the random time was under 2 (seconds), set it to 2 seconds to make sure "thinking" is not "too fast"
if(thinking_duration < 2000) thinking_duration = 2000;
// Invoke Placement with the given valid number and clear the setted interval after the "thinking" time. 
setTimeout(()=>{
KI_Placement(valid_number)
clearInterval(thinking);
// Remove the "dots"-Div container from the turning Div if it exists
if(document.getElementById("ID_Thinking_Div")){document.getElementById("ID_Thinking_Div").remove();};
}, thinking_duration);
};
};
//                                  ___________________________________
//                                   Filter array to get unique values

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
    // var unique = array.filter(onlyUnique);
};
//                                  __________________
//                                   Get a random Int

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};
//                                  ______________________
//                                   Push to localStorage

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event) {
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, () => {
localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});
}
//                                  __________________________________________
//                                   Swapping classes on element via 2 events

function Swap_Two_Classes_by_Events(element_ID, event_1, event_2, first_Class, second_Class) {
document.getElementById(`${element_ID}`).addEventListener(`${event_1}`, () => {
document.getElementById(`${element_ID}`).classList.remove(`${second_Class}`);
document.getElementById(`${element_ID}`).classList.add(`${first_Class}`);
})
document.getElementById(`${element_ID}`).addEventListener(`${event_2}`, () => {
document.getElementById(`${element_ID}`).classList.remove(`${first_Class}`);
document.getElementById(`${element_ID}`).classList.add(`${second_Class}`);
})
};
//                                  ________________________________
//                                   Change which Player is on turn

function Turning_PlayerIsOnTurn() {
// Change Player
Game.playerIsOnTurn === "left" ? Game.playerIsOnTurn = "right" : Game.playerIsOnTurn = "left";
// Assign text message to the correct Player and with the correct language
if(localStorage.getItem("Language") === "de"){
    if(Game.playerIsOnTurn === "left") { document.getElementById("ID_h3_turnText").innerText = `Dein Zug, ${Game.Player_One_Name}`;}
    else if(Game.playerIsOnTurn === "left" && Game.Game_against_KI === false) {document.getElementById("ID_h3_turnText").innerText = `Dein Zug, ${Game.Player_Two_Name}`;}
    else {document.getElementById("ID_h3_turnText").innerText = `${Game.Player_Two_Name} am Zug`;};
} else {
if(Game.playerIsOnTurn === "left"){document.getElementById("ID_h3_turnText").innerText = `Your turn, ${Game.Player_One_Name}`;}
else if (Game.playerIsOnTurn === "left" && Game.Game_against_KI === false) {document.getElementById("ID_h3_turnText").innerText = `Your turn, ${Game.Player_Two_Name}`;}
else {document.getElementById("ID_h3_turnText").innerText = `${Game.Player_Two_Name}'s turn`;};
};

// Add correct positioning Class to div
if (Game.playerIsOnTurn === "left") {
document.getElementById("ID_Turn_Div").classList.remove("Class_Right_Pos");
document.getElementById("ID_Turn_Div").classList.add("Class_Left_Pos");
} else {
document.getElementById("ID_Turn_Div").classList.remove("Class_Left_Pos");
document.getElementById("ID_Turn_Div").classList.add("Class_Right_Pos");
};

// If there was a "Player thinking animation", end it, remove the Div Container from DOM, trigger the same effect for the other player. (KI Thinking is invoked in the KI-Function because of shorter delay)
if(Game.Game_against_KI === false){
if(document.getElementById("ID_Thinking_Div")){
document.getElementById("ID_Thinking_Div").remove();
clearInterval(window.thinking);
setTimeout(Thinking_Effect, 8000);
};};
// Nearly the same in Game against KI, until no new timer is setted, because this makes the KI after his placement.
if(Game.Game_against_KI === true){
if(document.getElementById("ID_Thinking_Div")){
document.getElementById("ID_Thinking_Div").remove();
clearInterval(window.thinking);
};};
};
//                                  __________________
//                                   Show Game-Screen

function Game_Screen(){
// Remove the start screen elements
document.getElementById("ID_Header").style = "display: none";
document.getElementById("ID_LeftSidebarWrapper").style = "display: none"; 
document.getElementById("ID_RightSidebarWrapper").style = "display: none";
document.getElementById("ID_FooterWrapper").style = "display: none";
// Use the new free space for the Gameboard
document.getElementById("ID_MainWrapper").classList.add("Class_Main_Wrapper_InGame");
document.getElementById("ID_GameboardWrapper").classList.add("Class_Gameboard_Wrapper_InGame");
if(document.getElementById("ID_h3_turnText")) document.getElementById("ID_h3_turnText").style = "display: block";
}
//                                  ___________________
//                                   Show Start-Screen

function Start_Screen(){
// Add the start screen elements
document.getElementById("ID_Header").style = "display: block";
document.getElementById("ID_LeftSidebarWrapper").style = "display: block";
document.getElementById("ID_RightSidebarWrapper").style = "display: block";
document.getElementById("ID_FooterWrapper").style = "display: block";

document.getElementById("ID_MainWrapper").classList.remove("Class_Main_Wrapper_InGame");
document.getElementById("ID_GameboardWrapper").classList.remove("Class_Gameboard_Wrapper_InGame");
document.getElementById("ID_h3_turnText").style = "display: none";
}
//                                  ________________________
//                                   Keep stats up-to-date

function Stats(){
let value = localStorage.KI_Easy_Wins || 0; document.getElementById("ID_Easy_1").innerText = value;
value = localStorage.KI_Easy_CPUWins || 0; document.getElementById("ID_Easy_3").innerText = value;
value = localStorage.KI_Easy_Draws || 0; document.getElementById("ID_Easy_2").innerText = value;
value = localStorage.KI_Normal_Wins || 0; document.getElementById("ID_Normal_1").innerText = value;
value = localStorage.KI_Normal_CPUWins || 0; document.getElementById("ID_Normal_3").innerText = value;
value = localStorage.KI_Normal_Draws || 0; document.getElementById("ID_Normal_2").innerText = value;
}
//                                  __________________________
//                                   Increase Stats after Win

function Update_Stats(winning_player){
// To reduce repetition only the KI Easy section is commented out. It's basically the same in KI Normal.
let value;
// Easy Stats
if(Game.KI_Level === "Easy"){
//   if Player wins           Get value from storage or set to 0; increase value;  update storage with increased value; .....
if(winning_player === 1){ value = localStorage.KI_Easy_Wins || 0; value++; localStorage.KI_Easy_Wins = value;
        // ...and set new value in Settings-Stats-Menu;
document.getElementById("ID_Easy_1").innerText = value;};
//     if CPU Wins...
if(winning_player === 2){ value = localStorage.KI_Easy_CPUWins || 0; value++; localStorage.Easy_CPUWins = value;
document.getElementById("ID_Easy_3").innerText = value;};
//     if it is a draw...
if(winning_player === 3){ value = localStorage.KI_Easy_Draws || 0; value++; localStorage.Easy_Draws = value;
    document.getElementById("ID_Easy_2").innerText = value;};
}
// Normal Stats
else if (Game.KI_Level === "Normal"){
if(winning_player === 1 && Game.KI_Level === "Normal"){ value = localStorage.KI_Normal_Wins || 0; value++; localStorage.KI_Normal_Wins = value;
document.getElementById("ID_Normal_1").innerText = value;};
if(winning_player === 2 && Game.KI_Level === "Normal"){ value = localStorage.KI_Normal_CPUWins || 0; value++; localStorage.Normal_CPUWins = value;
document.getElementById("ID_Normal_3").innerText = value;};
if(winning_player === 3 && Game.KI_Level === "Normal"){ value = localStorage.KI_Normal_Draws || 0; value++; localStorage.Normal_Draws = value;
document.getElementById("ID_Normal_2").innerText = value;};
};
// Enough space for a unbeatable level ??? :-)
};
//                                  ________________________________
//                                   Alert / Confirm / Prompt Windows

function New_Window(options){

// Info: To know if User clicked "Confirm" or Cancel, you need a variable outside of the function which can be manipulated by the Event-Listeners. 
// --> Create an empty Windows{} Object. You find the "returns" than in the Windows.[variable]. You also can change the Event-Listeners for your needs.

// Set up parameter list
const _id = options.ID, _name = options.Name, _text = options.Text, _alert = options.Alert, _confirm = options.Confirm, _prompt = options.Prompt, _variable = options.Variable; 

// Create all base Elements
const window = document.createElement("div");
window.id = _id;
window.classList.add("Class_Window");
window.draggable = true;

if(_alert === true){
    window.innerText = "Alert Window";
} else if (_confirm === true){
    window.innerText = "Confirm Window";
} else if (_prompt === true){
    window.innerText = "Prompt Window";
} else {
window.innerText = "Notification Window";
};

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
confirm_button.addEventListener("click", ()=>{
    window.remove();
    if(_confirm === true){
    Windows[_variable] = true;
} else if (_alert === true){
    Windows[_variable] === true;
} else if (_prompt === true){
    Windows[_variable] === true;
};

});

// Append it
inner_window.appendChild(headline);
inner_window.appendChild(textfield);
inner_window.appendChild(button_div);

// Create Cancel Button to make Confirm-Window
if (_confirm === true || _prompt === true){
    const cancel_button = document.createElement("button");
    cancel_button.innerText = "Cancel";
    cancel_button.addEventListener("click", ()=>{
        window.remove();
        if(_confirm === true){
            Windows[_variable] = false;
        } else if (_prompt === true){
            Windows[_variable] === false;
        };
    })
    button_div.appendChild(cancel_button);
    };
// Invoke-Example Confirm: New_Window({ID: "ID_Test_Window", Name: "Test Window", Text: "Test Test Test", Confirm: true, Variable: "Tester"}); Find Confirm Boolean: Windows.Tester

button_div.appendChild(confirm_button);
window.appendChild(inner_window);
document.body.appendChild(window);

// Create Input-Text and add it
if (_prompt === true){
const user_input = document.createElement("input");
user_input.type = "text";
inner_window.insertBefore(user_input, inner_window.children[2]);
confirm_button.addEventListener("click", ()=>{
    window.remove();
    Windows[_variable] = user_input.value;
    // Invoke Example Prompt: New_Window({ID: "ID_Test_Window", Name: "Test Window", Text: "Test Test Test", Prompt: true, Variable: "Tester"}); Find Input value: Windows.Tester
})};
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
};
//                                  ________________________
//                                   Sound in Settings-Menu

function Correct_Sound_Setting() {
// Make sure, User prefered Sound-Setting is also shown in the Settings-Menu after closed and reopened window 
const sound_checkbox = document.getElementById('ID_Sound_Checkbox');
if (localStorage.Sound === "false" && sound_checkbox.checked === true) {
sound_checkbox.click();
};
if (localStorage.Sound === "true" && sound_checkbox.checked === false) {
sound_checkbox.click();
};
};
//                                  ____________________
//                                   "Creator"-Function

function Create_DOM_Element(options, arrayOne, arrayTwo) {

// Define the possible Parameter-List with the associated variables declared
const _parentID = options.ParentID, _element = options.Element, _type = options.Type, _id = options.ID, _class = options.Class, _text = options.Text, _for = options.For,
_title = options.Title, _alt = options.Alt, _src = options.Src, _width = options.Width, _height = options.Height, _aspectRatio = options.AspectRatio,
_min = options.Min, _max = options.Max, _value = options.Value, _placeholder = options.Placeholder, _optionsArray = arrayOne, _valuesArray = arrayTwo;

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
if (Array.isArray(_optionsArray) === true && Array.isArray(_valuesArray) === true) {
let elementsPointer = 0;
// For every value in ther first/option Array, create a dropdown option and set the correct value from the second/values Array for it
for (let el of _optionsArray) {
element.options.add(new Option(`${el}`, `${_valuesArray}`[elementsPointer]));
elementsPointer++;
};
};

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
};
//                                  ____________________________
//                                   Fireworks Canvas-Animation                                

function Fireworks(canvasID){
// Firework Function not from me, so special thanks goes to Adam, which published it at codepen! Link below!
// Fireworks from Adam: https://codepen.io/Adam12132/pen/gOGrwMR
const canvas = document.getElementById(canvasID);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
function Firework(x,y,height,yVol,R,G,B){
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
this.draw = function(){

ctx.fillStyle = "rgba(" + R + "," + G + "," + B + ")";
ctx.strokeStyle = "rgba(" + R + "," + G + "," + B + ")";
ctx.beginPath();
//   ctx.arc(this.x,boomHeight,this.radius,Math.PI * 2,0,false);
ctx.stroke();
ctx.beginPath();
ctx.arc(this.x,this.y,3,Math.PI * 2,0,false);
ctx.fill();
}
this.update = function(){
this.y -= this.yVol;
if(this.radius < 20){
    this.radius += 0.35;
}
if(this.y < boomHeight){
    this.boom = true;
    
    for(var i = 0; i < 120; i++){
    particleArray.push(new Particle(
        this.x,
        this.y,
        // (Math.random() * 2) + 0.5//
        (Math.random() * 2) + 1,
        this.R,
        this.G,
        this.B,
        1,
    ))

    }
}
this.draw();
}
this.update()
}

window.addEventListener("click", (e)=>{
var x = e.clientX;
var y = canvas.height;
var R = Math.floor(Math.random() * 255)
var G = Math.floor(Math.random() * 255)
var B = Math.floor(Math.random() * 255)
var height = (Math.floor(Math.random() * 20)) + 10;
fireworkArray.push(new Firework(x,y,height,5,R,G,B))
})

function Particle(x,y,radius,R,G,B,A){
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
this.xVol = (Math.random() * 10) - 4
this.yVol = (Math.random() * 10) - 4


// console.log(this.xVol,this.yVol)
this.draw = function(){
//   ctx.globalCompositeOperation = "lighter"
ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + this.A + ")";
ctx.save();
ctx.beginPath(); 
// ctx.fillStyle = "white"
ctx.globalCompositeOperation = "screen"
ctx.arc(this.x,this.y,this.radius,Math.PI * 2,0,false);
ctx.fill();

ctx.restore();
}
this.update = function(){
this.x += this.xVol;
this.y += this.yVol;

// Comment out to stop gravity. 
if(this.timer < 200){
    this.yVol += 0.12;
}
this.A -= 0.02;
if(this.A < 0){
    this.fade = true;
}
this.draw();
}
this.update();
}

var fireworkArray = [];
var particleArray = [];
for(var i = 0; i < 6; i++){
var x = Math.random() * canvas.width;
var y = canvas.height;
var R = Math.floor(Math.random() * 255)
var G = Math.floor(Math.random() * 255)
var B = Math.floor(Math.random() * 255)
var height = (Math.floor(Math.random() * 20)) + 10;
fireworkArray.push(new Firework(x,y,height,5,R,G,B))
}


function animate(){
requestAnimationFrame(animate);
// ctx.clearRect(0,0,canvas.width,canvas.height)
ctx.fillStyle = "rgba(0,0,0,0.1)"
ctx.fillRect(0,0,canvas.width,canvas.height);
for(var i = 0; i < fireworkArray.length; i++){
fireworkArray[i].update();
}
for(var j = 0; j < particleArray.length; j++){
particleArray[j].update();
}
if(fireworkArray.length < 4){
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var height = Math.floor(Math.random() * 20);
    var yVol = 5;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);          
    var B = Math.floor(Math.random() * 255);
    fireworkArray.push(new Firework(x,y,height,yVol,R,G,B));
}


fireworkArray = fireworkArray.filter(obj => !obj.boom);
particleArray = particleArray.filter(obj => !obj.fade);
}
animate();

window.addEventListener("resize", (e) => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
})
};
//#endregion

//#region Final informations and Comments

                                                                                                                                                                                                                                                                                /*
================================================================================================================================================================================================================================================================================
 
                                    Final information and Comments          

================================================================================================================================================================================================================================================================================

     Bonus Jobs to-do:

-) 
                                                                                                                                                                                                                                                                                */
//#endregion

//#region Coding Guideline & Tipps
                                                                                                                                                                                                                                                                                    /*
______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
                                                                                                                                                                                                                                                                                    /*
                /##################################################################################################################################################################################################################################################################### 
                #
                #                                          Better Coding Checklist:
                #
                #   -) Ternäre Operatoren nutzen ! --> x >10 ? "Wenn x größer ist als 10" : "Wenn nicht, dann mach dies"
                #
                #   -) Verwende "conditionales": const user = user_name || "Player 1"
                #
                #   -) String to number: let int = "14" --> neueZahl = +int / Number to string: const stringZahl = 5 + ""; in concentation --> double tilde ~~
                #
                #   -) Array alle "strings" zu "numbers" --> values = array.map(Number) /  Boolean: array.map(Boolean)
                #
                #   -) 2 << 3 = 16 ist gleich wie 2 ** 4 = 16 oder old style Math.pow(2, 3)
                #
                #   -) Konvertiere eine float zu Int mit "zahl | 0" => rundet auf wenn negativ und ab wenn positiv. Doppelt tilde ~~ macht das gleiche!
                #
                #   -) | 0 rundet ja eine positive float auf eine Int ab, also "1222 / 10 | 0" ist das gleiche wie "1220 / 10 ==> 122.0 | 0 ==> 122"
                #
                #   -) Object oder Array destructing: const {name, age, ...} = user --> und die variablen haben die Werte von den zugehörigen user-Objekt. Also statt name = this name...
                #
                #   -) Console.time("") ...... console.timeEnd("") misst die Dauer der Ausführung des Codes dazwischen und gibt ihn in der Konsole aus. Praktisch für zb.: Loops oder Funktionen!
                #
                #   -) slice() kann auch negative values haben und damit bekommt man die letzten values eines arrays
                #
                #   -) "...rest"-Parameter sammelt alle werte ab diesem Parameter in einem gleichnamigen Array. Kann auch anders benannt werden! 
                #
                #   -) Variablen zb.: so zuweisen: n = n + n + (options.number || 5) 
                #    --Wichtig: wird hier für options.number 0 eingesetzt, ist es false (aufgrund OR) und es wird immer + 5 gerechnet. Außerdem bekommt man einen Error bei null, undefined bzw. false value wenn options.number gar nicht übergeben wird. Das muss alles mit if statements abgefangen werden"
                #
                #   -) Keine reduntatn if statements; if (n < 0){....} else if (n >= 0){...}  -> Zweites if ist nicht notwendig!
                #
                #   -) So wenig nesting wie möglich: Vermeide else if und returne nach jedem if 
                #
                #   -) Variablen in return: return `(${variable})`
                #
                \_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________                                                                                                        */

//#endregion