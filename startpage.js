
function forwardSearch() {
    let searchTerm = document.getElementById('searchterm').value;
    let searchType = document.getElementsByClassName('active').item(0).id;
    switch(searchType) {
        case 'google':
            searchTerm += '!g';
            break;
        case 'wikipedia':
            searchTerm += '!w';
            break;
        case 'amazon':
            searchTerm += '!a';
            break;
        default:
            break;
    }
    window.location.href = "https://duckduckgo.com/?q=" + searchTerm;
}

function makeActive(id) {
    let options = document.getElementsByClassName('active');
    let current = options.item(0);
    //Will be null on page load. //This is no longer the case, DDG is active by default on page load.
    current.classList.remove('active');
    document.getElementById(id).classList.add('active');
}


//JS Keycodes are 37 left, 39 right, 13 enter.
function handleKeypress(id, e) {
    if(e.keyCode == 13) {
        if(id === 'searchterm'){
            forwardSearch();
        }
        else {
            makeActive(id);
        }
    }
}

function updateClock(){
    let d = new Date();

    let localeString = d.toLocaleString();
    let parsed = localeString.split(',');
    document.getElementById('date').innerText = translateToDayString(d.getDay()) + ', ' + parsed[0];
    document.getElementById('time').innerText = parsed[1];

    //document.getElementById('clock').innerText = d.toLocaleString();
}

function translateToDayString(i) {
    let result = '';
    switch(i) {
        case 0:
            result += 'Sunday';
            break;
        case 1:
            result += 'Monday';
            break;
        case 2:
            result += 'Tuesday';
            break;
        case 3:
            result += 'Wednesday';
            break;
        case 4:
            result += 'Thursday';
            break;
        case 5:
            result += 'Friday';
            break;
        case 6:
            result += 'Saturday';
            break;
    }
    return result;
}

//Randomly choose from 1 of 4 color schemes
function setBackgroundColor() {
    let rand = Math.floor(Math.random()*4);
    switch(rand) {
        case 0:
            document.body.style.backgroundColor = '#130000';
            document.getElementById('clock').style.color = '#AA3333';
            break;
        case 1:
            document.body.style.backgroundColor = '#001300';
            document.getElementById('clock').style.color = '#33AA33';
            break;
        case 2:
            document.body.style.backgroundColor = '#000013';
            document.getElementById('clock').style.color = '#3333AA';
            break;
        case 3:
            document.body.style.backgroundColor = '#131300';
            document.getElementById('clock').style.color = '#AAAA33';
            break;
    }


}

/* ON PAGE LOAD */

setBackgroundColor();
window.setInterval(updateClock, 1000);