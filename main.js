const girlAi = document.getElementById("girl");
const promptAi = document.getElementById("prompt");
const bgAudio = document.getElementById("myAudio"); 
const ahAudio = document.getElementById("ah"); 
const giggleAudio = document.getElementById("giggle");
const beepAudio = document.getElementById("beep");
const rock = "rock";
const paper = "paper";
const scissor = "scissor";
let gameState = false;
let lastRoundResult="";
let waitTime= 2000;
let count =0;
let pScore = 0;
let cScore =0;

//music

//preloading images with array
let imageUrls = [
    "./images/a.png",
    "./images/r.png",
    "./images/z.png",
    "./images/w1.png",
    "./images/w2.png",
    "./images/l1.png",
    "./images/l2.png",

];

// Preloaded images object
let preloadedImages = {};

// Preload images
function preloadImages(urls) {
    for (let i = 0; i < urls.length; i++) {
        let img = new Image();
        img.src = urls[i];
        preloadedImages[urls[i]] = img;
    }
}

// Call the preloadImages function with the array of image URLs
preloadImages(imageUrls);

//delete this
function wroking(){

    console.log("uwu")
}

//main game loop
function game_loop(){
    
    if (count>15){waitTime = 1000;}
    if (gameState === false){   
    gameState = true;
    
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[0]].src}">`;
    promptAi.innerHTML=`<p>So,You think you can beat me in</p><p>Scissors/Paper/Rock<p/>
                        <button onclick="buttonClick(),playBgAudio(),yesGame()" >yes</button>
                        <button onclick="buttonClick(),playBgAudio(),game_loop()" >no</button>`;
                        }
    else if(gameState === true && lastRoundResult!==""){
        if(lastRoundResult=== "v"){
            playerWins()
            setTimeout(resetGame, waitTime);
            count++;
        }
        else if (lastRoundResult ==="d"){
            computerWins()
            setTimeout(resetGame, waitTime);
            count++;
        } else{
           gameties()
           setTimeout(resetGame, waitTime);
            count++;
        }

    }
    else{
        giggleAudio.play();
        setTimeout(pauseAudio, 1000);
        girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[1]].src}">`;
        promptAi.innerHTML=`<p>Nah......</p> <p>You have to play!<p/>
                            <button onclick="buttonClick(),playerMove(scissor)" >SCISSOR</button>
                            <button onclick="buttonClick(),playerMove(paper)" >PAPER</button>
                            <button onclick="buttonClick(),playerMove(rock)" >ROCK</button>`;

    }
}

//get computer input
function getComputerChoice(){
    const computerChoices = ["rock","paper","scissor"];
    return computerChoices[Math.floor(Math.random()*3)];
    
}

//get player input and run game
function playerMove(userIput){
    let uInput = userIput;
    const computerSelection = getComputerChoice();
    const playerSelection = uInput;
    playRound(playerSelection, computerSelection);
}



//player plays rock against paper = loose
//player plays paper against scissor = loose
//player plays scissor against rock = loose
//all else = win===v // else tie ===t // loose===d
function playRound(playerSelection, computerSelection) {
    let result = "";
    if (playerSelection === computerSelection){
            result = "t";
    }else if (playerSelection=="rock" && computerSelection == "paper"){
            result = "d";
            cScore++
    }else if (playerSelection=="paper" && computerSelection == "scissor"){
            result = "d";
            cScore++
    }else if (playerSelection=="scissor" && computerSelection == "rock"){
            result = "d";
            cScore++;
    }else{
            result = "v";
            pScore++;           
            }
    
    lastRoundResult = result;
    if(cScore<5 && pScore <5){
        game_loop()
    }else{
        game_over()
    }
    
    
    
  }

//player wins
function playerWins(){
    ahAudio.play();
    setTimeout(pauseAudio, 1000);
    let randomNumber = Math.floor(Math.random() * 2) + 5;
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[randomNumber]].src}">`;
    promptAi.innerHTML=`<p>You Win ! lets go again<p/>
                        <p>I'm at ${cScore}, you're at ${pScore}; first to 5 wins.</p>`;
}

//computer wins
function computerWins(){
    giggleAudio.play();
    setTimeout(pauseAudio, 1000);
    let randomNumber=Math.floor(Math.random() * 2) + 3;
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[randomNumber]].src}">`;
    promptAi.innerHTML=`<p>I win! You're going down!<p/>
                        <p>I'm at ${cScore}, you're at ${pScore}; first to 5 wins.</p>`;


}

function gameties(){
    
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[1]].src}">`;
    promptAi.innerHTML=`<p>It's a tie!<p/>
                        <p>I'm at ${cScore}, you're at ${pScore}; first to 5 wins.</p>`;


}


function resetGame(){


    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[1]].src}">`;
    promptAi.innerHTML=`<p>Lets keep going!!!<p/>
                        <button onclick="buttonClick(),playerMove(scissor)" >SCISSOR</button>
                        <button onclick="buttonClick(),playerMove(paper)" >PAPER</button>
                        <button onclick="buttonClick(),playerMove(rock)" >ROCK</button>`;

}

function game_over(){

    if(pScore>cScore){
    ahAudio.play();
    setTimeout(pauseAudio, 1000);
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[4]].src}">`;
    promptAi.innerHTML=`<p>Game Over!<p/><p>"You win!"<p/>`;
    gameState = false;
    pScore = 0;
    cScore =0;
    setTimeout(game_loop, 5000);    
    }
    else{
    giggleAudio.play();
    setTimeout(pauseAudio, 1000);
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[4]].src}">`;
    promptAi.innerHTML=`<p>I win!! You loooooooose!!!<p/><p>Game Over!<p/>`;
    gameState = false;
    pScore = 0;
    cScore =0;
    setTimeout(game_loop, 5000);
    }

    }

function yesGame(){

    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[1]].src}">`;
    promptAi.innerHTML=`<p>Yes,lets do this!!!<p/<p>Best of 5 takes it</p>
                        <button onclick="buttonClick(),playerMove(scissor)" >SCISSOR</button>
                        <button onclick="buttonClick(),playerMove(paper)" >PAPER</button>
                        <button onclick="buttonClick(),playerMove(rock)" >ROCK</button>`;

}
function playBgAudio(){

    bgAudio.play();
}
function pauseAudio(){
    ahAudio.pause();
    ahAudio.currentTime = 0
    giggleAudio.pause();
    giggleAudio.currentTime = 0
    beepAudio.pause();
    beepAudio.currentTime = 0

}
function bpauseAudio(){
    beepAudio.pause();
    beepAudio.currentTime = 0;

}
function pauseBackGroundAudio(){
    bgAudio.pause();
    bgAudio.currentTime = 0;
}

function buttonClick(){

    beepAudio.play();
    setTimeout(bpauseAudio, 80);
}


game_loop();