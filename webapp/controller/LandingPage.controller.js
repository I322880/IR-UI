sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui/model/json/JSONModel'
], function (Controller, ODataModel, JSONModel) {
	"use strict";
	return Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.LandingPage", {
		_oRouter: null,
		onInit: function () {
			var oModel = new ODataModel("/IR_Test/xsodata/Retailer.xsodata/");
			var oJsonModel = new sap.ui.model.json.JSONModel();
			oModel.read("/SegmentDetails", null, null, false, function (oData, repsonse) {
				oJsonModel.setData(oData);
			});
			var toatlRevenue = new JSONModel({
				revenue: 1000000
			});
			sap.ui.getCore().setModel(toatlRevenue, "Revenue");
			this.getView().setModel(oModel);
			var OrderSummary = new JSONModel({
				OrderSummary: [{
					order: "Order",
					returns: 130
				}, {
					order: "Return",
					returns: 40
				}]
			});
			var revenue = new sap.ui.model.json.JSONModel({
				totalRevenue: {
					value: 1.00
				}
			});
			this.getView().setModel(revenue);
			this.getView().setModel(OrderSummary);
		},
		onChangeSlider: function (oEvent) {
			var that = this;
			var value = that.byId("revenue").getValue();
			that.byId("textr").setValue(value);
			that.byId("returncost").setValue((value * 2 * 1000 / 100));
			var toatlRevenue = sap.ui.getCore().getModel("Revenue");
			toatlRevenue.revenue = value * 1000000;
		},
		onClickRadial: function (oEvent) {
			var that = this;
			var value = that.byId("revenue").getValue();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
			oRouter.navTo("segmentation");

		}
	});
});