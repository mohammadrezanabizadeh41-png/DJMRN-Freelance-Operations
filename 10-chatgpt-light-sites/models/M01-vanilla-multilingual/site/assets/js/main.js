// Entry point: shared semantic navigation with S12 optional catalog filtering.
import { initNavigation } from './nav.js';
import { initCatalog } from './catalog.js';
initNavigation();
if(document.body?.dataset.page==='catalog') initCatalog();
