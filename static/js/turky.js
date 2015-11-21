

var pages = [$('#loginPage'), $('#eventsPage'), $('#createEventPage'), $('#recipiesPage'), $('#viewRecipiePage'), $('#editRecipiePage')];


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



for (var i = 0; i < pages.length; i++) {
		if (i !== 0) {
			pages[i].hide();
		} else {
			pages[i].show();
		}
	}
