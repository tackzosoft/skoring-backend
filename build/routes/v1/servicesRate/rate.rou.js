"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const controllers_1 = require("../../../controllers");
const common_1 = require("../../../common");
function default_1(router) {
    router.post('/rate', celebrate_1.celebrate({
        body: {
            pickupPincode: common_1.validation.getServicesRate.pickupPincode.required(),
            deliveryPincode: common_1.validation.getServicesRate.deliveryPincode.required(),
            length: common_1.validation.getServicesRate.length.required(),
            width: common_1.validation.getServicesRate.width,
            height: common_1.validation.getServicesRate.height,
            weight: common_1.validation.getServicesRate.weight
        }
    }), (req, res, next) => {
        controllers_1.fedexServiceRate.getRate(req, res, next);
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=rate.rou.js.map