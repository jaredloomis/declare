"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Report", {
  enumerable: true,
  get: function get() {
    return _Report.default;
  }
});
Object.defineProperty(exports, "executeCustomTest", {
  enumerable: true,
  get: function get() {
    return _CustomTest.executeCustomTest;
  }
});
Object.defineProperty(exports, "executeTestRun", {
  enumerable: true,
  get: function get() {
    return _TestRun.default;
  }
});
exports.executePack = exports.lambdaHandler = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _declareCommon = require("declare-common");

var _declareDb = require("declare-db");

var _Runner = _interopRequireDefault(require("./Runner"));

var _Report = _interopRequireDefault(require("./Report"));

var _SeleniumDriver = _interopRequireDefault(require("./SeleniumDriver"));

var _CustomTest = require("./CustomTest");

var _TestRun = _interopRequireDefault(require("./TestRun"));

var _screenshot = _interopRequireDefault(require("./modules/screenshot"));

var _destructiveInput = _interopRequireDefault(require("./modules/destructive-input"));

var internalIDs = _declareCommon.config.TestPack.internalIDs;

var lambdaHandler =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(event, context) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", JSON.stringify({
              event: event,
              context: context
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function lambdaHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.lambdaHandler = lambdaHandler;

var executePack =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(pageID, packID) {
    var _ref3, internalID, page, tpData, datum, driver, runner, module, result;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _declareDb.TestPack.findOne({
              _id: packID
            });

          case 2:
            _ref3 = _context2.sent;
            internalID = _ref3.internalID;
            _context2.next = 6;
            return _declareDb.Page.findOne({
              _id: pageID
            });

          case 6:
            page = _context2.sent;
            tpData = page.testPackData;
            datum = tpData && tpData.filter(function (dat) {
              return dat.testPack.toString() === packID;
            })[0] || {}; // Create Runner

            driver = new _SeleniumDriver.default({});
            runner = new _Runner.default(driver, "Screenshot", {});
            _context2.next = 13;
            return runner.initNavigator();

          case 13:
            // Find module
            module = findModule(internalID); // Run module

            if (!module) {
              _context2.next = 23;
              break;
            }

            _context2.next = 17;
            return module(runner, page, datum.values, datum.data);

          case 17:
            result = _context2.sent;
            _context2.next = 20;
            return runner.quit();

          case 20:
            return _context2.abrupt("return", processResult(result, pageID, packID));

          case 23:
            return _context2.abrupt("return", {});

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function executePack(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.executePack = executePack;

function findModule(packID) {
  return packID === internalIDs.screenshot ? _screenshot.default : packID === internalIDs.destructive ? _destructiveInput.default : null;
}

var processResult = function processResult(result, pageID, packID) {
  return (0, _objectSpread2.default)({}, result, {
    report: (0, _objectSpread2.default)({}, result.report, {
      pageID: pageID,
      packID: packID
    })
  });
};