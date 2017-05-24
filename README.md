# D3 v4 Grid Layout

A grid layout for [D3](http://d3js.org). The grid layout takes a one-dimensional array of data and arranges it on a two-dimensional grid.

## Installation

```
npm i d3-v4-grid
```

## Example

```javascript
import Grid from 'd3-v4-grid';

const grid = Grid() // create new grid layout
  .data([ // input an array of data
    { foo: 'bar' },
    { foo: 'bar' },
    { foo: 'bar' },
    { foo: 'bar' },
  ])
  .bands(true) // use bands not points
  .size([400, 200]); // set size of container

// recompute the node positions
grid.layout();

console.log(grid.nodes());
// [
//   { foo: 'bar', x: 0, y: 0 },
//   { foo: 'bar', x: 200, y: 0 },
//   { foo: 'bar', x: 0, y: 100 },
//   { foo: 'bar', x: 200, y: 100 },
// ]

console.log(grid.nodeSize());
// [200, 100]

console.log(grid.cols());
// 2

console.log(grid.rows());
// 2
```

## API

### Grid()

Constructs a new grid layout.

### grid.size([size])

If size is specified, sets the overall size of the layout as [x, y].

If size is set, returns the current size. Default size is 1×1.

If instead nodeSize is set, returns the actual size of the layout after grid has been called.

### grid.nodeSize([nodeSize])

If nodeSize is specified, sets the size of an individual node as [x, y].

If nodeSize is set, returns the current nodeSize.

If instead size is set, returns the actual size of a node after grid has been called.

### grid.rows([num])

Fixes the layout to num rows or returns the number of rows (if it was set before).

### grid.cols([num])

Fixes the layout to num columns or returns the number of columns (if it was set before).

### grid.bands([useBands])

Configure the grid to treat nodes either as bands or points (default).

If `useBands` is set to `true` then the layout will use `d3.scaleBand()` to calculate positions. If it is set to false (default) then it will use `d3.scalePoint()`.

### grid.padding([padding])

Specify the padding between the node bands as [x, y]. x and y are relative to the band width/height, similar to the padding parameter of d3.scale.ordinal().rangeBands().

If nodeSize is set, padding is absolute. For example, to configure a grid layout for nodes with 100×100px size, and 20px horizontal and vertical padding, use:

```javascript
var grid = Grid()
  .nodeSize([100, 100])
  .padding([20, 20]);
```
### grid.data([data])

If data is set it sets the input data array for the layout. If not set then it returns the current data array.

### grid.layout()

Triggers the layout to recalculate the node positions.

### grid.nodes()

Returns the original input data array with positions `x` and `y` values added to each item.

## License

MIT
