"use strict";var fetch=require("node-fetch"),router=require("express").Router();router.get("",function(e,r){r.render("pages/index")}),router.get("/about",function(e,r){r.render("pages/about")}),router.get("/login",function(e,r){var t=e.query.mapId;r.render("pages/login",{mapId:t})}),router.get("/map",function(e,r){var t=e.cookies.user,o=e.query.mapId;t?r.render("pages/map",{mapId:o}):r.redirect("/login?mapId=".concat(o))}),router.get("/maps",function(e,r){try{e.cookies.user;r.render("pages/maps")}catch(e){r.redirect("/")}}),router.get("/contracts",function(e,r){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:try{r.render("pages/contracts")}catch(e){console.log(e),r.redirect("/")}case 1:case"end":return e.stop()}})}),router.get("/statements",function(e,r){try{e.cookies.user;console.log(e.query);var t=e.query,o=t.contractId,n=t.agent;if(!o)throw new Error("No contract Id in query");if(!n)throw new Error("No agent in query");r.render("pages/statements",{contractId:o,agent:n})}catch(e){console.error(e),r.redirect("/")}}),module.exports=router;