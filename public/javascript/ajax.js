var ajax = (function() {

	function get(uri, data, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', uri + '?' + param(data));
		xhr.onload = function() {
			if (xhr.status === 200) {
				if (success) {
					success(xhr.responseText);
				}
			}
			else {
				if (error) {
					error(xhr);
				}
			}
		};
		xhr.send();
	}

	function post(uri, data, success, error) {
		xhr = new XMLHttpRequest();
		xhr.open('POST', uri);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onload = function() {
			if (xhr.status === 200) {
				if (success) {
					success(xhr.responseText);
				}
			}
			else {
				if (error) {
					error(xhr);
				}
			}
		};
		xhr.send(param(data));
	}

	function getAjaxLib() {
		var ajax = {};
		ajax.get = get;
		ajax.post = post;

		return (ajax);
	}
	return getAjaxLib();
})();

function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}
