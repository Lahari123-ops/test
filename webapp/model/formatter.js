sap.ui.define([
    "sap/ui/core/format/DateFormat"
], function (DateFormat) {
    "use strict";

    return {
        formatDate: function (oDate) {
            if (!oDate) {
                return "";
            }

            var oDateFormat = DateFormat.getDateInstance({
                pattern: "dd-MM-yyyy"
            });

            return oDateFormat.format(oDate);
        }
    };
});