import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'gray',
    cursor: 'move'
}

const cardSource = {
    beginDrag (props) {
        return {
            id: props.id,
            index: props.index
        }
    }
}

const cardTarget = {
    hover (props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        if (dragIndex === hoverIndex) {
            return
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const clientOffset = monitor.getClientOffset()

        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        props.moveCard(dragIndex, hoverIndex)

        monitor.getItem().index = hoverIndex
    }
}

class Card extends Component {
    render () {
        const { card, isDragging, connectDragSource, connectDropTarget } = this.props
        const opacity = isDragging ? 0 : 1

        return connectDragSource(connectDropTarget(
            <div style={{ ...style, opacity }}>
                {card.text}
            </div>
        ))
    }
}

export default flow(
    DropTarget('CARD', cardTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource('CARD', cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(Card)