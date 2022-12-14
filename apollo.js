import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const LogUserIn = async (token) => {
    //await AsyncStorage.setItem("token", JSON.stringify(token));
    await AsyncStorage.multiSet([["token", JSON.stringify(token)], ["loggedIn", JSON.stringify("yes")],
    ]);
    isLoggedInVar(true);
    tokenVar(token);
}
const client = new ApolloClient({
    uri: "https://localhost:4000/graphql",
    cache: new InMemoryCache()
});

export default client;