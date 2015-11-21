

var pages = [$('#loginPage'), $('#eventsPage'), $('#createEventPage'), $('#recipiesPage'), $('#viewRecipiePage'), $('#editRecipiePage')];
var foodsForEvent = 0;
var cooksForEvent = 0;

var EVENTS = [];

$('#navEvents').on('click', function(e) {
	e.preventDefault();
	updateEvents();
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
	if (cooksForEvent !== 0) {
		$('#createEvent_cookName'+cooksForEvent).attr('value', $('#createEvent_cookName'+cooksForEvent).val());
	}
	var temp = $('#createEvent_cooks').html();
	$('#createEvent_cooks').html(temp+"<li><h5>Add some cook friend stuff here</h5><form><input type=\"text\" id=\"createEvent_cookName"+cooksForEvent+"\" value=\"\" placeholder=\"Cook Name...\"></form></li>");
	cooksForEvent++;
});

$('#createEvent_addFood').on('click', function(e){
	if (foodsForEvent !== 0) {
		$('#createEvent_foodName'+foodsForEvent).attr('value', $('#createEvent_foodName'+foodsForEvent).val());
	}
	var temp = $('#createEvent_foods').html();
	$('#createEvent_foods').html(temp+"<li><h5>Name of Food</h5><form><input type=\"text\" id=\"createEvent_foodName"+foodsForEvent+"\" value=\"\" placeholder=\"Food Name...\"></form></li>");
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

	$('#createEvent_cooks').html("");
	$('#createEvent_foods').html("");
	

	EVENTS.push(temp);

	saveEvents(temp);

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


saveEvents = function(newEvent) {
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


updateEvents = function() {
	$.getJSON("/eventList").
		done( function(data) {
			var toAdd = "";
			for (var i = 0; i < data.length; i++) {
				toAdd += updateEvent(data[i], data[i].cooks.length, data[i].foods.length);
			}
			$('#events_events').html(toAdd);
		});
}

updateEvent = function(newEvent, c, f) {
	var toAdd = "<li><h3>"+newEvent.name+"</h3><ul>";
	
	for (var i = 0; i < f; i++){
		toAdd += "<li><h5><a href=\"/recipies\">"+newEvent.foods[i]+"</a></h5></li>"
	}

	toAdd += "</ul></li>";

	return toAdd;
}




for (var i = 0; i < pages.length; i++) {
		if (i !== 0) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
