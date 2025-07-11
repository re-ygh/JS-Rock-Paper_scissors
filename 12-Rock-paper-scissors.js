let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
};

document.querySelector('.js-rock-button')
    .addEventListener('click', () =>{
        playgame('rock');
});
document.querySelector('.js-paper-button')
    .addEventListener('click', () =>{
        playgame('paper');
});
document.querySelector('.js-scissors-button')
    .addEventListener('click', () =>{
        playgame('scissors');
});
document.querySelector('.js-reset-score-button')
    .addEventListener('click', () =>{
        playgame('resetScore');
});
document.querySelector('.js-auto-play-button')
    .addEventListener('click', () =>{
        autoPlay();
});

document.body.addEventListener('keydown', (event) =>{
    console.log(event.key);
    if (event.key === 'r') {
        playgame('rock');
    } else if (event.key === 'p') {
        playgame('paper');
    } else if (event.key ==='s') {
        playgame('scissors');
    } else if (event.key === 'Shift') {
        playgame('resetScore');
    } else if (event.key === 'a') {
        autoPlay();
    }
});

function updateSocre(){
    document.querySelector('.scores')
    .innerHTML = `Wins: ${score.wins},  losses: ${score.losses},  ties: ${score.ties}`;
}
updateSocre();

function playgame(playerMove) {
    computerMove = pickcomputerMove();
    if ( playerMove == 'Scissors' ) {
        if (computerMove === 'rock'){
            result = 'you lose';
        }else if (computerMove === 'Scissors'){
            result = 'tie';
        }else if (computerMove === 'paper'){
            result = 'you win';
        }
    } else if(playerMove === 'rock' ){
        if (computerMove === 'rock'){
            result = 'tie';
        } else if (computerMove === 'Scissors'){
            result = 'you win';
        } else if (computerMove === 'paper'){
            result = 'you lose';
        }
    } else if(playerMove === 'paper' ){
        if (computerMove === 'rock'){
            result = 'you win';
        } else if (computerMove === 'Scissors'){
            result = 'you lose';
        } else if (computerMove === 'paper'){
            result = 'tie';
        }
    }else if(playerMove === 'resetScore'){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        alert('Score has been reset');
        updateSocre();

        document.querySelector('.js-result')
        .innerHTML = `Waiting for you to play`;

        document.querySelector('.js-choices')
        .innerHTML = `Waiting for you to play`;
        return;
    }
    
    if(result === 'you win'){
        score.wins++;
    }else if(result === 'you lose'){
        score.losses++;
    }else if(result === 'tie'){ 
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateSocre();

    document.querySelector('.js-result')
    .innerHTML = `${result}`;

    document.querySelector('.js-choices')
    .innerHTML = `you picked <img src="Rock Paper Scissors_files/${playerMove}-emoji.png" alt="${playerMove}" class="move-icon"> computer picked 
    <img src="Rock Paper Scissors_files/${computerMove}-emoji.png" alt="${computerMove}" class="move-icon">`;
}
function pickcomputerMove(){
    let computerMove = '';
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < (1/3)){
        computerMove = 'rock';
    } else if (randomNumber >= (1/3) && randomNumber < (2/3)){
        computerMove = 'Scissors';
    } else if (randomNumber >=(2/3) && randomNumber < 1){
        computerMove = 'paper';
    }
    return computerMove;
}

let isPlaying = false;
let intervalID;
function autoPlay(){
    if(!isPlaying){
        intervalID = setInterval(function(){
            const playerMove = pickcomputerMove();
            playgame(playerMove);
        }, 1000)
        isPlaying = true;
        console.log(intervalID);
    } else {
        clearInterval(intervalID);
        isPlaying = false;
    }
}