import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{paddingTop: 60}}>

            <Scene key="auth">
                <Scene
                    key="login"
                    component={LoginForm}
                    title="Entrar no Sistema"
                />
            </Scene>

            <Scene key="main">
                <Scene
                    onRight={() => Actions.employeeCreate()}
                    rightTitle="Add"
                    key="employeeList"
                    component={EmployeeList}
                    title="Empregados"
                    initial
                />
                <Scene
                    key="employeeCreate"
                    component={EmployeeCreate}
                    title="Criar Empregado"
                />

                <Scene
                    key="employeeEdit"
                    component={EmployeeEdit}
                    title="Editar Empregado"
                />

            </Scene>

        </Router>
    )
};

export default RouterComponent;