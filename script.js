const startButton = document.getElementById('startButton');
const scoreboard = document.getElementById('scoreboard');
const logList = document.getElementById('logList');
const race100m = document.getElementById('race100m');
const longjump = document.getElementById('longJump');
const highjump = document.getElementById('highJump');
const awardCeremony = document.getElementById('awardCeremony');
const colorGuess = document.getElementById('colorGuess');
const submitGuess = document.getElementById('submitGuess');
const winnnerList = document.getElementById('winnerList');

const score = {
    Red: 0,
    Blue: 0,
    Yellow: 0
};

// when user clicks on the button the program will start
startButton.addEventListener('click', async () => {
    // initially make null everything
    race100m.style.display = 'none';
    longjump.style.display = 'none';
    highjump.style.display = 'none';
    awardCeremony.style.display = 'none';
    scoreboard.style.display = 'none';

    score.Red = 0;
    score.Blue = 0;
    score.Yellow = 0;

    await race100M();
    scoreboard.textContent = `Red: ${score.Red}, Blue: ${score.Blue}, Yellow: ${score.Yellow}`;
    scoreboard.style.display = 'block';
    logEvent('Race 100 M', scoreboard.textContent);

    await longJump();
    scoreboard.textContent = `Red: ${score.Red}, Blue: ${score.Blue}, Yellow: ${score.Yellow}`;
    logEvent('Long Jump', scoreboard.textContent);

    await highJump();
    scoreboard.textContent = `Red: ${score.Red}, Blue: ${score.Blue}, Yellow: ${score.Yellow}`;
    logEvent('High Jump', scoreboard.textContent);

    awardShow();
});

// Convert race100M to return a Promise for async flow
function race100M() {
    return new Promise(resolve => {
        race100m.style.display = 'block';
        logList.innerHTML = '';
        setTimeout(() => {
            const red = Math.random() * 10;
            const blue = Math.random() * 10;
            const yellow = Math.random() * 10;

            const scores = [
                { color: 'Red', score: red },
                { color: 'Blue', score: blue },
                { color: 'Yellow', score: yellow }
            ];
            scores.sort((a, b) => b.score - a.score);

            score[scores[0].color] += 10;
            score[scores[1].color] += 5;
            score[scores[2].color] += 2;
            resolve();  // Proceed after the timeout
        }, 2000);
    });
}

function longJump() {
    return new Promise(resolve => {
        longjump.style.display = 'block';
        setTimeout(() => {
            const red = Math.random() * 10;
            const blue = Math.random() * 10;
            const yellow = Math.random() * 10;

            const scores = [
                { color: 'Red', score: red },
                { color: 'Blue', score: blue },
                { color: 'Yellow', score: yellow }
            ];
            scores.sort((a, b) => b.score - a.score);

            score[scores[0].color] += 10;
            score[scores[1].color] += 5;
            score[scores[2].color] += 2;
            resolve();  // Proceed after the timeout
        }, 2000);
    });
}

// Convert highJump to handle user input and be async
function highJump() {
    return new Promise(resolve => {
        highjump.style.display = 'block';  // Show High Jump event

        const red = Math.random() * 10;
        const blue = Math.random() * 10;
        const yellow = Math.random() * 10;

        const scores = [
            { color: 'Red', score: red },
            { color: 'Blue', score: blue },
            { color: 'Yellow', score: yellow }
        ];

        scores.sort((a, b) => b.score - a.score);  // Sort by score descending
        const highJumpWinner = scores[0].color;  // The winner

        score[scores[0].color] += 10;
        score[scores[1].color] += 5;
        score[scores[2].color] += 2;

        submitGuess.addEventListener('click', ()=>{
            const userGuess= colorGuess.value.trim().toLowerCase();
            if (userGuess === highJumpWinner.toLowerCase()) {
                alert(`Correct! ${highJumpWinner} wins the High Jump!`);
            } else {
                alert(`Sorry, the correct color is ${highJumpWinner}.`);
            }
        })
        // Wait for 10 seconds before letting the user guess
        setTimeout(() => {
            resolve();
        }, 10000);  // Wait for 10 seconds before allowing the user to guess
    });
}

// Event logging function
function logEvent(event, winner) {
    logList.innerHTML += `
        <li style='color:green;'>${event}: ${winner}</li>
    `;
}

// Award ceremony function
function awardShow() {
    awardCeremony.style.display = 'block';
    winnnerList.textContent = `Red: ${score.Red}, Blue: ${score.Blue}, Yellow: ${score.Yellow}`;
}
