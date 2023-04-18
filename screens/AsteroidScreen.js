/* This code is importing necessary modules and libraries for building a React Native app that displays
information about meteors. */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
/* The above code is importing the Axios library in JavaScript using the `import`
statement. Axios is a popular library used for making HTTP requests from a web
browser or Node.js. */
import axios from "axios";

/* The above code is defining a class called "MeteorScreen" that extends the "Component" class from
React. It is then exporting this class as the default export of the module. */
export default class AsteroidScreen extends Component {
  /**
   * This is a constructor function that initializes the state of a component with an empty object
   * for meteors.
   * @param props - props is an object that contains properties passed down from a parent component
   * to this component. These properties can be accessed using `this.props`. In the constructor,
   * `props` is passed as a parameter to the `super()` method, which is required when defining a
   * constructor in a React component. This is
   */
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }

  /**
   * The componentDidMount function calls the getMeteors function.
   */
  componentDidMount() {
    this.getMeteors();
  }

  /* `getMeteors` is a function that uses the Axios library to make an HTTP GET request to the NASA
    API to retrieve data about near-Earth objects (NEOs), which are asteroids and comets that come
    within 1.3 astronomical units (AU) of Earth's orbit. The API endpoint being accessed is
    `https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ`, which
    requires an API key to access. */
  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item }) => {
    /* The above code is defining variables for the background image, speed, and size of a meteor
        based on its threat score. If the threat score is less than or equal to 30, it sets the
        background image to "meteor_bg1.png", the speed to "meteor_speed3.gif", and the size to 100.
        If the threat score is less than or equal to 75, it sets the background image to
        "meteor_bg2.png", the speed to "meteor_speed3.gif", and the size to 150. Otherwise, it sets
        the background image to "meteor_bg3.png", */

    let bg_img, icon, size;
    if (item.threat_score <= 30) {
      bg_img = require("../assets/meteor_bg1.png");
      icon = require("../assets/meteor_speed1.gif");
      size = 100;
    } else if (item.threat_score <= 75) {
      bg_img = require("../assets/meteor_bg2.png");
      icon = require("../assets/meteor_speed2.gif");
      size = 150;
    } else {
      bg_img = require("../assets/meteor_bg3.png");
      icon = require("../assets/meteor_speed3.gif");
      size = 200;
    }
    return (
      /* This code is rendering a view that displays information about a meteor. It includes an
            image background, an image of a meteor moving at a certain speed, and text displaying
            the meteor's name, closest approach date, minimum and maximum diameter, velocity, and
            miss distance from Earth. The background image, speed of the meteor, and size of the
            meteor image are determined based on the meteor's threat score, which is calculated
            earlier in the code. This view is rendered multiple times using a `FlatList` component
            to display information about multiple meteors. */
      <View>
        <ImageBackground source={bg_img} style={styles.backgroundImage}>
          <View styles={styles.gifContainer}>
            <Image
              source={icon}
              style={{ width: size, height: size, alignSelf: "center" }}
            ></Image>
            <View>
              <Text
                style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}
              >
                {item.name}
              </Text>
              <Text
                style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}
              >
                Closest to Earth -{" "}
                {item.close_approach_data[0].close_approach_date_full}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Minimum Diameter (KM) -{" "}
                {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Maximum Diameter (KM) -{" "}
                {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Velocity (KM/H) -{" "}
                {
                  item.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                }
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Missing Earth by (KM) -{" "}
                {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    /* `keyExtractor` is a function that is used by the `FlatList` component in React Native to extract
    a unique key for each item in the list. In this case, the `keyExtractor` function takes two
    parameters: `item` and `index`. It then returns a string representation of the `index` parameter
    using the `toString()` method. This ensures that each item in the list has a unique key that can
    be used by React to efficiently update the list when changes are made. */
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    /* The above code is checking if the length of the object keys in the "meteors" property of the
        current object's state is equal to 0. If it is, then the code inside the if statement will
        be executed. */
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading</Text>
        </View>
      );
    } else {
      /* 
      The above code is using the `Object.keys()` method to extract all the keys (dates) from
      the `meteors` object in the `state` of a React component. It then maps over these keys and
      returns an array of the corresponding values (meteor objects) from the `meteors` object.
      The resulting array is assigned to the `meteor_arr` variable. */
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      /* 
      The code is creating a new array called "meteors" by flattening a nested array called
      "meteor_arr". The "concat" method is used to combine all the nested arrays into a single
      array, and the "apply" method is used to pass the flattened array as arguments to the
      "concat" method. The resulting flattened array is then assigned to the "meteors" variable. */
      let meteors = [].concat.apply([], meteor_arr);

      /* This code is calculating the threat score for each meteor in the `meteors` array. It is
            using the estimated diameter and the miss distance of each meteor to calculate the
            threat score. The threat score is calculated by dividing the average diameter of the
            meteor by the miss distance and then multiplying the result by 1 billion. The threat
            score is then added as a new property (`threat_score`) to each meteor object in the
            `meteors` array. */
      meteors.forEach(function (element) {
        /* `let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min +
                element.estimated_diameter.kilometers.estimated_diameter_max) / 2` is calculating
                the average diameter of a meteor. It is taking the minimum and maximum estimated
                diameters of a meteor (in kilometers) and adding them together, then dividing the
                result by 2 to get the average diameter. The result is stored in the `diameter`
                variable. */
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        /* `let threatScore = (diameter /
                element.close_approach_data[0].miss_distance.kilometers) * 1000000000` is
                calculating the threat score for each meteor in the `meteors` array. The threat
                score is calculated by dividing the average diameter of the meteor by the miss
                distance and then multiplying the result by 1 billion. The result is stored in the
                `threatScore` variable. This calculation is used to determine the level of threat
                posed by each meteor. The higher the threat score, the more dangerous the meteor is
                considered to be. */
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        /* `element.threat_score = threatScore;` is adding a new property called `threat_score`
                to each object in the `meteors` array. The value of this property is calculated by
                dividing the average diameter of the meteor by the miss distance and then
                multiplying the result by 1 billion. This calculation is used to determine the level
                of threat posed by each meteor. The higher the threat score, the more dangerous the
                meteor is considered to be. */
        element.threat_score = threatScore;
      });

      /* `meteors.sort(function (a, b) {` is sorting the `meteors` array in descending order
            based on their threat score. The `sort()` method takes a function as an argument that
            defines the sorting order. In this case, the function is comparing the `threat_score`
            property of two objects (`a` and `b`) and returning the difference between them. If the
            difference is positive, it means that `b` has a higher threat score than `a`, so `b`
            should come before `a` in the sorted array. If the difference is negative, it means that
            `a` has a higher threat score than `b`, so `a` should come before `b` in the sorted
            array. */
      meteors.sort(function (a, b) {
        /* `return b.threat_score - a.threat_score` is a sorting function that is used to sort
              the meteors array in descending order based on their threat score. The `sort()` method
              takes a function as an argument that defines the sorting order. In this case, the
              function is comparing the `threat_score` property of two objects (`a` and `b`) and
              returning the difference between them. If the difference is positive, it means that
              `b` has a higher threat score than `a`, so `b` should come before `a` in the sorted
              array. If the difference is negative, it means that `a` has a higher threat score than
              `b`, so `a` should come before `b` in the sorted array. */
        return b.threat_score - a.threat_score;
      });
      /* The above code is slicing the first 5 elements from the `meteors` array and assigning the
      result back to the `meteors` variable. This means that the `meteors` array will now only
      contain the first 5 elements. */
      meteors = meteors.slice(0, 5);
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          {/* `<FlatList>` is a component in React Native that renders a scrollable list of
                    items. In this code, it is being used to display a list of meteors. */}
          <FlatList
            keyExtractor={this.keyExtractor}
            data={meteors}
            renderItem={this.renderItem}
            horizontal={true}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width:
      Dimensions.get("window")
        .width /* `height: Dimensions.get('window').height` is setting
        the height of the `backgroundImage` to the height of
        the device's window. This ensures that the background
        image takes up the entire screen, regardless of the
        device's screen size. */,
    height: Dimensions.get("window").height,
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  meteorContainer: {
    flex: 0.85,
  },
  listContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  cardText: {
    color: "white",
  },
  threatDetector: {
    height: 10,
    marginBottom: 10,
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  meteorDataContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
