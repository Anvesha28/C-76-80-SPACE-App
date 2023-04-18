/* The HomeScreen class is a React Native component that displays a background image and two
TouchableOpacity components that navigate to different screens when pressed. */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";

export default class HomeScreen extends Component {
  /**
   * This is a constructor function for a React component that initializes the state object.
   * @param props - props is an object that contains any properties passed to the component from its
   * parent component. These properties can be accessed within the component using the `this.props`
   * syntax. In the constructor, the props object is passed to the parent constructor using
   * `super(props)` to properly initialize the component. The state object
   */
  constructor(props) {
    /* `super(props);` is calling the constructor of the parent class (Component) and passing the
        props object to it. This is necessary because the HomeScreen class extends the Component
        class, and the constructor of the Component class needs to be called in order to properly
        initialize the component. By passing the props object to the parent constructor, the props
        are made available to the component. */
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {/* `<SafeAreaView style={styles.droidSafeArea} />` is a React Native component that
                ensures that the content of the app is not obscured by the device's status bar. The
                `style` prop is used to apply a style object to the `SafeAreaView` component, which
                sets the margin top of the component based on the platform the app is running on. If
                the platform is Android, it sets the margin top to the height of the device's status
                bar using `StatusBar.currentHeight`. This is necessary because the status bar on
                Android devices takes up space at the top of the screen, and the `SafeAreaView`
                component ensures that the content of the app is not obscured by the status bar. If
                the platform is not Android, the margin top is set to 0. */}
        <SafeAreaView style={styles.droidSafeArea} />

        {/* `<ImageBackground source={require('../assets/bg.png')}
                style={styles.backgroundImage}>` is a React Native component that displays an image
                as the background of the screen. The `source` prop is used to specify the image file
                to be displayed as the background, and the `style` prop is used to apply a style
                object to the `ImageBackground` component, which sets the `flex` property to 1 and
                the `resizeMode` property to 'cover'. This ensures that the image fills the entire
                screen and is scaled to fit the screen without distorting its aspect ratio. */}
        <ImageBackground
          source={require("../assets/bg.png")}
          style={styles.backgroundImage}
        >
         {/* The above code is written in JavaScript and it is defining a view component with a style
         named "titleBar". Inside the view component, there is a text component with a style named
         "titleText" and the text "SPACE STUFF" is displayed inside the text component. This code is
              most likely a part of a larger codebase for a mobile application or a website. */}
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>SPACE STUFF</Text>
          </View>

          {/* The above code is defining a TouchableOpacity component with an onPress event that
          navigates the user to the "IssLocation" screen when pressed. It also includes some Text
          and Image components to display information and an icon related to the ISS (International
          Space Station). This code is likely part of a larger React Native application that
          includes multiple screens and components. */}
          <TouchableOpacity
            style={styles.routeCard}
            /* `this.props.navigation.navigate("IssLocation")` is a function call that navigates
                     the user to the "IssLocation" screen when the corresponding TouchableOpacity
                     component is pressed. It uses the `navigation` prop passed down from the
                     parent component to access the navigation object and call the `navigate`
                     function with the name of the screen to navigate to as an argument. In this
                     case, it is navigating to the "IssLocation" screen. */
            onPress={() => this.props.navigation.navigate("IssLocation")}
          >
            <Text style={styles.routeText}>ISS TRACKER</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.bgDigit}>1</Text>
            <Image
              source={require("../assets/iss_icon.png")}
              style={styles.iconImage}
            ></Image>
          </TouchableOpacity>

