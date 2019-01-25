import React from 'react';
import { Alert, StyleSheet,Text, View, Dimensions, Image, Button,TouchableOpacity } from 'react-native';
import { Font } from 'expo';
import { BarCodeScanner, Permissions, Constants, Audio } from 'expo';
import  { createStackNavigator }  from 'react-navigation';
import {ProfileScreen} from './navigation/Profile';
import {LoginScreen} from './navigation/Login';
import {HomeScreen} from './navigation/Home';
import {ScoresScreen} from './navigation/Scores';
import {QuestionScreen} from './navigation/Question';
import {EditAvatarScreen} from './navigation/EditAvatar';
import { HighScores } from './navigation/HighScores';
import { TopTen } from './navigation/TopTen';
import { TopSchools } from './navigation/TopSchools';
import { SchoolStats} from './navigation/SchoolStats';





const SialensApp =  createStackNavigator({
 
  Home: {screen: HomeScreen},
  Question: {screen: QuestionScreen},
  Scores: {screen: ScoresScreen},
  Login: {screen: LoginScreen},
  Profile: {screen: ProfileScreen},
  EditAvatar: {screen: EditAvatarScreen},
  HighScores: {screen: HighScores},
  TopTen: {screen: TopTen},
  TopSchools: {screen: TopSchools},
  SchoolStats: {screen:SchoolStats}
});


export default class App extends React.Component {

  async componentDidMount() { 
  
    
    Audio.setAudioModeAsync({

      allowsRecordingIOS: false,
    
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    
      playsInSilentModeIOS: true,
    
      shouldDuckAndroid: true,
    
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    
      });
      
   
      
      this.playMusic();
      
      

    }

    playMusic = async () => {
      
      console.log("Playing")

      const mp3 = require('./assets/sounds/newloop.mp3');

      const { sound } = await Audio.Sound.create(mp3, { shouldPlay: true, isLooping: true, volume: 0.2 });
      
      this.bgMusic = sound;

      this.setState({musicPlaying: true})
      
      }
      

  render() {
    return <SialensApp />;
  }
}

profile_id = 0;

profile = "";
  

sgor = 0;

