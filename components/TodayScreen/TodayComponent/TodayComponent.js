import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { API_KEY } from "react-native-dotenv";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ToDayCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      latitude: 0,
      longitude: 0,
      temperature: 0,
      city: "",
      icon: "",
      description: "",
      wind: 0,
      rain: 0,
      snow: 0,
      humidity: 0,
      clouds: "",
      pressure: 0
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
      `http://api.openweathermap.org/data/2.5/weather?lat=${
        this.state.latitude
      }&lon=${this.state.longitude}&units=metric&APPID=${API_KEY}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            temperature: result.main.temp,
            city: result.name,
            description: result.weather[0].description,
            icon: result.weather[0].icon,
            wind: result.wind.speed,
            clouds: result.clouds.all,
            rain: result.rain ? result.rain["1h"] : 0,
            snow: result.snow ? result.snow["1h"] : 0,
            pressure: result.main.pressure,
            humidity: result.main.humidity
          });
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={styles.cityName}>{this.state.city}</Text>
          <Text style={styles.temperature}>
            {this.state.temperature.toFixed(0)}&deg;C
          </Text>
          <Text>Desc: {this.state.description}</Text>
          <Text>Wind: {this.state.wind} meter/sec</Text>
          <Text>Humidity: {this.state.humidity}%</Text>
          <Text>Clouds: {this.state.clouds}%</Text>
          <Text>Pressure: {this.state.pressure} hPa</Text>
          {this.state.rain > 0 && <Text>Rain: {this.state.rain} mm</Text>}
          {this.state.snow > 0 && <Text>Snow: {this.state.snow} mm</Text>}
        </View>
        <View style={styles.icon}>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${this.state.icon}@2x.png`
            }}
            style={{ width: 100, height: 100 }}
          />
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
