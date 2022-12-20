function solution(input) {
  let sumOfXWins = 0
  let sumOfYWins = 0
  let sumOfInvalid = 0

  const isHorizontalWinner = (symbol, board) => {
    return board.some((moves) => moves.every((move) => move === symbol))
  }

  const transposeBoard = (board) => {
    return board.map((_, index) => board.map((row) => row[index]))
  }

  const isVerticalWinner = (symbol, board) => {
    return transposeBoard(board).some((moves) =>
      moves.every((move) => move === symbol),
    )
  }

  const getDiagonalMoves = (board) => {
    const diagonalMoves = []
    const equalBasedDiagonal = [] // i === j
    const sumBasedDiagonal = [] // i + j == n -1

    // Check for left to right diagonal moves
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        if (row === col) {
          equalBasedDiagonal.push(board[row][col])
        }
      }
    }

    // Check for right to left diagonal moves
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        if (row + col === board.length - 1) {
          sumBasedDiagonal.push(board[row][col])
        }
      }
    }

    diagonalMoves.push(equalBasedDiagonal, sumBasedDiagonal)
    return diagonalMoves
  }

  const isDiagonalWinner = (symbol, board) => {
    return getDiagonalMoves(board).some((moves) =>
      moves.every((move) => move === symbol),
    )
  }

  const isWinner = (symbol, board) =>
    isHorizontalWinner(symbol, board) ||
    isVerticalWinner(symbol, board) ||
    isDiagonalWinner(symbol, board)

  const checkIfBoardIsValid = (board) => {
    let sumOfX = 0
    let sumOfY = 0

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 'x') {
          sumOfX++
        } else if (board[i][j] === 'o') {
          sumOfY++
        }
      }
    }

    if (sumOfY > sumOfX + 1 || sumOfX > sumOfY + 2) {
      return false
    }

    return true
  }

  for (let i = 0; i < input.length; i++) {
    const currentItem = input[i]
    const boardInput = currentItem.split(' ')[0]

    const inputSelections = currentItem.split(boardInput)[1]

    const splitBoard = inputSelections.split(' ').filter((item) => item != '')
    const formattedBoard = splitBoard.map((item) => Array.from(item))

    const isXWins = isWinner('x', formattedBoard)
    const isOWins = isWinner('o', formattedBoard)

    if ((isXWins && isOWins) || !checkIfBoardIsValid(formattedBoard)) {
      sumOfInvalid++
    } else if (isXWins) {
      sumOfXWins++
    } else if (isOWins) {
      sumOfYWins++
    }
  }

  return `x: ${sumOfXWins} o: ${sumOfYWins} invalid: ${sumOfInvalid}`
}


const input = [
  '3x3 xxx oo- oxx ',
  '2x2 xo x-',
  '4x4 xoxo xoxo x--- xo--',
  '3x3 xxo ooo oox',
  '3x3 xxx ooo —-',
]

console.log(solution(input))
