import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar, LogUserIn } from "../apollo";
import AuthButton from "../auth/AuthButton";
import AuthLayout from "../auth/AuthLayout";
import { Textinput } from "../auth/AuthShared";

const LOG_IN_MUTATION = gql`
    mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      ok
      token
      error
    }
  }
`;

export default function Login({ route: { params } }) {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            password: params?.password,
            username: params?.username
        },
    });
    const passwordRef = useRef();
    const onCompleted = async (data) => {
        const {
            login: { ok, token },
        } = data;
        if (ok) {
            await LogUserIn(token);
        }
    }
    const [logInMutation, { loading }] = useMutation(LOG_IN_MUTATION, {
        onCompleted,
    })
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };
    useEffect(() => {
        register("username");
        register("password");
    }, [register])
    return (
        <AuthLayout>
            <Textinput
                value={watch("username")}
                placeholder="userName"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                autoCapitalize={"none"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <Textinput
                value={watch("password")}
                ref={passwordRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                onSubmitEditing={handleSubmit()}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton text="Log in" loading={loading} disabled={!watch("username") || !watch("password")} onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}
