import { Service } from './service';

let mockService;

global.fetch = jest.fn(
  request =>
    new Promise(resolve => resolve({ json: () => request.url + 'test' }))
);

beforeEach(() => {
  mockService = new Service('a-service');
});

test('handleRequest() should fetch request.url and return response', async () => {
  const request = { url: 'label_' };
  await expect(mockService.handleRequest(request)).resolves.toEqual(
    request.url + 'test'
  );
  expect(fetch.mock.calls).toHaveLength(1);
  expect(fetch).toHaveBeenCalledWith(request);
});

test('handleRequest() should call getLoad function', () => {
  mockService.getLoad = jest.fn();
  mockService.handleRequest();
  expect(mockService.getLoad).toHaveBeenCalled();
});

test('getLoad() should increase load of Service', () => {
  const prevLoad = mockService.load;
  mockService.getLoad();
  expect(mockService.load).toEqual(prevLoad + 1);
});
