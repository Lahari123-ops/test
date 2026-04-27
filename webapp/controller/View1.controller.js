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
        }

    });
});