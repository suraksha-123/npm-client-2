sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/Fragment",
	"com/yash/ptg/employee_dashboard/Assignment5/model/formatter"

], function (Controller, MessageBox, Fragment, formatter) {
	"use strict";

	return Controller.extend("com.yash.ptg.employee_dashboard.Assignment5.controller.ProductDetails", {
		formatter: formatter,
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("RouteProductDetails").attachPatternMatched(this._onRouteMatched, this);
			// Set the initial form to be the display one
			//	this._showFormFragment("display");
		},
		_onRouteMatched: function (oEvent) {
			var path = oEvent.getParameter("arguments").path;
			this.orderPath = oEvent.getParameter("arguments").orderPath;
			this.detailPath = oEvent.getParameter("arguments").detailPath;
			//	MessageBox.show(path);
			this.getView().bindElement("/" + path + "/Product");
		},
		handleLinkSupplier: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath,
				oButton = oEvent.getSource();
			if (!this._oSupplierPopover) {
				this._oSupplierPopover = sap.ui.xmlfragment("com.yash.ptg.employee_dashboard.Assignment5.fragments.SupplierDialog", this);
				this.getView().addDependent(this._oSupplierPopover);
				this._oSupplierPopover.bindElement(path + "/Supplier");
			} else {
				this._oSupplierPopover.openBy(oButton);
			}
		},
		handleLinkCategory: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath,
				oButton = oEvent.getSource();
			if (!this._oCategoryPopover) {
				this._oCategoryPopover = sap.ui.xmlfragment("com.yash.ptg.employee_dashboard.Assignment5.fragments.CategoryDialog", this);
				this.getView().addDependent(this._oCategoryPopover);
				this._oCategoryPopover.bindElement(path + "/Category");
			} else {
				this._oCategoryPopover.openBy(oButton);
			}
		},

		onBack: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteOrderDetails", {
				path: this.orderPath,
				detailPath: this.detailPath
			});
		}
	});

});