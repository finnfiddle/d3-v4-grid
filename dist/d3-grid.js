'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var size = [1, 1];
  var actualSize = [0, 0];
  var nodeSize = false;
  var bands = false;
  var padding = [0, 0];
  var cols = void 0;
  var rows = void 0;

  var layout = function layout(nodes) {
    var i = -1;
    var n = nodes.length;
    var tmpCols = cols || 0;
    var tmpRows = rows || 0;
    var col = void 0;
    var row = void 0;
    var x = void 0;
    var y = void 0;

    // FIXME: make explicit rows/cols exclusive? Or find a smart way to deal
    // with overflows (repeat?)
    // FIXME: when rows are set, fill top-to-bottom (make test with 5 data points and 4 rows)

    if (tmpRows && !tmpCols) {
      tmpCols = Math.ceil(n / tmpRows);
    } else {
      if (!tmpCols) tmpCols = Math.ceil(Math.sqrt(n));
      if (!tmpRows) tmpRows = Math.ceil(n / tmpCols);
    }

    if (nodeSize) {
      x = (0, _d3Scale.scaleOrdinal)().domain((0, _d3Array.range)(tmpCols)).range((0, _d3Array.range)(0, (size[0] + padding[0]) * tmpCols, size[0] + padding[0]));

      y = (0, _d3Scale.scaleOrdinal)().domain((0, _d3Array.range)(tmpRows)).range((0, _d3Array.range)(0, (size[1] + padding[1]) * tmpRows, size[1] + padding[1]));

      actualSize[0] = bands ? x(tmpCols - 1) + size[0] : x(tmpCols - 1);
      actualSize[1] = bands ? y(tmpRows - 1) + size[1] : y(tmpRows - 1);
    } else if (bands) {
      x = (0, _d3Scale.scaleBand)().domain((0, _d3Array.range)(tmpCols)).range([0, size[0]]).paddingInner(padding[0]).paddingOuter(0);

      y = (0, _d3Scale.scaleBand)().domain((0, _d3Array.range)(tmpRows)).range([0, size[1]]).paddingInner(padding[1]).paddingOuter(0);

      actualSize[0] = x.bandwidth();
      actualSize[1] = y.bandwidth();
    } else {
      x = (0, _d3Scale.scalePoint)().domain((0, _d3Array.range)(tmpCols)).range([0, size[0]]);

      y = (0, _d3Scale.scalePoint)().domain((0, _d3Array.range)(tmpRows)).range([0, size[1]]);

      actualSize[0] = x(1);
      actualSize[1] = y(1);
    }

    while (++i < n) {
      col = i % tmpCols;
      row = Math.floor(i / tmpCols);
      nodes[i].x = x(col);
      nodes[i].y = y(row);
    }

    return nodes;
  };

  var grid = function grid(nodes) {
    return layout(nodes);
  };

  grid.size = function (value) {
    if (!(0, _itsSet2.default)(value)) return nodeSize ? actualSize : size;
    actualSize = [0, 0];
    nodeSize = (size = value) == null;
    return grid;
  };

  grid.nodeSize = function (value) {
    if (!(0, _itsSet2.default)(value)) return nodeSize ? size : actualSize;
    actualSize = [0, 0];
    nodeSize = (size = value) != null;
    return grid;
  };

  grid.rows = function (value) {
    if (!(0, _itsSet2.default)(value)) return rows;
    rows = value;
    return grid;
  };

  grid.cols = function (value) {
    if (!(0, _itsSet2.default)(value)) return cols;
    cols = value;
    return grid;
  };

  grid.bands = function () {
    bands = true;
    return grid;
  };

  grid.points = function () {
    bands = false;
    return grid;
  };

  grid.padding = function (value) {
    if (!(0, _itsSet2.default)(value)) return padding;
    padding = value;
    return grid;
  };

  return grid;
};

var _d3Array = require('d3-array');

var _d3Scale = require('d3-scale');

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }