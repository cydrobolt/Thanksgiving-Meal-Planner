var foodsForEvent = 0;
var cooksForEvent = 0;
var stepsForRecipe = 0;
var ingredForRecipe = 0;

var EVENTS = [];
var RECIPES = [];

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


$('#editRecipe_addStep').on('click', function(e){
	$('#editRecipe_steps').append("<li><input type=\"text\" id=\"editRecipe_stepText"+stepsForRecipe+"\" placeholder=\"Recipe Step...\" required></li>");
	stepsForRecipe++;
});

$('#editRecipe_addIngred').on('click', function(e){
	$('#editRecipe_ingreds').append("<li><input type=\"text\" id=\"editRecipe_ingredText"+ingredForRecipe+"\" placeholder=\"Ingredient and Amount...\" required></li>");
	ingredForRecipe++;
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
		createRecipeListing("13218");
	}

	$('#createEvent_cooks').html("");
	$('#createEvent_foods').html("");
	

	EVENTS.push(temp);
	saveEvents(temp);

	cooksForEvent = 0;
	foodsForEvent = 0;
}


function createRecipeListing(recipeID) {
	$.ajax ({
		type: "POST",
		url: "/importRecipe",
		data: recipeID,
		complete: function() {
			updateRecipes();
		}
	});
}


function saveEvents(newEvent) {
	$.ajax ({
		type: "POST",
		url: "/eventList",
		data: JSON.stringify(newEvent),
		contentType: "application/json",
		complete: function() {
			updateEvents();
		}
	});
}


function saveRecipes(newRecipe) {
	console.log(RECIPES);
	$.ajax ({
		type: "POST",
		url: "/recipeList",
		data: JSON.stringify(newRecipe),
		contentType: "application/json"
	});
}

function updateRecipes() {
	$.getJSON("/recipeList").
	done( function(data) {
		for (var i = 0; i < data.length; i++) { 
			RECIPES.push(data[i]);
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
		
		$('.goToRecipe a').on('click', function(e) {
			e.preventDefault();
			var temp;
			for (var i = 0; i < RECIPES.length; i++) {
				if (RECIPES[i].name === e.target.innerText) {
					temp = RECIPES[i];
				}
			}
			window.location.replace("/viewrecipe/"+JSON.stringify(temp));

		});
	});
}

function updateEvent(newEvent, c, f) {
	var toAdd = "<li><h3>"+newEvent.name+"</h3><ul>";
	
	for (var i = 0; i < f; i++){
		toAdd += "<li><h5 class=\"goToRecipe\"><a id=\""+newEvent.name+"\" href=\"/viewrecipe\">"+newEvent.foods[i]+"</a></h5></li>"
	}

	toAdd += "</ul></li>";
	return toAdd;
}
