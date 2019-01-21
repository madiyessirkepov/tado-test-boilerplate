import { Service } from './service';
import { ProxyService } from './proxy-service';

export class MiniSystem {
  constructor() {
    this.API_URL = 'https://reqres.in/api/users';
    this.serviceContainer = document.getElementById('services');
    this.numberOfServices = 10;
    this.services = [];
    this.proxyServices = [
      new ProxyService(this.services, 1),
      new ProxyService(this.services, 2)
    ];

    this.instantiateServices();
    this.instantiateView();
  }

  instantiateServices() {
    for (let i = 1; i <= this.numberOfServices; i++) {
      this.services.push(new Service('service_' + i));
    }
  }

  instantiateView() {
    for (let service of this.services) {
      const li = document.createElement('li');
      li.id = service.name;
      li.innerHTML = `<strong>${service.name}</strong> - load: <span> ${
        service.load
      } </span>`;
      this.serviceContainer.appendChild(li);
    }
  }

  bindToButtonClick(id) {
    document.getElementById(id).addEventListener('click', event => {
      if (event.target.value) {
        this.sendRequest(event.target.value);
      }
    });
  }

  updateServiceLoadView() {
    for (let service of this.services) {
      let li = document.getElementById(service.name);
      li.getElementsByTagName('span')[0].innerHTML = service.load;
    }
  }

  sendRequest(type) {
    const request = new Request(this.API_URL);

    this.proxyServices.map(proxyService => {
      if (proxyService.type == type) {
        proxyService
          .proxy(request)
          .then(response => console.log(response.data));
      }
    });

    this.updateServiceLoadView();
  }
}
