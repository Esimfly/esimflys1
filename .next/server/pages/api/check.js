"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/check";
exports.ids = ["pages/api/check"];
exports.modules = {

/***/ "(api)/./pages/api/check.js":
/*!****************************!*\
  !*** ./pages/api/check.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n// /pages/api/check.js\nasync function handler(req, res) {\n    const API_KEY = process.env.API_KEY; // اقرأ مفتاح API من .env.local\n    if (!API_KEY) {\n        return res.status(500).json({\n            error: \"API key not configured\"\n        });\n    }\n    // تحقق من أن method هو GET فقط\n    if (req.method !== \"GET\") {\n        return res.status(405).json({\n            error: \"Method not allowed\"\n        });\n    }\n    const { iccid } = req.query;\n    if (!iccid) {\n        return res.status(400).json({\n            error: \"ICCID parameter is required\"\n        });\n    }\n    try {\n        // استدعاء API الخارجي مع مفتاح API و ICCID\n        const apiResponse = await fetch(`https://api.esim-go.com/v2.4/esims/${iccid}/bundles`, {\n            method: \"GET\",\n            headers: {\n                \"X-API-Key\": API_KEY\n            }\n        });\n        if (!apiResponse.ok) {\n            return res.status(apiResponse.status).json({\n                error: \"Failed to fetch data from external API\"\n            });\n        }\n        const data = await apiResponse.json();\n        return res.status(200).json(data);\n    } catch (error) {\n        console.error(\"Error fetching data:\", error);\n        return res.status(500).json({\n            error: \"Internal Server Error\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hlY2suanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNCQUFzQjtBQUVQLGVBQWVBLFFBQVFDLEdBQUcsRUFBRUMsR0FBRztJQUM1QyxNQUFNQyxVQUFVQyxRQUFRQyxJQUFJRixTQUFVLCtCQUErQjtJQUVyRSxJQUFJLENBQUNBLFNBQVM7UUFDWixPQUFPRCxJQUFJSSxPQUFPLEtBQUtDLEtBQUs7WUFBRUMsT0FBTztRQUF5QjtJQUNoRTtJQUVBLCtCQUErQjtJQUMvQixJQUFJUCxJQUFJUSxXQUFXLE9BQU87UUFDeEIsT0FBT1AsSUFBSUksT0FBTyxLQUFLQyxLQUFLO1lBQUVDLE9BQU87UUFBcUI7SUFDNUQ7SUFFQSxNQUFNLEVBQUVFLEtBQUssRUFBRSxHQUFHVCxJQUFJVTtJQUV0QixJQUFJLENBQUNELE9BQU87UUFDVixPQUFPUixJQUFJSSxPQUFPLEtBQUtDLEtBQUs7WUFBRUMsT0FBTztRQUE4QjtJQUNyRTtJQUVBLElBQUk7UUFDRiwyQ0FBMkM7UUFDM0MsTUFBTUksY0FBYyxNQUFNQyxNQUFNLENBQUMsbUNBQW1DLEVBQUVILE1BQU0sUUFBUSxDQUFDLEVBQUU7WUFDckZELFFBQVE7WUFDUkssU0FBUztnQkFDUCxhQUFhWDtZQUNmO1FBQ0Y7UUFFQSxJQUFJLENBQUNTLFlBQVlHLElBQUk7WUFDbkIsT0FBT2IsSUFBSUksT0FBT00sWUFBWU4sUUFBUUMsS0FBSztnQkFBRUMsT0FBTztZQUF5QztRQUMvRjtRQUVBLE1BQU1RLE9BQU8sTUFBTUosWUFBWUw7UUFFL0IsT0FBT0wsSUFBSUksT0FBTyxLQUFLQyxLQUFLUztJQUU5QixFQUFFLE9BQU9SLE9BQU87UUFDZFMsUUFBUVQsTUFBTSx3QkFBd0JBO1FBQ3RDLE9BQU9OLElBQUlJLE9BQU8sS0FBS0MsS0FBSztZQUFFQyxPQUFPO1FBQXdCO0lBQy9EO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lc2ltLWRhdGEtdXNhZ2UtY2hlY2tlci8uL3BhZ2VzL2FwaS9jaGVjay5qcz9kYzUzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIC9wYWdlcy9hcGkvY2hlY2suanNcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICBjb25zdCBBUElfS0VZID0gcHJvY2Vzcy5lbnYuQVBJX0tFWTsgIC8vINin2YLYsdijINmF2YHYqtin2K0gQVBJINmF2YYgLmVudi5sb2NhbFxuXG4gIGlmICghQVBJX0tFWSkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnQVBJIGtleSBub3QgY29uZmlndXJlZCcgfSk7XG4gIH1cblxuICAvLyDYqtit2YLZgiDZhdmGINij2YYgbWV0aG9kINmH2YggR0VUINmB2YLYt1xuICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cblxuICBjb25zdCB7IGljY2lkIH0gPSByZXEucXVlcnk7XG5cbiAgaWYgKCFpY2NpZCkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnSUNDSUQgcGFyYW1ldGVyIGlzIHJlcXVpcmVkJyB9KTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8g2KfYs9iq2K/Yudin2KEgQVBJINin2YTYrtin2LHYrNmKINmF2Lkg2YXZgdiq2KfYrSBBUEkg2YggSUNDSURcbiAgICBjb25zdCBhcGlSZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5lc2ltLWdvLmNvbS92Mi40L2VzaW1zLyR7aWNjaWR9L2J1bmRsZXNgLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnWC1BUEktS2V5JzogQVBJX0tFWVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFhcGlSZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoYXBpUmVzcG9uc2Uuc3RhdHVzKS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGV4dGVybmFsIEFQSScgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGFwaVJlc3BvbnNlLmpzb24oKTtcblxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhdGE6JywgZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJBUElfS0VZIiwicHJvY2VzcyIsImVudiIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsIm1ldGhvZCIsImljY2lkIiwicXVlcnkiLCJhcGlSZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsIm9rIiwiZGF0YSIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/check.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/check.js"));
module.exports = __webpack_exports__;

})();