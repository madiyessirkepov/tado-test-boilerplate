export class Service {
  constructor(name) {
    this.name = name;
    this.load = 0;
  }

  async handleRequest(request) {
    this.getLoad();
    const response = await fetch(request);
    return await response.json();
  }

  getLoad() {
    this.load++;
  }
}
