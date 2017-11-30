import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate} from "../actions";
import {CardSection, Input} from "./common";


class EmployeeForm extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label="Nome"
                        placeholder="João Silva"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({prop: 'name', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Telefone"
                        placeholder="3232-3232"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({prop: 'phone', value})}
                    />
                </CardSection>

                <CardSection>
                    <Text style={styles.pickerTextStyle}>Turno</Text>
                    <Picker
                        style={{flex: 2}}
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({prop: 'shift', value})}
                    >
                        <Picker.Item label="Segunda" value="Segunda"/>
                        <Picker.Item label="Terça" value="Terça"/>
                        <Picker.Item label="Quarta" value="Quarta"/>
                        <Picker.Item label="Quinta" value="Quinta"/>
                        <Picker.Item label="Sexta" value="Sexta"/>
                        <Picker.Item label="Sábado" value="Sábado"/>
                        <Picker.Item label="Domingo" value="Domingo"/>
                    </Picker>
                </CardSection>
            </View>
        );
    }
}


const styles = {
    pickerTextStyle: {
        alignSelf: 'center',
        flex: 1,
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const {name, phone, shift} = state.employeeForm;

    return {name, phone, shift};
};

export default connect(mapStateToProps, {employeeUpdate})(EmployeeForm);