import React, {Component} from 'react';
import './Queen.scss';

const Queen = () => {
    return (
        <div className="cell queen"></div>
    )
}

const Cell = () => {
    return (
        <div className="cell"></div>
    )
}

const Row = ({row, n}) => {
    return (
        <div className="row">
            {Array(n).fill().map((cell, index) => index === row ? <Queen key={index} /> : <Cell key={index} />)}
        </div>
    )
}

class QueenBacktracking extends Component {
    constructor() {
        super();
        this.hasConflict.bind(this);
        this.placeNextQueen.bind(this);
        this.printBoard.bind(this);
        this.getColumns.bind(this);
    }

    printBoard(columns) {
        const n = columns.length;

        return (
            <div className="board">
            {columns.map((row, index) => <Row n={n} row={row} key={index} />)}
            </div>
        )
    }

    async getColumns(queensNumber) {
        return await this.place_next_queen(queensNumber, queensNumber);
    }

    hasConflict(columns) {
        let len = columns.length, last = columns[len - 1], previous = len - 2

        while (previous >= 0) {
          if (columns[previous] === last) return true
          if (last - (len - 1) === columns[previous] - previous) return true
          if (last + (len - 1) === columns[previous] + previous) return true
          previous--
        }

        return false
    }

    placeNextQueen(total, queens, columns) {
        if (queens === 0) return columns
        columns = columns || []

        for (let column = 0; column < total; column++) {
          columns.push(column)
          //iterations++
          if (!this.hasConflict(columns) &&
              this.placeNextQueen(total, queens - 1, columns)) {
            return columns
          }
          columns.pop(column)
        }

        return null
      }


      render() {
        const queens = this.props.queensNumber;
        const queensNumber = (queens && queens >= 4 && queens <= 20) ? queens : 4;
        return (
            <div>
                <div>Problem {queensNumber} hetmanow z nawracaniem</div>
                {this.printBoard(this.placeNextQueen(queensNumber, queensNumber))}
            </div>
        )
    }
}

export default class QueenBacktrackingContainer extends Component {
    constructor() {
        super();
        this.state = { queensNumber: 4 };
        this.setNumberOfQueens.bind(this);
    }

    setNumberOfQueens(event) {
        this.setState({queensNumber: event.target.value});
    }

    render() {
        return (
            <div>
                <h1>Problem N-Hetmanow</h1>
                <input type="number" name="queensNumber" max={20} onChange={this.setNumberOfQueens.bind(this)}/>
                <QueenBacktracking queensNumber={this.state.queensNumber} />
            </div>
        )
    }
}