import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontToLoad = [Ionicons.font]
    const fontPromises = fontToLoad.map(font => Font.loadAsync(font));
    const imageToLoad = [require("./assets/logo.jpg"),];
    const imagePromises = imageToLoad.map(image => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  }
  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }
  return (
    <View style={styles.container}>
      <Text>HI</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
