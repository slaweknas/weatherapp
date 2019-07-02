import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { API_KEY } from "react-native-dotenv";
import Icon from "react-native-vector-icons/FontAwesome";
import { DayCardComponent } from "../DayCardComponent/DayCardComponent";

export default class WeekComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      latitude: 0,
      longitude: 0,
      city: "",
      data: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.latitude !== state.latitude &&
      props.longitude !== state.longitude
    ) {
      return {
        latitude: props.latitude,
        longitude: props.longitude
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.latitude !== prevProps.latitude &&
      this.props.longitude !== prevProps.longitude
    ) {
      this.getData();
    }
  }

  getData() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&units=metric&APPID=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            city: result.name
          });
          this.mapData(result.list);
        },
        error => {
          this.setState({
            result: error,
            isLoaded: true,
            error
          });
        }
      );
  }

  mapData(list) {
    let filteredData = list.filter(element => {
      let day = new Date(element.dt * 1000);
      let today = new Date();
      return day.getDay() !== today.getDay() && day.getHours() + 1 === 15;
    });
    let appData = filteredData.map(element => {
      let day = new Date(element.dt * 1000);
      let d = day.getDate();
      let m = day.getMonth() + 1;
      let y = day.getFullYear();
      return {
        date: (d <= 9 ? "0" + d : d) + "." + (m <= 9 ? "0" + m : m) + "." + y,
        description: element.weather[0].main,
        temperature: element.main.temp,
        icon: element.weather[0].icon
      };
    });
    this.setState({
      data: appData
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          {this.state.data.map((element, index) => (
            <DayCardComponent
              key={index}
              date={element.date}
              description={element.description}
              temperature={element.temperature}
              icon={element.icon}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  text: {
    flex: 1
  },
  icon: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 30
  },
  cityName: {
    fontSize: 20,
    marginBottom: 10
  },
  temperature: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10
  }
});
