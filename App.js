import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import LittleLemonHeader from "./components/LittleLemonHeader";
import LittleLemonFooter from "./components/LittleLemonFooter";
import WelcomeScreen from "./components/WelcomeScreen";
import SectionMenuItems from "./components/SectionMenuItems";
import LoginScreen from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json"
      );
      const json = await response.json();
      setData(json.menu);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);
  // return (
  //   <>
  //     <NavigationContainer>
  //       <View style={styles.container}>
  //         <LittleLemonHeader />
  //         <Drawer.Navigator useLegacyImplementation initialRouteName="Login">
  //           <Drawer.Screen name="Welcome" component={WelcomeScreen} />
  //           <Drawer.Screen name="Login" component={LoginScreen} />
  //         </Drawer.Navigator>
  //       </View>
  //       <View style={styles.footerContainer}>
  //         <LittleLemonFooter />
  //       </View>
  //     </NavigationContainer>
  //   </>
  // );
  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );

  const Item = ({ name, price }) => (
    <View style={menuStyles.innerContainer}>
      <Text style={menuStyles.itemText}>{name}</Text>
      <Text style={menuStyles.itemText}>{"$" + price}</Text>
    </View>
  );
  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText} Little Lemon></Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  footerContainer: { backgroundColor: "#333333" },
});
const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#495E57",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    color: "#F4CE14",
    fontSize: 22,
  },
  headerText: {
    color: "#495E57",
    fontSize: 30,
    textAlign: "center",
  },
});
