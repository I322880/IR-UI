sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/model/odata/v2/ODataModel",
], function (jQuery, Controller, JSONModel, ODataModel) {
	"use strict";

	var BlockController = Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.Supplier", {
		_oRouter: null,
		onInit: function () {
			var oSupplier = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("Intelligent-Return-Web.Intelligent-Return-Web.model",
				"/Supplier.json"));
			var _oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getView().setModel(oSupplier);
			var oVizFrame = this.oVizFrame = this.byId('DueDateGridFrame');
			//var oVizPopover = this.byId('vizPopover');
			var mData = {
				'actionItems': [{
					type: 'action',
					text: 'Apply Return Strategy',
					press: function (oEvent) {
						_oRouter.navTo("detail", null, true);
					}
				}],
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