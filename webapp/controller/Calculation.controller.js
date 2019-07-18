sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/odata/v2/ODataModel",
], function (jQuery, Controller, JSONModel, ODataModel) {
	"use strict";

	var BlockController = Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.Calculation", {

		onInit: function () {
			var name = "jai";

			var select = sap.ui.getCore().getModel("select");
			var oTest = new JSONModel({
				greetingText: name,
				order: 124,
				returns: 11,
				grossvalue: 1223,
				logistic: 1000,
				profit: 30,
				profitper: 13
			});
			this.getView().setModel(oTest);
			sap.ui.getCore().setModel(oTest, "calculation");
			// chart
			var oModel = new JSONModel({
				book: [{
					"City": "New York ",
					"Cost": 295584.81,
					"Item Category": "Action Movies",
					"Profit": 173793.31,
					"Revenue": 469378.12,
					"Unit Price": 1240.79,
					"Units Available": 17336,
					"Units Sold": 57571
				}, {
					"City": "New York ",
					"Cost": 115132.04,
					"Item Category": "Audio Equipment",
					"Profit": 56994.34,
					"Revenue": 172126.37,
					"Unit Price": 763.21,
					"Units Available": 11248,
					"Units Sold": 37303
				}, {
					"City": "New York ",
					"Cost": 171742.42,
					"Item Category": "Cameras",
					"Profit": 81093.4,
					"Revenue": 252835.82,
					"Unit Price": 1143.57,
					"Units Available": 14917,
					"Units Sold": 51664
				}, {
					"City": "New York ",
					"Cost": 331033.94,
					"Item Category": "Comedy Movies",
					"Profit": 150465.23,
					"Revenue": 481499.18,
					"Unit Price": 2268.02,
					"Units Available": 22449,
					"Units Sold": 69005
				}]
			});
			this.getView().setModel(oModel);
				
		},
		onBeforeRendering: function () {
			var that = this;
			that.byId("panel1").setExpanded(true);
			that.byId("panel2").setExpanded(false);
		},
		onNavBack: function (event) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview");
		},
		onaggressive: function (event) {
			//var oRo = sap.ui.core.UIComponent.getRouterFor(this);
			var that = this;
			that.byId("panel1").setExpanded(false);
			that.byId("panel2").setExpanded(true);

		}
	});

	return BlockController;

});