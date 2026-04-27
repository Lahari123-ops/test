sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "basic/model/formatter"
], function (Controller, Filter, FilterOperator,formatter) {
    "use strict";


    return Controller.extend("basic.controller.View1", {
        formatter:formatter,

        onInit: function () {
        },

        onFilterChange: function () {

            var oView = this.getView();

            
            var sCountry = oView.byId("countryBox").getValue();
            var sMin = oView.byId("freightMin").getValue();
            var sMax = oView.byId("freightMax").getValue();
            var dFrom = oView.byId("dateFrom").getDateValue();
            var dTo = oView.byId("dateTo").getDateValue();

            var aFilters = [];

            
            if (sCountry) {
                aFilters.push(new Filter(
                    "ShipCountry",
                    FilterOperator.EQ,
                    sCountry
                ));
            }

if (sMin && sMax) {
    aFilters.push(new Filter(
        "Freight",
        FilterOperator.BT,
        parseFloat(sMin),
        parseFloat(sMax)
    ));
} else if (sMin) {
    aFilters.push(new Filter(
        "Freight",
        FilterOperator.GE,
        parseFloat(sMin)
    ));
} else if (sMax) {
    aFilters.push(new Filter(
        "Freight",
        FilterOperator.LE,
        parseFloat(sMax)
    ));
}
            
            if (dFrom && dTo) {
                aFilters.push(new Filter(
                    "OrderDate",
                    FilterOperator.BT,
                    dFrom,
                    dTo
                ));
            }

            
            var oTable = this.byId("tableId");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        },
        onDelete: function(oEvent){
    var oItem = oEvent.getSource().getParent().getParent();
    var oTable = this.byId("tableId");
    oTable.removeItem(oItem);
},
onEdit: function (oEvent) {
    var oContext = oEvent.getSource().getBindingContext();
    var sPath = oContext.getPath();
    var oModel = oContext.getModel();

    var oInput = new sap.m.Input({
        value: oModel.getProperty(sPath + "/Freight")
    });

    var oDialog = new sap.m.Dialog({
        title: "Edit Freight",
        content: [oInput],
        beginButton: new sap.m.Button({
            text: "Save",
            press: function () {
                oModel.setProperty(sPath + "/Freight", Number(oInput.getValue()));
                oDialog.close();
                oDialog.destroy();
            }
        }),
        endButton: new sap.m.Button({
            text: "Cancel",
            press: function () {
                oDialog.close();
                oDialog.destroy();
            }
        })
    });

    oDialog.open();
}

    });
});