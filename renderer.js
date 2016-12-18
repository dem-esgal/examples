/**
 * Create template for {{ }} and __ __ data binding
 */
function SimpleTemplate() {
	"use strict";
	function _clearTemplate(template) {
		return template.replace(new RegExp("[\{\_][\{\_][a-zA-Z0-9\-\_]+[\}\_][\}\_]", "g"), '');
	}

	function _fillProperties(dataObject, template) {
		for (var prop in dataObject) {
			if (dataObject.hasOwnProperty(prop)) {
				template = template.replace(new RegExp("[\{\_][\{\_]" + prop + "[\}\_][\}\_]", "g"), dataObject[prop]);
			} else {
				template = template.replace(new RegExp("[\{\_][\{\_]" + prop + "[\}\_][\}\_]", "g"), "");
			}
		}
	}

	// fill template with data
	this.fillTemplate = function(dataObject, $element) {
		// prepare container for template
		var template = $("<div />").append($element.find(".pattern").clone()).html();
		// clear previous container
		$element.find(".created-from-pattern").remove();
		template = template.replace("pattern", "created-from-pattern");
		if (!dataObject || $.isEmptyObject(dataObject)) {
			$element.append(_clearTemplate(template));
			return;
		}
		_fillProperties(dataObject, template)

		$element.append(_clearTemplate(template));
	}

	// fill table with data
	this.fillTable = function(dataArray, $element) {
		// prepare container for template
		var template = $("<div />").append($element.find(".pattern").clone()).html(),
			rows = "";
		// clear previous container
		$element.nextAll(".empty-table").remove();

		if (!dataArray || dataArray.length === 0) {
			$element.parent().append('<div class="empty-table">Данные отсутствуют</div>');
			$element.hide();
			return;
		}
		$element.find("tbody").remove();
		template = template.replace("pattern", "{{evenOrOdd}}");
		for (var i = 0; i < dataArray.length; i++) {
			var item = dataArray[i],
				row = template;
			if ($.isEmptyObject(item)) {
				continue;
			}
			_fillProperties(item, row)

			row = row.replace(new RegExp("\{\{evenOrOdd\}\}", "g"), i % 2 ? "even" : "odd");
			rows += row;
		}
		$element.append("<tbody>" + _clearTemplate(rows) + "</tbody>");
		$element.show();
	}
}
