class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.dealer = false;
    this.pickedCards = [];
    this.score = 0;
    this.totalScore = 0;
    this.blackjack = "no";
  }
  playCard(cardSelected, cardsPicked, game) {
    // get obj card played and push it in this.pickedCards
    this.pickedCards.push(
      this.hand.filter((card) => card.name === cardSelected)[0]
    );
  }
  // score(){
  //   let score = this.hand.reduce((count,card)=> count += card.value, 0)
  //   console.log(score)
  //   return score
  // }
}
