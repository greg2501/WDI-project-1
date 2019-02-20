window.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board')


  //create gameboard
  for(let i = 0; i < 720; i++) {
    const square = document.createElement('div')
    square.className = 'square'
    square.id = i
    board.appendChild(square)
  }
  const gameBoard = document.querySelectorAll('.square')


  //spawn player
  const player = {
    position: 705
  }
  gameBoard[player.position].classList.add('player')

  let playerIndex = player.position

  // player actions
  function movePlayer(e) {
    gameBoard.forEach((square => square.classList.remove('player')))
    if(playerIndex > 690) {
      playerIndex--
    }
    if(playerIndex < 719) {
      playerIndex++
    }
    switch(e.keyCode) {
      case 37:
        playerIndex--
        gameBoard[playerIndex].classList.add('player')
        break
      case 39:
        playerIndex++
        gameBoard[playerIndex].classList.add('player')
        break
    }
  }

  //add laser
  const laser = {
    position: []
  }

  function shooting(e) {
    const laserIndex = playerIndex
    switch(e.keyCode) {
      case 32:
        gameBoard[playerIndex].classList.add('laser')
        laser.position.push(laserIndex)
        break
    }
  }

  function moveLaser() {
    for(let x = 0; x < laser.position.length; x++) {
      if (laser.position[x] < 0) {
        laser.position = laser.position.filter(laser => laser > 0)
        // squareElement[missile.position[x]].classList.remove('missile')
      } else {
        gameBoard[laser.position[x]].classList.remove('laser')
        laser.position[x] = laser.position[x] - 30
        gameBoard[laser.position[x]].classList.add('laser')
      }
    }
  }

  // place aliens on board
  const alien = {
    position: [3, 5, 7, 9, 11, 34, 36, 38, 40, 63, 65, 67, 69, 71]
  }
  const alienIndex = alien.position

  gameBoard[3].classList.add('alien')
  gameBoard[5].classList.add('alien')
  gameBoard[7].classList.add('alien')
  gameBoard[9].classList.add('alien')
  gameBoard[11].classList.add('alien')
  gameBoard[34].classList.add('alien')
  gameBoard[36].classList.add('alien')
  gameBoard[38].classList.add('alien')
  gameBoard[40].classList.add('alien')
  gameBoard[63].classList.add('alien')
  gameBoard[65].classList.add('alien')
  gameBoard[67].classList.add('alien')
  gameBoard[69].classList.add('alien')
  gameBoard[71].classList.add('alien')



  // move aliens
  const aliens = document.querySelectorAll('.alien')
  let movesMade = 0
  setInterval(() => {
    movesMade++
    for(let i = 0; i < aliens.length; i++) {
      if (movesMade === 30) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 30
        gameBoard[alien.position[i]].classList.add('alien')
        alien.position.push(alienIndex)
        movesMade = 0
      } else if (movesMade === 15) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 30
        gameBoard[alien.position[i]].classList.add('alien')
        alien.position.push(alienIndex)
      } else if(movesMade < 15) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 1
        gameBoard[alien.position[i]].classList.add('alien')
        alien.position.push(alienIndex)
      }  else if (movesMade > 15 && movesMade < 30) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] - 1
        gameBoard[alien.position[i]].classList.add('alien')
        alien.position.push(alienIndex)
      }
    }
  }, 1000)


  window.setInterval(moveLaser, 50)
  window.addEventListener('keydown', shooting)
  window.addEventListener('keydown', movePlayer)
}) //page end
