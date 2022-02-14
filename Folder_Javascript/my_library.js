                                // Allgemeine Funktionen


// Sum: Funktion um beliebig viele Variablen miteinander zu summieren
function Sum (a, ...rest){
    // Returns the sum of all given values
    let restSum = 0;
    for (let value of rest)restSum += value;
    let result = a + restSum;
    return  result
};

                                // Funktionen für die Spieleentwicklung


/*     _Ein value per event aus einer beliebigen ID abfragen und mit einem key dem Local Storage übergeben_
Info: Zum Beispiel Namen aus einem input abfragen und per click event speicher: 
Push_to_LocalStorage("ID_SVG_Player_1","ID_Player_1_Name", "Player_One_Name", "click");        */

function Push_to_LocalStorage(IDfromTrigger, IDfromValue, key, event){
document.getElementById(`${IDfromTrigger}`).addEventListener(`${event}`, ()=>{
    localStorage.setItem(`${key}`, document.getElementById(`${IDfromValue}`).value);
});};


/*                      Spielerwechsel
Info: Benötigt Variable playerIsOnTurn = left/right im Code!
!!! Vorsicht bei der Benutzung: Funkioniert nur auf sehr sehr schnellen CPUs reibungsfrei, 
  da i.d.R. viel vom Game-Ablauf damit gesteuert wird. Besser lokal einbinden!                 */

function Turning_PlayerIsOnTurn(){
    playerIsOnTurn === "left" ? playerIsOnTurn = "right" : playerIsOnTurn = "left";
};


//          Add a class to a element by event and remove it by another event
function Add_Remove_Class_by_Events(element_ID, event_1, event_2, _class){
    document.getElementById(`${element_ID}`).addEventListener(`${event_1}`, ()=>{
    document.getElementById(`${element_ID}`).classList.add(`${class_}`);
})
document.getElementById(`${element_ID}`).addEventListener(`${event_2}`, ()=>{
    document.getElementById(`${element_ID}`).classList.remove(`${_class}`);
})};


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
\___________________________________________________________________________________________________________________________________________________________________________
     