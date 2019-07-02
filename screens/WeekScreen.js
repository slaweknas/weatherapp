import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { DayCardComponent, WeekComponent } from "../components";

export default class WeekScreen extends React.Component {
  static navigationOptions = {
    title: "Week Screen",
    headerStyle: {
      backgroundColor: "#2089DC"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <GestureRecognizer
        onSwipeRight={() => navigate("TodayScreen")}
        style={styles.container}
        velocityThreshold={0.1}
        distanceThreshold={20}
        angleThreshold={60}
      >
        <WeekComponent
          style={styles.list}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  list: {
    marginTop: 10
  },
  day: {
    flex: 1
  }
});
