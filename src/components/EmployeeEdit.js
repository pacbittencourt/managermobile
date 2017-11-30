import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Communications from 'react-native-communications';
import {employeeUpdate, employeeSave, employeeDelete, cancelUpdate} from "../actions";
import {Card, CardSection, Confirm, Button} from "./common";
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {

    state = {showModal: false};

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({prop, value});
        });
    }

    componentWillUnmount() {
        this.props.cancelUpdate();
    }

    onButtonPress() {
        const {name, phone, shift} = this.props;
        this.props.employeeSave({name, phone, shift, uid: this.props.employee.uid});
    }

    onTextPress() {
        const {phone, shift} = this.props;

        Communications.text(phone, `Seu turno será em ${shift}`);
    }

    onAccept() {
        const {uid} = this.props.employee;

        this.props.employeeDelete({uid});
    }

    onDecline() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <Card>
                <EmployeeForm/>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Salvar mudanças
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Enviar SMS
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => this.setState({showModal: !this.state.showModal})}>
                        Demitir empregado
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Tem certeza que deseja pedir a demissão?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {
    employeeUpdate, employeeSave, employeeDelete, cancelUpdate
})(EmployeeEdit);