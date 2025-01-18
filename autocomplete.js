document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save-button').addEventListener('click', function(event) {
        event.preventDefault();
        const inputValue = document.getElementById('input-box').value;
        localStorage.setItem('film', inputValue);
        alert('Film saved: ' + inputValue);
        window.location.href = 'log.html';
    });
});

let availableKeywords = [
    'Dune',
    'Dune 2',
    'Venom: The Last Dance',
    "Howl's Moving Castle",
    "Harry Potter and the Philosopher's Stone",
    "Look Back",
    "Scott Pilgrim vs. The World",
    "The Truman Show",
    "My Neighbor Totoro",
    'Parasite',
    'Drive My Car',
    'Elevation',
    'Gladiator 2',
    'Moana 2',
    'The Grand Budapest Hotel',
    'Mufasa',
    'Red One',
    'Sonic the Hedgehog 3',
    'Lord of the Rings',
    'Wicked',
    'Y2K',
];

const resultBox = document.querySelector('.result-box');
const inputBox = document.getElementById('input-box');

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value;
    if (input.length){
        result = availableKeywords.filter((keyword) =>{
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    display(result);
}

function display(result){
    const content = result.map((list)=>{
        return "<li onclick='selectInput(this)'>" + list + "</li>";
    });

    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    inputBox.value = list.innerHTML;
    resultBox.style.display = 'none';
}