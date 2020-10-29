sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/yash/ptg/employee_dashboard/Assignment5/model/formatter"
], function (Controller, MessageToast, Filter, FilterOperator,formatter) {
	"use strict";

	return Controller.extend("com.yash.ptg.employee_dashboard.Assignment5.controller.EmployeeDashboard", {
		formatter:formatter,
		onInit: function () {
			// function onlyUnique(value, index, self) {
			// 	return self.indexOf(value) === index;
			// }

			// // usage example:
			// var a = ['a', 1, 'a', 2, '1'];
			// var unique = a.filter(onlyUnique);
			
			var sUrl = "/NorthwindService/V2/Northwind/Northwind.svc/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			this.getView().setModel(oModel, "employeeModel");

			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("RouteEmployeeDashboard").attachPatternMatched(this._onRouteMatched, this);
			
			// unique=a.filter((a,i,self)=>{
			// 	self.indexOf(a)===i;
			// });
		},
		
		onReset: function (oEvent) {
			var sMessage = "onReset trigered";
			MessageToast.show(sMessage);
		},

		onSearch: function (oEvent) {
			var selectionSet = oEvent.getParameter("selectionSet"),
				criterias = [],
				path = [],
				filters;

			if (selectionSet[0].getValue() && selectionSet[0].getValue().length > 0) {
				criterias.push(selectionSet[0].getValue());
				path.push("EmployeeID");
			}
			if (this.selectedCity && this.selectedCity.length > 0) {
				criterias.push(this.selectedCity);
				path.push("City");
			}
			if (this.selectedCountry && this.selectedCountry.length > 0) {
				criterias.push(this.selectedCountry);
				path.push("Country");
			}
			if (this.selectedRegion && this.selectedRegion.length > 0) {
				criterias.push(this.selectedRegion);
				path.push("Region");
			}
			filters =
				path.map(function (p, index) {
					if (p === "EmployeeID") {
						return new Filter(p, FilterOperator.EQ, criterias[index]);
					} else {
						return new Filter(p, FilterOperator.Contains, criterias[index]);
					}
				});

			this.byId("idEmployeeList").getBinding("items").filter(filters);
		},
		onFilterRegion: function (oEvent) {
			this.selectedRegion = oEvent.getSource()._lastValue;
		},
		onFilterCountry: function (oEvent) {
			this.selectedCountry = oEvent.getSource()._lastValue;
		},
		onFilterCity: function (oEvent) {
			this.selectedCity = oEvent.getSource()._lastValue;
		},
		onEmployeePress: function (oEvent) {
			var path = oEvent.getSource().getBindingContext("employeeModel").sPath;
			//MessageToast.show(path.substr(1));

			this._oRouter.navTo("RouteEmployeeDetail", {
				path: path.substr(1)
			});
		}
	});
});