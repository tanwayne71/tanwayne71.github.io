//#region PageSwitching
//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages

hideall();
function hideall(){ //function to hide all pages
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}

function show(pgno){ //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage=document.querySelector("#page"+pgno);
    //show the page
    onepage.style.display="block";
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/

//() means calls immediately, use {} to make it call on click 
page1btn.addEventListener("click", function () { //annoyomus fucntion
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
//#endregion

//#region Navigation Bar
/*for hamMenu */
const hamBtn=document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
//for the use of menu item and toggle
const menuItemsList=document.querySelector(".menuList");
const menuChildList = document.querySelectorAll(".menuChild");

//have a var for handling status
let isMenuToggled = false;
function toggleMenus(){ /*open and close menu*/
    isMenuToggled = !isMenuToggled;
    // condition ? true execution : false execution
    // assign them to respective style
    var scale = isMenuToggled ? 0.75 : 1;
    var height = isMenuToggled ? 130 : 0;
    var display = isMenuToggled ? 'block' : 'none';
    menuItemsList.style.maxHeight = height + 'px';
    menuChildList.forEach((child) => {child.style.display = display;});
    hamBtn.style.scale = scale;
}//can optimize using toggle class with css transition
//#endregion

//#region Image Handler
//we are only editing images with flex container
//this code implementation is to make it as  flexibile as possible when new images are added 
//getting container first
let imagecontainer = document.querySelectorAll(".flex_container");
//init arr
let images = new Array();
for (let i = 0; i < imagecontainer.length; i++)
{
    //for each container, we get every img inside and for each image inside we push it into the image array
    let image = imagecontainer[i].querySelectorAll("img");
    for (let j = 0; j < image.length; j++){
        images.push(image[j]);
    }
}
console.log(images);
let isImageToggled;
//init an array based on image size
isImageToggled = new Array(images.length);
for (let i = 0; i < images.length; i++)
{
    //we get a  var to handle the status
    isImageToggled[i] = false;
    //add a event listener instead of using hover so all of the image can open at the same time
    //function is covered with function to prevent the function to immediately execute 
    images[i].addEventListener("click", function(){
        toggleImage(i);
    })
}
function toggleImage(indexNo)
{
    //set the status to opposite of what was before
    isImageToggled[indexNo] = !isImageToggled[indexNo];
    //then set style to the status
    var height = isImageToggled[indexNo] ? 1000 : 50;
    images[indexNo].style.maxHeight = height + 'px';
}
//#endregion

//#region Bottom Credits Bar
//creating a dropdown menu for credits 
let credits = document.querySelector(".credits");
let header_credits = credits.querySelector("h2");
let links = credits.querySelector(".links");
header_credits.addEventListener("click", toggleCreditsMenu);

//set status to false
let creditsState = false;
function toggleCreditsMenu()
{
    //assign value respectively
    creditsState = !creditsState;
    header_credits.style.textAlign = creditsState ? "left" : "center";
    header_credits.style.fontSize = creditsState ? "25px" : "40px";
    links.style.display = creditsState ? 'block' : 'none';
}
//#endregion
show(1);

//#region Game
//create a random function for us to get value easier later
function Random(start, end)
{
    return Math.floor(Math.random() * (end - start + 1) ) + start;
}

//select the area where go is going to spawn
let gameArea = document.querySelector(".interactive-space");
//keep track of game object status 
let noOfGameObject = 0;
let gameObjectCaptured = 0;

function GenerateGameobject()
{
    //to prevent overcrowding of element
    if (noOfGameObject >= 5) return;
    //create element
    let newGameobject = document.createElement("img");
    newGameobject.src = "image/grapefruit.png";
    newGameobject.alt = "grapefruit";
    newGameobject.classList.add("game-object");
    newGameobject.style.height = '50px';
    newGameobject.style.width = '50px';
    
    //get the max value
    let maxTop = gameArea.offsetHeight - newGameobject.offsetHeight;
    let maxLeft = gameArea.offsetWidth - newGameobject.offsetWidth;

    //get the random value we want
    let goTop = Random(newGameobject.offsetHeight, maxTop - newGameobject.height * 0.5);
    let goLeft = Random(newGameobject.offsetWidth, maxLeft - newGameobject.width * 0.5);

    //init it
    newGameobject.style.top = goTop+ 'px';
    newGameobject.style.left = goLeft + 'px';

    //append it
    gameArea.appendChild(newGameobject);
    //update status
    noOfGameObject++;
}
GenerateGameobject(); //call once right at the start
setInterval(GenerateGameobject, 5000); //invoke function every 5s

//get handler for updating score visualiser
const score = document.querySelector("#score");
function UpdateGame()
{
    //select all game object
    let allGameObject = document.querySelectorAll(".game-object");
    for (let i = 0; i < allGameObject.length; i++)
    {
        //for each object check if its active
        if(allGameObject[i].matches(":active")){
            //delete and gain point
                allGameObject[i].remove();
                noOfGameObject--;
                gameObjectCaptured++;
        }
    }
    //update text
    score.innerHTML = "Score: " + gameObjectCaptured;
}
//called every 50ms : 20fps
setInterval(UpdateGame, 50);
//#endregion