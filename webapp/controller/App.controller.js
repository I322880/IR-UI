sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel'
], function (jQuery, Controller, JSONModel) {
	"use strict";

	var BlockController = Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.App", {

		onInit: function () {
			// set explored app's demo model on this sample
			//var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock") + "/products.json");
			//this.getView().setModel(oModel);
		}
	});

	return BlockController;

});