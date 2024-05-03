import "./play-view.scss"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import checkmark from '../../../media/checkmark.svg';
import xmark from '../../../media/xmark.svg';

export const PlayView = () => {
    const [spelling, setSpelling] = useState("");
    const [word, setWord] = useState("");
    const [sound, setSound] = useState();
    const [strikes, setStrikes] = useState(1);
    const [score, setScore] = useState(100);
    const [streak, setStreak] = useState(1);
    const [correctOpen, setCorrectOpen] = useState(false);
    const [incorrectOpen, setIncorrectOpen] = useState(false);

    useEffect(() => {
      getSound();
    }, []);
    
    async function generateWord() {
      const response = await fetch("https://random-word-api.herokuapp.com/word")
      const response_json = await response.json()
      setWord(response_json)
      return response_json
    }

    async function getSoundID(random) {
      var dict_url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + random + "?key=aede8a6f-61af-4667-bd27-95b2786bca10";
      const response = await fetch(dict_url)
      const response_json = await response.json()
      try {
        return String(response_json[0]["hwi"]["prs"][0]["sound"]["audio"])
      } catch (error) {
        getSound();
      }
    }

    async function create_sound_URL(raw_word, soundID) {
      var sound_url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/"  + raw_word[0].charAt(0) + "/" + soundID + ".mp3";
      fetch(sound_url)
      .then(res => res.blob())
      .then((myBlob) => {
          console.log(sound_url)
          const objectURL = URL.createObjectURL(myBlob);
          const newAudioURL = objectURL;
          var a = new Audio(newAudioURL);
          setSound(a);
      })
      .catch(err => {
        console.log('caught it!',err);
        getSound();
        return 0
      })
    }

    async function getSound() {
      const random_word = await generateWord();
      const calc_soundID = await getSoundID(random_word);
      await create_sound_URL(random_word, calc_soundID);
    };

    const playSound = () => {
      sound.play()
    };

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (spelling == word[0]) {
          setCorrectOpen(true)
          await sleep(1000)
          setCorrectOpen(false)
          if (streak < 3) {
            setScore(score + 100)
          }
          else if (streak >= 3 && streak < 10) {
            setScore(score + 200)
          }
          else {
            setScore(score + 300)
          }
          setStreak(streak + 1)
          console.log("Correct!")
          console.log("Score: " + String(score))
          console.log("Streak: " + String(streak))
          getSound();
        }
        else {
          setIncorrectOpen(true)
          await sleep(1000)
          setIncorrectOpen(false)
          setStrikes(strikes + 1)
          setStreak(1)
          if (strikes > 2) {
            console.log("Strikes: " + String(strikes))
            console.log("Game Over!")
          }
          else {
            console.log("Incorrect!")
            console.log("Strikes: " + String(strikes))
            getSound();
          }
        }
        setSpelling("")
      };
  
  return (
    <div className="container">
        <div className="sub-container">
          <button className="button" onClick={playSound}>Play Sound</button>
            <Form>
                <p></p>
                <div>
                  {correctOpen && 
                    <div className="correct">
                      <img src={checkmark} className="checkmark"/>
                    </div>
                  }
                  {incorrectOpen && 
                    <div className="incorrect">
                      <img src={xmark} className="checkmark"/>
                    </div>
                  }
                  {!correctOpen && !incorrectOpen &&
                    <Form.Group>
                      <Form.Control
                          type="text"
                          value={spelling}
                          onChange={(e) => setSpelling(e.target.value)}
                          placeholder="Start Typing..."
                      />
                    </Form.Group>
                  }
                </div>
                <p></p>
                <button className="button" onClick={handleSubmit}>Submit</button>
            </Form>
        </div>
        <div className="sub-container">
            <p>Score</p>
            <p>Timer</p>
            <p>Strikes</p>
        </div>
    </div>
  );
};