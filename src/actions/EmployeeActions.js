import firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_CANCEL_UPDATE, EMPLOYEE_DELETE_SUCCESS
} from './types';


export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    };
};

export const employeeCreate = ({name, phone, shift}) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        if (name)
            firebase.database().ref(`/users/${currentUser.uid}/employees`)
                .push({name, phone, shift})
                .then(() => {
                    ToastAndroid.show('Empregado Cadastrado', ToastAndroid.SHORT);
                    dispatch({type: EMPLOYEE_CREATE});
                    Actions.employeeList({type: 'reset'});
                });
    };
};

export const employeesFetch = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
            });
    };
};

export const employeeSave = ({name, phone, shift, uid}) => {
    const {currentUser} = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({name, phone, shift})
            .then(() => {
                ToastAndroid.show('Empregado Salvo', ToastAndroid.SHORT);
                dispatch({type: EMPLOYEE_SAVE_SUCCESS});
                Actions.employeeList({type: 'reset'});
            });
    }
};

export const employeeDelete = ({uid}) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                ToastAndroid.show('Pedido Enviado', ToastAndroid.SHORT);
                dispatch({type: EMPLOYEE_DELETE_SUCCESS});
                Actions.employeeList({type: 'reset'});
            });
    }
};

export const cancelUpdate = () => {
    return {
        type: EMPLOYEE_CANCEL_UPDATE
    };
};