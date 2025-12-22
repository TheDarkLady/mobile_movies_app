import { Stack } from "expo-router";
import "react-native-css-interop/jsx-runtime";
import './global.css';



export default function RootLayout() {
  return <Stack> 
    <Stack.Screen
    name="(tabs)"
    options={{headerShown: false}}
    >
    </Stack.Screen>
    <Stack.Screen
    name="movies/[id]"
    options={{headerShown: false}}
    >
    </Stack.Screen>
  </Stack>;
}
