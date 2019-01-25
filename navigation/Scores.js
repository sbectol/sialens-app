import React, { Component } from 'react';
import { Animated, Easing, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../styles'


export class ScoresScreen extends React.Component {
  constructor(props) {
    
    super(props);

    this.animatedValue = new Animated.Value(0)
    
    this.state = {
        games_played: 0,
        high: 0,
        low: 0,
        average: 0
        }
    }
    
    state = {};
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  componentDidMount() {
    const { state } = this.props.navigation;

    

    if(profile_id != 0) {
      
            this.save()

            this.getStats()

            this.animate()
      
          }

  }


  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.exp
      }
    ).start()
  }


  home() {
    console.log("This is the profile id " + profile_id)

    this.props.navigation.navigate('Home', { music: true })

  }

  getStats = async () => {
    try {

        
        const URL = 'http://sialens.sbectol.com/scores/profileStats/' + profile_id
        
        let response = await fetch(URL);
        
        let result = await response.json();
        
        console.log("Restult is " + result)

        this.setState({average: Math.floor(result.average*100)})

        this.setState({high: result.high})

        this.setState({low: result.low})

        this.setState({games_played: result.games_played})
   
        } catch (e) {
        
            this.setState({ result: e.message });
        
            }
        };

  save = async () => {

    try {

      console.log("Saving Score " + sgor + " profile_id is " + profile_id )

      const URL = 'http://sialens.sbectol.com/scores/store'

      let response = await fetch(URL,
        {
          method: "POST",

          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            profile_id: profile_id,
            score: sgor,

          })
        }
      );

      let result = await response.json();

      console.log("This is the result " + result.score)

      //this.props.navigation.navigate('Home', { music: true })

      this.setState({ result });

    } catch (e) {

      this.setState({ result: e.message });

    }
  };




  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2000, 0]
    })
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0]
    })
    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })
    const rotateX = this.animatedValue.interpolate({
      inputRange: [0,  1],
      outputRange: [ '180deg', '0deg']
    })
    return (
      <View style={styles.container}>
      
      {/* <Image source={require('../assets/images/star.png')} style={styles.backgroundImage}> */}

      <Animated.View style={{ marginLeft: marginLeft }}>

        <View style={styles.statsBox}>

          <Text style={styles.statsHeading}>Ystadegau</Text>

          <Text style={styles.statsLabel}>Nifer o Gemau</Text>

          <Text style={styles.statsText}>{this.state.games_played}</Text>

          <Text style={styles.statsLabel}>Sgôr Uchaf</Text>

          <Text style={styles.statsText}>{this.state.high}</Text>

          <Text style={styles.statsLabel}>Sgôr Isaf</Text>

          <Text style={styles.statsText}>{this.state.low}</Text>

          <Text style={styles.statsLabel}>Gradd</Text>

          <Text style={styles.statsText}>{this.state.average}</Text>

          <TouchableOpacity onPress={() => this.home()}><View style={[styles.nextButton, styles.greenBack]}>

            <Text style={styles.buttonText}>
            Sgôr {sgor}
              

            </Text>

          </View>

          </TouchableOpacity>

          </View>

         

          </Animated.View>

          {/* </Image> */}

      </View>
    )
  }

}