
let city=prompt("Name of the city: ","");
//show date
let options = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'short'};
let today  = new Date();


let date=document.querySelector('#date').innerHTML=today.toLocaleDateString("en-US",options);



function convertTime(unixTime, offset){
    let dt = new Date((unixTime + offset) * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}



function showWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=99459609326778ff831f3721432b9bd4`)
    .then((response)=>response.json())
    .then((data)=>
    {           
        //icon
        let iconCode=data.weather[0].icon
        let iconUrl="http://openweathermap.org/img/wn/" + iconCode + ".png"
        document.querySelector('#icon').src=iconUrl;

        //Locale time
        document.querySelector('#time').innerHTML=today.toLocaleTimeString('en-US',{timeZone:data.sys.timezone});

        //humidity
        document.querySelector('#humidity').innerHTML=('Humidity: '+data.main.humidity+'%')

        //pressure
        document.querySelector('#pressure').innerHTML=('Pressure: '+data.main.pressure+ ' hPa')

        //wind
        document.querySelector('#wind').innerHTML=('Wind: '+data.wind.speed	+' km/h'+'   '+degToCompass(data.wind.deg))
        function degToCompass(num) {
            var val = Math.floor((num / 22.5) + 0.5);
            var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return arr[(val % 16)];
        }

        //temp

        document.querySelector('#temp').innerHTML=(data.main.temp +' &#8451');

        //feels like
        document.querySelector('#feels').innerHTML=("Feels Like: "+data.main.feels_like+' &#8451')

        //description
        document.querySelector('#description').innerHTML=data.weather[0].description;
    })
}

showWeather();