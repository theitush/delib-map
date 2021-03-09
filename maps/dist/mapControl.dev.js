"use strict";

var express = require("express");

var app = express();

var _require = require('./mapSchema'),
    mapSchema = _require.mapSchema;

var mongoose = require('mongoose');

var Map = mongoose.model('Map', mapSchema);

exports.createMap = function _callee(req, res) {
  var creator, newMapName, newMap, newMapDB, mapId;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log('creating');
          creator = req.username;
          newMapName = req.body.newMapName;

          if (newMapName) {
            _context.next = 6;
            break;
          }

          throw new Error('no name in the req');

        case 6:
          newMap = new Map({
            creator: creator,
            name: newMapName,
            creationDate: Date.now()
          });
          _context.next = 9;
          return regeneratorRuntime.awrap(newMap.save());

        case 9:
          newMapDB = _context.sent;
          mapId = newMapDB._id;
          res.send({
            ok: true,
            newMap: true,
            creator: creator,
            mapId: mapId,
            name: newMapName
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.send({
            error: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.getMaps = function _callee2(req, res) {
  var maps;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Map.find({
            name: {
              $exists: true
            }
          }));

        case 2:
          maps = _context2.sent;
          res.send({
            maps: maps
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getMap = function _callee3(req, res) {
  var mapId, map;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mapId = req.query.mapId;
          console.log('mapId', mapId);

          if (!mapId) {
            _context3.next = 10;
            break;
          }

          _context3.next = 5;
          return regeneratorRuntime.awrap(Map.findById(mapId));

        case 5:
          map = _context3.sent;
          console.log(map);
          res.send({
            ok: true,
            mapId: mapId,
            map: map
          });
          _context3.next = 11;
          break;

        case 10:
          res.send({
            mapId: mapId
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //Nodes 


exports.createNode = function _callee4(req, res) {
  var _req$body, mapId, node, map;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, mapId = _req$body.mapId, node = _req$body.node;

          if (mapId) {
            _context4.next = 4;
            break;
          }

          throw new Error('no mapId in body');

        case 4:
          if (node) {
            _context4.next = 6;
            break;
          }

          throw new Error('no nodeId in body');

        case 6:
          console.log(mapId);
          console.log(node);
          _context4.next = 10;
          return regeneratorRuntime.awrap(Map.updateOne({
            _id: mapId
          }, {
            $push: {
              nodes: node
            }
          }));

        case 10:
          map = _context4.sent;
          res.send({
            map: map
          });
          _context4.next = 18;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.send({
            error: _context4.t0.message
          });

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.updateNode = function (req, res) {
  res.send({
    ok: true
  });
};