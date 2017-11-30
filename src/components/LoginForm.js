import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from "../actions";
import {Card, CardSection, Input, Button, Spinner} from "./common";

class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }

    renderButton(){
        if(this.props.loading) {
            return <Spinner size="large"/>;
        }
        return (
            <Button
                onPress={this.onButtonPress.bind(this)}>
                Entrar
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="E-mail"
                        placeholder="email@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Senha"
                        placeholder="senha"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

            </Card>
        );
    };
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({auth}) => {
    const {email, password, error, loading} = auth;

    return {
        email,
        password,
        error,
        loading
    };
};
export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(LoginForm);