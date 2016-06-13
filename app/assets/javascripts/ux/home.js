var UX = UX || {};
UX.RESULTS = UX.RESULTS || {};
UX.RESULTS = (function() {

	var editor;

	var setEditor = function(edt) {
		editor = edt;
	}

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
		var data = parseValidJson(editor.getValue());
		JSONAPI.VALIDATOR.setData(data);
		var results = JSONAPI.VALIDATOR.results();
		displayStatus(data!=null,results["errors"].length == 0 && data != null);
		console.log(results);
		$('#results').html(getHtmlContent(results));
	};

	var runCheck = function() {
		displayErrors($('#json-input'));
	};


	var loadSample = function() {
		var jsonData = {
		  "links": {
		    "self": "http://example.com/articles",
		    "next": "http://example.com/articles?page[offset]=2",
		    "last": "http://example.com/articles?page[offset]=10"
		  },
		  "data": [{
		    "type": "articles",
		    "id": "1",
		    "attributes": {
		      "title": "JSON API paints my bikeshed!"
		    },
		    "relationships": {
		      "author": {
		        "links": {
		          "self": "http://example.com/articles/1/relationships/author",
		          "related": "http://example.com/articles/1/author"
		        },
		        "data": { "type": "people", "id": "9" }
		      },
		      "comments": {
		        "links": {
		          "self": "http://example.com/articles/1/relationships/comments",
		          "related": "http://example.com/articles/1/comments"
		        },
		        "data": [
		          { "type": "comments", "id": "5" },
		          { "type": "comments", "id": "12" }
		        ]
		      }
		    },
		    "links": {
		      "self": "http://example.com/articles/1"
		    }
		  }],
		  "included": [{
		    "type": "people",
		    "id": "9",
		    "attributes": {
		      "first-name": "Dan",
		      "last-name": "Gebhardt",
		      "twitter": "dgeb"
		    },
		    "links": {
		      "self": "http://example.com/people/9"
		    }
		  }, {
		    "type": "comments",
		    "id": "5",
		    "attributes": {
		      "body": "First!"
		    },
		    "relationships": {
		      "author": {
		        "data": { "type": "people", "id": "2" }
		      }
		    },
		    "links": {
		      "self": "http://example.com/comments/5"
		    }
		  }, {
		    "type": "comments",
		    "id": "12",
		    "attributes": {
		      "body": "I like XML better"
		    },
		    "relationships": {
		      "author": {
		        "data": { "type": "people", "id": "9" }
		      }
		    },
		    "links": {
		      "self": "http://example.com/comments/12"
		    }
		  }]
		};
		editor.setValue(JSON.stringify(jsonData, null, 2));
	};

	return {
		displayErrors: displayErrors,
		runCheck: runCheck,
		loadSample: loadSample,
		setEditor: setEditor
	};
})();

$( document ).ready(function() {
	var editor = ace.edit("json-input");
	editor.getSession().setMode("ace/mode/javascript");
	UX.RESULTS.setEditor(editor);
	document.getElementById('json-input').style.fontSize='14px';

	editor.getSession().on('change', function(e) {
		UX.RESULTS.displayErrors();
	});
	
	$('#results').slimScroll({
	    height: '600px',
    	railVisible: true
	});
});