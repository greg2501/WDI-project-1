window.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board')


  //create gameboard
  for(let i = 0; i < 400; i++) {
    const square = document.createElement('div')
    square.className = 'square'
    square.id = i
    board.appendChild(square)
  }


  //spawn player
  const player = {
    position: [390]
  }

  const gameBoard = document.querySelectorAll('.square')
  gameBoard[player.position].classList.add('player')

  let playerIndex = player.position

  // player actions
  function movePlayer(e) {

    gameBoard.forEach((square => square.classList.remove('player')))
    if(playerIndex === 380) {
      !playerIndex++
    }
    if(playerIndex === 399) {
      !playerIndex--
    }
    switch(e.keyCode) {
      case 37:
      playerIndex--
      gameBoard[playerIndex].classList.add('player')
      player.position.push(playerIndex)
      break
      case 39:
      playerIndex++
      gameBoard[playerIndex].classList.add('player')
      player.position.push(playerIndex)
      break
    }

    //add laser
    function shooting(e) {
      const laserIndex = playerIndex
      switch(e.keyCode) {
        case 32:
        gameBoard[laserIndex].classList.add('laser')
        laser.position.push(laserIndex)
        break
      }
    }

    // move laser
    const laser = {
      position: []
    }

    function moveLaser() {
      const laserIndex = laser.position
      for(let i = 0; i < laser.position.length; i++) {
        gameBoard[laserIndex].classList.remove('laser')
        laser.position[i] = laser.position[i] - 20
        gameBoard[laser.position[i]].classList.add('laser')

      }
    }
    window.addEventListener('keydown', shooting)
    window.setInterval(moveLaser, 50)
  }
  window.addEventListener('keydown', movePlayer)

  // place aliens on board
  const alien = {
    position: [3, 5, 7, 9, 11]
  }
  const alienIndex = alien.position

  gameBoard[3].classList.add('alien')
  gameBoard[5].classList.add('alien')
  gameBoard[7].classList.add('alien')
  gameBoard[9].classList.add('alien')
  gameBoard[11].classList.add('alien')

  // move aliens
  const aliens = document.querySelectorAll('.alien')
  let movesMade = 0
  // let isMovingRight = true
  setInterval(() => {
    movesMade++
    console.log(movesMade)
    for(let i = 0; i < aliens.length; i++) {
      if (movesMade === 14) {
        movesMade = 0
        // isMovingRight
      } else if(movesMade < 7) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 1
        gameBoard[alien.position[i]].classList.add('alien')
        alien.position.push(alienIndex)
      }  else if (movesMade < 14) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] - 1
        gameBoard[alien.position[i]].classList.add('alien')
        alien.position.push(alienIndex)
      }
    }
  }, 1000)
  setInterval(() => {
    for(let i = 0; i < aliens.length; i++) {
      gameBoard[alien.position[i]].classList.remove('alien')
      alien.position[i] = alien.position[i] + 20
      gameBoard[alien.position[i]].classList.add('alien')
      alien.position.push(alienIndex)
    }
  }, 7000)

}) //page end
