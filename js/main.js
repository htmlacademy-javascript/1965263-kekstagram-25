import {fakeServerResponse} from './data.js';
import {renderData} from './render-thumbnails.js';

const data = fakeServerResponse();
renderData(data);
