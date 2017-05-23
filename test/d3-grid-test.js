import test from 'ava';
// import d3 from 'd3';
import grid from '../src/d3-grid';

function layout(node) {
  return {
    x: node.x,
    y: node.y,
  };
}

test('equally distributes 4 nodes within a 1x1 space, left to right, top to bottom', t => {
  t.plan(1);

  const l = grid().points();
  const nodes = [{}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

// test('bar', async t => {
// 	const bar = Promise.resolve('bar');
//
// 	t.is(await bar, 'bar');
// });

test('equally distributes 4 nodes within a 1x1 space, left to right, top to bottom', t => {
  const l = grid().points();
  const nodes = [{}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test('1 data point is in the center (is this good or should it be at [0,0]?)', t => {
  const l = grid().points();
  const nodes = [{}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0.5, y: 0.5 },
  ]);
});

test('equally distributes 5 nodes within a 1x1 space', t => {
  const l = grid().points();
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 0.5, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0.5, y: 1 },
  ]);
});

test('equally distributes 5 nodes within a 300x500 space', t => {
  const l = grid().points()
    .size([300, 500]);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 150, y: 0 },
    { x: 300, y: 0 },
    { x: 0, y: 500 },
    { x: 150, y: 500 },
  ]);
});

test('fixed amount of cols', t => {
  const l = grid().points().cols(2);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    { x: 0, y: 1 },
  ]);
});

test('fixed amount of rows', t => {
  const l = grid().points().rows(3);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    { x: 0, y: 1 },
  ]);
});

test('fixed amount of cols and rows', t => {
  const l = grid()
    .points()
    .cols(2)
    .rows(5);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0.25 },
    { x: 1, y: 0.25 },
    { x: 0, y: 0.5 },
  ]);
});

test('1 row', t => {
  const l = grid().points().rows(1);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0.5 },
    { x: 0.25, y: 0.5 },
    { x: 0.5, y: 0.5 },
    { x: 0.75, y: 0.5 },
    { x: 1, y: 0.5 },
  ]);
});

// TODO: This needs some more thought ..);
// test(// '4 rows, 5 data points', t => {
// //   const l = grid().points().rows(4);
// //   const nodes = [{}, {}, {}, {}, {}];
//
// //   t.deepEqual(l(nodes).map(layout), [
// //     { x: 0, y: 0 },
// //     { x: 0, y: 1 / 3 },
// //     { x: 0, y: 2 / 3 },
// //     { x: 0, y: 1 },
// //     { x: 1, y: 0 }
// //   ]);
// // });

test('fixed node sizes', t => {
  const l = grid().points().nodeSize([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test('reset rows/cols after each call', t => {
  const l = grid().points();
  let nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 0.5, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0.5, y: 1 },
  ]);

  nodes = [{}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test('fixed amount of cols stays the same', t => {
  const l = grid().points().cols(2);
  let nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0.5 },
    { x: 1, y: 0.5 },
    { x: 0, y: 1 },
  ]);

  nodes = [{}, {}, {}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 / 3 },
    { x: 1, y: 1 / 3 },
    { x: 0, y: 2 / 3 },
    { x: 1, y: 2 / 3 },
    { x: 0, y: 1 },

  ]);
});

test('bands', t => {
  const l = grid().bands();
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 1 / 3, y: 0 },
    { x: 2 / 3, y: 0 },
    { x: 0, y: 0.5 },
    { x: 1 / 3, y: 0.5 },
  ]);

  l.cols(2);

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 0.5, y: 0 },
    { x: 0, y: 1 / 3 },
    { x: 0.5, y: 1 / 3 },
    { x: 0, y: 2 / 3 },
  ]);
});

test('bands with padding', t => {
  const l = grid().bands().padding([0.5, 0.5]);
  const nodes = [{}, {}, {}, {}, {}];

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 0.4, y: 0 },
    { x: 0.8, y: 0 },
    { x: 0, y: 2 / 3 },
    { x: 0.4, y: 2 / 3 },
  ]);

  l.cols(2);

  t.deepEqual(l(nodes).map(layout), [
    { x: 0, y: 0 },
    { x: 2 / 3, y: 0 },
    { x: 0, y: 0.4 },
    { x: 2 / 3, y: 0.4 },
    { x: 0, y: 0.8 },
  ]);
});

test('initial sizes', t => {
  const l = grid();
  t.deepEqual(l.size(), [1, 1]);
  t.deepEqual(l.nodeSize(), [0, 0]);
  t.deepEqual(l.nodeSize([1, 1]).size(), [0, 0]);
});

test('.size() reports actual size when .points().nodeSize() is set', t => {
  const l = grid().points().nodeSize([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  l(nodes);
  t.deepEqual(l.size(), [2, 1]);
});

test('.size() reports actual size when .points().nodeSize() is set', t => {
  const l = grid().points().nodeSize([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  l(nodes);
  t.deepEqual(l.size(), [2, 1]);
});

test('.size() reports actual size when .bands().nodeSize() is set', t => {
  const l = grid().bands().nodeSize([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  l(nodes);
  t.deepEqual(l.size(), [3, 2]);
});

test('.nodeSize() reports actual spacing between points when .points().size() is set', t => {
  const l = grid().points().size([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  l(nodes);
  t.deepEqual(l.nodeSize(), [0.5, 1]);
});

test('.nodeSize() reports actual size when .bands().size() is set', t => {
  const l = grid().bands().size([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  l(nodes);
  t.deepEqual(l.nodeSize(), [1 / 3, 0.5]);
});

test('.nodeSize() reports actual size when .bands().size().padding() is set', t => {
  const l = grid()
    .bands()
    .padding([0.5, 0.5])
    .size([1, 1]);
  const nodes = [{}, {}, {}, {}, {}];

  l(nodes);
  t.deepEqual(l.nodeSize(), [1 / 5, 1 / 3]);
});
