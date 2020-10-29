/*global QUnit*/

sap.ui.define([
		
	"com/yash/ptg/employee_dashboard/Assignment5/controller/EmployeeDashboard.controller"
], function (EmployeeDashboard) {
	"use strict";

	QUnit.module("EmployeeDashboard Controller");

	QUnit.test("I should test the EmployeeDashboard controller", function (assert) {
		var oAppController = new EmployeeDashboard();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});