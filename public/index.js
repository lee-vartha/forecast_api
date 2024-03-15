$(function () {
    var $h1 = $('h1');
    var $ziptext = $('input[name="zip"]');

    $('form').on('submit', function (event) {
        event.preventDefault();
        var zipCode = $.trim($ziptext.val());
        $h1.text('Loading...');
        var request = $.ajax({
            url: '/' + zipCode,
            dataType: 'json'
        });
        request.done(function (data) {
            var temperature = data.temperature;
            $h1.html('It is ' + temperature + '&#176; in ' + zipCode + '.');
        });
        request.fail(function () {
            $h1.text('Error!');
        });
    });
})


// make this in vanilla js
var h1 = document.querySelector('h1');
var zip = document.querySelector('input[name="zip"]');
form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', function () {
    
})

form.addEventListener('submit', function (event) { // when the submit button is clicked, then do this:
    event.preventDefault();
    var zipCode = document.querySelector('input[name="zip"]').value.trim(); // trim the zip code
    var h1 = document.querySelector('h1'); 
    h1.textContent = 'Loading...';
    var request = new XMLHttpRequest();
    request.open('GET', '/' + zipCode, true); // with this, you are making a request to the server with the zip code
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) { // if its a success, then do this:
            var data = JSON.parse(request.responseText); // parse the data from the server
            h1.innerHTML = 'It is ' + data.temperature + '&#176; in ' + zipCode + '.'; // this is what is presented
        } else {
            h1.textContent = 'Error!'; // otherwise if none of this works, then present error
        }
    };
    request.onerror = function () { // request error as a function
        h1.textContent = 'Error!';
    };
    request.send(); // send this request through to the server
});


    