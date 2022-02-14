                                                    // Allgemeine Funktionen

//=================================================================================================================================================================================================
//                                   "Creator-Function" - for creating DOM-Elements and push it to DOM

function Create_DOM_Element(options, arrayOne, arrayTwo){

// Define the possible Parameter-List with the associated variables declared
const _parentID = options.ParentID, _element = options.Element, _type = options.Type, _id = options.ID, _class = options.Class, _text = options.Text, _for = options.For,
_title = options.Title, _alt = options.Alt, _src = options.Src, _width = options.Width, _height  = options.Height, _aspectRatio = options.AspectRatio,
_min = options.Min, _max = options.Max, _value = options.Value, _placeholder = options.Placeholder, _optionsArray = arrayOne, _valuesArray = arrayTwo;

const element = document.createElement(_element);

// Important properties for "simple" DOM-Elements
if(_id != undefined) element.id = _id;
if(_class !=  undefined) element.classList.add(_class);
if(_text != undefined) element.innerText  = _text;
if(_for != undefined) element.for  = _for;
if(_title != undefined) element.title = _text;
if(_alt != undefined) element.alt = _alt;

// Important properties for Image-DOM-Elements
if(_src != undefined) element.src = _src;
if(_width != undefined) element.width = _width;
if(_height != undefined) element.height = _height;
if(_aspectRatio != undefined) element.aspectRatio = _aspectRatio;

// Important properties for Input-DOM-Elements
if(_min != undefined) element.min = _min;
if(_max != undefined) element.max = _max;
if(_value != undefined) element.min = _value;
if(_placeholder != undefined) element.min = _placeholder;
// Dropdown-Menu Generator
// Proof if both needed Arrays were passed
if(Array.isArray(_optionsArray) === true  && Array.isArray(_valuesArray) === true){
let elementsPointer = 0;
// For every value in ther first/option Array, create a dropdown option and set the correct value from the second/values Arrayfor it
for(let el of _optionsArray){
element.options.add( new Option(`${el}`, `${_valuesArray}`[elementsPointer]));
elementsPointer++; };};

// Finally, push the complete dynamically created, finished object to the DOM!
document.getElementById(_parentID).appendChild(element);
};

/*                                Creator-Functions Infobox:
All types of Elements possible which you can create 'the normal way' too!
!Important: For correct functionality pass at least the ParentID (to defined where the element should appear in the DOM) & 
the Element argument (tor define which kind of element it is)! 

I recommend the following method for invoking:
                                        Create_DOM_Element({ParentID: "anyId", Element: "div"});

Possible arguments:
parentID, Element-Type, Input-Type, ID, Class, Text, For, Title, Alt, Src, Width, Height, AspectRatio, Min, Max, Value, Placeholder, arrayOne, arrayTwo

=================================================================================================================================================================================================
                                                                                                                                                                                                                                        */
    
//=================================================================================================================================================================================================
// Sum: Funktion um beliebig viele Variablen miteinander zu summieren
function Sum (a, ...rest){
    // Returns the sum of all given values
    let restSum = 0;
    for (let value of rest)restSum += value;
    let result = a + restSum;
    return  result
};
//=================================================================================================================================================================================================
                                // Funktionen für die Spieleentwicklung
                                
                                
                                
//=================================================================================================================================================================================================
/*     _Ein value per event aus einer beliebigen ID abfragen und mit einem key dem Local Storage übergeben_
Info: Zum Beispiel Namen aus einem input abfragen und per click event speicher: 
Push_to_LocalStorage("ID_SVG_Player_1","ID_Player_1_Name", "Player_One_Name", "click");        */

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event){
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, ()=>{
    localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});};

//=================================================================================================================================================================================================
/*                      Spielerwechsel
Info: Benötigt Variable playerIsOnTurn = left/right im Code!
!!! Vorsicht bei der Benutzung: Funkioniert nur auf sehr sehr schnellen CPUs reibungsfrei, 
  da i.d.R. viel vom Game-Ablauf damit gesteuert wird. Besser lokal einbinden!                 */

function Turning_PlayerIsOnTurn(){
    playerIsOnTurn === "left" ? playerIsOnTurn = "right" : playerIsOnTurn = "left";
};

//=================================================================================================================================================================================================
//          Add a class to a element by event and remove it by another event
function Add_Remove_Class_by_Events(element_ID, event_1, event_2, _class){
    document.getElementById(`${element_ID}`).addEventListener(`${event_1}`, ()=>{
    document.getElementById(`${element_ID}`).classList.add(`${class_}`);
})
document.getElementById(`${element_ID}`).addEventListener(`${event_2}`, ()=>{
    document.getElementById(`${element_ID}`).classList.remove(`${_class}`);
})};

//=================================================================================================================================================================================================   
//              Function for swaping trough two classes on a element initiate by two events 
function Add_Remove_Classes_by_Event(element_ID, event_1, event_2, first_Class, second_Class){
    document.getElementById(`${element_ID}`).addEventListener(`${event_1}`, ()=>{
    document.getElementById(`${element_ID}`).classList.remove(`${second_Class}`);
    document.getElementById(`${element_ID}`).classList.add(`${first_Class}`);
})
document.getElementById(`${element_ID}`).addEventListener(`${event_2}`, ()=>{
    document.getElementById(`${element_ID}`).classList.remove(`${first_Class}`);
    document.getElementById(`${element_ID}`).classList.add(`${second_Class}`);
})};










                                                                                                                                                                            /*
_____________________________________________________________________________________________________________________________________________________________________________
                                                                                                                                                                        /*
_____________________________________________________________________________________________________________________________________________________________________________
/############################################################################################################################################################################ 
#
#                                          Better Coding Checklist:
#
#   Ternäre Operatoren nutzen ! --> x >10 ? "Wenn x größer ist als 10" : "Wenn nicht, dann mach dies"
#
#   Verwende "conditionales": const user = user_name || "Player 1"
#
#   String to number: let int = "14" --> neueZahl = +int / Number to string: const stringZahl = 5 + ""; in concentation --> double tilde ~~
#
#   Array alle "strings" zu "numbers" --> values = array.map(Number) /  Boolean: array.map(Boolean)
#
#   2 << 3 = 16 ist gleich wie 2 ** 4 = 16 oder old style Math.pow(2, 3)
#
#   Konvertiere eine float zu Int mit "zahl | 0" => rundet auf wenn negativ und ab wenn positiv. Doppelt tilde ~~ macht das gleiche!
#
#   | 0 rundet ja eine positive float auf eine Int ab, also "1222 / 10 | 0" ist das gleiche wie "1220 / 10 ==> 122.0 | 0 ==> 122"
#
#   Object oder Array destructing: const {name, age, ...} = user --> und die variablen haben die Werte von den zugehörigen user-Objekt. Also statt name = this name...
#
#  Console.time("") ...... console.timeEnd("") misst die Dauer der Ausführung des Codes dazwischen und gibt ihn in der Konsole aus. Praktisch für zb.: Loops oder Funktionen!
#
#   slice() kann auch negative values haben und damit bekommt man die letzten values eines arrays
#
#   "...rest"-Parameter sammelt alle werte ab diesem Parameter in einem gleichnamigen Array. Kann auch anders benannt werden! 
#
\___________________________________________________________________________________________________________________________________________________________________________ */