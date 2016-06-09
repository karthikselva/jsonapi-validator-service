var JSONAPI = JSONAPI || {};
JSONAPI.VALIDATOR = JSONAPI.VALIDATOR || {};
JSONAPI.VALIDATOR = (function() {
	var schema,data; 

	var setSchema = function(sc) {
		schema = JSON.parse(sc);
	};

	var setData = function(dt) {
		data = JSON.parse(dt);
	}

	var results = function() {
		return tv4.validateMultiple(data, schema);
	};

	return {
		setSchema: setSchema,
		setData: setData,
		results: results
	};
})();