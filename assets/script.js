//allows javascript code to run once DOM is safe to use
$(document).ready(function() {
  // gets user inputed location/value for weather search when search button is clicked
    $("#search").click(function() {
      var findLocation = $("#location").val();
      // once a search has exectuted the search bar will clear so user can enter different locations
      $("<section>").val();
  
      searchWeather(findLocation);
    });
   // $(document).keyup(function(event) {
   // if (event.keyCode === 13){
    //$("#search").click();
    //}
    $(document).ready(function() {
    $("#search").keyup(function() {
   $("#search").val();})
  
    searchWeather(findLocation);
    
});

 
  //Function to output ajax request allowing user to complete a search for their weather
    function searchWeather(findLocation) {
        let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + findLocation + "&appid=245f9b4de91f060c764cbeade9c3ab1b";
       $.ajax({
        type: "GET",
        url: queryUrl,
        dataType: "json",
        success: function(data) {
           
          // clear any old content so that only one location is shown at a time
          $("<section>").empty();
  
          // create HTML card elements using jQuery in conjunction with ajax pulls from Open weather 
          let cardBody = $("<section>").addClass("card-body");
          let cityName = $("<h1>").addClass("card-title").text(data.name) ;
          let card = $("<section>").addClass("card");
          let windSpeed = $("<h4>").addClass("card-text").text("Wind: " + data.wind.speed + " MPH");
          let humidityIndex = $("<h4>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
          let temp = $("<h4>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
          
          
          //let tempF = ((temp-273.15)*1.8)+32; Could not get a Kelvin to Fahrenheit conversion in jquery 

          // Append card elements to html dynamically
          cardBody.append(cityName);
          cardBody.append(temp);
          cardBody.append(humidityIndex);
          cardBody.append(windSpeed);
          card.append(cardBody);
          $("#todayDate").append(cardBody);
         }
      });
    };
});
