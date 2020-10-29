/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
	
		"com/yash/ptg/employee_dashboard/Assignment5/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});