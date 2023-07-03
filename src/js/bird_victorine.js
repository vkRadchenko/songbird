const { birdsData } = require('./bd')
const body = document.querySelector('.victorina__body')

const topImg = document.querySelector('.img__bird_hidden'),
  filterImg = document.querySelector('.img__bg '),
  topBirdName = document.querySelector('.bird__text_hidden')

const topAudioPlayer = document.querySelector('.audio__player'),
  audioTeg = document.querySelector('.audio__top'),
  audio = document.querySelector('.img__circle'),
  imgAudioPlay = document.querySelector('.img__audio_play'),
  imgAudioPause = document.querySelector('.img__audio_pause'),
  timebar = document.querySelector('.timebar'),
  timebarCircle = document.querySelector('.timebar__circle'),
  durationTime = document.querySelector('.duration'),
  nowTime = document.querySelector('.current__time'),
  volumeContainer = document.querySelector('.audio__volume_container'),
  volume = document.querySelector('.audio__volume'),
  playerBottom = document.querySelector('.audio__player_bottom'),
  audioBottomBtn = document.querySelector('.audio__bottom'),
  audioAbout = document.querySelector('.img__circle_bottom'),
  imgAudioPlayBottom = document.querySelector('.img__audio_play_bottom'),
  imgAudioPauseBottom = document.querySelector('.img__audio_pause_bottom')

const questionList = document.querySelector('.question__list')

const birdWinnerImg = document.querySelector('.bird__winner_img'),
  aboutName = document.querySelector('.about__title'),
  aboutSubtitle = document.querySelector('.about__bird_latinname'),
  aboutDescription = document.querySelector('.about__description'),
  aboutStartText = document.querySelector('.hello__text ')

const btnFooter = document.querySelector('.footer__btn'),
  scoreGame = document.querySelector('.score__num')

const audioWin = document.querySelector('.audio__win'),
  audioError = document.querySelector('.audio__error')

const finishContainer = document.querySelector('.finish__game_container'),
  finishScore = document.querySelector('.current__score'),
  restartBtn = document.querySelector('.restart__game_btn')

/// init

let n = 0
let score = 0
let fScore = 0
let winScore = 5

const createQuestionList = (birdsData, n) => {
  for (i = 1; i <= 6; i++) {
    //const birdsNameArr = birdsData[i - 1]

    const namebird = birdsData[n]?.map(({ name }) => {
      return name
    })

    const createLi = document.createElement('li')
    createLi.classList.add('list')
    createLi.textContent = `${namebird[i - 1]}`
    createLi.id = `bird__${i}`

    const createCircle = document.createElement('div')
    createCircle.classList.add('list__circle')
    questionList.append(createLi)
    createLi.prepend(createCircle)
  }
}
createQuestionList(birdsData, n)

///////////////

const generateRightQuestion = () => {
  const n = Math.floor(Math.random() * 6) + 1
  const generateWinQuestion = questionList.querySelector(`#bird__${n}`)
  generateWinQuestion.classList.add('win')
}

generateRightQuestion()

/////////////////

const topQustionBlock = (birdsData, n) => {
  const iterWin = questionList.querySelector('.win')
  const idBird = Number(iterWin.id.split('__').slice(1).join(''))

  const namebird = birdsData[n]
    .filter(({ id }) => id === idBird)
    .map((el) => {
      return el
    })
  const newObj = Object.assign({}, namebird[0])
  topImg.src = newObj.image
}

topQustionBlock(birdsData, n)

/////////////////////////////////////////////
const winIter = () => {
  const iterWin = questionList.querySelector('.win')
  const idBird = Number(iterWin.id.split('__').slice(1).join(''))
  return idBird
}
const idBird = winIter()

const createAudioPlayer = (birdsData, n, idBird, audioTeg) => {
  const namebird = birdsData[n]
    .filter(({ id }) => id === idBird)
    .map((el) => {
      return el
    })

  const audio = namebird[0].audio
  audioTeg.src = audio
}

const play = (audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause) => {
  topAudioPlayer.classList.add('play')
  audioTeg.play()
  imgAudioPlay.classList.add('non')
  imgAudioPause.classList.add('block')
}

const pause = (audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause) => {
  topAudioPlayer.classList.remove('play')
  audioTeg.pause()
  imgAudioPlay.classList.remove('non')
  imgAudioPause.classList.remove('block')
}

audio.addEventListener('click', (event) => {
  const isPlaying = topAudioPlayer.classList.contains('play')
  if (isPlaying) {
    pause(audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause)
  } else {
    play(audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause)
  }
})

audioTeg.addEventListener('timeupdate', (event) => {
  const { target } = event
  const { duration, currentTime } = target

  const progress = (currentTime / duration) * 100

  timebar.style.background = `linear-gradient(to right, rgb(0, 188, 140) ${
    progress / 2
  }%, rgb(61, 133, 140) ${progress}%, rgb(115, 115, 115) 0%, rgb(115, 115, 115) 100%)`

  timebarCircle.style.left = `${progress}%`
  durationTime.textContent = `00:${Math.floor(duration)}`
  nowTime.textContent = `00:${Math.floor(currentTime)}`
})

