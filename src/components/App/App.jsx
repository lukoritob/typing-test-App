import React from 'react';
import ChallengeSection from '../ChallengeSection/ChallengeSection';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import { SAMPLE_PARAGRAPHS } from "../../data/samplePagraphs";
import Nav from '../Nav/Nav';
import './App.css';

const TotalTime = 60;
const serviceUrl = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
  selectedParagraph: '',
  timerStarted: false,
  timeRemaining: TotalTime,
  words: 0,
  characters: 0,
  wpm: 0,
  testInfo: [],
}
class App extends React.Component {
  state = DefaultState;
  fetchNewParagraphFallback = () => {
    const data = SAMPLE_PARAGRAPHS[
      Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
    ];
    const selectedParagraphArray = data.split("");
    const testInfo = selectedParagraphArray.map(selectedLetter => {
      return {
        testLetter: selectedLetter,
        status: "notAttempted",
      };
    });
    this.setState({
      ...DefaultState,
      testInfo,
      selectedParagraph: data,
    })
  }
  fetchNewParagraph = () => {
    fetch(serviceUrl)
      .then((response) => response.text())
      .then((data) => {
        const selectedParagraphArray = data.split("");
        const testInfo = selectedParagraphArray.map(selectedLetter => {
          return {
            testLetter: selectedLetter,
            status: "notAttempted",
          };
        });
        this.setState({
          ...DefaultState,
          testInfo,
          selectedParagraph: data,
        })

      })
  }
  componentDidMount() {
    this.fetchNewParagraphFallback()
  }
  startAgain = () => this.fetchNewParagraphFallback();
  handleUserInput = (inputValue) => {
    if (!this.state.timerStarted) this.startTimer()
    const characters = inputValue.length; //number of characters that I have typed
    const words = inputValue.split(" ").length; //We are going to have an array
    const index = characters - 1;
    if (index < 0) {
      this.setState({
        testInfo: [
          {
            testLetter: this.state.testInfo[0].testLetter,
            status: "notAttempted"
          },
          ...this.state.testInfo.slice(1)
        ],
        characters,
        words,
      })
      return;
    }
    if (index >= this.state.selectedParagraph.length) {
      this.setState({
        characters,
        words,
      });
      return;
    }
    // Make a copy of testInfo
    const testInfo = this.state.testInfo;
    if (!(index === this.state.selectedParagraph.length - 1))
      testInfo[index + 1].status = "notAttempted";
    //check for the correct typed letters
    const isCorrect = inputValue[index] === testInfo[index].testLetter;

    //update the testInfo
    testInfo[index].status = isCorrect ? "correct" : "incorrect";

    //Update the state
    this.setState({
      testInfo,
      words,
      characters,
    })

  };
  startTimer = () => {
    this.setState({ timerStarted: true });
    const timer = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        // change the WPM as well
        const timeSpent = TotalTime - this.state.timeRemaining;
        const wpm = timeSpent > 0
          ? (this.state.words / timeSpent) * TotalTime
          : 0;
        this.setState({ //updates state
          timeRemaining: this.state.timeRemaining - 1,
          wpm: parseInt(wpm),
        })
      } else (clearInterval(timer));
    }, 1000)
  };
  render() {
    console.log("Test Info!", this.state.testInfo)
    return (
      <div className='app'>
        <Nav />
        <LandingPage />
        <ChallengeSection
          selectedParagraph={this.state.selectedParagraph}
          words={this.state.words}
          characters={this.state.characters}
          wpm={this.state.wpm}
          timeRemaining={this.state.timeRemaining}
          timerStarted={this.state.timerStarted}
          testInfo={this.state.testInfo}
          onInputChange={this.handleUserInput}
          startAgain={this.startAgain}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
