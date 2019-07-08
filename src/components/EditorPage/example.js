import React from 'react';
import update from 'immutability-helper';
import Card from './card';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: props.data,
    };
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];
    this.setState({
      cards: update(cards, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      }),
    });
  };

  render() {
    const { cards } = this.state;
    return (
      <div>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            name={card.name}
            url={card.url}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    );
  }
}

export default Container;
