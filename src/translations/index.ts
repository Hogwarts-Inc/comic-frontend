import i18next from 'i18next';

import es from './es.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    en: {
      translation: es,
    },
    es: {
      translation: es,
    },
  },
});
