import { View, Text, StyleSheet } from "react-native";
import LittleLemonHeader from "./components/LittleLemonHeader";
import LittleLemonFooter from "./components/LittleLemonFooter";
import WelcomeScreen from "./components/WelcomeScreen";
import SectionMenuItems from "./components/SectionMenuItems";
import LoginScreen from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <View style={styles.container}>
          <LittleLemonHeader />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ size }) => {
                let iconName;
                if (route.name === "Welcome") {
                  iconName = "home";
                } else if (route.name === "Login") {
                  iconName = "arrow-forward";
                }
                return <Ionicons name={iconName} size={size} />;
              },
            })}
            initialRouteName="Login"
          >
            <Tab.Screen name="Welcome" component={WelcomeScreen}></Tab.Screen>
            <Tab.Screen name="Login" component={LoginScreen}></Tab.Screen>
          </Tab.Navigator>
        </View>
        <View style={styles.footerContainer}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  footerContainer: { backgroundColor: "#333333" },
});
