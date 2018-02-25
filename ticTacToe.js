var PLAYER_TOKEN = '';
var COMPUTER_TOKEN = '';
var SINGLE_PLAYER = true;
var player1Score = 0;
var player2Score = 0;
var player1Turn = false;
var player1Starts = false;

// A $( document ).ready() block.
$( document ).ready(function() {

	const grid = [
		[' ',' ',' '],
		[' ',' ',' '],
		[' ',' ',' ']
	];


    function gameTypeSelected() {
    	$(".screen-start").css('z-index', 0);
    	$(".screen-start").css('opacity', 0);

		$(".screen-second").css('z-index', 10);
    	$(".screen-second").css('opacity', 1);   	
    }



    function simbolSelected() {
		$(".screen-second").css('z-index', 0);
    	$(".screen-second").css('opacity', 0);

    	$(".blocks").css('z-index', 10);
    	$(".blocks").css('opacity', 1);

	 	$(".placar").css('opacity', 1); 

	 	$(".player1-turn").css('bottom', 0);   	

	 	$(".player1-turn").css('bottom', "-100%");
		$(".player2-turn").css('bottom', 0);

	 	if (SINGLE_PLAYER) {
			setTimeout(function() {computerMove()}, 1000);
    	} 
    }




    $( ".sect-one" ).click(function() {
    	SINGLE_PLAYER = true;
    	$(".player2-turn").html("Computer's turn");
    	$(".player2-score").html("Computer: 0");
	  	gameTypeSelected();
	});




	$( ".sect-two" ).click(function() {
		SINGLE_PLAYER = false;
		$(".player2-turn").html("Player2's turn");
		$(".player2-score").html("Player2: 0");
	  	gameTypeSelected();
	});




	$( ".sect-x" ).click(function() {
	  	PLAYER_TOKEN = 'X';
	  	COMPUTER_TOKEN = 'O';
	  	simbolSelected();
	});




	$( ".sect-o" ).click(function() {
		PLAYER_TOKEN = 'O';
		COMPUTER_TOKEN = 'X';
	  	simbolSelected();
	});



    $( ".reset" ).click(function() {
    	resetGame();
	});


	$(".grid-block").click(function () {

		var gameState = gameOver(grid);

		$this = $(this);
		const i = $this.data('i');
		const j = $this.data('j');

		if (grid[i][j] === ' ') {
			if (SINGLE_PLAYER) {
				if (player1Turn) {
					player1Turn = false;
					$this.html(PLAYER_TOKEN);
					grid[i][j] = PLAYER_TOKEN;
					
					gameState = gameOver(grid);

					if (gameState === true || gameState === PLAYER_TOKEN || gameState === COMPUTER_TOKEN) {
						
						$(".player1-turn").css('bottom', "-100%");
						$(".player2-turn").css('bottom', "-100%");
						endGame(gameState);
						return;
					}

					$(".player1-turn").css('bottom', "-100%");
					$(".player2-turn").css('bottom', 0);

	 				setTimeout(function() {computerMove()}, 1000);
				}
			}else {
				if (player1Turn) {
					player1Turn = false;
					$this.html(PLAYER_TOKEN);
					grid[i][j] = PLAYER_TOKEN;

					gameState = gameOver(grid);

					if (gameState === true || gameState === PLAYER_TOKEN || gameState === COMPUTER_TOKEN) {
						$(".player1-turn").css('bottom', "-100%");
						$(".player2-turn").css('bottom', "-100%");
						endGame(gameState);
						return;
					}

					$(".player1-turn").css('bottom', "-100%");
					$(".player2-turn").css('bottom', 0);

				}else {
					player1Turn = true;
					$this.html(COMPUTER_TOKEN);
					grid[i][j] = COMPUTER_TOKEN;
					
					gameState = gameOver(grid);

					if (gameState === true || gameState === PLAYER_TOKEN || gameState === COMPUTER_TOKEN) {
						
						$(".player1-turn").css('bottom', "-100%");
						$(".player2-turn").css('bottom', "-100%");
						endGame(gameState);
						return;
					}

					$(".player1-turn").css('bottom', 0);
					$(".player2-turn").css('bottom', "-100%");
				}
			}
		}
	});



	function endGame(gameState) {
		
		if (gameState === true) {
			$(".screen-end-game").html("It was a draw...");
		}else if (gameState === PLAYER_TOKEN) {
			player1Score += 1;

			if (SINGLE_PLAYER) {
				$(".player1-score").html("You: "+player1Score);
				$(".screen-end-game").html("You win!");
			}else {
				$(".player1-score").html("Player1: "+player1Score);
				$(".screen-end-game").html("Player1 win!");
			}	
		}else if (gameState === COMPUTER_TOKEN) {
			player2Score += 1;

			if (SINGLE_PLAYER) {
				$(".player2-score").html("Computer: "+player2Score);
				$(".screen-end-game").html("You lose!");
			}else {
				$(".player2-score").html("Player2: "+player2Score);
				$(".screen-end-game").html("Player2 win!");
			}
		}		


		$(".screen-end-game").css('opacity', 0.8);
		$(".screen-end-game").css('z-index', 100);

		setTimeout(function(){restart()}, 3000);
	}








	function resetGame() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				grid[i][j] = ' ';
				
				$('.grid-block[data-i='+i+'][data-j='+j+']').html(' ');		
			}	
		}

		$(".screen-end-game").css('opacity', 0);
		$(".screen-end-game").css('z-index', 0);

		$(".screen-start").css('z-index', 10);
    	$(".screen-start").css('opacity', 1);

		$(".screen-second").css('z-index', 0);
    	$(".screen-second").css('opacity', 0);  

    	$(".blocks").css('z-index', 0);
    	$(".blocks").css('opacity', 0);

	 	$(".placar").css('opacity', 0); 

		PLAYER_TOKEN = '';
		COMPUTER_TOKEN = '';
		SINGLE_PLAYER = true;
		player1Score = 0;
		player2Score = 0;
		player1Turn = false;
		player1Starts = false;


	 	$(".player1-turn").css('bottom', "-100%");
		$(".player2-turn").css('bottom', "-100%");

	}





	function computerMove() {
		const move =  minmax(grid, 0, COMPUTER_TOKEN);

		grid[move[0]][move[1]] = COMPUTER_TOKEN;
		
		$('.grid-block[data-i='+move[0]+'][data-j='+move[1]+']').html(COMPUTER_TOKEN);
		
		var gameState = gameOver(grid);

		if (gameState === true || gameState === PLAYER_TOKEN || gameState === COMPUTER_TOKEN) {
			
			$(".player1-turn").css('bottom', "-100%");
			$(".player2-turn").css('bottom', "-100%");
			endGame(gameState);
			return;
		}

		$(".player1-turn").css('bottom', 0);
		$(".player2-turn").css('bottom', "-100%");

	 	player1Turn = true;


	}













	function restart() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				grid[i][j] = ' ';
				
				$('.grid-block[data-i='+i+'][data-j='+j+']').html(' ');		
			}	
		}

		$(".screen-end-game").css('opacity', 0);
		$(".screen-end-game").css('z-index', 0);


		if (player1Starts) {
			player1Starts = false;
			player1Turn = false;

			$(".player1-turn").css('bottom', "-100%");
			$(".player2-turn").css('bottom', 0);

			if (SINGLE_PLAYER) {
				setTimeout(function() {computerMove()}, 1000);
			}

		}else {
			player1Starts = true;
			player1Turn = true;
			$(".player1-turn").css('bottom', 0);
			$(".player2-turn").css('bottom', "-100%");

		}
	}



















	function gameOver(arr) {

		// Check horizontal
		for (var i = 0; i < 3; i++) {
			if (arr[i][0] != ' ' &&
			 	arr[i][0] == arr[i][1] &&
			 	arr[i][0] == arr[i][2]) {
				return arr[i][0];
			}
		}

		// Check vertical
		for (var i = 0; i < 3; i++) {
			if (arr[0][i] != ' ' &&
			 	arr[0][i] == arr[1][i] &&
			 	arr[0][i] == arr[2][i]) {
				return arr[0][i];
			}
		}

		// Check diagonal top left bottom right
		if (arr[0][0] != ' ' &&
		 	arr[0][0] == arr[1][1] &&
		 	arr[0][0] == arr[2][2]) {
			return arr[0][0];
		}

		// Check diagonal top right bottom left
		if (arr[0][2] != ' ' &&
		 	arr[0][2] == arr[1][1] &&
		 	arr[0][2] == arr[2][0]) {
			return arr[0][2];
		}

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (arr[i][j] == ' ') {
					return false;
				}
			}	
		}

		return true;
	}
















	// Clones 3x3 arrays
	function clone(arr) {
		var newarr = [[],[],[]];

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				newarr[i][j] = arr[i][j];
			}	
		}

		return newarr;
	}



















	// Returns the best move
	function minmax(arr, depth, player) {
		const gameState = gameOver(arr);

		if (gameState === false) {
			const values = [];
			const moves = [];

			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					const newarr = clone(arr);
					
					if (newarr[i][j] !== ' ') continue;
					
					newarr[i][j] = player;
					
					const value = minmax(newarr, depth+1, (player === PLAYER_TOKEN) ? COMPUTER_TOKEN : PLAYER_TOKEN);
					
					values.push(value);
					moves.push([i, j]);
				}	
			}


			if (player === COMPUTER_TOKEN) {
				const max = Math.max(...values);

				if (depth === 0) {
					return moves[values.indexOf(max)];
				}else {
					return max;
				}
			}else {
				const min = Math.min(...values);

				if (depth === 0) {
					return min[values.indexOf(min)];
				}else {
					return min;
				}
			}

		}else if (gameState === true) {
			return 0;
		}else if (gameState === PLAYER_TOKEN) {
			return depth - 10;
		}else if (gameState === COMPUTER_TOKEN) {
			return 10 - depth;
		}
	}

});