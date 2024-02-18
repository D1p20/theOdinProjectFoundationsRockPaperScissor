const computerSelection = getComputerChoice();
const playerSelection = getPlayerSelection();


//prompt for player input 
function getPlayerSelection(){
    let a = true;
    let returnValue = ""
    let message= "ROCK , PAPER or SCISSOR you cheeser:";
    while(a===true){
        let userInput = prompt(message)
        if (userInput.toLowerCase()== "rock" || userInput.toLowerCase()== "paper"|| userInput.toLowerCase() == "scissor" ){
            returnValue = userInput.toLowerCase()
            a =false
    }else{message = "Stop being a silly goose(rock/paper/scissor)" }
        
    }
     return returnValue
}

// use random number to chose player move from an array 
function getComputerChoice(){
    const rPs = ["rock","paper","scissor"];
    let computerChoice = Math.floor((Math.random()*3));
    return rPs[computerChoice];
}

// rock beats scissor > scissor beats paper > paper beats rock
//player plays rock against paper = loose
//player plays paper against scissor = loose
//player plays scissor against rock = loose
//player plays rock against scissor = win
//player plays paper against rock = win
//player plays scissor against paper = win
function playRound(playerSelection, computerSelection) {
    let result = "";
    console.log(`${playerSelection} + ${computerSelection}`)
    if (playerSelection === computerSelection){
        result = "It's a Tie!";
    }else if (playerSelection=="rock" && computerSelection == "paper"){
        result = "You Lose Mongoose!!"
    }else if (playerSelection=="paper" && computerSelection == "scissor"){
        result = "You Lose Mongoose!!"}else if (playerSelection=="scissor" && computerSelection == "rock"){
            result = "You Lose Mongoose!!"}else{
                result = "WIN! WIN! WIN!"
            }
    return result;
    
  }
  
  //alert(playRound(playerSelection, computerSelection))
  console.log(playRound(playerSelection, computerSelection));
