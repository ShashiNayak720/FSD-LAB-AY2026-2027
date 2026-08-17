function weatherStatus(code){

    if(code==0) return ["☀️","Sunny"];
    if(code<=3) return ["⛅","Cloudy"];
    if(code<=48) return ["🌫️","Foggy"];
    if(code<=57) return ["🌦️","Drizzle"];
    if(code<=67) return ["🌧️","Rainy"];
    if(code<=77) return ["❄️","Snowy"];
    if(code<=82) return ["🌧️","Showers"];
    if(code<=99) return ["⛈️","Thunderstorm"];

    return ["🌤️","Clear"];
}

async function getWeather(){

    let city=document.getElementById("city").value.trim();
    let result=document.getElementById("result");

    if(!city){
        result.innerHTML="<p>⚠️ Please enter a city name.</p>";
        return;
    }

    result.innerHTML="<p>⏳ Loading weather data...</p>";

    try{

        let g=await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        let geo=await g.json();

        if(!geo.results)
            throw "City not found";

        let {latitude,longitude,name,country}=geo.results[0];

        let w=await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation&hourly=temperature_2m,weather_code&forecast_days=1`
        );

        let data=await w.json();

        let c=data.current;
        let h=data.hourly;

        let now=new Date();
        let hour=now.getHours();

        let next1=h.temperature_2m[hour+1];
        let next2=h.temperature_2m[hour+2];

        let [icon,status]=weatherStatus(c.weather_code);

        if(status=="Sunny")
            document.body.style.background=
            "linear-gradient(135deg,#f6d365,#fda085)";

        else if(status.includes("Rain"))
            document.body.style.background=
            "linear-gradient(135deg,#4facfe,#00f2fe)";

        else if(status=="Cloudy")
            document.body.style.background=
            "linear-gradient(135deg,#bdc3c7,#2c3e50)";

        else
            document.body.style.background=
            "linear-gradient(135deg,#74ebd5,#ACB6E5)";

        let date=now.toLocaleString();

        result.innerHTML=`

        <div class="location">
            ${icon} ${name}, ${country}
            <div class="time">🕐 ${date}</div>
        </div>

        <div class="cards">

            <div class="card">
                <div class="icon">${icon}</div>
                <h3>Weather Status</h3>
                <div class="value">${status}</div>
            </div>

            <div class="card">
                <div class="icon">🌡️</div>
                <h3>Temperature</h3>
                <div class="value">${c.temperature_2m} °C</div>
            </div>

            <div class="card">
                <div class="icon">🥵</div>
                <h3>Feels Like</h3>
                <div class="value">${c.apparent_temperature} °C</div>
            </div>

            <div class="card">
                <div class="icon">💧</div>
                <h3>Humidity</h3>
                <div class="value">${c.relative_humidity_2m}%</div>
            </div>

            <div class="card">
                <div class="icon">💨</div>
                <h3>Wind Speed</h3>
                <div class="value">${c.wind_speed_10m} km/h</div>
            </div>

            <div class="card">
                <div class="icon">🌧️</div>
                <h3>Precipitation</h3>
                <div class="value">${c.precipitation} mm</div>
            </div>

            <div class="card">
                <div class="icon">🔮</div>
                <h3>Next 2 Hours</h3>
                <div class="value">
                    +1h: ${next1}°C<br>
                    +2h: ${next2}°C
                </div>
            </div>

            <div class="card">
                <div class="icon">🌍</div>
                <h3>Coordinates</h3>
                <div class="value">
                    ${latitude.toFixed(2)}°<br>
                    ${longitude.toFixed(2)}°
                </div>
            </div>

        </div>
        `;

    }

    catch(e){

        result.innerHTML=
        "<p>❌ Unable to get weather data. Check the city name.</p>";
    }
}

document.getElementById("city").addEventListener("keypress",function(e){

    if(e.key==="Enter")
        getWeather();

});