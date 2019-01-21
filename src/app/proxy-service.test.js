import { ProxyService } from './proxy-service';

let mockProxyService;

const mockServices = [
  { load: 3, handleRequest: jest.fn() },
  { load: 1 },
  { load: 6 },
  { load: 7 }
];

beforeEach(() => {
  mockProxyService = new ProxyService(mockServices, 1);
});

test('proxy() should call handleRequest of selected service', () => {
  mockProxyService.proxy();
  const service = mockProxyService.services[0];
  expect(service.handleRequest.mock.calls).toHaveLength(1);
});

test('proxy() should return null if there is no services', () => {
  mockProxyService.services = [];
  expect(mockProxyService.proxy()).resolves.toBe(null);
});

test('getIndexByServiceType() by default should select 0 index when type=1', () => {
  expect(mockProxyService.getIndexByServiceType(mockServices)).toBe(0);
});

test('getIndexByServiceType() should return next service index', () => {
  mockProxyService.serviceIndex = 2;
  expect(mockProxyService.getIndexByServiceType(mockServices)).toBe(3);
});

test('getLowestLoadService() should return index with smallest load', () => {
  expect(mockProxyService.getLowestLoadService(mockServices)).toBe(1);
});
