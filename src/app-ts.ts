import { Autocomplete } from './components/autocomplete';
import { CountryNameService } from './services/country-names.service';

import * as _ from 'lodash';

import './styles.scss';
/**
 * This is your entry point built by webpack using babel and type checked by typescript compiler
 */

const service = new CountryNameService();
const autocomplete = new Autocomplete(service);

autocomplete.attachAutocompleteFunctionality();
