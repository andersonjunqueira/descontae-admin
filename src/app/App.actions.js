import axios from "axios";

import { zipcodeFunctions } from '../components/ZipCode';
import { phoneFunctions } from '../components/Phone';
import { cpfFunctions } from '../components/CPF';
import { changeLanguage } from '../components/Intl/Intl.actions';
import { headerMenuLoad, userMenuLoad } from '../components/Header/Header.actions';
import { sidebarMenuLoad } from '../components/Sidebar/Sidebar.actions';
import { DEFAULT_LANGUAGE} from '../components/Intl/Intl.actions';
import { toaster } from '../components/Notification/Notification.actions';

export const [ MODE_INSERT, MODE_UPDATE, MODE_LIST ] = [ "MODE_INSERT", "MODE_UPDATE", "MODE_LIST" ];
export const [ PAGESIZE_DEFAULT, PAGESIZE_MODAL ] = [ 10, 5 ];
export const [ PROCESS_LOGIN, PROFILE_LOADED ] = [ "PROCESS_LOGIN", "PROFILE_LOADED" ];
export const [ ROLE_ADMIN, ROLE_CLIENTE, ROLE_USUARIO, ROLE_PARCEIRO ] = [ 'admin', 'cliente', 'usuario', 'parceiro' ];

export const logout = (auth) => {
    auth.logout();
}

export const login = (auth) => {
    return dispatch => {

        const { name, email, resource_access, sub } = auth.tokenParsed;

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

                data.keycloakid = sub;
                if(resource_access) {
                    const roles = resource_access['descontae-admin'].roles;
                    data.roles = {
                        plain: roles,
                        isAdmin: roles.indexOf(ROLE_ADMIN) > -1,
                        isCliente: roles.indexOf(ROLE_CLIENTE) > -1,
                        isParceiro: roles.indexOf(ROLE_PARCEIRO) > -1,
                        isUsuario: roles.indexOf(ROLE_USUARIO) > -1
                    };
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
                dispatch(toaster(null, "bem-vindo", [name]));

                // ATUALIZAR O STORE COM O OBJETO DO KEYCLOAK
                dispatch({type: PROCESS_LOGIN, payload: auth});

            }).catch( (error) => {
                
                if(error.response) {

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

                              dispatch(toaster("novo-usuario", "novo-usuario-registrado", [], {status: "success"}));

                          }).catch( (error) => {

                              dispatch(toaster("novo-usuario", "problema-registro", [], {status: "error"}));
                              setTimeout(() => logout(auth), 3000);

                          });

                    } else {

                        dispatch(toaster("erro-desconhecido", null, [], {status: "error"}));
                        setTimeout(() => logout(auth), 3000);

                    }

                } else {
                    if(error.message === 'Network Error') {
                        dispatch(toaster("erro-desconhecido", "erro-backend-inacessivel", [], {status: "error"}));    
                    } else {
                        dispatch(toaster(null, "erro-desconhecido", [], {status: "error"}));
                    }
                }

            });

    }
}

