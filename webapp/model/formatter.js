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
        },
         formatFreightText: function (fValue) {
            if (fValue > 100) {
                return "High";
            } else if (fValue >= 50) {
                return "Medium";
            } else {
                return "Low";
            }
        },

        formatFreightState: function (fValue) {
            if (fValue > 100) {
                return "Error";
            } else if (fValue >= 50) {
                return "Warning";
            } else {
                return "Success";
            }
        },

       formatDeliveryText: function (dRequired, dOrder) {
    if (!dRequired || !dOrder) {
        return "";
    }

    var diffDays = (dRequired - dOrder) / (1000 * 60 * 60 * 24);

    if (diffDays < 5) {
        return "Delayed";
    } else if (diffDays <= 10) {
        return "At Risk";
    } else {
        return "On Time";
    }
},

formatDeliveryState: function (dRequired, dOrder) {
    if (!dRequired || !dOrder) {
        return "None";
    }

    var diffDays = (dRequired - dOrder) / (1000 * 60 * 60 * 24);

    if (diffDays < 5) {
        return "Error";
    } else if (diffDays <= 10) {
        return "Warning";
    } else {
        return "Success";
    }
}
    };
});