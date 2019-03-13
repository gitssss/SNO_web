
  
export default {
  name: 'preset',
  
    positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
    zoom: undefined, // the zoom level to set (prob want fit = false if set)
    pan: undefined, // the pan level to set (prob want fit = false if set)
    fit: true, // whether to fit to viewport
    padding: 30, // padding on fit
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
  };

// export default {

//   name: 'cose',

//   ready: function(){},
  
//   stop: function(){},
  
//   // Whether to animate while running the layout
//   // true : Animate continuously as the layout is running
//   // false : Just show the end result
//   // 'end' : Animate with the end result, from the initial positions to the end positions
//   animate: true,
  
//   // Easing of the animation for animate:'end'
//   animationEasing: undefined,
  
//   // The duration of the animation for animate:'end'
//   animationDuration: undefined,
  
//   // A function that determines whether the node should be animated
//   // All nodes animated by default on animate enabled
//   // Non-animated nodes are positioned immediately when the layout starts
//   animateFilter: function (){ return true; },
  
  
//   // The layout animates only after this many milliseconds for animate:true
//   // (prevents flashing on fast runs)
//   animationThreshold: 250,
  
//   // Number of iterations between consecutive screen positions update
//   refresh: 20,
  
//   // Whether to fit the network view after when done
//   fit: true,
  
//   // Padding on fit
//   padding: 60,
  
//   // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
//   boundingBox: undefined,
  
//   // Excludes the label when calculating node bounding boxes for the layout algorithm
//   nodeDimensionsIncludeLabels: false,
  
//   // Randomize the initial positions of the nodes (true) or use existing positions (false)
//   randomize: false,
  
//   // Extra spacing between components in non-compound graphs
//   componentSpacing: 130000,
  
//   // Node repulsion (non overlapping) multiplier
//   nodeRepulsion: 300000,
  
//   // Node repulsion (overlapping) multiplier
//   nodeOverlap: 15,
  
//   // Ideal edge (non nested) length
//   idealEdgeLength: function(){ return 164; },
  
//   // Divisor to compute edge forces
//   edgeElasticity: function(){ return 32; },
  
//   // Nesting factor (multiplier) to compute ideal edge length for nested edges
//   nestingFactor: 1.5,
  
//   // Gravity force (constant)
//   gravity: 1,
  
//   // Maximum number of iterations to perform
//   numIter: 1000,
  
//   // Initial temperature (maximum node displacement)
//   initialTemp: 1000,
  
//   // Cooling factor (how the temperature is reduced between consecutive iterations
//   coolingFactor: 0.99,
  
//   // Lower temperature threshold (below this point the layout will end)
//   minTemp: 1.0,
  
//   // Pass a reference to weaver to use threads for calculations
//   weaver: false
// };