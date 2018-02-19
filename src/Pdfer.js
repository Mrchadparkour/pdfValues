function Row(yMin, yMax) {
  this.yMin = yMin;
  this.yMax = yMax;
  this.cells = [];

  //texts will be objects
  this.rawTexts = [];

  this.addCell = function(xMin, xMax) {
    this.cells.push(new Cell(this.yMin, this.yMax, xMin, xMax));
  }

  this.addText = function(text) {
    this.rawTexts.push(text);
  }
}

function Cell(yMin, yMax, xMin, xMax) {
  this.yMin = yMin;
  this.yMax = yMax;
  this.xMin = xMin;
  this.xMax = xMax;
}

module.exports = function(json) {
  this.rows = {};
  this.texts = json.formImage.Pages[0].Texts.filter(function(text) {
    return text.R[0].TS[2] !== 1;
  });

  this.colPts = json.formImage.Pages[0].VLines.sort(function(a, b) {
    return a.x - b.x;
  });

  this.rowPts = json.formImage.Pages[0].HLines.sort(function(a, b) {
    return a.y - b.y;
  });

  this.rowSlots = function() {
    for (var i = 0; i < this.rowPts.length; i++) {
      var curr = this.rowPts[i];
      var next = this.rowPts[i + 1];
      if (next !== undefined && curr.y !== next.y) {
        this.rows[curr.y + "to" + next.y] = new Row(curr.y, next.y);
      }
    }

    return this.rows;
  }

  this.cleanRows = function() {
    var rowsArr = Object.keys(this.rows);
    for (var i = 0; i < rowsArr.length; i++) {
      var rKey = rowsArr[i];
      var row = this.rows[rKey];
      if (row.rawTexts.length < 1) {
        delete this.rows[rKey];
      };
    }
  }

  this.putTextInRows = function() {
    var rowsArr = Object.keys(this.rows);
    for (var i = 0; i < this.texts.length; i++) {
      var text = this.texts[i];
      for (var j = 0; j < rowsArr.length; j++) {
        var rKey = rowsArr[j];
        var row = this.rows[rKey];
        if (text.y > row.yMin && text.y < row.yMax){
          row.addText(text);
          break;
        }
      }
    }
    this.cleanRows();
    return this.rows;
  }

  this.printRows = function() {
    var rowsArr  = Object.keys(this.rows);
    for (var i = 0; i < rowsArr.length; i++) {
      var row = this.rows[rowsArr[i]];
      console.log('\n');
      row.rawTexts.forEach(function(text) {
        console.log(text.R[0].T);
      });
    }
  }



  this.json = json;
}
