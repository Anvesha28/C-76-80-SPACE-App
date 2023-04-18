/* The IssLocationScreen class displays the current location, altitude, and velocity of the
International Space Station using the Where the ISS at API and the React Native Maps library. */

/* This code is importing the React library and the Component class from it. It is also using the
ES6 syntax for importing. The code is incomplete as it contains a placeholder " */
import React, { Component } from 'react';

/* This code is importing various components from the 'react-native' library, including Text,
View, StyleSheet, ImageBackground, StatusBar, SafeAreaView, and Image. These components can be used
to build user interfaces in a React Native application. */
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StatusBar,
    SafeAreaView,
    Image
} from 'react-native';

/* The below code is importing the `MapView` and `Marker` components from the `react-native-maps`
library in JavaScript. These components can be used to display maps and markers on a mobile app
built with React Native. */
import MapView, { Marker } from 'react-native-maps';

/* This code is importing the Axios library in JavaScript using the `import` statement. Axios is a
popular library used for making HTTP requests from a web browser or Node.js. */
import axios from "axios";

/* This code is defining a JavaScript class called "IssLocationScreen" and exporting it as the
default export of the module. The class is extending the "Component" class from the React library,
indicating that it is a React component. The implementation of the class is not shown in the code
snippet. */
export default class IssLocationScreen extends Component {
    /**
     * This is a constructor function that initializes the state of a component with an empty object
     * for the location property.
     * @param props - props is an object that contains properties passed down to a React component from
     * its parent component. These properties can be accessed using `this.props`. In the constructor,
     * `props` is passed as a parameter to the `super` method to initialize the component's state.
     */
    constructor(props) {
        super(props);
        this.state = {
            location: {},
        };
    }

  /**
   * The function calls the getIssLocation method when the component mounts.
   */
    componentDidMount() {
        this.getIssLocation()
    }

