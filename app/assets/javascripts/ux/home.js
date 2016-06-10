var UX = UX || {};
UX.RESULTS = UX.RESULTS || {};
UX.RESULTS = (function() {

	var parseValidJson = function(json) {
		try {
			JSON.parse(json);
			return json;
		}
		catch(e) {
			return null;
		}
	};

	var jsonValidTemplate = function() {
		var source = $("#json-valid").html();
		return Handlebars.compile(source);	
	};

	var displayStatus = function(isValid,isCompliant) {
		$('#json-valid-result').html(jsonValidTemplate()({
			isValid: isValid,
			isCompliant: isCompliant
		}));
	};

	var getHtmlContent = function(data) {
		var source   = $("#error-panel").html();
		var template = Handlebars.compile(source);
		var handlebarData = data["errors"][0];
		return template(handlebarData);
	};

	var displayErrors = function($panel) {
		$('#results').html('');
		var data = parseValidJson($panel.val());
		JSONAPI.VALIDATOR.setData(data);
		var results = JSONAPI.VALIDATOR.results();
		displayStatus(data!=null,results["errors"].length == 0 && data != null);
		console.log(results);
		$('#results').html(getHtmlContent(results));
	};

	var runCheck = function() {
		displayErrors($('#json-input'));
	};

	return {
		displayErrors: displayErrors,
		runCheck: runCheck
	};
})();

$( document ).ready(function() {
	$( "#json-input" ).change(function() {
		UX.RESULTS.displayErrors($(this));
	});
	$('#results').slimScroll({
	    height: '700px',
      railVisible: true
	});

	
});