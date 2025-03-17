import { Stack } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return (
    <Stack screenOptions={{ }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      {/* <Stack.Screen name="movies/[id]" options={{ headerShown: false }}/> */}
    </Stack>
  )
}
