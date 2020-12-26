const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const rootDir = __dirname + '/build';
server.use(express.static(rootDir, {maxAge: 86400000}));
server.use(middlewares);
const reactRouterWhiteList = ['/create', '/edit/:transactionId'];
server.get(reactRouterWhiteList, (req, rep) => {
    rep.sendFile(path.resolve(rootDir, 'index.html'));
});
server.use(router);
server.listen(3000, () => {
    console.log("server is running now.");
});