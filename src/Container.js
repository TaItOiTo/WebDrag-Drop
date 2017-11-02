import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import update from 'react-addons-update'
import Card from './Card'

const style = {
    width: '100%',
    color: 'white'
}

class Container extends Component {
    constructor (props) {
        super(props)
        this.state = {
            cards: [{
                id: 1,
                text: 'Yota Nagai'
            }, {
                id: 2,
                text: 'Takuya Nioka'
            }, {
                id: 3,
                text: 'Yukina Sakai'
            }, {
                id: 4,
                text: 'Taito Ito'
            }, {
                id: 5,
                text: 'Nagai Yota'
            }, {
                id: 6,
                text: 'Nioka Takuya'
            }, {
                id: 7,
                text: 'Sakai Yukina'
            }]
        }
    }

    pushCard (card) {
        this.setState(update(this.state, {
            cards: {
                $push: [ card ]
            }
        }))
    }

    removeCard (index) {
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1]
                ]
            }
        }))
    }

    moveCard (dragIndex, hoverIndex) {
        const { cards } = this.state
        const dragCard = cards[dragIndex]

        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }))
    }

    render () {
        const { cards } = this.state
        const { connectDropTarget } = this.props

        return connectDropTarget(
            <div style={style}>
                {cards.map((card, i) => (
                    <Card
                        key={card.id}
                        card={card}
                        index={i}
                        removeCard={this.removeCard.bind(this)}
                        moveCard={this.moveCard.bind(this)}
                    />
                ))}
            </div>
        )
    }
}

const cardTarget = {
    drop (props, monitor, component) {
        const { id } = props
        const sourceObj = monitor.getItem()
        if (id !== sourceObj.listId) component.pushCard(sourceObj.card)
        return {
            listId: id
        }
    }
}

export default DropTarget('CARD', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Container)