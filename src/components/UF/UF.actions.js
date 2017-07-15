import axios from "axios";

export const [ UF_LIST_LOADED ] = [ "UF_LIST_LOADED" ];

export const loadUfs = () => {
    return dispatch => {
        axios({ url: '/estados?page=27', method: 'get', responseType: 'json' })
        .then(function(response) {
            var ret = [];
            response.data.content.forEach((p) => ret.push({ value: p.sigla, text: p.nome }) );
            dispatch({type: UF_LIST_LOADED, payload: ret});
        }).catch(function(response){
        });

    }
}


