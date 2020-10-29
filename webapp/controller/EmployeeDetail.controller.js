sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Fragment, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.yash.ptg.employee_dashboard.Assignment5.controller.EmployeeDetail", {

		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("RouteEmployeeDetail").attachPatternMatched(this._onRouteMatched, this);
			this._showEmpInfo();

		},

		_onRouteMatched: function (oEvent) {
			this.detailPath = oEvent.getParameter("arguments").path;
			//MessageBox.show(this.detailPath);
			this.getView().bindElement("/" + this.detailPath);

		},
		onOrderPress: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//	MessageBox.show(this.detailPath);
			oRouter.navTo("RouteOrderDetails", {
				path: path.substr(1),
				detailPath: this.detailPath
			});
		},

		onBack: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteEmployeeDashboard");
		},
		handleLinkCustomer: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath,
				oButton = oEvent.getSource();
			this._oCustomerPopover = sap.ui.xmlfragment("com.yash.ptg.employee_dashboard.Assignment5.fragments.CustomerDialog", this);
			this.getView().addDependent(this._oCustomerPopover);
			this._oCustomerPopover.bindElement(path + "/Customer");
			this._oCustomerPopover.openBy(oButton);

		},
		handleLinkShip: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath,
				oButton = oEvent.getSource();
			this._oShipperPopover = sap.ui.xmlfragment("com.yash.ptg.employee_dashboard.Assignment5.fragments.ShipViaDialog", this);
			this.getView().addDependent(this._oShipperPopover);
			this._oShipperPopover.bindElement(path + "/Shipper");
			this._oShipperPopover.openBy(oButton);
		},

		handleEditPress: function () {
			this._toggleButtonsAndView(true);
			var empInfo = this.getView().byId("idEmpInfo");
			this.changeFragment = sap.ui.xmlfragment("com.yash.ptg.employee_dashboard.Assignment5.fragments.Change");
			empInfo.removeSubSection(1);
			empInfo.insertSubSection(this.changeFragment, 1);
		},
		_showEmpInfo: function (oEvent) {
			var empInfo = this.getView().byId("idEmpInfo");
			this.displayFragment = sap.ui.xmlfragment("com.yash.ptg.employee_dashboard.Assignment5.fragments.Display");
			empInfo.removeSubSection(1);
			empInfo.insertSubSection(this.displayFragment, 1);
		},
		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

		},

		handleCancelPress: function () {
			this._showEmpInfo();
			this._toggleButtonsAndView(false);
		},

		handleSavePress: function () {
			this._showEmpInfo();
			this._toggleButtonsAndView(false);
		},

		onSearchTerritory: function (oEvent) {

			//var idTerritory = oEvent.getParameter("selectionSet")[0].getValue();
			var filters;
			if (this.idTerritory && this.idTerritory.length > 0) {
				filters = new Filter({
					filters: [new Filter("TerritoryID", FilterOperator.EQ, this.idTerritory)]
				});
			}
			this.byId("idTerritoryList").getBinding("items").filter(filters);
		},
		onFilterTerritories: function (oEvent) {
			this.idTerritory = oEvent.getSource()._lastValue;
		},
		onSearchOrders: function (oEvent) {

			var criterias = [],
				path = [],
				filters;

			if (this.selectedOrderId && this.selectedOrderId.length > 0) {
				criterias.push(this.selectedOrderId);
				path.push("OrderID");
			}
			if (this.selectedCustomerId && this.selectedCustomerId.length > 0) {
				criterias.push(this.selectedCustomerId);
				path.push("CustomerID");
			}
			if (this.selectedShipper && this.selectedShipper.length > 0) {
				criterias.push(this.selectedShipper);
				path.push("ShipVia");
			}
			filters =
				path.map(function (p, index) {
					if (p === "OrderID" || p === "ShipVia") {
						return new Filter(p, FilterOperator.EQ, criterias[index]);
					} else {
						return new Filter(p, FilterOperator.Contains, criterias[index]);
					}
				});

			this.byId("idOrderList").getBinding("items").filter(filters);
		},
		onFilterOrderID: function (oEvent) {
			this.selectedOrderId = oEvent.getSource()._lastValue;
		},
		onFilterCustomerID: function (oEvent) {
			this.selectedCustomerId = oEvent.getSource()._lastValue;
		},
		onFilterShipVias: function (oEvent) {
			this.selectedShipper = oEvent.getSource()._lastValue;
		}
	});

});