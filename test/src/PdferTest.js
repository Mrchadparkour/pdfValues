const chai = require('chai');
chai.should();
chai.use(require('chai-things'));
const expect = chai.expect;
const assert = chai.assert;
const Pdfer = require('../../src/Pdfer');
let json = require('../../testJson');

describe('putTextInRows', function() {
  it('Should run without errors', function() {
    var pdfer = new Pdfer(json);
    pdfer.rowSlots();
    expect(pdfer.putTextInRows()).to.be.ok;
    pdfer.printRows();
  });

})

describe('rowSlots', function() {
  it("Should run without errors", function() {
    expect(new Pdfer(json).rowSlots()).to.be.ok;
    expect(new Pdfer(json).rowSlots()).to.be.an('object');
  });
})

describe('Pdfer.texts', function() {
  var texts = new Pdfer(json).texts;
  it("Should be an array of objects", function() {
    expect(texts).to.have.lengthOf.above(1);
    expect(texts).to.be.an('array');
    texts.should.all.have.property('x');
    texts.should.all.have.property('y');
    texts.should.all.have.property('R');
  });
});

describe('Pdfer', function() {
  it('Should be a constructor', function() {
    expect(new Pdfer(json)).to.be.an.instanceof(Pdfer);
  })
});
