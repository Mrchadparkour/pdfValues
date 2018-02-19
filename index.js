var PDFParser = require('pdf2json');
var express = require('express');
var Pdfer = require('./src/Pdfer');
var fs = require('fs');

var app = express();

var pdfParser = new PDFParser();
var pdf;

pdfParser.on("pdfParser_dataError", function() { console.error(errData.parserError) });
pdfParser.on("pdfParser_dataReady", function(pdfData) {
  pdf = new Pdfer(pdfData);
});

pdfParser.loadPDF("test.pdf");

app.get('/', function(req, res) {
  res.json({ pdf });
});

app.listen(5000, function() {
  console.log("Listening on 5000");
});
