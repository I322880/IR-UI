sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/m/MessageBox"
], function (Controller, ODataModel, MessageBox) {
	"use strict";

	return Controller.extend("Intelligent-Return-Web.Intelligent-Return-Web.controller.Summary", {
		onInit: function () {
			var oModel = new ODataModel("/IR_Test/xsodata/Retailer.xsodata/");
			var oJsonModel2 = new sap.ui.model.json.JSONModel();
			oModel.read("/Summary", null, null, true, function (oData, repsonse) {
				oJsonModel2.setData(oData);
			});
			//this.getView().setModel(oModel);
			//this.getView().bindElement("/Summary/0");
			/*var summaryText = this.getView().byId("SimpleForm");
			summaryText.bindElement({
				path: "/Summary"
			});*/
			sap.ui.getCore().setModel(oJsonModel2);
		},
		onUpdatesegment: function (oController) {
			//var value = sap.ui.getCore().byId("nameText2").getText();
			var value = this.getView().byId("nameText2").getValue();
			var segmentcount = 7;
			var jurl = 'https://demopdms-dev-intelligent-return-js.cfapps.eu10.hana.ondemand.com/services/kmeans.xsjs?segmentcount=9';
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.withCredentials = true;
			xmlhttp.open("GET", jurl, true);
			xmlhttp.setRequestHeader('Content-Type', 'application/json')
			xmlhttp.send();
		}
	})
});