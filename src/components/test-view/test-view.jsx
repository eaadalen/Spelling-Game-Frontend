import { useState, useEffect } from "react";

export const TestView = () => {

    const [word, setWord] = useState("")

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function generateWord() {
        const response = await fetch("https://random-word-api.herokuapp.com/word")
        const response_json = await response.json()
        return response_json[0]
    }

    const generateWordBank = (validated_word) => {
        const data = {
          Spelling: validated_word
        }
        
        fetch(
          "https://spelling-game-ef1de28a171a.herokuapp.com/words",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
    }
    
    async function generateValidatedWord() {
      const response = await fetch("https://spelling-game-ef1de28a171a.herokuapp.com/random")
      const response_json = await response.json()
      return response_json[0]["Spelling"]
    }
    
    async function getAudioID(random) {
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
      } catch (error) {
        return undefined
      }
      
    }

    async function generateAudioObject(raw_word, soundID) {
        var sound_url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/"  + raw_word.charAt(0) + "/" + soundID + ".mp3";
        var newAudioURL = null
        var a = null
        await fetch(sound_url)
        .then(res => res.blob())
        .then((myBlob) => {
            newAudioURL = URL.createObjectURL(myBlob)
            a = new Audio(newAudioURL)
        })
        .catch(error => {
            //console.log(error)
        })
        return a
    }

    async function getSound() {
      const random_word = await generateWord()
      const calc_soundID = await getAudioID(random_word)
      if (calc_soundID != undefined) {
        const audioObject = await generateAudioObject(random_word, calc_soundID)
        return audioObject
      }
    }

    async function playSound() {
      var i = 0
      var audio = null
      while (i < 10) {
        getSound().then(response => audio = response)
        await sleep(2000)
        if (audio) {
          console.log(word)
          //audio.play()
          generateWordBank(word)
        }
        else {
          console.log("false")
        }
        i = i + 1
        audio = false
      }
    }
    
    return (
      <div className="container">
          <button className="button" onClick={playSound}>Play Sound</button>
      </div>
    )
}