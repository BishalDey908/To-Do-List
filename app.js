let inputbutton = document.querySelector("#buttonInput")
let inputData = document.querySelector("#takeInput")
let display=document.querySelector(".display")
let statement=""
let arrayData = []
let edit = null  //use to stode array index

let objStr =localStorage.getItem("task") //fetch the data from local storage(it is done bcz after refreashing the page when we put the data then it delete the previous data)

if(objStr!=null){
arrayData = JSON.parse(objStr) //convert string to object and push the data
}
displayData()

console.log(arrayData)
inputbutton.addEventListener("click", () => {
    let Data = inputData.value

    if(edit!=null){
        //for edit
        arrayData.splice(edit,1,{"task1" : Data})
        edit=null
    }else{
        //for insert 
    arrayData.push({"task1" : Data}) //ADD OBJECT(JSON) IN THE LAST INDEX OF arrayData
    }
    console.log(arrayData)
    saveData(arrayData) //PASS THE ARRAY IN THE SAVEDATA FUNCTION
    inputData.value=""
    displayData()
    inputbutton.innerHTML="Save"
        statement=statement+""
})


function saveData(arrayData) {
    let convert = JSON.stringify(arrayData) //convert json file to string
    localStorage.setItem("task",convert)    //set data to local storage
}

function displayData() {
    let statement=""
    arrayData.forEach((task,i) => {  //pass the array and the array index
        statement=statement+`
        <div class="show">
        <div class="taskno">
        <p>${i+1}.</p>
        </div>
            <div class="textContainer">
                <p>${task.task1}</p>    
            </div>
            <div class="logo">
                <i class="fa-solid fa-pencil fa-xl" onclick="editData(${i})"></i>
                <i class="fa-solid fa-trash fa-lg" onclick="deleteData(${i})"></i>
            </div>
        </div>`
        
    });
    display.innerHTML=statement
}

function editData(i) {
    edit = i
    inputData.value = arrayData[i].task1
    inputbutton.innerHTML="Save Changes"
}

function deleteData(i) {
    arrayData.splice(i,1) //delete the items
    saveData(arrayData)   //save the updated array
    displayData()          //to display the updated array
}