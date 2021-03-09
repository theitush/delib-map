"use strict";var data,socket=io(),editBox=document.getElementById("editBox"),editForm=document.getElementById("editForm"),linkFav=document.getElementById("linkFav"),linkFavIcon=document.getElementById("linkFavIcon"),deleteEdge=document.getElementById("deleteEdge");function connectNodes(e){var a=e.from,c=e.to,r=(e.clear,e.connect);return function(e){var t=e.fromNew,n=e.toNew,o=e.isClear,d=e.connectNew;return t&&(a=t),n&&(c=n),void 0!==d&&(r=d),o&&(a=c=null),{from:a,to:c,connect:r}}}editBox.style.display="none",linkFav.addEventListener("click",connectNodesEvent),deleteEdge.addEventListener("click",deleteEdgeFn);var setConnectNodes=connectNodes({from:null,to:null});!function(){var l,t,n,o,d,a,c,r,s,i,m;regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,l=getMapId()){e.next=4;break}throw new Error("no mapId in URL");case 4:return e.next=6,regeneratorRuntime.awrap(fetch("/maps/get-map?mapId=".concat(l)));case 6:return t=e.sent,e.next=9,regeneratorRuntime.awrap(t.json());case 9:if(n=e.sent,o=n.map){e.next=13;break}throw new Error("DB didnt returned a map");case 13:d=o.nodes,a=o.edges,c=new vis.DataSet(d),r=new vis.DataSet(a),s=document.getElementById("mynetwork"),i={nodes:{color:"#ff0000",fixed:!(data={nodes:c,edges:r}),font:"12px arial white",scaling:{label:!0},shadow:!0}},(m=new vis.Network(s,data,i)).on("click",function(e){var t=e.nodes;0===e.edges.length&&0===t.length&&(editBox.style.display="none",deleteEdge.style.display="none")}),m.on("hold",function(e){var t,n,o,d=e.edges,a=e.nodes;0===d.length&&0===a.length&&(t="id".concat(Math.random().toString(16).slice(2)),n=getMapId(),o={id:t,label:"test"},data.nodes.add([o]),createNode(n,o),socket.emit("node create",o))}),m.on("selectNode",function(e){var t=e.nodes,n=e.pointer;editBox.style.display="block",editBox.style.top="".concat(n.DOM.y+120,"px"),editBox.style.left="".concat(n.DOM.x,"px");var o=t[0],d=data.nodes.get(o);editForm.children.nodeName.value=d.label,editForm.dataset.nodeId=o,linkFav.dataset.form=o;var a,c=setConnectNodes({}),r=c.connect,s=c.from;r?(setConnectNodes({toNew:o}),a=data.edges.add({from:s,to:o})[0],socket.emit("edge create",{mapId:l,from:s,to:o,id:a})):setConnectNodes({fromNew:o})}),m.on("selectEdge",function(e){var t=e.edges,n=e.pointer,o=t[0];deleteEdge.style.display="block",deleteEdge.style.top="".concat(n.DOM.y-100,"px"),deleteEdge.style.left="".concat(n.DOM.x-40,"px"),deleteEdge.dataset.edgeId=o}),socket.on("node update",function(e){data.nodes.updateOnly({id:e.id,label:e.label})}),socket.on("node create",function(e){try{data.nodes.add(e)}catch(e){console.error(e.message)}}),socket.on("edge create",function(e){try{var t=setConnectNodes({}),n=t.from,o=t.to;n==e.from&&o===e.to||data.edges.add(e)}catch(e){console.error(e)}}),socket.on("edge delete",function(e){data.edges.remove(e)}),e.next=33;break;case 30:e.prev=30,e.t0=e.catch(0),console.error(e.t0);case 33:case"end":return e.stop()}},null,null,[[0,30]])}();