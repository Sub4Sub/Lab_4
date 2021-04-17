"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_list_1 = require("../Controllers/contact-list");
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Util/index");
router.get('/', index_1.AuthGuard, contact_list_1.DisplayContactListPage);
router.get('/edit/:id', index_1.AuthGuard, contact_list_1.DisplayEditPage);
router.get('/add', index_1.AuthGuard, contact_list_1.DisplayAddPage);
router.post('/edit/:id', index_1.AuthGuard, contact_list_1.ProcessEditPage);
router.post('/add', index_1.AuthGuard, contact_list_1.ProcessAddPage);
router.get('/delete/:id', index_1.AuthGuard, contact_list_1.ProcessDeletePage);



var express = require('express');
var router = express.Router();

// Contact Model
const ContactModel = require("../Models/contact");
const Contact = ContactModel.Model;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: 'home' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About', page: 'about' });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', page: 'services' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact', page: 'contact' });
});

/* GET contact list page. */
router.get('/contact-list', function(req, res, next) {
  //res.render('index', { title: 'Contact List', page: 'contact-list' });
  Contact.find(function (err, contacts) {
    if (err) {
        return console.error(err);
    }
    res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contacts, displayName: 'temp' });
});
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects', page: 'projects' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: 'register' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: 'login' });
});

/* GET login page. */
router.get('/edit', function(req, res, next) {
  res.render('index', { title: 'Edit', page: 'edit' });
});

/* GET login page. */
router.get('/task-list', function(req, res, next) {
  res.render('index', { title: 'Task List', page: 'task-list' });
});

module.exports = router;
