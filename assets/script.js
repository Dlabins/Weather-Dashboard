//allows javascript code to run once DOM is safe to use
$(document).ready(function() {
  // gets user inputed location/value for weather search when search button is clicked
    $("#search").on("click", function() {
      var findLocation = $("#location").val();
      // once a search has exectuted the search bar will clear so user can enter different locations
      $("#search").val(" ");
  
      searchWeather(findLocation);
    });
    
    });
 
  //Function to output ajax request allowing user to complete a search for their weather
    function searchWeather(findLocation) {
        let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + findLocation + "&appid=245f9b4de91f060c764cbeade9c3ab1b";
       $.ajax({
        type: "GET",
        url: queryUrl,
        dataType: "json",
        success: function(data) {
          // create history link for this search
          if (history.indexOf(findLocation) === -1) {
            history.push(findLocation);
            window.localStorage.setItem("history", JSON.stringify(history));
      
            pastSearches(findLocation);
          }
          
          // clear any old content so that only one location is shown at a time
          $("#todayDate").empty("");
  
          // create HTML card elements using jQuery in conjunction with ajax pulls from Open weather 
          let cardBody = $("<section>").addClass("card-body");
          let cityName = $("<h1>").addClass("card-title").text(data.name) ;
          let card = $("<section>").addClass("card");
          let windSpeed = $("<p>").addClass("card-text").text("Wind: " + data.wind.speed + " MPH");
          let humidityIndex = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
          let temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
          
          
          //let tempF = ((temp-273.15)*1.8)+32; Could not get a Kelvin to Fahrenheit conversion in jquery 

          // Append card elements to html dynamically
          cardBody.append(cityName, temp, humidityIndex, windSpeed);
          card.append(cardBody);
          $("#todayDate").append(card);
         }
      });
    
    // Recalls search history of locations from local storage 
    var history = JSON.parse(window.localStorage.getItem("history"));
    }

  