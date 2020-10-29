	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/EmployeeDashboard",
		"./pages/EmployeeDetail"
	], function (opaTest) {
		"use strict";

		QUnit.module("Navigation Journey");

		opaTest("Should see the initial page of the app", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();
			

			// Assertions
			Then.onTheEmployeeDashboardPage.iShouldSeeTheEmployeeDashboardView();
			Then.onTheEmployeeDashboardPage.iShouldSeeTheEmployeeTable();
			Then.onTheEmployeeDashboardPage.iShouldSeeNorthwindData();
			
			When.onTheEmployeeDashboardPage.iPressOnTheCustomeListItem();
			
			Then.onTheEmployeeDetailPage.theShouldSeeEmployeeDetailPage();
			
			When.onTheEmployeeDetailPage.iPressObjectPageSectionOrders();

			//Cleanup
			Then.iTeardownMyApp();
		});
	});