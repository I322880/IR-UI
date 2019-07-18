sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Intelligent-Return-Web/Intelligent-Return-Web/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("Intelligent-Return-Web.Intelligent-Return-Web.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			jQuery.sap.registerModulePath("Intelligent-Return-Web.Intelligent-Return-Web.Component", "Intelligent-Return-Web/webapp/"); 
		}
	});
});