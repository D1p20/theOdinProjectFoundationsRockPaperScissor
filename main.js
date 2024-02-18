let messagePrompt = "Rock/Paper/Scissor";
let finalScore = 0;



//get player input and run game

function playerMove(){
    let count = 0;
    while(count<5){
        const computerSelection = getComputerChoice();
        let userIput= prompt(messagePrompt).toLowerCase();
        if (userIput==='rock'||userIput==='paper'||userIput==='scissor'){
            const computerSelection = getComputerChoice();
            const playerSelection = userIput;
            const playRoundResult = (playRound(playerSelection, computerSelection));
            console.log(renderResult(playRoundResult,computerSelection,playerSelection,count))
             
        count++
        
        }else{messagePrompt="Enter Valid input: Rock/Paper/Scissor" }
        
    }

    alert(`${messagePrompt}`)
    alert (`Final Score ${finalScore}`)
    console.log(`Final Score ${finalScore}`)
}


//get computer input
function getComputerChoice(){
    const computerChoices = ["rock","paper","scissor"]
    return computerChoices[Math.floor(Math.random()*3)]
    
}


//compare

function playRound(playerSelection, computerSelection) {
// rock beats scissor > scissor beats paper > paper beats rock
//player plays rock against paper = loose
//player plays paper against scissor = loose
//player plays scissor against rock = loose===d
//all else = win===v
// else tie ===t
    let result = "";
    if (playerSelection === computerSelection){
        result = "t";
    }else if (playerSelection=="rock" && computerSelection == "paper"){
        result = "d";
    }else if (playerSelection=="paper" && computerSelection == "scissor"){
        result = "d";}else if (playerSelection=="scissor" && computerSelection == "rock"){
            result = "d";}else{
                result = "v";
                finalScore++;
            }
    return result;
  }
  
  //show result
  function renderResult(playRoundResult,computerSelection,playerSelection,count){
        if (playRoundResult ===  "v"){
            messagePrompt = `Score:[${finalScore}/${count+1}] You Win! ${playerSelection} beats ${computerSelection}`

        }else if (playRoundResult ===  "d"){
            messagePrompt = `Score:[${finalScore}/${count+1}] You loose! ${computerSelection} beats ${playerSelection}`

        }else{
            messagePrompt = `Score:[${finalScore}/${count+1}] It's a tie  ${computerSelection} = ${playerSelection}`
        }
        //with out this you cant log to console
        return messagePrompt;
  }

console.log(playerMove());