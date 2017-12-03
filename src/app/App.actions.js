import axios from "axios";

import * as alerts from '../components/Notification/Notification.actions';
import { zipcodeFunctions } from '../components/ZipCode';
import { phoneFunctions } from '../components/Phone';
import { cpfFunctions } from '../components/CPF';

import { headerMenuLoad, userMenuLoad } from '../layout/Header/Header.actions';
import { sidebarMenuLoad } from '../layout/Sidebar/Sidebar.actions';
import { changeLanguage, DEFAULT_LANGUAGE } from '../components/Intl/Intl.actions';
import { loadDashboard } from '../modules/Dashboard/Dashboard.actions';
import { initLanguage } from '../components/Intl/Intl.actions';

import intlData from '../intl.json';
import appData from '../app.json';
import menuData from '../menu.json';

export const [ MODE_INSERT, MODE_UPDATE, MODE_LIST ] = [ "MODE_INSERT", "MODE_UPDATE", "MODE_LIST" ];
export const [ PAGELIMIT_DEFAULT, PAGESIZE_MODAL ] = [ 10, 5 ];
export const [ ROLE_ADMIN, ROLE_CLIENTE, ROLE_USUARIO, ROLE_PARCEIRO ] = [ 'admin', 'cliente', 'usuario', 'parceiro' ];

export const [ PROCESS_LOGIN, PROFILE_LOADED ] = [ "PROCESS_LOGIN", "PROFILE_LOADED" ];

export const logout = (auth) => {
    auth.logout();
}

const createUser = (userData, auth, dispatch) => {
    axios.post('/pessoas', userData)
      .then( (response) => {
          alerts.notifySuccess('novo-usuario', 'novo-usuario-registrado', dispatch);
      }).catch( (error) => {
          alerts.notifyError('novo-usuario', 'problema-registro', error, dispatch);  
          setTimeout(() => logout(auth), 3000);
      });
}

const loadUserData = (userData, resource_access, sub) => {
    const data = Object.assign(userData, {});
    
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

    return data;
}

export const init = (dispatch) => {
    // INICIALIZAÇÃO IDIOMA
    dispatch(initLanguage(intlData));

    // DISPARA A CARGA DOS MENUS
    dispatch(headerMenuLoad(appData.headerMenu));
    dispatch(userMenuLoad(appData.userMenu));
    dispatch(sidebarMenuLoad(menuData));
}

export const login = (auth) => {
    return dispatch => {

        const { name, email, resource_access, sub } = auth.tokenParsed;

        // PESQUISA O USUÁRIO
        axios.get('/pessoas/login', {params:{"email": email}})
            .then( (response) => {

                const userData = loadUserData(response.data, resource_access, sub);

                // ENCONTROU, CARREGA E CONTINUA
                dispatch({type: PROFILE_LOADED, payload: userData});
                
                // ATUALIZA O IDIOMA DE ACORDO COM A PREFERÊNCIA DO USUÁRIO
                dispatch(changeLanguage(userData.idioma, true));
                
                // ATUALIZAR O STORE COM O OBJETO DO KEYCLOAK
                dispatch({type: PROCESS_LOGIN, payload: auth});

                // CARREGA A DASHBOARD
                if(userData.roles.isAdmin || userData.roles.isCliente) {
                    dispatch(loadDashboard());
                }

                // DISPARA NOTIFICAÇÃO
                alerts.notifyInfo(null, 'bem-vindo', [name], dispatch);
                
            }).catch( (error) => {
                if(error.response) {

                    if(error.response.status === 404) {
                        
                        // 404 É USUÁRIO NÃO ENCONTRADO, REGISTRANDO
                        createUser({
                            nome: name,
                            email: email,
                            idioma: DEFAULT_LANGUAGE
                        }, auth, dispatch);

                    } else {
                        alerts.notifyError('erro-desconhecido', null, error, dispatch);
                        setTimeout(() => logout(auth), 3000);
                    }

                } else {
                    if(error.message === 'Network Error') {
                        alerts.notifyError('erro', 'erro-backend-inacessivel', error, dispatch);
                    } else {
                        alerts.notifyError('erro-desconhecido', null, error, dispatch);
                    }
                }
            });
    }
}