timebar.addEventListener('click', (event) => {
  const { target } = event
  const { offsetX } = event
  const { clientWidth } = target

  const duration = audioTeg.duration

  audioTeg.currentTime = (offsetX / clientWidth) * duration
})

volumeContainer.addEventListener('click', (event) => {
  const { target } = event
  const { offsetX } = event
  const { clientWidth } = target

  const volumeee = (offsetX / clientWidth) * 100

  audioTeg.volume = offsetX / clientWidth

  volume.style.width = `${volumeee}%`
})

createAudioPlayer(birdsData, n, idBird, audioTeg)

///////////////////////////////////////////////////

const createAboutBird = (birdsData, n, idBird) => {
  const namebird = birdsData[n]
    .filter(({ id }) => id === idBird)
    .map((el) => {
      return el
    })
  const newObj = Object.assign({}, namebird[0])

  aboutStartText.classList.add('non')
  aboutName.textContent = newObj.name
  aboutSubtitle.textContent = newObj.species
  aboutDescription.textContent = newObj.description
  birdWinnerImg.src = newObj.image
}

let clickList = 0

questionList.addEventListener('click', (event) => {
  if (event.target.classList.contains('list')) {
    const { target } = event
    const { id, outerText } = target

    const checkWin = target.classList.contains('win')
    const сircleList = target.querySelector('div')

    playerBottom.classList.remove('non')

    const idBird = Number(id.split('__').slice(1).join(''))
    createAboutBird(birdsData, n, idBird)
    createAudioPlayer(birdsData, n, idBird, audioBottomBtn)

    if (checkWin) {
      clickList += 1
      btnFooter.classList.add('next__level')
      topBirdName.textContent = `${outerText}`
      filterImg.classList.add('non')
      pause(audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause)
      сircleList.style.background = '#1ed760'
      if (clickList === 1) {
        score += winScore
        scoreGame.textContent = score
        audioWin.play(audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause)
      }
    }
    if (!checkWin && clickList === 0) {
      const noDableClick = target.classList.contains('noWin')
      if (!noDableClick) winScore -= 1
      const createNoWinClass = target.classList.add('noWin')
      audioError.play(audioTeg, topAudioPlayer, imgAudioPlay, imgAudioPause)
      сircleList.style.background = '#D62C2C'
    }
  }
})

audioAbout.addEventListener('click', (event) => {
  const isPlaying = playerBottom.classList.contains('play')
  if (isPlaying) {
    pause(audioBottomBtn, playerBottom, imgAudioPlayBottom, imgAudioPauseBottom)
  } else {
    play(audioBottomBtn, playerBottom, imgAudioPlayBottom, imgAudioPauseBottom)
  }
})

const restartGame = (score) => {
  if (score === 30) {
    restartBtn.classList.add('non')
  } else {
    restartBtn.addEventListener('click', (event) => {
      winScore = 5
      score = 0
      clickList = 0

      finishContainer.classList.add('non')
      const progressRestart = document.querySelector('.level__6')
      const progressLevelStart = document.querySelector('.level__1')

      progressRestart.classList.remove('active__link')
      progressLevelStart.classList.add('active__link')

      btnFooter.classList.remove('non')

      body.style.overflow = ''
      scoreGame.textContent = '0'
    })
  }
}

btnFooter.addEventListener('click', (event) => {
  if (event.target.classList.contains('next__level')) {
    if (n <= 5) {
      n += 1
    }
    if (n > 5) {
      finishContainer.classList.remove('non')
      finishScore.textContent = score
      n = 0
      body.style.overflow = 'hidden'
      btnFooter.classList.add('non')
      score = 0
    }

    clickList = 0
    winScore = 5

    playerBottom.classList.add('non')
    filterImg.classList.remove('non')
    aboutStartText.classList.remove('non')
    topBirdName.textContent = '******'
    aboutName.innerHTML = ''
    aboutSubtitle.innerHTML = ''
    aboutDescription.innerHTML = ''
    questionList.innerHTML = ''
    timebar.style = ''
    timebarCircle.style = ''
    birdWinnerImg.src = './asset/sova.svg'

    createQuestionList(birdsData, n)
    generateRightQuestion()
    topQustionBlock(birdsData, n)

    const idBird = winIter()

    createAudioPlayer(birdsData, n, idBird, audioTeg)

    btnFooter.classList.remove('next__level')

    const progressLevelLater = document.querySelector(`.level__${n}`)
    const progressLevelNext = document.querySelector(`.level__${n + 1}`)

    if (progressLevelLater) progressLevelLater.classList.remove('active__link')
    progressLevelNext.classList.add('active__link')

    restartGame(score)
  }
})
