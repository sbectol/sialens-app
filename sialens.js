import React from 'react';
import { StyleSheet,Text, View, Dimensions, Image, Button } from 'react-native';
import { Font } from 'expo';
import {
  StackNavigator,
} from 'react-navigation';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class App extends React.Component {
  
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    // load fonts
    await Font.loadAsync({
      'bebas-neue-bold': require('./assets/fonts/BebasNeueBold.ttf'),
      'bariol': require('./assets/fonts/bariol.ttf'),
      'fontAwesome': require('./assets/fonts/fontawesome-webfont.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
   
   
    return (
     
      <View style={styles.container}>
        <View style={styles.topRow}>
        <View style={styles.iconBack}>
          {this.state.fontLoaded ? (
          <Text style={styles.awesomeIcons}>{'\uf013'}</Text>
         ): null
         }
         </View>
         <View style={styles.iconBack}>
          {this.state.fontLoaded ? (
          <Text style={styles.awesomeIcons}>{'\uf129'}</Text>
         ): null
         }
         </View>
         </View>
        <Image source={require('./assets/images/star.png')}
        style={styles.backgroundImage}>
        <View style={styles.logoBack}>
        {this.state.fontLoaded ? (
        <Text style={styles.logoSubHeading}>Y Cwis Ysgolion</Text>
      ) : null
        }
   
        </View>
        </Image>
        <View style={styles.playButton}>
        {this.state.fontLoaded ? (
          <Text style={styles.buttonText}>CHWARAE</Text>
        ) : null
        }
       </View>
      
      </View>

       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2d39',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 

  },
  awesomeIcons: {
    fontFamily:'fontAwesome',
    color: 'white',
    fontSize: 42,
  },
  iconBack: {
    width: 50,
    height: 50,
    backgroundColor: '#d75f6b',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSubHeading: {
    color: '#87cc4a',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'bariol',
    fontSize: 24
  },
  logoHeading: {
    color: '#d75f6b',
    textAlign: 'center',
    marginTop: 10
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: null,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
},
  logoBack: {
    width: width*.8,
    height: height*.2,
    backgroundColor: 'white',
    borderRadius: 20
  },
  playButton: {
    width: width*.8,
    height: height*.1,
    backgroundColor: '#87cc4a',
    borderRadius: 30,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'bebas-neue-bold',
    fontSize: 50

  },
});