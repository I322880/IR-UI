/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Intelligent-Return-Web/Intelligent-Return-Web/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});