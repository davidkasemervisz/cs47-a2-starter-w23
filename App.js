import AppLoading from "expo-app-loading";
import { StyleSheet, Text, View, StatusBar, Image, YellowBox } from "react-native";
import { useFonts } from "expo-font";
import { Profiles, Themes } from "./assets/Themes";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Footer } from "./app/components";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { App_Profiles } from "./assets/Profiles/index";
import themes from "./assets/Themes/themes";
import pallet from "./assets/Themes/palette"
import Icons from "./assets/Themes";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

/* Keep the splash screen visible while we fetch resources */
SplashScreen.preventAutoHideAsync();

/* This is the home screen used for the navigation system, we'll
 * learn more about in the coming weeks!
 */
function HomeScreen() {

  var profile = App_Profiles.mtl;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image resizeMode = "contain"
          style={{ height: "100%" }}
          source={require("./assets/Icons/menu_light.png")} />
        <Text style={{ fontFamily: "Sydney-Bold", fontSize: 48 }}>
          ensom
        </Text>
        <Image resizeMode="contain"
          style={{ height: "100%" }}
          source={require("./assets/Icons/sun.png")} />
      </View>
      <View style={styles.main}>
        <View style = {styles.image_box}>
          <Image resizeMode = "stretch"
            style = { [styles.image_box, {borderRadius: 20, position: "relative"}] }
            source={profile.image} />
          <Text style = {{ fontFamily: "Sydney-Bold", fontSize: 48, position: "absolute", top: "2.5%", start: "2.5%" }}>
            {profile.name}
          </Text>
          <Text style={{ fontFamily: "Sydney", fontSize: 24, position: "absolute", top: "92.5%", start: "2.5%" }}>
            {profile.caption}
          </Text>
        </View>
        <View style = {styles.audio_box}>
          <Text style = {{ fontFamily: "Sydney", fontSize: 36, start: "2.5%" }}>
            My Hottest Take
           </Text>
           <Image resizeMode = "contain"
          style = {{ height: "50%", position: "absolute", top: "25%", start: "-10%" }}
           source = {require("./assets/Icons/player_light.png")} />
           <Image resizeMode = "contain"
           style = {{top: "15%", heigth: "52.5%", width: "70%", position: "absolute", start: "30%"}}
          source = {require("./assets/Icons/audio_waveform_light.png")} />
        </View>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Sydney: require("./assets/Fonts/Sydney-Serial-Regular.ttf"),
    "Sydney-Bold": require("./assets/Fonts/Sydney-Serial-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  /* ^Don't mind/edit the code above, it's there to load the font for you! */
  StatusBar.setBarStyle(Themes.light.statusBar);
  /* ^Don't mind/edit this one either unless you decide to do the dark theme one, in that case, you will have to change it accordingly*/

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={Footer}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: themes.light.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#BFBFBF",
  },

  header: {
    flex: 2,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    top: "5%",
    start: 0,
    width: "100%",
    height: "8%",
  },

  main: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    width: "100%",
    top: "13%",
    start: 0,
    width: "100%",
    height: "82%",
    position: "absolute",
  },

  audio_box: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 3,
    top: "72%",
    width: "100%",
    height: "32.5%",
    position: "absolute",
    padding: 4,
  },

  image_box: {
    flex: 3,
    width: "100%", 
    height: "67.5%",
    top: "2%", 
    position: "absolute",
  },
});
