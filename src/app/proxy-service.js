export class ProxyService {
  constructor(services, type) {
    this.services = services;
    this.type = type;
    this.serviceIndex = -1;
  }

  proxy(request) {
    if (this.services.length > 0) {
      this.serviceIndex = this.getIndexByServiceType(this.services);
      return this.services[this.serviceIndex].handleRequest(request);
    }
    return new Promise(resolve => resolve(null));
  }

  getIndexByServiceType(services) {
    return this.type === 2
      ? this.getLowestLoadService(services)
      : (this.serviceIndex + 1) % services.length;
  }

  getLowestLoadService(services) {
    let selectedIndex = 0;

    for (let [index, service] of services.entries()) {
      if (services[selectedIndex].load >= service.load) {
        selectedIndex = index;
      }
    }
    return selectedIndex;
  }
}
