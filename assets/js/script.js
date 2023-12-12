// 72b51ce525ecde69d1900f77e56b0324

function searchCity() {
    let cityInput = document.getElementById('cityInput').value;
    let apiKey = '72b51ce525ecde69d1900f77e56b0324';
    let divElement = document.getElementById('cityDiv');
    let divInfoNames = document.createElement('div');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if(cityInput === ''){
                alert('Digite uma cidade');
            }else{
                divElement.innerHTML = '';

            let name = data.name;
            let main = translateWeather(data.weather[0].main);
            let tempKelvin = data.main.temp;
            let tempCelsius = kelvinToC(tempKelvin);


            let nameText = createParagraph(`${name} | `, 'name-p');
            let mainText = createParagraph(`${main}`, 'main-p');
            let tempText = createParagraph(`${tempCelsius}°C`, 'temp-p');

            divInfoNames.appendChild(nameText);
            divInfoNames.appendChild(mainText);

            divElement.appendChild(divInfoNames);
            divElement.appendChild(divInfoNames);
            divElement.appendChild(tempText);
            }

        })
        .catch(() => {
            divElement.innerHTML = 'Error <br> Essa cidade existe? ';
        });

        document.getElementById('cityInput').value = '';
}

function createParagraph(text, className){
    let p = document.createElement('p');
    let textNode = document.createTextNode(text);
    p.appendChild(textNode);
    p.className = className;
    return p;
}

function kelvinToC(kelvin){
    return Math.floor(kelvin - 273.15);
}

function translateWeather(description){
    const translations = {
        'Clear': 'Limpo',
        'Clouds': 'Nuvens',
        'Rain': 'Chuva',
        'Drizzle': 'Garoa',
        'Snow': 'Neve'
    };
    return translations[description] || description;
}