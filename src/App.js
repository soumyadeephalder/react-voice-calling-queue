import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Zero from './sounds/0.mp3';
import One from './sounds/1.mp3';
import Two from './sounds/2.mp3';
import Three from './sounds/3.mp3';
import Four from './sounds/4.mp3';
import Five from './sounds/5.mp3';
import Six from './sounds/6.mp3';
import Seven from './sounds/7.mp3';
import Eight from './sounds/8.mp3';
import Nine from './sounds/9.mp3';
import AlphabetA from './sounds/A.mp3';
import AlphabetB from './sounds/B.mp3';
import AlphabetD from './sounds/D.mp3';
import AlphabetE from './sounds/E.mp3';
import AlphabetF from './sounds/F.mp3';
import AlphabetG from './sounds/G.mp3';
import AlphabetH from './sounds/H.mp3';
import ServiceNo from './sounds/serviceNo.mp3';
import Welcome from './sounds/welcome.mp3';
import Suffix from './sounds/suffix.mp3';

class App extends Component {

  player = null;
  sources = []

  state = {
    source: null,
  }

  convertCharToVoice = (character) => {
    let result = null;
    switch (character) {
      case '0':
        result = Zero
        break;
      case '1':
        result = One
        break;
      case '2':
        result = Two
        break;
      case '3':
        result = Three
        break;
      case '4':
        result = Four
        break;
      case '5':
        result = Five
        break;
      case '6':
        result = Six
        break;
      case '7':
        result = Seven
        break;
      case '8':
        result = Eight
        break;
      case '9':
        result = Nine
        break;
      case 'A':
        result = AlphabetA
        break;
      case 'B':
        result = AlphabetB
        break;
      case 'D':
        result = AlphabetD
        break;
      case 'E':
        result = AlphabetE
        break;
      case 'F':
        result = AlphabetF
        break;
      case 'G':
        result = AlphabetG
        break;
      case 'H':
        result = AlphabetH
        break;
      default:
        break;
    }
    return result;
  }

  generateVoiceFromString = (txtQueue, stationNo) => {

    //Change String to Array & Match with audio file
    let voiceQueue = txtQueue.split('').map((character) => {
      return this.convertCharToVoice(character)
    })

    //Match with audio file
    let voiceStationNo = this.convertCharToVoice(stationNo);
    this.sources = [Welcome, ...voiceQueue, ServiceNo, voiceStationNo, Suffix]
    this.setState({ source: this.sources.shift() })
  }

  onEnded = () => {
    if (this.state.source !== this.sources[0]) {
      this.setState({ source : this.sources.shift()})
    } else {
      this.sources.shift()
      this.player.seekTo(0)
    }
  }

  render() {
    const { source } = this.state
    return (
      <ReactPlayer url={source} playing onEnded={this.onEnded} ref={player => { this.player = player }} />
    )
  }

  componentDidMount() {
    this.generateVoiceFromString('A112', '3')
  }
}

export default App;
