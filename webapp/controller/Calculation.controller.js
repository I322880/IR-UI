sap.ui.define([
	'sap/m/MessageBox',
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'

], function (MessageBox, jQuery, Controller, JSONModel, ODataModel, MessageToast) {
	"use strict";

	var BlockController = Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.Calculation", {
		onBeforeRendering: function () {
			var dummay = 1;
		},
		onInit: function () {
			var oSelect = sap.ui.getCore().getModel("select").segmentation;
			var oMultibox;
			if (oSelect === "cus") {
				oMultibox = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web.model",
					"/CustomerStrategy.json"));
			} else if (oSelect === "sup") {
				oMultibox = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web.model",
					"/SupplierStrategy.json"));
			}
			this.getView().setModel(oMultibox);
			var okpiModel = new JSONModel({
				book: [{
					"Item Category": "Total Revenue",
					"Actual": 173799.31,
					"Post Strategy": 0

				}, {
					"Item Category": "Net Profit",
					"Actual": 26994.34,
					"Post Strategy": 0
				}, {

					"Item Category": "Logistic Cost",
					"Actual": 81093.4,
					"Post Strategy": 0
				}, {
					"Item Category": "Profit%",
					"Actual": 15.45,
					"Post Strategy": 0.0
				}]
			});
			this.byId("oVizFrame").setModel(okpiModel, "kpi");
		},
		onApply: function (oevent) {
			var kpiModel = this.byId("oVizFrame").getModel("kpi");
			var aggr, mod, con;
			if (this.byId("RB1").getSelected() === true) {
				aggr = 1.35;
				kpiModel.getData().book[0]["Post Strategy"] = kpiModel.getData().book[0]["Actual"] * aggr;
				kpiModel.getData().book[1]["Post Strategy"] = kpiModel.getData().book[1]["Actual"] * aggr;
				kpiModel.getData().book[2]["Post Strategy"] = kpiModel.getData().book[2]["Actual"] * aggr;
				kpiModel.getData().book[3]["Post Strategy"] = kpiModel.getData().book[3]["Actual"] * aggr;
			} else if (this.byId("RB2").getSelected() === true) {
				mod = 1.20;
				kpiModel.getData().book[0]["Post Strategy"] = kpiModel.getData().book[0]["Actual"] * mod;
				kpiModel.getData().book[1]["Post Strategy"] = kpiModel.getData().book[1]["Actual"] * mod;
				kpiModel.getData().book[2]["Post Strategy"] = kpiModel.getData().book[2]["Actual"] * mod;
				kpiModel.getData().book[3]["Post Strategy"] = kpiModel.getData().book[3]["Actual"] * mod;
			} else {
				con = 1.10;
				kpiModel.getData().book[0]["Post Strategy"] = kpiModel.getData().book[0]["Actual"] * con;
				kpiModel.getData().book[1]["Post Strategy"] = kpiModel.getData().book[1]["Actual"] * con;
				kpiModel.getData().book[2]["Post Strategy"] = kpiModel.getData().book[2]["Actual"] * con;
				kpiModel.getData().book[3]["Post Strategy"] = kpiModel.getData().book[3]["Actual"] * con;
			}
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Item Category",
					value: "{Item Category}"
				}],
				measures: [{
					name: "Actual",
					value: "{Actual}"
				}, {
					name: "Post Strategy",
					value: "{Post Strategy}"
				}],
				data: {
					path: "kpi>/book"
				}
			});
			this.byId("oVizFrame").setDataset(oDataset);
		},
		_initializeChart: function () {
			var kpiModel = this.byId("oVizFrame").getModel("kpi");
			kpiModel.getData().book[0]["Post Strategy"] = 0.00;
			kpiModel.getData().book[1]["Post Strategy"] = 0.00;
			kpiModel.getData().book[2]["Post Strategy"] = 0.00;
			kpiModel.getData().book[3]["Post Strategy"] = 0.00;
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Item Category",
					value: "{Item Category}"
				}],
				measures: [{
					name: "Actual",
					value: "{Actual}"
				}, {
					name: "Post Strategy",
					value: "{Post Strategy}"
				}],
				data: {
					path: "kpi>/book"
				}
			});
			this.byId("oVizFrame").setDataset(oDataset);
		},
		_initializeView: function () {
			this.byId("mb1").setEnabled(false);
			this.byId("mb2").setEnabled(false);
			this.byId("mb3").setEnabled(false);
			this.byId("RB1").setSelected(true);
			this.byId("RB2").setSelected(false);
			this.byId("RB3").setSelected(false);
			this.byId("mb1").clearSelection();
			this.byId("mb2").clearSelection();
			this.byId("mb3").clearSelection();
		},
		onNavBack: function (event) {
			this._initializeView();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("segmentation");
		},
		onAggressive: function (event) {
			var that = this;
			that.byId("mb2").setEnabled(false);
			that.byId("mb2").clearSelection();
			that.byId("mb3").setEnabled(false);
			that.byId("mb3").clearSelection();
			that.byId("mb1").setEnabled(true);
			this._initializeChart();
		},
		onModerate: function (event) {
			var that = this;
			that.byId("mb2").setEnabled(true);
			that.byId("mb3").setEnabled(false);
			that.byId("mb3").clearSelection();
			that.byId("mb1").setEnabled(false);
			that.byId("mb1").clearSelection();
			this._initializeChart();
		},
		onConservative: function (event) {
			var that = this;
			that.byId("mb2").setEnabled(false);
			that.byId("mb2").clearSelection();
			that.byId("mb3").setEnabled(true);
			that.byId("mb1").setEnabled(false);
			that.byId("mb1").clearSelection();
			this._initializeChart();
		},
		onChoose: function (oEvent) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.confirm(
				"Apply Return Strategy? Data will be persisted", {
					styleClass: bCompact ? "sapUiSizeCompact" : ""
				}
			);
		}
	});

	return BlockController;

});