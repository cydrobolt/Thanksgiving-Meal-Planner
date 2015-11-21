

$('#navEvents').on('click', function(e) {
	e.preventDefault();
	$('#loginPage').hide();
	$('#eventsPage').show();
});


$('#navHome').on('click', function(e) {
	e.preventDefault();
	$('#loginPage').show();
	$('#eventsPage').hide();
});

$('#eventsPage').hide();
