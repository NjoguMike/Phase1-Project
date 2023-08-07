
// 1.On Page Load, Display a Random Verse (GET)
// 2.I can search for a Bible Verse and Display it (GET)
// 3.Should be able to store user input (POST)

// Starting Verse
function randomVerse(){
    fetch('https://bible-search.p.rapidapi.com/random-verse',{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd98fd694cfmsh584b9fd00210498p13b2dcjsn36aacba6d3f9',
            'X-RapidAPI-Host': 'bible-search.p.rapidapi.com'
	}})
        .then(response => response.json())
        .then(respData => 
            firstVerse(respData)
            )
        .catch(error => {
            alert("Sorry Can't Display Verse!")
            console.log(error.message)
        })
}

function firstVerse(verseData){
    const displayVerse = document.querySelector("#random")
    displayVerse.innerText = verseData[0].text
}

document.addEventListener('DOMContentLoaded',randomVerse())

// Content Display
function searchData(){
    const bookName = document.querySelector("#searchinput").value
    const chapter = document.querySelector("#chapter").value

    const chapterUrl = `https://bible-memory-verse-flashcard.p.rapidapi.com/get_chapter?book_name=${bookName}&chapter=${chapter}&text_mode=full`

 return chapterUrl
}

function bookHandler(url){

    fetch(url,{
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd98fd694cfmsh584b9fd00210498p13b2dcjsn36aacba6d3f9',
            'X-RapidAPI-Host': 'bible-memory-verse-flashcard.p.rapidapi.com'
        }
    })
        .then(response => response.json())
        .then(respData => {
            const verse = document.querySelector("#verse").value
            const quotedVerse = document.getElementById('quotedVerse')

            return quotedVerse.innerText = respData.chapter[verse-1].verse_text
        })
        .catch(error => {
            alert("Server Error!")
            console.log(error.message)
        })

}

function bibleContent(event){
    event.preventDefault()
    bookHandler(searchData())
}

const form = document.getElementById("search").addEventListener('submit',bibleContent)


//Data to Store
const localDb = "http://localhost:3000/users"
    
const formHandler = (event)=>{
    event.preventDefault()

    const notes = document.getElementById('formpad').value
    const userData = {
        id: "",
        takeAway: notes,
    }

    const postData = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(userData)
        }

    fetch(localDb,postData)
        .then(response => response.json())
        .then(resData => console.log(resData))
        .catch(error => {
            alert("Internal Server Error!")
            console.log(error.message)
        })
        console.log(postData)

}

const submitForm = document.getElementById('submitForm').addEventListener('submit',formHandler)

