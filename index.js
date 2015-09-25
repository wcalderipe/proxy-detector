var exec = require('child_process').exec;
var Q = require('q');

var detector = function(protocol) {
	var deferred = Q.defer();
	exec('./bin/proxy_detector -p ' + protocol, function(err, stdout, stderr) {
		if (err) {
			deferred.reject(err);
		} else {
			var value = stdout.trim() !== 'none' ? stdout.trim() : null;
			deferred.resolve(value);
		}
	});

	return deferred.promise;
};

module.exports = {
	getProxies: function() {
		var deferred = Q.defer();
		detector('http')
			.then(function(http) {
				detector('https')
					.then(function(https) {
						deferred.resolve({
							http: http,
							https: https
						});
					})
					.catch(function(err) {
						deferred.reject(err);
					});
			})
			.catch(function(err) {
				deferred.reject(err);
			});

		return deferred.promise;
	}
};