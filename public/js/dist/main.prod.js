"use strict";var data,socket=io(),editBox=document.getElementById("editBox"),editForm=document.getElementById("editForm"),linkFav=document.getElementById("linkFav"),linkFavIcon=document.getElementById("linkFavIcon"),deleteEdge=document.getElementById("deleteEdge");function networkStateClouser(e){var r=e.from,c=e.to,l=(e.clear,e.edgeId),s=e.connect;return function(e){var t=e.fromNew,n=e.toNew,o=e.isClear,d=e.edgeIdNew,a=e.connectNew;return t&&(r=t),n&&(c=n),d&&(l=d),void 0!==a&&(s=a),o&&(r=c=null),{from:r,to:c,edgeId:l,connect:s}}}editBox.style.display="none",linkFav.addEventListener("click",connectTheNode),deleteEdge.addEventListener("click",deleteEdgeFn);var networkState=networkStateClouser({from:null,to:null});!function(){var s,t,n,o,d,a,r,c,l,i,g;regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=getMapId()){e.next=4;break}throw new Error("no mapId in URL");case 4:return e.next=6,regeneratorRuntime.awrap(fetch("/maps/get-map?mapId=".concat(s)));case 6:return t=e.sent,e.next=9,regeneratorRuntime.awrap(t.json());case 9:if(n=e.sent,o=n.map){e.next=13;break}throw new Error("DB didnt returned a map");case 13:d=o.nodes,a=o.edges,r=new vis.DataSet(d),c=new vis.DataSet(a),l=document.getElementById("mynetwork"),i={nodes:{color:"#ff0000",fixed:!(data={nodes:r,edges:c}),font:"12px arial white",scaling:{label:!0},shadow:!0}},(g=new vis.Network(l,data,i)).on("click",function(e){var t=e.nodes;0===e.edges.length&&0===t.length&&(editBox.style.display="none",deleteEdge.style.display="none")}),g.on("hold",function(e){var t,n,o,d=e.edges,a=e.nodes;0===d.length&&0===a.length&&(t="id".concat(Math.random().toString(16).slice(2)),n=getMapId(),o={id:t,label:"test"},data.nodes.add([o]),createNode(n,o),socket.emit("node create",o))}),g.on("selectNode",function(e){var t=e.nodes,n=e.pointer,o=t[0];editBox.style.display="block",editBox.style.top="".concat(n.DOM.y+120,"px"),editBox.style.left="".concat(n.DOM.x,"px");var d=data.nodes.get(o);editForm.children.nodeName.value=d.label;var a,r=networkState({}),c=r.connect,l=r.from;c?(networkState({toNew:o}),a=data.edges.add({from:l,to:o})[0],socket.emit("edge create",{mapId:s,from:l,to:o,id:a})):networkState({fromNew:o})}),g.on("selectEdge",function(e){var t,n=e.edges,o=e.pointer;1===n.length?(console.log("only on edge was selected"),editBox.style.display="none",t=n[0],deleteEdge.style.display="block",deleteEdge.style.top="".concat(o.DOM.y-100,"px"),deleteEdge.style.left="".concat(o.DOM.x-40,"px"),deleteEdge.dataset.edgeId=t,networkState({connectNew:!1})):deleteEdge.style.display="none"}),socket.on("node update",function(e){data.nodes.updateOnly({id:e.id,label:e.label})}),socket.on("node create",function(e){try{data.nodes.add(e)}catch(e){console.error(e.message)}}),socket.on("edge create",function(e){try{var t=networkState({}),n=t.from,o=t.to;n==e.from&&o===e.to||data.edges.add(e)}catch(e){console.error(e)}}),socket.on("edge delete",function(e){data.edges.remove(e)}),e.next=33;break;case 30:e.prev=30,e.t0=e.catch(0),console.error(e.t0);case 33:case"end":return e.stop()}},null,null,[[0,30]])}();