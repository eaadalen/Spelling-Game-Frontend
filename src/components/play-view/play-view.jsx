import "./play-view.scss"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import checkmark from '../../../media/checkmark.svg';
import xmark from '../../../media/xmark.svg';
import fire_0_3 from '../../../media/fire-0-3.png';
import fire_1_3 from '../../../media/fire-1-3.png';
import fire_2_3 from '../../../media/fire-2-3.png';
import fire_3_3 from '../../../media/fire-3-3.png';

export const PlayView = () => {
    const [spelling, setSpelling] = useState("");
    const [word, setWord] = useState("");
    const [sound, setSound] = useState();
    const [strikes, setStrikes] = useState(1);
    const [score, setScore] = useState(100);
    const [streak, setStreak] = useState(1);
    const [correctOpen, setCorrectOpen] = useState(false);
    const [incorrectOpen, setIncorrectOpen] = useState(false);
    const [fire_pic1, setfire_pic1] = useState(fire_0_3);
    const [fire_pic2, setfire_pic2] = useState(false);
    const [fire_pic3, setfire_pic3] = useState(false);
    const csv = require("csv-parse")

    useEffect(() => {
      getSound();
    }, []);

    async function generateWord() {
      const response = await fetch("https://random-word-api.herokuapp.com/word")
      const response_json = await response.json()
      return response_json


    }

    async function getSoundID(random) {
      var dict_url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + random + "?key=aede8a6f-61af-4667-bd27-95b2786bca10";
      const response = await fetch(dict_url)
      const response_json = await response.json()
      try {
        var temp_word = response_json[0]["meta"]["id"]
        if (temp_word.includes("-") == false && 
            temp_word.includes(":") == false && 
            temp_word.includes(" ") == false && 
            /\d/.test(temp_word) == false) {
          setWord(String(response_json[0]["meta"]["id"]).toLowerCase())
          return String(response_json[0]["hwi"]["prs"][0]["sound"]["audio"])
        }
        getSound();
      } catch (error) {
        getSound();
      }
    }

    async function create_sound_URL(raw_word, soundID) {
      var sound_url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/"  + raw_word[0].charAt(0) + "/" + soundID + ".mp3";
      fetch(sound_url)
      .then(res => res.blob())
      .then((myBlob) => {
          const objectURL = URL.createObjectURL(myBlob);
          const newAudioURL = objectURL;
          var a = new Audio(newAudioURL);
          setSound(a);
      })
      .catch(err => {
        getSound();
        return 0
      })
    }

    async function getSound() {
      const random_word = await generateWord()
      const calc_soundID = await getSoundID(random_word)
      await create_sound_URL(random_word, calc_soundID)
    };

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const playSound = () => {
      console.log(word)
      sound.play()
    };

    const setFire = (fire_streak) => {
      switch(fire_streak) {
        case 0:
          setfire_pic1(fire_0_3)
          setfire_pic2(false)
          setfire_pic3(false)
          break;
        case 1:
          setfire_pic1(fire_1_3)
          break;
        case 2:
          setfire_pic1(fire_2_3)
          break;
        case 3:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_0_3)
          break;
        case 4:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_1_3)
          break;
        case 5:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_2_3)
          break;
        case 6:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_3_3)
          setfire_pic3(fire_0_3)
          break;
        case 7:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_3_3)
          setfire_pic3(fire_1_3)
          break;
        case 8:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_3_3)
          setfire_pic3(fire_2_3)
          break;
        case 9:
          setfire_pic1(fire_3_3)
          setfire_pic2(fire_3_3)
          setfire_pic3(fire_3_3)
          break;
      }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (spelling == word) {
          setCorrectOpen(true)
          await sleep(1000)
          setCorrectOpen(false)
          if (streak < 4) {
            setScore(score + 100)
          }
          else if (streak >= 4 && streak < 7) {
            setScore(score + 200)
          }
          else if (streak >= 7 && streak < 10) {
            setScore(score + 300)
          }
          else {
            setScore(score + 500)
          }
          setStreak(streak + 1)
          setFire(streak)
          getSound();
        }
        else {
          setIncorrectOpen(true)
          await sleep(1000)
          setIncorrectOpen(false)
          setStrikes(strikes + 1)
          setStreak(1)
          setFire(0)
          if (strikes <= 2) {
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
            <div className="counter">Score: {score-100}</div>
            <div className="counter">
              <div className="streak">Streak</div>
              <div>
                {fire_pic1 && !fire_pic2 && !fire_pic3 &&
                  <div>
                    <img src={fire_pic1} height="30"/>
                  </div>
                }
                {fire_pic1 && fire_pic2 && !fire_pic3 &&
                  <div>
                    <img src={fire_pic1} height="30"/>
                    <img src={fire_pic2} height="30"/>
                  </div>
                }
                {fire_pic1 && fire_pic2 && fire_pic3 &&
                  <div>
                    <img src={fire_pic1} height="30"/>
                    <img src={fire_pic2} height="30"/>
                    <img src={fire_pic3} height="30"/>
                  </div>
                }
              </div>
              </div>
            <div className="counter">Strikes: {strikes-1}</div>
        </div>
    </div>
  );
};