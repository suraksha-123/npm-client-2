sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.yash.ptg.employee_dashboard.Assignment5.controller.OrderDetails", {
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("RouteOrderDetails").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			this.orderPath = oEvent.getParameter("arguments").path;
			this.detailPath = oEvent.getParameter("arguments").detailPath;
			//MessageBox.show(this.orderPath);
			//MessageBox.show(this.detailPath);
			this.getView().bindElement("/" + this.orderPath);
		},
		onProductPress: function (oEvent) {
			var path = oEvent.getSource().getBindingContext().sPath;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteProductDetails", {
				path: path.substr(1),orderPath:this.orderPath,detailPath:this.detailPath
			});
		},
		onSearch: function (oEvent) {
			
			var filters;
			if (this.idProduct && this.idProduct.length > 0) {
				filters = new Filter({
					filters: [new Filter("ProductID", FilterOperator.EQ, this.idProduct)]
				});
			}
			this.byId("idOrderList").getBinding("items").filter(filters);
		},
		onFilterProductID: function(oEvent){
			this.idProduct=oEvent.getSource()._lastValue;
		},
		onBack: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteEmployeeDetail",{
				path:this.detailPath
			});
		}

	});

});