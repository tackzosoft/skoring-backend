"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../../controllers");
function default_1(router) {
    router.get('/username-availability', (req, res, next) => {
        controllers_1.miscCtrV1.checkUsernameAvailability(req, res, next);
    });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=msic.rou.js.map