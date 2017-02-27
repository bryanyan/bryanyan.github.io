function submitTask(task) {
  var count = 0;
  $(document).keypress(function(e) {
    count += 1;
    if (e.which == 13 && count == 1) {
      $("#listItems").add( "<li><a href='#'><div class='fa fa-check'></div></a> " + task.value + "</li>" ).fadeIn().appendTo("#listItems");
      var todoArr = JSON.parse(localStorage.todo);
      todoArr.push(task.value);
      localStorage.setItem("todo", JSON.stringify(todoArr));
      task.value = "";
    }
  });
}

$(function() {

    if (typeof(Storage) !== "undefined") {
        if (localStorage.todo.length === 0) {
            var todoArr = ['ay carumba', 'testing', 'fix this later thx'];
        } else {
            var todoArr = ['ay carumba'];
            localStorage.setItem("todo", JSON.stringify(todoArr));
        }
    }

    $( ".add" ).click(function(event) {
        var item = 'test';
        $("#listItems").add( "<li><a href='#'><div class='fa fa-check'></div></a> " + item + "</li>" ).fadeIn().appendTo("#listItems");
    });

    for (var i = 0; i < todoArr.length; i++) {
      $('#listItems').add("<li><a href='#'><div class='fa fa-check'></div></a> " + todoArr[i] + "</li>" )
                     .fadeIn()
                     .appendTo("#listItems");
    }

    /* Close item when check mark clicked */
    $( "ul > li > a" ).click(function() {
      $(this).parent( "li" ).slideUp(200);
    });

    /* Fremont: 2407405 */
    $.simpleWeather({
      woeid: '2407405', 
      location: '',
      unit: 'f',
      success: function(weather) {
        htmlFMT = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        htmlFMT += '<ul><li>'+weather.city+', '+weather.region+'</li>';
        htmlFMT += '<li class="currently">'+weather.currently+'</li>';
        htmlFMT += '<ul>'
        for(var i = 0; i < 5; i++) {
          htmlFMT += '<li class="fiveDay">'+weather.forecast[i].day+': '+weather.forecast[i].high+'</li>';
        }
        htmlFMT += '</ul>'
        htmlFMT += '<img src=' + weather.thumbnail + '>'
        $("#fmt").html(htmlFMT);
      },
      error: function(error) {
        $("#fmt").html('<p>'+error+'</p>');
      }
    });

    /* San Francisco: 2487956 */
    $.simpleWeather({
      woeid: '2487956', 
      location: '',
      unit: 'f',
      success: function(weather) {
        htmlSFO = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        htmlSFO += '<ul><li>'+weather.city+', '+weather.region+'</li>';
        htmlSFO += '<li class="currently">'+weather.currently+'</li>';
        htmlSFO += '<ul>'
        for(var i = 0; i < 5; i++) {
          htmlSFO += '<li class="fiveDay">'+weather.forecast[i].day+': '+weather.forecast[i].high+'</li>';
        }
        htmlSFO += '</ul>'
    
        $("#sfo").html(htmlSFO);
      },
      error: function(error) {
        $("#sfo").html('<p>'+error+'</p>');
      }
    });

    /* Pittsburgh: 2473224 */
    $.simpleWeather({
      woeid: '2473224', 
      location: '',
      unit: 'f',
      success: function(weather) {
        htmlPGH = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        htmlPGH += '<ul><li>'+weather.city+', '+weather.region+'</li>';
        htmlPGH += '<li class="currently">'+weather.currently+'</li>';
        htmlPGH += '<ul>'
        for(var i = 0; i < 5; i++) {
          htmlPGH += '<li class="fiveDay">'+weather.forecast[i].day+': '+weather.forecast[i].high+'</li>';
        }
        htmlPGH += '</ul>'
    
        $("#pgh").html(htmlPGH);
      },
      error: function(error) {
        $("#pgh").html('<p>'+error+'</p>');
      }
    });

    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 

    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    // Create an object newDate()
    var newDate = new Date();
    // Retrieve the current date from the Date object
    newDate.setDate(newDate.getDate());
    // At the output of the day, date, month and year    
    $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()]);

    setInterval( function() {
    // Create an object newDate () and extract the minutes of the current time
    var minutes = new Date().getMinutes();
      // Add a leading zero to the minutes
      $(".min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);

    var hours = newDate.getHours();
    $(".hours").html(( hours < 10 ? "0" : "" ) + hours);

});