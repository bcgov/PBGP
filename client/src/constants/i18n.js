import "moment/locale/en-ca";
import "moment/locale/fr";
import i18n from "i18next";
import moment from "moment";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fr from "./fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
  lng: "en",
  fallbackLng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
}).then(() => moment.locale('en'));

i18n.on('languageChanged', (lng) => moment.locale(lng));
