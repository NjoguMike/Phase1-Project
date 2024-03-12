
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

const notes_url = "https://biblenotepad.free.beeceptor.com/notes"

function loadNotes(){
    const intro_note = document.getElementById('intro_notes')

    fetch(`${notes_url}`)
    .then(resp => resp.json())
    .then(resp => intro_note.innerText = `${resp[0].note}`)
    .catch(error => {
        console.log(error)
    })
}

document.addEventListener('DOMContentLoaded',randomVerse())
document.addEventListener('DOMContentLoaded',loadNotes())

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
            bibleContent.innerText = `${respData.book_name} ${respData.chapter[chapter.value].chapter} : ${respData.chapter[verse.value-1].verse_num} `
            quotedVerse.innerText = respData.chapter[verse.value-1].verse_text
        })
        .catch(error => {
            alert("Sorry cannot display data as requested!")
            console.log(error.message)
        })

}

function contentDisplay(event){
    event.preventDefault()
    bookHandler(searchData())
}

const form = document.getElementById("search").addEventListener('submit',contentDisplay)


//Data to Store 
const formHandler = (event)=>{
    event.preventDefault()

    const savedNotes= document.getElementById('notes')
    savedNotes.innerHTML = `<p> ${document.getElementById('formpad').value} </p>`

}

const submitForm = document.getElementById('submitForm').addEventListener('submit',formHandler)

