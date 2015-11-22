var foodsForEvent = 0;
var cooksForEvent = 0;
var stepsForRecipie = 0;
var ingredForRecipie = 0;

var EVENTS = [];

$('#createEvent_addCook').on('click', function(e){
	$('#createEvent_cooks').append("<li><h5>Add some cook friend stuff here</h5><input type=\"text\" id=\"createEvent_cookName"+cooksForEvent+"\" placeholder=\"Cook Name...\" required></li>");
	cooksForEvent++;
});

$('#createEvent_addFood').on('click', function(e){
	$('#createEvent_foods').append("<li><h5>Name of Food</h5><input type=\"text\" id=\"createEvent_foodName"+foodsForEvent+"\" placeholder=\"Food Name...\" required></li>");
	foodsForEvent++;
});



$('form[id=createEventPage]').on('submit', function(e){
	e.preventDefault();
	createEventListing();
	window.location.replace("/events");
});


$('#editRecipie_addStep').on('click', function(e){
	$('#editRecipie_steps').append("<li><input type=\"text\" id=\"editRecipie_stepText"+stepsForRecipie+"\" placeholder=\"Recipie Step...\" required></li>");
	stepsForRecipie++;
});

$('#editRecipie_addIngred').on('click', function(e){
	$('#editRecipie_ingreds').append("<li><input type=\"text\" id=\"editRecipie_ingredText"+ingredForRecipie+"\" placeholder=\"Ingrediant and Amount...\" required></li>");
	ingredForRecipie++;
});



function createEventListing(){
	var temp = {
		"name": $('#createEvent_name').val(),
		"date": $('#createEvent_date').val(),
		"owner": "nobodyYet",
		"cooks": [],
		"foods": []
	};

	for (var i = 0; i < cooksForEvent; i++){
		temp.cooks.push($('#createEvent_cookName'+i).val());
	}

	for (var i = 0; i < foodsForEvent; i++){
		temp.foods.push($('#createEvent_foodName'+i).val());
	}

	$('#createEvent_cooks').html("");
	$('#createEvent_foods').html("");
	

	EVENTS.push(temp);
	console.log(temp);
	saveEvents(temp);

	cooksForEvent = 0;
	foodsForEvent = 0;
}


function saveEvents(newEvent) {
	$.ajax ({
		type: "POST",
		url: "/eventList",
		data: JSON.stringify(newEvent),
		contentType: "application/json",
		complete: function() {
			updateEvents()
		}
	});
}


function updateEvents() {
	$.getJSON("/eventList").
	done( function(data) {
		var toAdd = "";
		for (var i = 0; i < data.length; i++) {
			toAdd += updateEvent(data[i], data[i].cooks.length, data[i].foods.length);
		}
		$('#events_events').html(toAdd);
		
		$('.goToRecipie a').on('click', function(e) {
			e.preventDefault();
		});
	});
}

function updateEvent(newEvent, c, f) {
	var toAdd = "<li><h3>"+newEvent.name+"</h3><ul>";
	
	for (var i = 0; i < f; i++){
		toAdd += "<li><h5 class=\"goToRecipie\"><a id=\"recipie"+newEvent.foods[i]+"\" href=\"/viewrecipie\">"+newEvent.foods[i]+"</a></h5></li>"
	}

	toAdd += "</ul></li>";

	return toAdd;
}
