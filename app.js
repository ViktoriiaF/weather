
//show date
let options = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'short'};
let today  = new Date();


let date=document.querySelector('#date').innerHTML=today.toLocaleDateString("en-US",options);


//show sunrise
function convertTime(unixTime, offset){
    let dt = new Date((unixTime + offset) * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}


function showSunrise(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&units=metric&appid=99459609326778ff831f3721432b9bd4')
    .then((response)=>response.json())
    .then((data)=>
    {   //sunrise
        let sunrise=document.querySelector('#sunrise');
        let sRise = convertTime(data.current.sunrise, data.timezone_offset);
        sunrise.innerHTML=('Sunrise:  '+sRise); 
        
        //icon
        let iconCode=data.current.weather[0].icon
        let iconUrl="http://openweathermap.org/img/wn/" + iconCode + ".png"
        document.querySelector('#icon').src=iconUrl;

        //Locale time
        document.querySelector('#time').innerHTML=today.toLocaleTimeString('en-US',{timeZone:data.timezone});

        //humidity
        document.querySelector('#humidity').innerHTML=('Humidity: '+data.current.humidity+'%')

        //pressure
        document.querySelector('#pressure').innerHTML=('Pressure: '+data.current.pressure+ ' hPa')

        //wind
        document.querySelector('#wind').innerHTML=('Wind: '+data.current.wind_speed	+' km/h'+'   '+degToCompass(data.current.wind_deg))
        function degToCompass(num) {
            var val = Math.floor((num / 22.5) + 0.5);
            var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return arr[(val % 16)];
        }

        //temp

        document.querySelector('#temp').innerHTML=(data.current.temp+' &#8451');

        //feels like
        document.querySelector('#feels').innerHTML=("Feels Like: "+data.current.feels_like+' &#8451')

        //description
        document.querySelector('#description').innerHTML=data.current.weather[0].description;
    })
}

showSunrise();