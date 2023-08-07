
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
        .then(respData => firstVerse(respData))
        .catch(error => {
            alert("Sorry Can't Display Verse!")
            console.log(error.message)
        })
}

function firstVerse(verseData){
    const book_name = verseData[0].book_name
    const chapter = verseData[0].chapter
    const verse = verseData[0].verse
    const version = verseData[0].translation_id
    const bookDetails = document.querySelector("p")
    const displayVerse = document.querySelector("#random")

    bookDetails.innerText = `${book_name} ${chapter} : ${verse} ${version}`
    displayVerse.innerText = verseData[0].text

}

document.addEventListener('DOMContentLoaded',randomVerse())

// Content Display

    const bookName = document.querySelector("#searchinput")
    const chapter = document.querySelector("#chapter")
    const verse = document.querySelector("#verse")
    const bibleContent = document.getElementById('bibleContent')
    const quotedVerse = document.getElementById('quotedVerse')

function searchData(){

    const chapterUrl = `https://bible-memory-verse-flashcard.p.rapidapi.com/get_chapter?book_name=${bookName.value}&chapter=${chapter.value}&text_mode=full`

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
            console.log(respData)
            bibleContent.innerText = `${respData.book_name} ${respData.chapter[chapter.value].chapter} : ${respData.chapter[verse.value-1].verse_num} `
            quotedVerse.innerText = respData.chapter[verse.value-1].verse_text
        })
        .catch(error => {
            alert("Server Error!")
            console.log(error.message)
        })

}

function contentDisplay(event){
    event.preventDefault()
    bookHandler(searchData())
}

const form = document.getElementById("search").addEventListener('submit',contentDisplay)


//Data to Store
const localDb = "https://thebiblenotepad.netlify.app/formdata.json"
    
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

