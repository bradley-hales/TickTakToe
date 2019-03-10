class Square {
  constructor() {
    this.value = null;
    this.isHighLighted = false;
  }
}

let playerO = "O";
let playerX = "X";

let gameVue = new Vue({
  el: '#game-view',
  data:{
    inProgress: true,
    winner: null,
    currentTurn: playerO,
    movesMade: 0,
    squares: new Array(9).fill().map(s => new Square())
  },
  computed: {
    infoMessage() {
      if (this.inProgress){
        return "It is " + this.currentTurn + "\'s turn";
      }
      if (this.winner){
        return this.winner + " won!";
      }
      if (!this.winner && !this.inProgress){
        return "It was a tie"
      }
    }
  },
  methods: {
    resetGame (){
      this.inProgress = true;
      this.currentTurn = playerX;
      this.winner = null;
      this.movesMade = 0;
      this.squares = new Array(9).fill().map(s => new Square())
    },
    makeMove(i){
      if (this.inProgress && !this.squares[i].value){
        this.squares[i].value = this.currentTurn;

        this.movesMade ++;
        this.checkForWinner();
        this.currentTurn = (this.currentTurn === playerO) ? playerX: playerO;
      }
    },

    checkForWinner(){
      const winingCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]

      winingCombos.forEach((wc) => {
        const [a,b,c] = wc;
        const sqA = this.squares[a]
        const sqB = this.squares[b]
        const sqC = this.squares[c]

        if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){
          this.inProgress = false;
          this.winner = sqA.value;
          sqA.isHighLighted = sqB.isHighLighted = sqC.isHighLighted = true;
        }
      })

      if (this.movesMade === this.squares.length){
        this.inProgress = false;
      }
    }
  }

});
