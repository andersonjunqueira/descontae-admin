import { toaster } from '../Notification/Notification.actions';

export const [ LANGUAGE_CHANGED, LANGUAGE_INIT ] = [ "LANGUAGE_CHANGED", "LANGUAGE_INIT" ];
export const [ DEFAULT_LANGUAGE ] = [ "pt-BR" ];

const config = {};

export const getAvailableLanguages = (strings) => {
    let langs = [];
    Object.keys(strings).map((keyName, keyIndex) => langs.push(keyName));
    return langs;
}

const format = (str, args) => {
  var formatted = str;
  for (var i = 0; i < args.length; i++) {
      var regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, args[i]);
  }
  return formatted;
}

export const translate = (str, params = []) => {
    let out = config.currentStrings[str];
    return out ? format(out, params) : "???" + str + "???";
}

export const changeLanguage = (lang, silent = false) => {
    return dispatch => {
        if(lang) {
            dispatch({type: LANGUAGE_CHANGED, payload: lang});
            if(!silent) {
                dispatch(toaster(null, "idioma-alterado", [config.currentStrings.langId]));
            }
        }
    }
}

export const initLanguage = (strings) => {
    return dispatch => {
        config.currentStrings = strings[DEFAULT_LANGUAGE];
        dispatch({type: LANGUAGE_INIT, payload: {
            availableLanguages: getAvailableLanguages(strings),
            availableStrings: strings,
            currentLanguage: DEFAULT_LANGUAGE,
            currentStrings: strings[DEFAULT_LANGUAGE]
        }});
    }
}


