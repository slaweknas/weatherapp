import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { ToDayCardComponent, DetailComponent } from '../components';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Today Screen',
    headerStyle: {
      backgroundColor: '#2089DC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
      super(props);

      this.state = {
        isLoaded: false,
        error: null,
        latitude: 0,
        longitude: 0,
      };
  }

  componentDidMount() {
    console.log('TODAY');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <GestureRecognizer
        onSwipeLeft={() => navigate('WeekScreen')}
        style={styles.container}
        velocityThreshold={0.1}
        distanceThreshold={20}
        angleThreshold={60}
        >
        <View style={styles.textContainer}>
          <ToDayCardComponent
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            icon={
              <Icon
                name="arrow-right"
                size={25}
                color="white"
              />
            }
            onPress={()=>navigate('WeekScreen')}
          />
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 4,
    padding: 50,
  },
  buttonContainer : {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button : {
    height: 70,
    width: 70,
    margin: 30,
    borderRadius: 100
  }
});
