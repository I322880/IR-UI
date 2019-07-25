sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/viz/ui5/api/env/Format",
	'sap/ui/core/HTML',
	'sap/viz/ui5/controls/Popover',
	'sap/m/HBox'
], function (Controller, ODataModel, Format, HTMLControl, Popover, HBox) {
	"use strict";
	return Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.View1", {
		_oRouter: null,
		onInit: function () {
			var oModel = new ODataModel("/IR_Test/xsodata/Retailer.xsodata/");
			var oSegment = new sap.ui.model.json.JSONModel();
			oModel.attachRequestCompleted(function (oEvent) {
				var model = oEvent.getParameters();
				var response = model.respone;
				oSegment.setData(oEvent.getSource().oData);
			});
			var oJsonModel = new sap.ui.model.json.JSONModel();
			oModel.read("/SegmentDetails", null, null, false, function (oData, repsonse) {
				oJsonModel.setData(oData);
			});

			this.getView().setModel(oModel);
			//sap.ui.getCore().setModel(oModel, "segment");
			sap.ui.getCore().setModel(oSegment, "segment");
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//	var oSegmentDetails = oData;

			// Pie chart
			var oVizFrame = this.oVizFrame = this.byId('DueDateGridFrame');
			//var oVizPopover = this.byId('vizPopover');
			var mData = {
				'actionItems': [{
					type: 'action',
					text: 'Apply Return Strategy',
					press: function (oEvent) {
						//console.log('This is a callback function from "Action Button" Action.');
						//_oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						var value = sap.ui.getCore().getModel("select").segmentid;
						var calculationmodel = sap.ui.getCore().getModel("calculation");
						if (typeof calculationmodel !== 'undefined') {
							calculationmodel.setData({
								returns: value
							}, true);
						}
						_oRouter.navTo("detail", null, true);
					}
				}],
				'customDataControl': function (data) {
					var segmentid = data.data.val[0].value.valueOf();
					var segmentdetails = sap.ui.getCore().getModel("segment").getData();
					var keys = Object.keys(segmentdetails);
					var entries = Object.entries(segmentdetails);
					var min_mcv = -99999;
					var selected = new sap.ui.model.json.JSONModel();
					selected.segmentid = segmentid;
					selected.segmentation ="cus";
					sap.ui.getCore().setModel(selected, "select");
					// Read chosen segment details
					for (var key in keys) {
						var j = entries[key];
						if (j[1].SegmentID === segmentid) {
							break;
						}
					}

					for (key in keys) {
						var i = entries[key];
						if (key === "1") {
							min_mcv = i[1].MeanCustomerValue;
						}
						if (min_mcv > i[1].MeanCustomerValue) {
							min_mcv = i[1].MeanCustomerValue;
						}

					}
					// Format all values up to 2 decimals
					var temp = j[1]["Customer Value"];
					var cv = parseFloat(temp).toFixed(2);
					temp = j[1].MeanOrderCount;
					var moc = parseFloat(temp).toFixed(2);
					temp = j[1].MeanReturnCount;
					var mrc = parseFloat(temp).toFixed(2);
					var mcv = j[1].MeanCustomerValue;

					// Get image for vaue index
					var image_path = "/images/up.png";
					if (min_mcv === mcv) {
						image_path = "/images/down.png";
					}
					var path = $.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web", image_path);
					// Custom popover
					return new sap.m.VBox({
						width: "100%",
						items: [new sap.m.HBox({
								items: [
									new sap.m.Label({
										text: "Number Of Customers",
										design: "Bold"
									}).addStyleClass("sapUiTinyMargin"),
									new sap.m.Text({
										text: data.data.val[1].value
									}).addStyleClass("sapUiTinyMargin")
								]
							}).addStyleClass("sapUiTinyMargin"),
							new sap.m.HBox({
								items: [
									new sap.m.Label({
										text: "Total Revenue",
										design: "Bold"
									}).addStyleClass("sapUiTinyMargin"),
									new sap.m.Text({
										text: cv
									}).addStyleClass("sapUiTinyMargin")
								]
							}).addStyleClass("sapUiTinyMargin"),
							new sap.m.HBox({
								items: [
									new sap.m.Label({
										text: "Mean Order Count",
										design: "Bold"
									}).addStyleClass("sapUiTinyMargin"),
									new sap.m.Text({
										text: moc
									}).addStyleClass("sapUiTinyMargin")
								]
							}).addStyleClass("sapUiTinyMargin"),
							new sap.m.HBox({
								items: [
									new sap.m.Label({
										text: "Mean Return Count",
										design: "Bold"
									}).addStyleClass("sapUiTinyMargin"),
									new sap.m.Text({
										text: mrc
									}).addStyleClass("sapUiTinyMargin")
								]
							}).addStyleClass("sapUiTinyMargin"),
							new sap.m.HBox({
								items: [
									new sap.m.Label({
										text: "Customer Value Index:",
										design: "Bold"
									}).addStyleClass("sapUiTinyMargin"),
									new sap.m.Image({
										width: "20%",
										src: path
									}).addStyleClass("sapUiTinyMargin")
								]
							}).addStyleClass("sapUiTinyMargin")
						]
					});
				}
			};
			var oVizPopover = new sap.viz.ui5.controls.Popover(mData);
			oVizPopover.connect(oVizFrame.getVizUid());
			//oVizFrame.setModel(dataModel);	
			// Bar
			var oVizFrame1 = this.byId('idVizFrame');
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame1.getVizUid());
			//oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

		},
		showdetails: function (oEvent) {
			var that = this;
			that.byId("panel1").setExpanded(false);
			that.byId("panel2").setExpanded(true);

		},
		onNavBack: function (event) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview");
		}
	});
});