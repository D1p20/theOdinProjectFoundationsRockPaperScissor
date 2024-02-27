const girlAi = document.getElementById("girl");
const promptAi = document.getElementById("prompt");
const bgAudio = document.getElementById("myAudio"); 
const ahAudio = document.getElementById("ah"); 
const giggleAudio = document.getElementById("giggle");
const beepAudio = document.getElementById("beep");
const musicControl = document.getElementById("misic-ctl");
const rock = "🪨";  
const paper = "📜";
const scissor = "✂";
const isTrue =true;
const isFalse = false;
//////////////////////////////////
let gameState = false;
let lastRoundResult="";
let waitTime= 2000;
let count =0;
let pScore = 0;
let cScore =0;
let whoBeatswho = "";


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

//set game state variable from the game loop
function setGameState(a){

    gameState = a
}

//main game loop
function game_loop(){
    
    if (count>15){waitTime = 1000;}
    if (gameState === false){   
    setGameState(isTrue);
    console.log("here")
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[0]].src}">`;
    promptAi.innerHTML=`<p>So,You think you can beat me in</p><p>Scissors/Paper/Rock<p/>
                        <button onclick="buttonClick(),playBgAudio(),setGameState(isTrue),yesGame()" >yes</button>
                        <button onclick="buttonClick(),playBgAudio(),setGameState(isTrue),game_loop()" >no</button>`;
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
    const computerChoices = ["🪨","📜","✂"];
    return computerChoices[Math.floor(Math.random()*3)];
    
}

//get player input and run game
function playerMove(userIput){
    gameState = true;
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
    }else if (playerSelection=="🪨" && computerSelection == "📜"){
            result = "d";
            whoBeatswho=`Your 🪨 gets beaten by my 📜`
            cScore++
    }else if (playerSelection=="📜" && computerSelection == "✂"){
            result = "d";
            whoBeatswho=`Your 📜 gets beaten by my ✂`
            cScore++
    }else if (playerSelection=="✂" && computerSelection == "🪨"){
            result = "d";
            whoBeatswho=`Your ✂ gets beaten by my 🪨`
            cScore++;
    }else{
            result = "v";
            whoBeatswho= `Your ${playerSelection} beats my ${computerSelection}`
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
                        <p>${whoBeatswho}<p/>
                        <p>I'm at <span>${cScore}</span>, you're at <span>${pScore}</span>; first to <span>5</span> wins.</p>`;
}

//computer wins
function computerWins(){
    giggleAudio.play();
    setTimeout(pauseAudio, 1000);
    let randomNumber=Math.floor(Math.random() * 2) + 3;
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[randomNumber]].src}">`;
    promptAi.innerHTML=`<p>I win! You're going down!<p/>
                        <p>${whoBeatswho}<p/>
                        <p>I'm at <span>${cScore}</span>, you're at <span>${pScore}</span>; first to <span>5</span> wins.</p>`;


}

function gameties(){
    
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[1]].src}">`;
    promptAi.innerHTML=`<p>It's a tie!<p/>
                        <p>I'm at <span>${cScore}</span>, you're at <span>${pScore}</span>; first to <span>5</span> wins.</p>`;


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
    setGameState(isFalse);
    pScore = 0;
    cScore =0;
    lastRoundResult="";
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[4]].src}">`;
    promptAi.innerHTML=`<p>Game Over!<p/><p>"You win! go again?"<p/>
                        <button onclick="buttonClick(),playBgAudio(),setGameState(isTrue),yesGame()" >yes</button>
                        <button onclick="buttonClick(),playBgAudio(),setGameState(isTrue),game_loop()" >no</button>`;
    setGameState(isFalse);
    pScore = 0;
    cScore =0;
    lastRoundResult="";
    //setTimeout(game_loop, 2500);    
    }
    else{
    giggleAudio.play();
    setTimeout(pauseAudio, 1000);
    setGameState(isFalse);
    pScore = 0;
    cScore =0;
    lastRoundResult="";
    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[4]].src}">`;
    promptAi.innerHTML=`<p>I win!! You loooooooose!!!<p/><p>Game Over! go again?<p/>
                        <button onclick="buttonClick(),playBgAudio(),setGameState(isTrue),yesGame()" >yes</button>
                        <button onclick="buttonClick(),playBgAudio(),setGameState(isTrue),game_loop()" >no</button>`;
    
    //setTimeout(game_loop, 2500);
    }

    }

function yesGame(){

    girlAi.innerHTML = `<img src="${preloadedImages[imageUrls[1]].src}">`;
    promptAi.innerHTML=`<p>Yes,lets do this!!!<p/<p>Best of <span>5</span> takes it</p>
                        <button onclick="buttonClick(),playerMove(scissor)" >SCISSOR</button>
                        <button onclick="buttonClick(),playerMove(paper)" >PAPER</button>
                        <button onclick="buttonClick(),playerMove(rock)" >ROCK</button>`;

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

//fix for bg audio not playing on load => need improvement
function playBgAudio(){
    if (bgAudio.duration > 0 && !bgAudio.paused){
        //pass
    }else{
        bgAudio.play();
        musicControl.textContent = "musicOFF";
    }
    

}
function pauseBackGroundAudio(){
    musicControl.textContent = "musicON";
    bgAudio.pause();
    bgAudio.currentTime = 0;
}

function checkBgMusic(){

    
    
    if (bgAudio.duration > 0 && !bgAudio.paused) {

        //Its playing...do your job
        pauseBackGroundAudio()
        
        
    
    } else{

        //Not playing...maybe paused, stopped or never played.
        playBgAudio()
        
    }
    

}

function buttonClick(){

    beepAudio.play();
    setTimeout(bpauseAudio, 80);
}
function main(){
    
    const loadScreen= document.getElementById("load_screen");
    document.body.removeChild(loadScreen);

}


function displayImages(i) {
    const loading= document.getElementById("loading");    
    loading.innerHTML= `<img src="${preloadedImages[imageUrls[i]].src}">`;
   
}

window.addEventListener("load",function(){
    game_loop();
    this.setTimeout(displayImages(0),1)
    this.setTimeout(displayImages(1),200)
    this.setTimeout(displayImages(2),400)
    this.setTimeout(displayImages(3),600)
    this.setTimeout(displayImages(4),800)
    this.setTimeout(displayImages(5),1000)
    this.setTimeout(displayImages(6),1200)
    this.setTimeout(main,1400)
    
});