var UX = UX || {};
UX.RESULTS = UX.RESULTS || {};
UX.RESULTS = (function() {

	var displayErrors = function($panel) {
		JSONAPI.VALIDATOR.setData($panel.val());
		var results = JSONAPI.VALIDATOR.results();
		console.log(results);
		var source   = $("#error-panel").html();
		var template = Handlebars.compile(source);
		var handlebarData = results["errors"][0];
		var html = template(handlebarData);
		$('#results').html(html);
	};

	var runCheck = function() {
		displayErrors($('#jsonInput'));
	};

	return {
		displayErrors: displayErrors,
		runCheck: runCheck
	};
})();

$( document ).ready(function() {
	$( "#jsonInput" ).change(function() {
		UX.RESULTS.displayErrors($(this));
	});
});