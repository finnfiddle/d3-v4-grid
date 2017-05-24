'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = function () {
  var _size = [1, 1];
  var actualSize = [0, 0];
  var _nodeSize = false;
  var _bands = false;
  var _padding = [0, 0];
  var _cols = void 0;
  var _rows = void 0;
  var nodes = void 0;
  var count = void 0;
  var result = null;

  var _layout = function _layout() {
    var i = -1;
    var tmpCols = _cols || 0;
    var tmpRows = _rows || 0;
    var col = void 0;
    var row = void 0;
    var x = void 0;
    var y = void 0;

    // FIXME: make explicit rows/cols exclusive? Or find a smart way to deal
    // with overflows (repeat?)
    // FIXME: when rows are set, fill top-to-bottom (make test with 5 data points and 4 rows)

    if (tmpRows && !tmpCols) {
      tmpCols = Math.ceil(count / tmpRows);
    } else {
      if (!tmpCols) tmpCols = Math.ceil(Math.sqrt(count));
      if (!tmpRows) tmpRows = Math.ceil(count / tmpCols);
    }

    if (_nodeSize) {
      x = (0, _d3Scale.scaleOrdinal)().domain((0, _d3Array.range)(tmpCols)).range((0, _d3Array.range)(0, (_size[0] + _padding[0]) * tmpCols, _size[0] + _padding[0]));

      y = (0, _d3Scale.scaleOrdinal)().domain((0, _d3Array.range)(tmpRows)).range((0, _d3Array.range)(0, (_size[1] + _padding[1]) * tmpRows, _size[1] + _padding[1]));

      actualSize[0] = _bands ? x(tmpCols - 1) + _size[0] : x(tmpCols - 1);
      actualSize[1] = _bands ? y(tmpRows - 1) + _size[1] : y(tmpRows - 1);
    } else if (_bands) {
      x = (0, _d3Scale.scaleBand)().domain((0, _d3Array.range)(tmpCols)).range([0, _size[0]]).paddingInner(_padding[0]).paddingOuter(0);

      y = (0, _d3Scale.scaleBand)().domain((0, _d3Array.range)(tmpRows)).range([0, _size[1]]).paddingInner(_padding[1]).paddingOuter(0);

      actualSize[0] = x.bandwidth();
      actualSize[1] = y.bandwidth();
    } else {
      x = (0, _d3Scale.scalePoint)().domain((0, _d3Array.range)(tmpCols)).range([0, _size[0]]);

      y = (0, _d3Scale.scalePoint)().domain((0, _d3Array.range)(tmpRows)).range([0, _size[1]]);

      actualSize[0] = x(1);
      actualSize[1] = y(1);
    }

    var newLayout = [];

    while (++i < count) {
      col = i % tmpCols;
      row = Math.floor(i / tmpCols);
      newLayout.push((0, _assign2.default)({}, nodes[i], { x: x(col), y: y(row) }));
    }

    _cols = tmpCols;
    _rows = tmpRows;

    return newLayout;
  };

  var grid = {
    size: function size(value) {
      if (!(0, _itsSet2.default)(value)) return _nodeSize ? actualSize : _size;
      actualSize = [0, 0];
      _nodeSize = (_size = value) == null;
      return this;
    },
    nodeSize: function nodeSize(value) {
      if (!(0, _itsSet2.default)(value)) return _nodeSize ? _size : actualSize;
      actualSize = [0, 0];
      _nodeSize = (_size = value) != null;
      return this;
    },
    rows: function rows(value) {
      if (!(0, _itsSet2.default)(value)) return _rows;
      _rows = value;
      return this;
    },
    cols: function cols(value) {
      if (!(0, _itsSet2.default)(value)) return _cols;
      _cols = value;
      return this;
    },
    bands: function bands(value) {
      if (!(0, _itsSet2.default)(value)) return _bands;
      _bands = value;
      return this;
    },
    padding: function padding(value) {
      if (!(0, _itsSet2.default)(value)) return _padding;
      _padding = value;
      return this;
    },
    data: function data(value) {
      if (!(0, _itsSet2.default)(value)) return nodes;
      nodes = value;
      count = nodes.length;
      return this;
    },
    layout: function layout() {
      result = _layout();
      return this;
    },
    nodes: function nodes() {
      return result;
    }
  };

  return grid;
};

var _d3Array = require('d3-array');

var _d3Scale = require('d3-scale');

var _itsSet = require('its-set');

var _itsSet2 = _interopRequireDefault(_itsSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }