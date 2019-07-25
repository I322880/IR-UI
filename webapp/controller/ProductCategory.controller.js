sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/odata/v2/ODataModel",
], function (jQuery, Controller, JSONModel, ODataModel) {
	"use strict";

	var BlockController = Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.ProductCategory", {
		_oRouter: null,
		onInit: function () {
			var oCategory = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web.model",
				"/Category.json"));
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getView().setModel(oCategory);
			var oVizFrame = this.oVizFrame = this.byId('DueDateGridFrame');
			//var oVizPopover = this.byId('vizPopover');
			var mData = {
				'customDataControl': function (data) {
					var selected = new sap.ui.model.json.JSONModel();
					selected.segmentid = data.data.val[0].value.valueOf();
					selected.segmentation = "sup";
					sap.ui.getCore().setModel(selected, "select");
				}
			};
			var oVizPopover = new sap.viz.ui5.controls.Popover(mData);
			oVizPopover.connect(oVizFrame.getVizUid());
			// Order Return Chart
			var oVizFrame1 = this.byId('idVizFrame');
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame1.getVizUid());
		},
		onApply: function () {

		},
		_initializeView: function () {

		},
		status: function (MeanSupplierValue) {
			if (MeanSupplierValue > 1) {
				return $.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web", "/images/up.png"); // use your png image here 
			} else if (MeanSupplierValue < 1) {
				return $.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web", "/images/down.png");
			}
		}
	});

	return BlockController;

});