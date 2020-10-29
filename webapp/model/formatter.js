sap.ui.define([], function () {
	"use strict";
	return {
		status: function (sStatus) {
			if (sStatus === "true") {
				return "available";
			} else {
				return "discontinued";
			}
		},
		items: function (a) {
			var unique = a.filter(function (data, index, self) {
				return self.indexOf(index) === data;
			});
			return unique;
		}
	};
});