import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export const DayCardComponent = props => {
  const { style, date, temperature, icon, ...rest } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.temperature}>{temperature.toFixed(0)}&deg;C</Text>
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
          style={{ width: 60, height: 60 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  date: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 10
  },
  description: {
    textAlign: "center",
    textAlignVertical: "center"
  },
  iconContainer: {
    justifyContent: "center"
  },
  temperature: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold"
  }
});
