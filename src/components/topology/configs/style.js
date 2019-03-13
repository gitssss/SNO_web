export default [{
  'selector': 'core',
  'style': {
    'selection-box-color': '#AAD8FF',
    'selection-box-border-color': '#8BB0D0',
    'selection-box-opacity': '0.5',
  },
},
{
  'selector': 'node',
  'style': {
    'height': 80,
    'width': 80,
    'content': 'data(id)',
    'font-size': '16px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '0',
    'border-color': '#fff',
    'text-outline-color': '#333',
    'text-outline-width': '1px',
    'color': '#fff',
    'overlay-padding': '6px',
    'z-index': '10',
  },
},
{
  'selector': 'node.deviceNode',
  'style': {
    'background-image': './assets/icons/unknown.png',
  },
},
{
  'selector': 'node.level1',
  'style': {
    'background-image': './assets/icons/asr5500.png',
  },
},
{
  'selector': 'node.level2',
  'style': {
    'background-image': './assets/icons/nexus7000.png',
  },
},
{
  'selector': 'node.nodeborder',
  'style': {
    'font-size': '72px',
    'text-valign': 'center',
    'text-halign': 'center',
    // 'background-color': '#0d435d',
    // 'background-opacity': '0.6',
    'border-color': '#0d435d',
    'border-opacity': '0.8',
    'border-width': '10px',
    'text-outline-width': '1px',
    'color': '#fff',
    'overlay-padding': '6px',
    'z-index': '10',
  },
},

{
  selector: 'node.inborder',
  css: {
    'background-image': './assets/icons/nexus7000.png',
  }
},

{
  selector: 'node.divide',
  css: {
    'content': '境内分行',
    'height': 180,
    'width': 400,
    'font-size': '52px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-opacity': '0',
    'color': '#fff',
    'text-outline-width': '0px',
  }
},

{
  selector: 'node.divide2',
  css: {
    'content': '海外分行',
    'height': 210,
    'width': 500,
    'font-size': '52px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-opacity': '0',
    'color': '#fff',
    'text-outline-width': '0px',
  }
},

{
  selector: 'node.divide3',
  css: {
    'content': '分支机构',
    'height': 130,
    'width': 300,
    'font-size': '52px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-opacity': '0',
    'color': '#fff',
    'text-outline-width': '0px',
  }
},

{
  selector: 'node.shenzhen',
  css: {
    'padding': '150px',
    'content': '深圳',
    'font-size': '72px',
    'text-valign': 'center',
    'text-halign': 'left',
    'background-width': 370,
    'background-height': 480,
    'color': '#fff',
    'overlay-padding': '6px',
    'border-opacity': '0',
    'background-image': './assets/images/center.png',
  }
},

{
  selector: 'node.shanghai',
  css: {
    'padding': '150px',
    'content': '上海',
    'font-size': '72px',
    'text-valign': 'center',
    'text-halign': 'right',
    'background-width': 370,
    'background-height': 480,
    'color': '#fff',
    'overlay-padding': '6px',
    'border-opacity': '0',
    'background-image': './assets/images/center.png',
  }
},

{
  selector: 'node.inshenzhen',
  css: {
    'height': 300,
    'width': 250,
    'padding': '20px',
    'content': '深圳',
    'font-size': '72px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-color': '#0d435d',
    'border-opacity': '0.8',
    'color': '#fff',
    'overlay-padding': '6px',
  }
},

{
  selector: 'node.inshanghai',
  css: {
    'height': 300,
    'width': 250,
    'padding': '20px',
    'content': '上海',
    'font-size': '72px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-color': '#0d435d',
    'border-opacity': '0.3',
    'color': '#fff',
    'overlay-padding': '6px',
  }
},

{
  selector: 'node.area',
  css: {
    'height': 200,
    'width': 350,
    'font-size': '72px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-opacity': '0',
    'color': '#fff',
    'text-outline-width': '0px',
  }
},

{
  selector: 'node.firewall',
  css: {
    'height': 100,
    'width': 100,
    'font-size': '24px',
    'text-valign': 'center',
    'text-halign': 'center',
    'background-color': '#0d435d',
    'background-opacity': '1',
    'border-opacity': '0',
    'color': '#fff',
    'text-outline-width': '0px',
  }
},

{
  'selector': 'node:selected',
  'style': {
    'border-width': '6px',
    'border-color': '#AAD8FF',
    'border-opacity': '0.5',
    'background-color': '#77828C',
    'text-outline-color': '#77828C',
  },
},
{
  'selector': 'edge',
  'style': {
    'font-size': '16px',
    'content': '',
    'curve-style': 'haystack',
    'haystack-radius': '0',
    'color': '#fff',
    'text-outline-color': '#888',
    'text-outline-width': '1px',
    'line-color': '#666',
    'width': '3px',
    'overlay-padding': '3px',
  },
},
{
  "selector": "edge.unbundled-bezier",
  "style": {
    "curve-style": "unbundled-bezier",
    "control-point-distances": 160,
    "control-point-weights": 0.5
  }
},
{
  "selector": "edge.principal",
  "style": {
    "line-color": "#0d435d",
    'width': '8px',
  }
},
{
  "selector": "edge.principalRed",
  "style": {
    "line-color": "#ff0000",
    'width': '8px',
  }
},
];