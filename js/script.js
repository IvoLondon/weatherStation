window.onload = function() {
	getWeather();

	

}

function formSubmit() {
    var searchBtn = document.getElementById('searchLocation');
	searchBtn.onclick = function() {
		getWeather(document.getElementById('enterLocation').value.replace(/\s/g,''));
	}
	return false;
};

//get the weather
function getWeather(coordinates) {


	var locationCoordinates = coordinates;
	if(locationCoordinates == '' || locationCoordinates == undefined) {
		locationCoordinates = 'N135AJ';
	}
	/* Todays Weather */
	var locationOne = new XMLHttpRequest();
	locationOne.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + locationCoordinates + ',uk&APPID=9c3d96c3b408d9a49408b71e7c131587', true);
	locationOne.responseType = 'text';
	locationOne.onload = function() {
		if(locationOne.status == 200) {
			var parseLocationOne = JSON.parse(locationOne.responseText);
			setWeather(parseLocationOne);
		}
	}
	locationOne.send();

	/* Next 3 Forecast */
	var locationForecast = new XMLHttpRequest();
	locationForecast.open('GET', 'http://api.openweathermap.org/data/2.5/find?q=' + locationCoordinates + ',uk&APPID=9c3d96c3b408d9a49408b71e7c131587', true);
	locationForecast.responseType = 'text';
	locationForecast.onload = function() {
		var parseLocationForecast = JSON.parse(locationForecast.responseText);
		setNextWeather(parseLocationForecast);
	}
	locationForecast.send();




	function setWeather(obj) {
		var locationObj = obj;
		var dateObj = new Date().getDay();
		var todayDay;

		switch(dateObj) {
			case 0 :
				todayDay = 'Sunday';
			break;

			case 1 :
				todayDay = 'Monday';
			break;
			case 2 :
				todayDay = 'Tuesday';
			break;
			case 3 :
				todayDay = 'Wednesday';
			break;
			case 4 :
				todayDay = 'Thursday';
			break;
			case 5 :
				todayDay = 'Friday';
			break;
			case 6 :
				todayDay = 'Saturday';
			break;
		}

		var name = document.getElementById('location').innerHTML = locationObj.name + ', ' + locationObj.sys.country ;
		var day = document.getElementById('day').innerHTML = todayDay;
		var temperature = document.getElementById('temperature').innerHTML = (locationObj.main.temp_min - 273.15) + '' +'&deg; - ' + (locationObj.main.temp_max - 273.15) + '&deg;';
		var description = document.getElementById('description').innerHTML = locationObj.weather[0].description;
		document.getElementById('icon').classList.add('owf-' + locationObj.weather[0].id);
	}
	function setNextWeather(obj) {
		var forecastObj = obj;
		var nextDayName = document.getElementsByClassName('nextDayName');
		var nextDayIcon = document.getElementsByClassName('nextDayIcon');
		var nextDayTemperature = document.getElementsByClassName('nextDayTemperature');
		var nextDayDescription = document.getElementsByClassName('nextDayDescription');

		var maxDays = 2;
		for(var t = 0; t <= maxDays; t++) {
			if (forecastObj.list[t] !== undefined) {
				nextDayTemperature[t].innerHTML = (Math.floor(forecastObj.list[t].main.temp_min - 275.15)) + '&deg; - ' + (Math.ceil(forecastObj.list[t].main.temp_max - 275.15)) + '&deg;';
				nextDayDescription[t].innerHTML = forecastObj.list[t].weather[0].description;
				nextDayIcon[t].classList.add('owf-' + forecastObj.list[t].weather[0].id);

				var nextDayObj = new Date().getDay() + (t + 1);
				if(nextDayObj > 6) {
					nextDayObj = 0;
				}
				var todayDay;
				switch(nextDayObj) {
					case 0 :
						todayDay = 'Sunday';
					break;

					case 1 :
						todayDay = 'Monday';
					break;
					case 2 :
						todayDay = 'Tuesday';
					break;
					case 3 :
						todayDay = 'Wednesday';
					break;
					case 4 :
						todayDay = 'Thursday';
					break;
					case 5 :
						todayDay = 'Friday';
					break;
					case 6 :
						todayDay = 'Saturday';
					break;
				}
				nextDayName[t].innerHTML = todayDay;
			} else {
				nextDayTemperature[t].innerHTML = '';
				nextDayDescription[t].innerHTML = '';
				nextDayIcon[t].classList.add('noClass');
				nextDayName[t].innerHTML = '';
			}
		}

	}
};