    /* `getIssLocation` is a method that uses the Axios library to make a GET request to the Where the
    ISS at API to retrieve the current location data of the International Space Station. If the
    request is successful, the response data is used to update the component's state with the
    location object. If there is an error, an alert is displayed with the error message. */
    getIssLocation = () => {
      /* `axios.get("https://api.wheretheiss.at/v1/satellites/25544")` is making a GET request to the
      Where the ISS at API to retrieve the current location data of the International Space Station.
      The URL passed as a parameter to the `get` method is the endpoint of the API that returns the
      location data of the ISS. */
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")
            /* `.then(response => {
                            this.setState({ location: response.data })
                        })` is a promise that is executed when the Axios GET request to the Where
            the ISS at API is successful. It updates the component's state with the location object
            received from the API response. The `response.data` contains the data returned by the
            API, and `this.setState({ location: response.data })` updates the `location` property of
            the component's state with this data. */
            .then(response => {
                this.setState({ location: response.data })
            })
            /* `.catch(error => {
                            Alert.alert(error.message)
                        })` is a catch block that is executed if there is an error in the Axios GET
            request to the Where the ISS at API. It displays an alert with the error message. */
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    /* `render()` is a method that returns the JSX (JavaScript XML) code that defines the UI of the
    component. In this case, the `render()` method returns a view that displays the current
    location, altitude, and velocity of the International Space Station using the Where the ISS at
    API and the React Native Maps library. The method first checks if the `location` property of the
    component's state is empty, and if it is, it displays a "Loading" message. If the `location`
    property is not empty, it displays a view with a background image, a title, a map showing the
    location of the ISS, and information about the ISS's latitude, longitude, altitude, and
    velocity. */
    render() {
       /* `if (Object.keys(this.state.location).length === 0)` is checking if the `location` property
       of the component's state is empty. It does this by using the `Object.keys()` method to get an
       array of the keys of the `location` object, and then checking if the length of this array is
       equal to 0. If the `location` property is empty, it means that the component has not yet
       received the location data from the API, so the component displays a "Loading" message. If
       the `location` property is not empty, it means that the component has received the location
       data from the API, so the component displays the location information. */
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                {/* The above code is written in JavaScript and it defines a component called SafeAreaView
                with a style property called droidSafeArea. This component is typically used in React
                Native applications to ensure that the content is displayed within the safe area of
                the device screen, avoiding any notches or other obstructions. */}
                <SafeAreaView style={styles.droidSafeArea} />


                  { /* `<ImageBackground source={require('../assets/bg.png')}
                    style={styles.backgroundImage}>` is rendering an `<ImageBackground>` component
                    with a background image sourced from the `bg.png` file in the `assets` folder of
                    the project. The `style` prop of the `<ImageBackground>` component is set to the
                    `backgroundImage` style object from the `StyleSheet.create()` method, which
                    defines the width and height of the image to be 100% of the available space.
                    This creates a background image for the component that displays the current
                    location, altitude, and velocity of the International Space Station. */}
                    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>

                        {/* This code is rendering a `View` component with a style defined by the
                        `titleContainer` style object from the `StyleSheet.create()` method. Inside
                        this `View`, there is a `Text` component with a style defined by the
                        `titleText` style object from the same `StyleSheet.create()` method. This
                        `Text` component displays the text "ISS Location". */}
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>ISS Location</Text>
                        </View>

                        <View style={styles.mapContainer}>
                        {/* `<MapView>` is a component from the React Native Maps library that is
                        used to display a map in a React Native app. In this code, the
                        `<MapView>` component is being used to display a map that shows the
                        current location of the International Space Station (ISS). The `style`
                        prop of the `<MapView>` component is set to the `map` style object from
                        the `StyleSheet.create()` method, which defines the width and height of
                        the map to be 100% of the available space. The `region` prop of the
                        `<MapView>` component is an object that defines the initial region to be
                        displayed on the map. The `latitude` and `longitude` properties of the
                        `region` object are set to the `latitude` and `longitude` properties of
                        the `location` object in the component's state, which are obtained from
                        the Where the ISS at API using the `getIssLocation` method. The
                        `latitudeDelta` and `longitudeDelta` properties of the `region` object
                        are set to 100, which determines the zoom level of the map. */}

                            <MapView
                                style={styles.map}
                                region={{
                                    latitude: this.state.location.latitude,
                                    longitude: this.state.location.longitude,
                                    latitudeDelta: 100,
                                    longitudeDelta: 100
                                }}
                            >
                                {/* `<Marker>` is a component from the React Native Maps library that
                                allows you to add markers to a map. In this code, a `<Marker>`
                                component is being used to add a marker to the map at the current
                                location of the International Space Station (ISS). The `coordinate`
                                prop of the `<Marker>` component is set to an object with the
                                `latitude` and `longitude` properties obtained from the `location`
                                object in the component's state. The `<Image>` component inside the
                                `<Marker>` component is used to display an image of the ISS icon at
                                the location of the marker on the map. */}
                                <Marker
                                    coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}
                                >
                                    <Image source={require('../assets/iss_icon.png')} style={{ height: 50, width: 50 }} />
                                </Marker>
                            </MapView>
                        </View>

                        {/* This code is rendering a `View` component with a style defined by the
                        `infoContainer` style object from the `StyleSheet.create()` method. Inside
                        this `View`, there are four `Text` components with a style defined by the
                        `infoText` style object from the same `StyleSheet.create()` method. These
                        `Text` components display information about the current location of the
                        International Space Station, including latitude, longitude, altitude, and
                        velocity. The values for these properties are obtained from the `location`
                        object in the component's state, which is updated with data from the Where
                        the ISS at API using the `getIssLocation` method. */}
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                            <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                            <Text style={styles.infoText}>Altitude (KM): {this.state.location.altitude}</Text>
                            <Text style={styles.infoText}>Velocity (KM/H): {this.state.location.velocity}</Text>
                        </View>

                    </ImageBackground>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
    /* The above code is setting the `marginTop` style property of a component based on the platform the
    app is running on. If the platform is Android, it sets the `marginTop` to the height of the device's
    status bar using `StatusBar.currentHeight`. If the platform is not Android, it sets the `marginTop`
    to 0. */
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
})