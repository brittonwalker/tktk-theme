/**
 * BoilerPlate.js
 */

class BoilerPlate {
  constructor() {
    this.message = 'Init BoilerPlate';
    this.init();
  }

  init() {
    console.log(this.message);
  }
}

const boilerPlate = new BoilerPlate();
