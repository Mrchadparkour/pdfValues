var PDFParser = require('pdf2json');
var express = require('express');

var app = express();

var pdfParser = new PDFParser();
var pdf;

pdfParser.on("pdfParser_dataError", function() { console.error(errData.parserError) });
pdfParser.on("pdfParser_dataReady", function(pdfData){
  pdf = new Pdfer(pdfData);
});

function Pdfer(data) {
  this.json  = data;
  this.texts = this.removeHeaders();
  this.colPts = this.json.formImage.Pages[0].VLines.sort(function (a, b) { return a.x - b.x; });
  this.rowPts = this.json.formImage.Pages[0].HLines.sort(function (a, b) { return a.y - b.y; });
  this.sepRows = this.getRows();
}

Pdfer.prototype.getRows() = function() {

}

Pdfer.prototype.removeHeaders = function () {
  return this.json.formImage.Pages[0].Texts.filter(function(text) {
    return text.R[0].TS[2] !== 1
  })
};

pdfParser.loadPDF("test.pdf");

app.get('/', function(req, res) {
  res.json({ pdf });
});

app.listen(5000, function() {
  console.log("Listening on 5000");
});
