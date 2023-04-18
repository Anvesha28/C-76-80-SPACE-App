/* The UpdateScreen class is a React Native component that fetches and displays spaceflight news
articles, reports, and blogs from an API. */

import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    ImageBackground,
    Alert,
    FlatList,
    TouchableOpacity,
    Linking,
    Image
} from "react-native";
import axios from "axios";
import { withSafeAreaInsets } from "react-native-safe-area-context";

/* This line of code is exporting a default class component called `UpdateScreen` that extends the
`Component` class from the `react` library. This component fetches and displays spaceflight news
articles, reports, and blogs from an API. */
export default class UpdateScreen extends Component {
    /**
     * This is a constructor function that initializes the state with empty arrays for articles,
     * reports, and blogs.
     * @param props - props is an object that contains properties passed down from a parent component
     * to this component. It can include data, functions, and other values that are needed by the
     * component. In this case, the props parameter is being passed to the constructor of a React
     * component, and it is being used to initialize the
     */
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            reports: [],
            blogs: []
        };
    }

    /* `componentDidMount()` is a lifecycle method in React that is called after a component is
    mounted (inserted into the DOM). In this code, it is being used to call the `getArticles()`
    method, which fetches spaceflight news articles from an API and updates the state of the
    component with the retrieved data. By calling `getArticles()` in `componentDidMount()`, the
    component ensures that the data is fetched and ready to be displayed as soon as the component
    is mounted. */
    componentDidMount() {
        this.getArticles()
    }

    
    /* `getArticles` is a method that uses the Axios library to make a GET request to the URL
    "https://spaceflightnewsapi.net/api/v2/articles" to fetch spaceflight news articles from an API.
    If the request is successful, the response data is stored in the `articles` state variable using
    `setState()`. Then, the `getReports()` method is called to fetch reports from the same API. If
    there is an error with the request, an error message is displayed using the `Alert` component. */
    getArticles = () => {
        axios
            .get("https://spaceflightnewsapi.net/api/v2/articles")
            .then(response => {
                this.setState({ articles: response.data })
                this.getReports()
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    /* `getReports` is a method that uses the Axios library to make a GET request to the URL
    "https://spaceflightnewsapi.net/api/v2/reports" to fetch spaceflight news reports from an API.
    If the request is successful, the response data is stored in the `reports` state variable using
    `setState()`. Then, the `getBlogs()` method is called to fetch blogs from the same API. If there
    is an error with the request, an error message is displayed using the `Alert` component. */
    getReports = () => {
        axios
            .get("https://spaceflightnewsapi.net/api/v2/reports")
            .then(response => {
                this.setState({ reports: response.data })
                this.getBlogs()
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    /* `getBlogs` is a method that uses the Axios library to make a GET request to the URL
    "https://spaceflightnewsapi.net/api/v2/blogs" to fetch spaceflight news blogs from an API. If
    the request is successful, the response data is stored in the `blogs` state variable using
    `setState()`. If there is an error with the request, an error message is displayed using the
    `Alert` component. */
    getBlogs = () => {
        axios
            .get("https://spaceflightnewsapi.net/api/v2/blogs")
            .then(response => {
                this.setState({ blogs: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    /* The above code is defining a function called `renderItem` that takes an object with an `item`
    property as its argument. The function checks the `type` property of the `item` object and sets
    the `url` variable accordingly. If the `type` is "Article", the function returns a
    `TouchableOpacity` component with a title and an image sourced from the `featured_image`
    property of the `item` object. If the `type` is not "Article", the function returns a
    `TouchableOpacity` component with a title and an image sourced from either the `iss_icon.png` */
    renderItem = ({ item }) => {
        let width = 50;
        let url;
        /* The above code is checking the type of an item and setting the URL of an image based on the
        type. If the type is "Report", the URL will be set to the image of an ISS icon, and if it's
        not "Report", the URL will be set to the image of a blog icon. */
        if (item.type == "Report") {
            url = require("../assets/iss_icon.png")
        } else {
            url = require("../assets/blog_icon.png")
        }
        if (item.type == "Article") {
            console.log(item.featured_image);
            return (
                /* The above code is a React Native component that renders a TouchableOpacity with a
                title and an image. When the TouchableOpacity is pressed, it opens the URL specified
                in the `item.url` property using the `Linking.openURL()` method. If there is an
                error while opening the URL, it logs an error message to the console. The title and
                image are rendered using the `Text` and `Image` components respectively, with their
                styles defined in the `styles` object. */
                <TouchableOpacity style={styles.listContainer}
                    onPress={() => Linking.openURL(item.url).catch(err => console.error("Couldn't load page", err))}
                >
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.iconContainer}>
                        <Image source={{ "uri": item.featured_image }} style={{ width: "100%", height: 100 }}></Image>
                    </View>
                </TouchableOpacity >
            );
        } else {
            return (
                /* The above code is a React Native component that renders a TouchableOpacity with a
                title and an image. When the TouchableOpacity is pressed, it opens the URL specified
                in the `item.url` property. The image displayed is sourced from the `url` variable,
                and its dimensions are set by the `width` variable. */
                <TouchableOpacity style={styles.listContainer}
                    onPress={() => Linking.openURL(item.url).catch(err => console.error("Couldn't load page", err))}
                >
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.iconContainer}>
                        <Image source={url} style={{ width: width, height: width }}></Image>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    /* `keyExtractor` is a function that is used by the `FlatList` component in React Native to extract
    a unique key for each item in the list. In this case, the `keyExtractor` function takes two
    parameters: `item` and `index`. It then returns a string representation of the `index` parameter
    using the `toString()` method. This ensures that each item in the list has a unique key that can
    be used by React to efficiently update the list when changes are made. */
    keyExtractor = (item, index) => index.toString();

    /* `addFlag` is a function that takes in an array `arr` and a value `value`. It loops through each
    element in the array and adds a new property called `type` to each element with the value of
    `value`. It then returns the modified array. This function is used in the `render` method to add
    a `type` property to each item in the `articles`, `reports`, and `blogs` arrays so that they can
    be distinguished and displayed differently in the UI. */
    addFlag = (arr, value) => {
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            arr[i].type = value
        }
        return arr
    }

    render() {
       /* This code is adding a new property called `type` to each item in the `articles`, `reports`,
       and `blogs` arrays so that they can be distinguished and displayed differently in the UI. It
       is achieving this by calling the `addFlag` function, which takes in an array and a value, and
       loops through each element in the array to add a new property called `type` to each element
       with the value of the provided value parameter. The modified arrays are then concatenated
       together and stored in the `events` variable, which is sorted by the `published_date`
       property of each item in descending order. */
        let articles = this.addFlag(this.state.articles, "Article")
        let reports = this.addFlag(this.state.reports, "Report")
        let blogs = this.addFlag(this.state.blogs, "Blog")
        let events = articles.concat(reports).concat(blogs)

        e/* This code is sorting the `events` array in descending order based on the `published_date`
        property of each item in the array. It is achieving this by using the `sort()` method,
        which takes in a comparison function that compares two elements in the array and returns a
        negative, zero, or positive value depending on whether the first element should come
        before, be equal to, or come after the second element in the sorted array. In this case,
        the comparison function is subtracting the `published_date` of the second element from the
        `published_date` of the first element to determine the order. */
        vents = events.sort(function (a, b) {
            return new Date(b.published_date) - new Date(a.published_date);
        });
        
        
        /* This code block is checking if the `events` array is empty. If it is, it returns a loading
        screen with a centered message that says "Loading". This is to ensure that the user sees
        some feedback while the component is fetching data from the API. */
        if (events.length == 0) {
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
            /* This code block is returning a JSX (JavaScript XML) element that represents the UI of
            the `UpdateScreen` component. It consists of a `View` component that contains a
            `SafeAreaView` component, an `ImageBackground` component, and two child components: a
            `View` component with a `Text` child component, and a `FlatList` component. */
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                        <View style={styles.titleBar}>
                            <Text style={styles.titleText}>Updates</Text>
                        </View>
                        <View style={styles.eventContainer}>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={events}
                                renderItem={this.renderItem}
                            />
                        </View>
                    </ImageBackground>
                </View >
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    eventContainer: {
        flex: 0.85
    },
    listContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        padding: 10
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    }
});