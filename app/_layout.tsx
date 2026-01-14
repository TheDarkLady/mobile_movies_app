import { Stack } from "expo-router";
import "react-native-css-interop/jsx-runtime";
import './global.css';



export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#030014' },
      }}
    > 
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
    </Stack>
  );
}
