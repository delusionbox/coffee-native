import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../auth/AuthButton";
import AuthLayout from "../auth/AuthLayout";
import { Textinput } from "../auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $name: String!
        $email: String!
        $location: String
        $githubUsername: String
        $password: String!
    ){
        createAccount(
            username: $username
            name: $name
            email: $email
            location: $location
            githubUsername: $githubUsername
            password: $password
        ){
            ok
            error
        }
    }
`;

export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onCompleted = (data) => {
        const { createAccount: { ok } } = data;
        const { username, password } = getValues();
        if (ok) {
            navigation.navigate("Login", {
                username,
                password
            });
        }
    }
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    })

    const nameRef = useRef();
    const emailRef = useRef();
    const locationRef = useRef();
    const githubRef = useRef();
    const passRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }
    const onValid = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data,
                }
            })
        }
    };
    useEffect(() => {
        register("username", {
            required: true,
        });
        register("name", {
            required: true,
        });
        register("email", {
            required: true,
        });
        register("location", {
            required: true,
        });
        register("githubUsername", {
            required: true,
        });
        register("password", {
            required: true,
        })
    }, [register])

    return (
        <AuthLayout>
            <Textinput
                placeholder="userName"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(nameRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <Textinput
                ref={nameRef}
                placeholder="Name"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(emailRef)}
                onChangeText={(text) => setValue("name", text)}
            />
            <Textinput
                ref={emailRef}
                placeholder="Email"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => onNext(locationRef)}
                onChangeText={(text) => setValue("email", text)}
            />
            <Textinput
                ref={locationRef}
                placeholder="Location"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(githubRef)}
                onChangeText={(text) => setValue("location", text)}
            />
            <Textinput
                ref={githubRef}
                placeholder="GithubUsername"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                onSubmitEditing={() => onNext(passRef)}
                onChangeText={(text) => setValue("githubUsername", text)}
            />
            <Textinput
                ref={passRef}
                placeholder="Password"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text="Create Account"
                disabled={false}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    )
}
