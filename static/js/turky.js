

var pages = [$('#loginPage'), $('#eventsPage'), $('#createEventPage'), $('#recipiesPage'), $('#viewRecipiePage'), $('#editRecipiePage')];
var foodsForEvent = 0;
var cooksForEvent = 0;

var EVENTS = [];

$('#navEvents').on('click', function(e) {
	e.preventDefault();
	for (var i = 0; i < pages.length; i++) {
		if (i !== 1) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
});


$('#navHome').on('click', function(e) {
	e.preventDefault();
	for (var i = 0; i < pages.length; i++) {
		if (i !== 0) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
});

$('#navRecipies').on('click', function(e) {
	e.preventDefault();
	for (var i = 0; i < pages.length; i++) {
		if (i !== 3) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
});

$('#createEventBtn').on('click', function(e) {
	e.preventDefault();
	for (var i = 0; i < pages.length; i++) {
		if (i !== 2) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
});


$('#createEvent_addCook').on('click', function(e){
	var temp = $('#createEvent_cooks').html();
	$('#createEvent_cooks').html(temp+"<li><h5>Add some cook friend stuff here</h5><form><input type=\"text\" id=\"createEvent_cookName"+cooksForEvent+"\" placeholder=\"Cook Name...\"></form></li>");
	cooksForEvent++;
});

$('#createEvent_addFood').on('click', function(e){
	var temp = $('#createEvent_foods').html();
	$('#createEvent_foods').html(temp+"<li><h5>Name of Food</h5><form><input type=\"text\" id=\"createEvent_foodName"+foodsForEvent+"\" placeholder=\"Food Name...\"></form></li>");
	foodsForEvent++;
});

$('#createEvent_save').on('click', function(e){
	var temp = {
		"name": $('#createEvent_name').val(),
		"date": $('#createEvent_date').val(),
		"owner": "nobodyYet",
		"cooks": [],
		"foods": []
	};

	$('#createEvent_name').val("");
	$('#createEvent_date').val("");

	for (var i = 0; i < cooksForEvent; i++){
		temp.cooks.push($('#createEvent_cookName'+i).val());
		$('#createEvent_cookName'+i).val("");
	}

	for (var i = 0; i < foodsForEvent; i++){
		temp.foods.push($('#createEvent_foodName'+i).val());
		$('#createEvent_foodName'+i).val("");
	}

	

	EVENTS.push(temp);

	updateEvents(temp, cooksForEvent, foodsForEvent);

	cooksForEvent = 0;
	foodsForEvent = 0;

	for (var i = 0; i < pages.length; i++) {
		if (i !== 1) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
});


updateEvents = function(newEvent, c, f) {
	var temp = $('#events_events').html();
	var toAdd = "<li><h3>"+newEvent.name+"</h3><ul>";
	
	for (var i = 0; i < f; i++){
		toAdd += "<li><h5><a href=\"/recipies\">"+newEvent.foods[i]+"</a></h5></li>"
	}

	toAdd += "</ul></li>";

	$('#events_events').html(temp+toAdd);
}




for (var i = 0; i < pages.length; i++) {
		if (i !== 0) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
