sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/BindingPath"
], function (Opa5, Press, PropertyStrictEquals, BindingPath) {
	"use strict";
	var sViewName = "EmployeeDetail";
	Opa5.createPageObjects({
		onTheEmployeeDetailPage: {
			actions: {
				iPressObjectPageSectionOrders: function () {
					return this.waitFor({
						viewName: sViewName,
						controlType: "sap.uxap.ObjectPageSection",
						//id:"idOrder",
						// success: function (aCustomListItems) {
						// 	Opa5.assert.ok(true, "Order table is coming");
						// 	Opa5.assert.ok(true, aCustomListItems.length);
						// 	Opa5.assert.ok(true, aCustomListItems);
						// },
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "order table is coming ");
						},
						errorMessage: "did not find object page section for orders"
					});
				}
			},

			assertions: {
				theShouldSeeEmployeeDetailPage: function () {
					return this.waitFor({
						id: "idEmployeeDetailPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The EmployeeDetail view is displayed");
						},
						errorMessage: "Did not find the EmployeeDetail view"
					});
				}
			}
		}
	});
});