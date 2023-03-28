console.log("welcome");
//data of song
let mysongs = [
    { name: 'Muhammad Ka Roza', songpath: 'songs/1.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Yeh Subha Madina', songpath: 'songs/2.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Makkah Yaad Aata Hai', songpath: 'songs/3.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Do Aalam Tumhara Hua', songpath: 'songs/4.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Jaga Ji Lagane Ki Dunya Nahe Hai', songpath: 'songs/5.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Meetha Meetha Pyara Pyara', songpath: 'songs/6.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Qaseeda Burda Sharif', songpath: 'songs/7.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Allah Ho Allah Ho', songpath: 'songs/8.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Zahe Muqaddar Huzoor e Haq Se', songpath: 'songs/9.mp3', picpath: 'logo.jpg', dur: 0 },
    { name: 'Ae Khatame Khelay Ambiya', songpath: 'songs/10.mp3', picpath: 'logo.jpg', dur: 0 },
   

]
let length = mysongs.length;

let rangebar = document.getElementById('rangeid');
let totalDuration = document.getElementById("totalDurationid");

let song_count = 1;

let song = `songs/${song_count}.mp3`
let songs = new Audio(song)
let last_song;

// creation of div

for (let i = 0; i < length; i++) {
    let s1 = `songs/${1 + i}.mp3`
    let s2 = new Audio(s1)
    
    const parentDiv = document.getElementById("parent-div");

    const songcontainer = document.createElement("div");
    songcontainer.innerHTML =
        `<img src="${mysongs[i].picpath}" alt="" class="titleimg">
      <span class="titlesong">${mysongs[i].name}</span>
      <span><i><img src="play1.png" class="playsongs alt=""></i></span>`;


    songcontainer.classList.add('songcontainer');
    songcontainer.setAttribute('id', `${mysongs[i].songpath}`);

    parentDiv.appendChild(songcontainer);
}



let playsongs = Array.from(document.getElementsByClassName('songcontainer'));




function updateRangeBar(currentTime, duration) {
    completeness = ((songs.currentTime / songs.duration) * 100);
    rangebar.value = completeness;
    let mint = Math.floor(songs.currentTime / 60);
    let sec = Math.floor(songs.currentTime % 60);
    totalDuration.textContent = `${mint}:${sec} / ${Math.floor((songs.duration) / 60)}:${Math.floor((songs.duration) % 60)}`;
    if (songs.currentTime == songs.duration) {
        ToStop(songs, last_song)
      
        const img = document.querySelector('#playid');
        img.src = 'play.png';
      
        
    }
}


function updatePlaybtn(songs) {
    last_song=song;
    if (songs.paused || songs.time <= 0) {

        const img = document.querySelector('#playid');
        img.src = 'pause.png';
        
      
        ToPlay(songs, song)
    }
    else {
        ToStop(songs, last_song)
        const img = document.querySelector('#playid');
        img.src = 'play.png';
    }
}


function ToPlay(songs, song) {


    let currentSongDiv = document.getElementById(song);
    currentSongDiv.classList.add("playing");
    songs.play()
}
function ToStop(songs, prev_song) {



    currentSongDiv = document.getElementById(prev_song);

    currentSongDiv.classList.remove("playing");
    songs.pause()
}



playsongs.forEach((element, i) => {

    element.addEventListener('click', (e) => {

        song = mysongs[i].songpath

        song_count = i + 1;


        if (songs.paused || songs.time <= 0) {
            songs = new Audio(song)

            ToPlay(songs, song)
            const img = document.querySelector('#playid');
            img.src = 'pause.png';
            last_song = song;

        }
        else {
           
            ToStop(songs, last_song)
            const img = document.querySelector('#playid');
            img.src = 'play.png';
        }

        songs.addEventListener('timeupdate', () => {
            updateRangeBar(song.currentTime, song.duration);

        })


    })


})

//play and stop song
let playbtn = document.getElementById('playid')


playbtn.addEventListener('click', () => {
    updatePlaybtn(songs)


})

//duration of song 
let forwardbtn = document.getElementById('forwardid');
forwardbtn.addEventListener('click', () => {

    if (song_count == length) {
        song_count = 1
    }
    else {

        song_count += 1
    }
    song = `songs/${song_count}.mp3`


    if (songs.paused || songs.time <= 0) {
        songs = new Audio(song)
        const img = document.querySelector('#playid');
        img.src = 'pause.png';
        ToPlay(songs, song)
        last_song = song

    }
    else {
        ToStop(songs, last_song)
        songs = new Audio(song)
        ToPlay(songs, song)
        const img = document.querySelector('#playid');
        img.src = 'pause.png';
        last_song = song


    }
    songs.addEventListener('timeupdate', () => {
        updateRangeBar(song.currentTime, song.duration);

    })



})


let backbtn = document.getElementById('backid');
backbtn.addEventListener('click', () => {

    if (song_count == 1) {
        song_count = length
    }
    else {
        song_count -= 1

    }
    song = `songs/${song_count}.mp3`


    if (songs.paused || songs.time <= 0) {
        songs = new Audio(song)
      
        const img = document.querySelector('#playid');
        img.src = 'pause.png';
        ToPlay(songs, song)
        last_song = song;



    }
    else {
      
        ToStop(songs, last_song)
        songs = new Audio(song)
        ToPlay(songs, song)
        const img = document.querySelector('#playid');
        img.src = 'pause.png';
        last_song = song


    }
    songs.addEventListener('timeupdate', () => {
        updateRangeBar(song.currentTime, song.duration);

    })



})
songs.addEventListener('timeupdate', () => {
    updateRangeBar(songs.currentTime, songs.duration)

})


rangebar.addEventListener('change', () => {
    songs.currentTime = (rangebar.value * songs.duration) / 100;
})





