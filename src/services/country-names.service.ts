import { ICountry } from '../models/countries.model';

export class CountryNameService {
  private API_URL = 'https://restcountries.eu/rest/v2/name/';

  public async getCountries(countryName: string): Promise<string[]> {
    if (countryName) {
      return this.fetch(countryName).then((data: ICountry[]) =>
        data.map((countryData: ICountry) => countryData.name)
      );
    } else {
      return await [];
    }
  }

  private async fetch(input: string): Promise<ICountry[]> {
    const urlWithParameter = `${this.API_URL}${input}`;
    const response = await fetch(urlWithParameter);
    return response.json();
  }
}
