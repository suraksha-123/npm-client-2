sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/BindingPath"
], function (Opa5, Press, PropertyStrictEquals, BindingPath) {
	"use strict";
	var sViewName = "EmployeeDashboard";
	Opa5.createPageObjects({
		onTheEmployeeDashboardPage: {

			actions: {
				iPressOnTheCustomeListItem: function (sId) {
					return this.waitFor({
						controlType: "sap.m.ColumnListItem",
						viewName: sViewName,
						actions: new Press(),
						success: function (aCustomListItems) {

							Opa5.assert.ok(true, "record is clicked");
						},
						errorMessage: "did not find the path"
					});
				}
			},

			assertions: {

				iShouldSeeTheEmployeeDashboardView: function () {
					return this.waitFor({
						id: "app",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The EmployeeDashboard view is displayed");
						},
						errorMessage: "Did not find the EmployeeDashboard view"
					});
				},
				iShouldSeeTheEmployeeTable: function () {
					return this.waitFor({
						id: "idEmployeeList",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The EmployeeDashboard Table is displayed");
						},
						errorMessage: "Table not found"
					});
				},
				iShouldSeeNorthwindData: function () {
					return this.waitFor({
						controlType: "sap.m.ColumnListItem",
						viewName: sViewName,
						success: function (aCLIArrays) {
							if (aCLIArrays.length > 0) {
								Opa5.assert.ok(true, "Northwind Data is coming");
							}
						},
						errorMessage: "Data not found"
					});
				}

			}
		}
	});
});