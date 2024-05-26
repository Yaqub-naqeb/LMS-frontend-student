import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources:{
    en: {
        translation: {
            title: 'Reserve books online: Find and hold your books quickly and easily.',
            button:'Explore Book',
            uni:'Koya University'
        }
    },
    es: {
        translation: {
            title: 'Aplicación en varios idiomas',
            button:'گه ران'
            
        }
    },
    ku:{
        translation:{
            title:'حجزکردنی کتێبەکان بە شێوەی ئۆنلاین: بە خێرایی و بە ئاسانی کتێبەکانت بدۆزەرەوە و بیگرە.',
            button:'گه ران',
            uni:'زانکۆی کۆیە'
        }
    }
},
});

export default i18n;