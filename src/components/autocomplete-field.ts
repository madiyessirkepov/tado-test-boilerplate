export class AutocompleteField {
  private autocompleteFieldClass = 'autocomplete-field';
  private inputContainer = document.createElement('div');
  private inputElement = document.createElement('input');
  private closeButton = document.createElement('span');

  constructor() {
    this.inputContainer.classList.add(this.autocompleteFieldClass);
    this.inputElement.classList.add(this.autocompleteFieldClass + '__input');

    this.closeButton.classList.add(
      this.autocompleteFieldClass + '__close-button'
    );
    this.closeButton.classList.add('material-icons');
    this.closeButton.innerHTML = 'close';

    this.closeButton.addEventListener(
      'click',
      () => (this.inputElement.value = '')
    );
  }

  set placeholder(value: string) {
    this.inputElement.placeholder = value;
  }

  set value(value: string) {
    this.inputElement.value = value;
  }

  public getAutocompleteField(): HTMLElement {
    this.inputElement.addEventListener('focus', () => {
      this.inputContainer.classList.add('focused');
    });

    this.inputElement.addEventListener('blur', () => {
      this.inputContainer.classList.remove('focused');
    });

    this.inputContainer.appendChild(this.inputElement);
    this.inputContainer.appendChild(this.closeButton);
    return this.inputContainer;
  }

  public onInputChange(callback: (event: Event) => void) {
    this.inputElement.addEventListener('input', { handleEvent: callback });
  }
}
