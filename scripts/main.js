window.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board')
  const play = document.querySelector('.play')

  play.addEventListener('click', () => {
    score = 0
    scoreBoard.textContent = score
  })

  const shootSound = document.getElementById('shoot')
  shootSound.src = 'sound/shoot.wav'
  const explosionSound = document.getElementById('explosion')
  explosionSound.src = 'sound/explosion.wav'
  const invaderKilledSound = document.getElementById('invaderKilled')
  invaderKilledSound.src = 'sound/invaderKilled.wav'

  //create gameboard
  for(let i = 0; i < 720; i++) {
    const square = document.createElement('div')
    square.className = 'square'
    square.id = i
    board.appendChild(square)
  }
  const gameBoard = document.querySelectorAll('.square')

  // place aliens on board
  const alien = {
    position: [3, 5, 7, 9, 11, 34, 36, 38, 40, 63, 65, 67, 69, 71]
  }

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
  let gameOver = false
  const aliens = document.querySelectorAll('.alien')
  let movesMade = 0

  const timer = setInterval(() => {
    if (gameOver) {
      return
    }
    movesMade++
    for(let i = 0; i < aliens.length; i++) {

      if (alien.position[i] > 689) {
        gameOver = true
        clearInterval(timer)
        alert('game over')
        return
      }

      if (movesMade === 30) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 30
        gameBoard[alien.position[i]].classList.add('alien')
        // alien.position.push(alienIndex)
        movesMade = 0
      } else if (movesMade === 15) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 30
        gameBoard[alien.position[i]].classList.add('alien')
        // alien.position.push(alienIndex)
      } else if (movesMade > 15 && movesMade < 30) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] - 1
        gameBoard[alien.position[i]].classList.add('alien')
        // alien.position.push(alienIndex)
      } else if(movesMade < 15) {
        gameBoard[alien.position[i]].classList.remove('alien')
        alien.position[i] = alien.position[i] + 1
        gameBoard[alien.position[i]].classList.add('alien')
        // alien.position.push(alienIndex)
      }
    }
  }, 500)

  //add alien attack
  const alienAttack = {
    position: []
  }

  const alienAttacking = setInterval(() => {
    const alienIndex = alien.position
    const attackerIndex = Math.floor(Math.random()*alienIndex.length)
    alienAttack.position.push(alien.position[attackerIndex])
    console.log('attack position', alien.position[attackerIndex])
  }, 500)

  //alien attack movement
  function attackMove() {
    for(let x = 0; x < alienAttack.position.length; x++) {
      if (alienAttack.position[x] < 0) {
        alienAttack.position = alienAttack.position.filter(alienAttack => alienAttack > 720)
      } else if (gameBoard[alienAttack.position[x]] !== undefined){
        gameBoard[alienAttack.position[x]].classList.remove('alienAttack')
        alienAttack.position[x] = alienAttack.position[x] + 30
        gameBoard[alienAttack.position[x]].classList.add('alienAttack')
      }
      checkAttackHit(x)
    }
  }


  //add player
  const player = {
    position: 705
  }
  gameBoard[player.position].classList.add('player')

  let playerIndex = player.position

  // player move
  function movePlayer(e) {
    gameBoard.forEach((square => square.classList.remove('player')))
    const originalIndex = playerIndex
    if(playerIndex > 690) {
      playerIndex--
    }
    if(playerIndex < 718) {
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
      default:
        gameBoard[originalIndex].classList.add('player')
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
        shootSound.play()
        gameBoard[playerIndex].classList.add('laser')
        laser.position.push(laserIndex)
        break
    }
  }
  //
  function moveLaser() {
    for(let x = 0; x < laser.position.length; x++) {
      if (laser.position[x] < 0) {
        laser.position = laser.position.filter(laser => laser > 0)
      } else {
        gameBoard[laser.position[x]].classList.remove('laser')
        laser.position[x] = laser.position[x] - 30
        gameBoard[laser.position[x]].classList.add('laser')
      }
      checkHit(x)
    }
  }

  //make scoreboard
  const scoreBoard = document.querySelector('.score')
  let score = 0

  //check hit for player laser
  function checkHit(laserElement) {
    const laserIndex = laser.position[laserElement]
    for (let x = 0; x < alien.position.length; x++) {
      if (alien.position[x] === laserIndex) {
        alien.position.splice(x, 1)
        laser.position.splice(laserElement, 1)
        gameBoard[laserIndex].classList.remove('alien', 'laser')
        invaderKilledSound.play()
        score++
        scoreBoard.textContent = score + '000'
        if (score === 14) {
          clearInterval(timer)
          alert('You win')
        }
      }
    }
  }

  //check hit for alien attack
  function checkAttackHit(attackerElement) {
    const attackIndex = alienAttack.position[attackerElement]
    if (playerIndex === attackIndex) {
      explosionSound.play()
      gameBoard[attackIndex].classList.remove('player', 'alienAttack')
      scoreBoard.textContent = score
      clearInterval(timer)
      clearInterval(alienAttacking)
      alert('Game Over')
    }
  }



  window.setInterval(attackMove, 100)
  window.setInterval(moveLaser, 25)
  window.addEventListener('keydown', shooting)
  window.addEventListener('keydown', movePlayer)
}) //page end
