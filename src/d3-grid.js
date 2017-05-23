import { range } from 'd3-array';
import { scaleOrdinal, scaleBand, scalePoint } from 'd3-scale';
import itsSet from 'its-set';

export default function () {
  let size = [1, 1];
  let actualSize = [0, 0];
  let nodeSize = false;
  let bands = false;
  let padding = [0, 0];
  let cols;
  let rows;

  const layout = nodes => {
    let i = -1;
    const n = nodes.length;
    let tmpCols = cols || 0;
    let tmpRows = rows || 0;
    let col;
    let row;
    let x;
    let y;

    // FIXME: make explicit rows/cols exclusive? Or find a smart way to deal
    // with overflows (repeat?)
    // FIXME: when rows are set, fill top-to-bottom (make test with 5 data points and 4 rows)

    if (tmpRows && !tmpCols) {
      tmpCols = Math.ceil(n / tmpRows);
    }
    else {
      if (!tmpCols) tmpCols = Math.ceil(Math.sqrt(n));
      if (!tmpRows) tmpRows = Math.ceil(n / tmpCols);
    }

    if (nodeSize) {
      x = scaleOrdinal()
        .domain(range(tmpCols))
        .range(range(0, (size[0] + padding[0]) * tmpCols, size[0] + padding[0]));

      y = scaleOrdinal()
        .domain(range(tmpRows))
        .range(range(0, (size[1] + padding[1]) * tmpRows, size[1] + padding[1]));

      actualSize[0] = bands ? x(tmpCols - 1) + size[0] : x(tmpCols - 1);
      actualSize[1] = bands ? y(tmpRows - 1) + size[1] : y(tmpRows - 1);
    }
    else if (bands) {
      x = scaleBand()
        .domain(range(tmpCols))
        .range([0, size[0]])
        .paddingInner(padding[0])
        .paddingOuter(0);

      y = scaleBand()
        .domain(range(tmpRows))
        .range([0, size[1]])
        .paddingInner(padding[1])
        .paddingOuter(0);

      actualSize[0] = x.bandwidth();
      actualSize[1] = y.bandwidth();
    }
    else {
      x = scalePoint()
        .domain(range(tmpCols))
        .range([0, size[0]]);

      y = scalePoint()
        .domain(range(tmpRows))
        .range([0, size[1]]);

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

  const grid = function (nodes) {
    return layout(nodes);
  };

  grid.size = function (value) {
    if (!itsSet(value)) return nodeSize ? actualSize : size;
    actualSize = [0, 0];
    nodeSize = (size = value) == null;
    return grid;
  };

  grid.nodeSize = function (value) {
    if (!itsSet(value)) return nodeSize ? size : actualSize;
    actualSize = [0, 0];
    nodeSize = (size = value) != null;
    return grid;
  };

  grid.rows = function (value) {
    if (!itsSet(value)) return rows;
    rows = value;
    return grid;
  };

  grid.cols = function (value) {
    if (!itsSet(value)) return cols;
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
    if (!itsSet(value)) return padding;
    padding = value;
    return grid;
  };

  return grid;
}
