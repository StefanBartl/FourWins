let column_1_Counter = 0;
// Get the Top Cells for looping trough
const topCellsArray = document.getElementsByClassName("Class_TopCells");
for(let topCell of topCellsArray){
// Adding & Removing the "Choose the Column" Animation just by adding the Class with the CSS-Animation
topCell.addEventListener("mouseover", ()=>{ topCell.classList.add("Class_ChoosingAnimation")});
topCell.addEventListener("mouseleave", ()=>{ topCell.classList.remove("Class_ChoosingAnimation")});
topCell.addEventListener("click", ()=>{ topCell.classList.remove("Class_ChoosingAnimation")})



// Adding the "Coin fly trough the Gameboard" animation
topCell.addEventListener("click", ()=>{
// Get the correct cells of the column
let topCellID = topCell.getAttribute("id");
let cell_2 = document.getElementById(`ID_C${topCellID[4]}R2`);
let cell_3 = document.getElementById(`ID_C${topCellID[4]}R3`);
let cell_4 = document.getElementById(`ID_C${topCellID[4]}R4`);
let cell_5 = document.getElementById(`ID_C${topCellID[4]}R5`);
let cell_6 = document.getElementById(`ID_C${topCellID[4]}R6`);
let cell_7 = document.getElementById(`ID_C${topCellID[4]}R7`);

animater(topCell, topCellID[4]);







}); // Ende Event Listener

}; // Ende Array

function placingCoin(cellID){
    document.getElementById(`${cellID}`).classList.add("Class_PlacingTransition");
    }

function animater(cell, columnNumber){
    // Inrease the row counter to count the columns played in this row
    if(columnNumber == 1)column_1_Counter++;


    // Creat the coin and set correct position
    let coin = document.createElement("img");
    coin.id = "coin";
    coin.src = "./Folder_Graphics/X_es/handle-x-svgrepo-com.svg";
    coin.style.height = "2rem";
    coin.style.width = "2rem";
    if(!cell.firstChild){ 
    coin.classList.add("Class_PlacingAnimation");
    
    cell.appendChild(coin);
    }
    } 
        




    /*
setTimeout(()=>{
topCell.removeChild(topCell.firstChild);
animater(cell_2);
}, 700);
    setTimeout(()=>{
        cell_2.removeChild(cell_2.firstChild);
        animater(cell_3);
        }, 1400);
            setTimeout(()=>{
            cell_3.removeChild(cell_3.firstChild);
            animater(cell_4);
            }, 2100);*/