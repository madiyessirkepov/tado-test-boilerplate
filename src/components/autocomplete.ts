import * as _ from 'lodash';

import { CountryNameService } from '../services/country-names.service';
import { AutocompleteField } from './autocomplete-field';

import './autocomplete.scss';

export class Autocomplete {
  private dropdownClass = 'dropdown';
  private autocompleteId = 'tado-autocomplete';
  private placeholder: string;
  private autocompleteContainer: HTMLElement;
  private autocompleteFieldComponent: AutocompleteField;

  constructor(private service: CountryNameService) {
    this.autocompleteContainer = document.getElementById(this.autocompleteId)!;
    const placeholderInput = this.autocompleteContainer.getAttribute(
      'placeholder'
    );
    this.placeholder = placeholderInput ? placeholderInput : '';
    this.autocompleteFieldComponent = new AutocompleteField();
  }

  public attachAutocompleteFunctionality(): void {
    this.autocompleteFieldComponent.placeholder = this.placeholder;
    const field = this.autocompleteFieldComponent.getAutocompleteField();

    this.autocompleteFieldComponent.onInputChange((event: Event) => {
      const { value } = event.srcElement as HTMLInputElement;
      const dropdown = this.getDropdown(value);
      this.closeDropdown();
      this.autocompleteContainer.appendChild(dropdown);
    });

    this.autocompleteContainer.appendChild(field);
  }

  public getDropdown(value: string): HTMLElement {
    const dropdown = document.createElement('div');
    dropdown.classList.add(this.dropdownClass);

    _.debounce(() => {
      this.service.getCountries(value).then((response: string[]) => {
        response.map((result: string) => {
          const resultDiv = document.createElement('div');
          resultDiv.classList.add(this.dropdownClass + '__item');
          resultDiv.innerHTML = result;
          resultDiv.addEventListener('click', (event: Event) =>
            this.selectItem(event.srcElement!.innerHTML)
          );
          dropdown.appendChild(resultDiv);
          dropdown.style.display = 'block';
        });
      });
    }, 200);

    return dropdown;
  }

  public selectItem(itemValue: string) {
    this.autocompleteFieldComponent.value = itemValue;
    this.closeDropdown();
  }

  public closeDropdown() {
    const existingDropdown = this.autocompleteContainer.getElementsByClassName(
      this.dropdownClass
    );
    if (existingDropdown.length > 0) {
      this.autocompleteContainer.removeChild(existingDropdown[0]);
    }
  }
}
