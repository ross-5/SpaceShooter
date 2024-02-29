document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const resultDisplay = document.querySelector('#result')
  let width = 15
  let currentPlayerIndex = 202
  let currentEnemyIndex = 0
  let enemiesDefeated = []
  let result = 0
  let direction = 1
  let enemyID

  //Spawning the enemies
  const enemies = [
    0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,
    21,22,23,24,30,31,32,33,34,35,36,37,
    38,39
  ]

  //Moving the enemies
  enemies.forEach( enemy => squares[currentEnemyIndex + enemy].classList.add('enemy'))

  //Spawning player
  squares[currentPlayerIndex].classList.add('player')

  //Moving the player
  function movePlayer(e) {
    squares[currentPlayerIndex].classList.remove('player')
    switch(e.keyCode) {
      case 37:
        if(currentPlayerIndex % width !== 0) currentPlayerIndex -=1
        break
      case 39:
        if(currentPlayerIndex % width < width -1) currentPlayerIndex +=1
        break
    }
    squares[currentPlayerIndex].classList.add('player')
  }
  document.addEventListener('keydown', movePlayer)

  //moving enemies
  function moveEnemies() {
    const leftEnd = enemies[0] % width === 0
    const rightEnd = enemies[enemies.length -1] % width === width - 1

    if((leftEnd && direction === -1) || (rightEnd && direction === 1)){
      direction = width
    } else if (direction === width){
      if (leftEnd) direction =1
      else direction = -1
    }
    for (let i = 0; i <= enemies.length -1; i++){
      squares[enemies[i]].classList.remove('enemy')
    }
    for (let i = 0; i <= enemies.length -1; i++){
      enemies[i] += direction
    }
    for (let i = 0; i <= enemies.length -1; i++){
      if (!enemiesDefeated.includes(i)){
      squares[enemies[i]].classList.add('enemy')
      }
    }
    // Game Over Logic
    if(squares[currentPlayerIndex].classList.contains('enemy','player')){
      resultDisplay.textContent = 'Game Over'
      squares[currentPlayerIndex].classList.add('boom')
      clearInterval(enemyID)
    }

    for(let i = 0; i <= enemies.length -1; i++)
      if(enemies[i] > (squares.length - (width-1))){
        resultDisplay.textContent = 'Game Over'
        clearInterval(enemyID)
      }

      //win logic
      if(enemiesDefeated.length === enemies.length) {
        resultDisplay.textContent = 'You Win'
        clearInterval(enemyID)
      }
  }

  enemyID = setInterval(moveEnemies, 500)

  //shooting Logic
  function shoot(e) {
    let laserID
    let currentLaserIndex = currentPlayerIndex
    //moving the laser from player to enemies
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      if(squares[currentLaserIndex].classList.contains('enemy')){
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('enemy')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),250)
        clearInterval(laserID)

        const enemyDefeated = enemies.indexOf(currentLaserIndex)
        enemiesDefeated.push(enemyDefeated)
        result++
        resultDisplay.textContent = result
      }

      if(currentLaserIndex < width){
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'),100)
      }
    }

    switch(e.keyCode) {
      case 32:
        laserID = setInterval(moveLaser, 100)
        break
    }
  }
document.addEventListener('keyup', shoot)
})