          {/* The above code is defining a TouchableOpacity component with a style, onPress function,
          and child components including Text and Image. When the TouchableOpacity is pressed, it
          will navigate the user to the "Asteroids" screen using the navigation prop passed down
          from the parent component. The child components include text and an image related to
          asteroids. */}
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() =>
              /* `this.props.navigation.navigate("Asteroids")` is a function call that navigates
                       the user to the "Asteroids" screen when the corresponding TouchableOpacity
                       component is pressed. It uses the `navigation` prop passed down from the
                       parent component to access the navigation object and call the `navigate`
                       function with the name of the screen to navigate to as an argument. In this
                       case, it is navigating to the "Asteroids" screen. */
              this.props.navigation.navigate("Asteroids")
            }
          >
            <Text style={styles.routeText}>ASTEROIDS</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.bgDigit}>2</Text>
            <Image
              source={require("../assets/meteor_icon.png")}
              style={styles.iconImage}
            ></Image>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.routeCard}
         /* The above code is defining an `onPress` event handler for a component, which when
         triggered, will navigate to the "UpdateScreen" using the `navigation` prop passed down to
         the component. */
           onPress={() => this.props.navigation.navigate("UPDATES")}
          >
            <Text style={styles.routeText}>UPDATES</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.bgDigit}>3</Text>
            <Image
              source={require("../assets/adaptive-icon.png")}
              style={styles.iconImage}
            ></Image>
          </TouchableOpacity>
          
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    /* `flex: 1` is a CSS style property that is used to specify how an element should grow or shrink
    to fill available space. In this case, it is being applied to the `container` element, which is
    the top-level container for the `HomeScreen` component. By setting `flex: 1`, the `container`
    element is being instructed to grow or shrink to fill all available space in its parent
    container. This is a common technique used in React Native layouts to ensure that components are
    properly sized and positioned on the screen. */
    flex: 1,
  },
  /* `marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0` is setting the margin top
    of the `SafeAreaView` component based on the platform the app is running on. If the platform
    is Android, it sets the margin top to the height of the device's status bar using
    `StatusBar.currentHeight`. This is necessary because the status bar on Android devices takes
    up space at the top of the screen, and the `SafeAreaView` component ensures that the content
    of the app is not obscured by the status bar. If the platform is not Android, the margin top
    is set to 0. */
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  routeCard: {
    /* `flex: 0.25` is setting the flex property of the `routeCard` element to 0.25. This
  means that the `routeCard` element will take up 25% of the available space in its
  parent container. The remaining 75% of the space will be taken up by other elements in
  the container. This is a common technique used in React Native layouts to ensure that
  components are properly sized and positioned on the screen. */
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    /* `borderRadius: 30` is setting the border radius of the `routeCard` element to 30
    pixels. This creates rounded corners on the element, giving it a more visually
    appealing appearance. */
    borderRadius: 30,
    /* `backgroundColor: "white",` is setting the background color of the `routeCard`
    element to white. This means that the background of the `routeCard` element
    will be white instead of transparent or another color. */
    backgroundColor: "white",
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  routeText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginTop: 75,
    /* `paddingLeft: 30` is setting the left padding of the `routeText` and `knowMore`
    elements to 30 pixels. This means that there will be 30 pixels of empty space
    between the left edge of the element and the text inside the element. This is a
    common technique used in web and mobile design to add spacing between elements and
    improve the readability and visual appeal of the layout. */
    paddingLeft: 30,
  },
  knowMore: {
    paddingLeft: 30,
    color: "red",
    fontSize: 15,
  },
  bgDigit: {
    /* `position: "absolute"` is a CSS style property that sets the positioning of an element relative
    to its nearest positioned ancestor. In this case, it is used to position the `iconImage` element
    in a specific location on the screen, regardless of the position of other elements in the
    layout. The `top` and `right` properties are also used to further adjust the position of the
    element. */
    position: "absolute",
    /* `color: "rgba(183, 183, 183, 0.5)"` is setting the color of the text to a semi-transparent
        light gray color. The `rgba` stands for "red, green, blue, alpha", and the values inside the
        parentheses represent the amount of red, green, and blue in the color (183, 183, 183) and
        the alpha value (0.5) which determines the opacity of the color. In this case, the alpha
        value of 0.5 makes the color semi-transparent, allowing the background color or image to
        show through slightly. */
    color: "rgba(183, 183, 183, 0.5)",
    fontSize: 150,
    right: 20,
    /* `bottom: -15` is setting the distance between the bottom edge of the `bgDigit`
        element and the bottom edge of its containing element to -15 pixels. This is used
        to position the `bgDigit` element in a specific location on the screen. In this
        case, it is positioned slightly below the `routeCard` element. */ bottom:
      -15,
    /* `zIndex: -1` is setting the z-index of the `bgDigit` element to -1, which means it will be
       positioned behind other elements on the screen. This is useful for creating layered effects
       in a layout, where some elements appear to be in front of or behind others. In this case, the
       `bgDigit` element is a large text element that is positioned behind the `routeCard` element,
       but in front of the background image. By setting the z-index to -1, it ensures that the
       `bgDigit` element will always be positioned behind other elements on the screen. */
    zIndex: -1,
  },
  iconImage: {
    /* `position: "absolute"` is a CSS style property that sets the positioning of an element
        relative to its nearest positioned ancestor. In this case, it is used to position the
        `iconImage` element in a specific location on the screen, regardless of the position of
        other elements in the layout. The `top` and `right` properties are also used to further
        adjust the position of the element. */
    position: "absolute",
    height: 200,
    width: 200,
    /* `resizeMode: "contain"` is a style property that is applied to the `Image` component
    in the `HomeScreen` class. It specifies how the image should be resized to fit its
    container. In this case, it is set to "contain", which means that the image will be
    scaled uniformly to fit inside its container while preserving its aspect ratio. This
    ensures that the entire image is visible and that it does not get cropped or
    distorted.
    
    WIDTH= 200
    HEIGHT= 400
    RATIO = 1:2
    
    SCALE UP = ZOOM IN = BADA KARNA HAI 
    WIDTH = 500
    HEIGHT = 1000
    RATIO = 1:2
    */
    resizeMode: "contain",
    right: 20,
    /* `top: -80` is a CSS style property that sets the distance between the top edge of the element
       and the top edge of its containing element. In this case, it is setting the position of the
       `iconImage` element to be 80 pixels above the top edge of its containing element. This is
       used to position the image element in a specific location on the screen. */
    top: -80,
  },
});
