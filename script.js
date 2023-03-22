let wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
info = wrapper.querySelector(".info")
synonyms = wrapper.querySelector(".synonyms .list")
volumeIcon = wrapper.querySelector(".word i")
let audio;


function data(result,word) {
    if (result.title) {
      info.innerHTML= `Can't find the meaning of <span>${word}</span>. Please try to search for another word`;  
    } else{
        console.log(result);
        wrapper.classList.add("active");
  let definitions = result [0].meanings[0].definitions[0];
  phonetics = `${result[0].meanings[0].partOfSpeech[0]} /${result[0].phonetics[0].text} /`   
  
        document.querySelector(".word p").innerText = result[0].word;
         document.querySelector(".word span").innerText = phonetics;
        document.querySelector(".meaning span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
         audio = new Audio("https:" + result[0].phonetics[0].audio);


        if (definitions.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none";
        }else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML="";
        
         for (let i = 0; i < 5; i++) {  // getting 5 synonyms out of many
            let tag = ` <span>${definitions,synonyms[i]}, </span>`;
            synonyms.insertAdjacentHTMl("beforeend", tag)
         } 
        }
    }
}

function fetchApi(word) {
    info.style.color = "black";
    info.innerHTML= `Searching the meaning of <span>"${word}"</span>`;
 let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
 fetch(url).then(res => res.json()).then(result => data(result, word));
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click",()=>{
 audio.play();   
});