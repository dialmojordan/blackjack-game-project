class Blackjack {
  constructor(cards) {
    this.cards = cards;
  }

  //deck shuffle
  shuffle(player) {
    let random = Math.floor(Math.random() * this.cards.length);
    let card = this.cards.splice(random, 1)[0];
    player.hand.push(card);
    player.score += card.value;
    return card;
  }
}
