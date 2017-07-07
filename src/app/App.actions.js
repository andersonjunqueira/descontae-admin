import axios from "axios";

import { zipcodeFunctions } from '../components/ZipCode';
import { phoneFunctions } from '../components/Phone';
import { cpfFunctions } from '../components/CPF';
import { changeLanguage } from '../components/Intl/Intl.actions';
import { headerMenuLoad, userMenuLoad } from '../components/Header/Header.actions';
import { sidebarMenuLoad } from '../components/Sidebar/Sidebar.actions';
import { DEFAULT_LANGUAGE} from '../components/Intl/Intl.actions';
import { toaster } from './Notification.actions';

export const [ MODE_INSERT, MODE_UPDATE, MODE_LIST ] = [ "MODE_INSERT", "MODE_UPDATE", "MODE_LIST" ];
export const [ PAGESIZE_DEFAULT ] = [ 10 ];
export const [ PROCESS_LOGIN, PROFILE_LOADED ] = [ "PROCESS_LOGIN", "PROFILE_LOADED" ];

export const logout = (auth) => {
    auth.logout();
}

export const login = (auth, defaultLanguage) => {
    return dispatch => {

        const { name, email } = auth.tokenParsed;

        // PESQUISA O USUÁRIO
        axios.get('/pessoas/login', {params:{"email": email}})
            .then( (response) => {

                const data = Object.assign(response.data, {});
                data.cep = data.cep ? zipcodeFunctions.applyMask(data.cep) : undefined;
                data.cpf = data.cpf ? cpfFunctions.applyMask(data.cpf) : undefined;
                if(data.telefones && Object.keys(data.telefones).length > 0) {
                    Object.keys(data.telefones).map((keyName, keyIndex) => {
                        return data.telefones[keyIndex].numero = phoneFunctions.applyMask(data.telefones[keyIndex].numero);
                    });
                }

                // ENCONTROU, CARREGA E CONTINUA
                dispatch({type: PROFILE_LOADED, payload: data});

                // ATUALIZA O IDIOMA DE ACORDO COM A PREFERÊNCIA DO USUÁRIO
                dispatch(changeLanguage(response.data.idioma, true));

                // DISPARA A CARGA DOS MENUS
                dispatch(headerMenuLoad);
                dispatch(userMenuLoad);
                dispatch(sidebarMenuLoad);

                // DISPARA NOTIFICAÇÃO
                dispatch(toaster("bem-vindo", [name]));

            }).catch( (error) => {

                // 404 É USUÁRIO NÃO ENCONTRADO, REGISTRANDO
                if(error.response.status === 404) {

                    let pessoa = {
                        nome: name,
                        email: email,
                        idioma: DEFAULT_LANGUAGE
                    };

                    // GRAVANDO O PERFIL
                    axios.post('/pessoas', pessoa)
                      .then( (response) => {

                          dispatch(toaster("novo-usuario-registrado", [], {title: "novo-usuario", status: "success"}));

                      }).catch( (response) => {

                          dispatch(toaster("problema-registro", [], {title: "novo-usuario", status: "danger"}));
                          setTimeout(() => logout(auth), 3000);

                      });

                } else {

                    dispatch(toaster("erro-desconhecido", [], {status: "danger"}));
                    setTimeout(() => logout(auth), 3000);

                }

            });

        // ATUALIZAR O STORE COM O OBJETO DO KEYCLOAK
        dispatch({type: PROCESS_LOGIN, payload: auth});
    }
}

