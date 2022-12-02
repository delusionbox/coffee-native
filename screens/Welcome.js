import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../auth/AuthButton";
import AuthLayout from "../auth/AuthLayout";
import { colors } from "../colors";


const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 20px;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogin = () => navigation.navigate("Login");
    return (
        <AuthLayout>
            <AuthButton
                text="Create Account"
                disabled={false}
                onPress={goToCreateAccount}
            />
            <TouchableOpacity onPress={goToLogin}>
                <LoginLink>Login</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    );
}
