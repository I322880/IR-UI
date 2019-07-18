function initModel() {
	var sUrl = "/IR_Test/xsodata/Retailer.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}