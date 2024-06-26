"use strict";
var server = require("server");

var page = module.superModule;
server.extend(page);

server.append("SubmitPayment", function (req, res, next) {
    const tamaraHelper = require("*/cartridge/scripts/util/tamaraHelper");
  
    this.on("route:BeforeComplete", function (req, res) {
      var viewData = res.getViewData();
  
      if (tamaraHelper.getEnablementStatus()) {
        try {
          if (viewData.order) {
            const tamaraAvailablePayment = tamaraHelper.getAvailablePayments();
            viewData.order.tamara = tamaraAvailablePayment;
          }
        } catch (e) {
          tamaraHelper
            .getTamaraLogger()
            .error(
              "Tamara: " + e.toString() + " in " + e.fileName + ":" + e.lineNumber
            );
        }
  
        res.setViewData(viewData);
      }
    });
  
    next();
});

module.exports = server.exports();