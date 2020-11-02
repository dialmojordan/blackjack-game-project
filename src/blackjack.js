class Blackjack {
  constructor(cards) {
    this.cards = cards;
    // this.table = table;
  }

  //deck shuffle
  // function makeRandom(cards) {
  //     for (let i = cards.length - 1; i > 0; i--) {
  //         let j = Math.floor(Math.random() * (i + 1));
  //         let temp = cards[i];
  //         cards[i] = cards[j];
  //         cards[j] = temp;
  //     }
  //     return arr;
  //}
  shuffle(player) {
    let random =  Math.floor(Math.random() * this.cards.length);
    let card = this.cards.splice(random,1)[0]
    player.hand.push(card)
    player.score+=card.value
    return card
  }
}
