"use strict";var statements=new Statements;function createStatement(e){var n;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,hideEditStatement(),Array.isArray(statements.selectedNodes)){t.next=4;break}throw new Error("statements.selectedNodes is not array");case 4:if("string"!=typeof e)throw new Error("text is not string");t.next=6;break;case 6:return t.next=8,regeneratorRuntime.awrap(axios.put("http://ouri-digital-agent.cf/ibc/app/".concat(agent,"/").concat(contractId,"/create_statement"),{name:"create_statement",values:{parents:statements.selectedNodes,text:e,tags:["test"]}}));case 8:n=t.sent,console.log(n),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(0),console.error(t.t0),hideEditStatement();case 16:case"end":return t.stop()}},null,null,[[0,12]])}function showStatementEditor(t){console.log(t);var e=document.querySelector("#showStatementEditor");e.style.left="".concat(t.x,"px"),e.style.top="".concat(t.y,"px"),e.style.display="block"}function hideEditStatement(){document.querySelector("#showStatementEditor").style.display="none"}function updateStatement(t){t.preventDefault();try{var e=t.target.children.text.value;e&&(createStatement(e),t.target.reset())}catch(t){console.error(t)}}function getStatement(e){var n,a,r;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,regeneratorRuntime.awrap(axios.post("http://ouri-digital-agent.cf/ibc/app/".concat(agent,"/").concat(contractId,"/get_statement_dynasty"),{name:"get_statement_dynasty",values:{parent:e,levels:3}}));case 3:if(n=t.sent,a=n.data,r=n.error)throw new Error(r);t.next=8;break;case 8:console.log(a),statements.updateStatements(a),statements.convertAllStatmentsToMap(statements.statementsObj),t.next=15;break;case 13:t.prev=13,t.t0=t.catch(0);case 15:case"end":return t.stop()}},null,null,[[0,13]])}!function(){var e,n;regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,regeneratorRuntime.awrap(axios.post("http://ouri-digital-agent.cf/ibc/app/".concat(agent,"/").concat(contractId,"/get_statements"),{name:"get_statements",values:{parent:[]}}));case 3:e=t.sent,n=e.data,console.log(n),statements.updateStatements(n),statements.convertAllStatmentsToMap(n),document.addEventListener("keyup",function(t){var e,n;switch(t.code){case"Tab":0<statements.selectedNodes.length&&(e=statements.selectedNodes[0],n=statements.network.getPosition(e),(n=statements.network.canvasToDOM(n)).x=n.x+150,n.y=n.y-150,showStatementEditor(n))}}),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}},null,null,[[0,11]])}();