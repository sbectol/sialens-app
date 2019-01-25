import React, {Component} from 'react';

import { Text, View,ImageBackground,Image, TouchableOpacity } from 'react-native';

import { Font, Audio } from 'expo';

import styles from '../styles'

export class HomeScreen extends React.Component {

  state = {

    fontLoaded: false,

  };

  static navigationOptions = {

    header: null

  };

  async componentDidMount() {

    const { state } = this.props.navigation;

    
      
    await Font.loadAsync({
  
      'bebas-neue-bold': require('../assets/fonts/BebasNeueBold.ttf'),
  
      'bariol': require('../assets/fonts/bariol.ttf'),
  
      'fontAwesome': require('../assets/fonts/fontawesome-webfont.ttf'),
  
      });
      
    this.setState({ fontLoaded: true });

  }

   
    render() {
      
      const { navigate } = this.props.navigation;
    
      return (

      
          <View style={styles.container}>
          <View style={styles.topRow}>
          {profile != "" ? (
          <TouchableOpacity onPress={() => this._goAvatar()}>
            <View style={styles.iconBack}>
              {this.state.fontLoaded ? (
              <Text style={styles.awesomeIcons}>{'\uf007'}</Text>
            ): null
            }
            </View>
            </TouchableOpacity>):
           <View style={styles.iconBack}>
           {this.state.fontLoaded ? (
           <Text style={styles.awesomeIcons}>{'\uf007'}</Text>
         ): null
         }
         </View>
          }
           {profile_id == 0 ? (
            <TouchableOpacity onPress={() => this._login()}>

              <View style={[styles.loginButton, styles.greenBack]}>
           
                {this.state.fontLoaded ? (<Text style={styles.smallButtonText}>mewngofnodi</Text>): null }

                </View>

              </TouchableOpacity>
          ):
          
          <TouchableOpacity onPress={() => this._logout()}>

            <View style={[styles.loginButton, styles.greenBack]}>
            
              {this.state.fontLoaded ? (<Text style={styles.smallButtonText}>Allgofnodi</Text>): null }

              </View>

            </TouchableOpacity>
          }

          
             <TouchableOpacity onPress={() => this._goHighScores()}>
             
              <View style={styles.iconBack}>
            
                {this.state.fontLoaded ? ( <Text style={styles.awesomeIcons}>{'\uf091'}</Text> ): null }
           
                </View>

            </TouchableOpacity>
           
           </View>

          <ImageBackground resizeMode='contain' source={require('../assets/images/star.png')} style={styles.backgroundImage}>
          
              {this.state.fontLoaded ? (
          
                <Text style={styles.logoSubHeading}>Yr Ap Cwis</Text>
          
              ) : null
          
              }
          
              <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />

              
          
            </ImageBackground>

          {profile_id !=0 ? 
          (<TouchableOpacity onPress={() => this._handlePress()}>

            <View style={[styles.playButton, styles.greenBack]}>

              {this.state.fontLoaded ? ( <Text style={styles.buttonText}>CHWARAE</Text> ) : null }

              </View>

            </TouchableOpacity> )  : null }

        </View>   
      )
    }
    
    _handlePress = () => {
      
      // sgor=0;
      
      this.props.navigation.navigate('Question', { action:"getQuiz",ids: '1',qno: 0 });

      // sgor = Math.floor(Math.random() * 10) + 1  
      // profile_id = Math.floor(Math.random() * 10) + 1
      // this.props.navigation.navigate('Scores')
    
    }

    _logout = () => {

      profile_id = 0;
      profile="";
      this.props.navigation.navigate('Home', { music: true})

    }
  
    _login= () => {

      
     // this.props.navigation.navigate('Profile', {profile: "Sialens-6-4-1"});
     this.props.navigation.navigate('Login');

    }

    _goAvatar = () => {
    this.props.navigation.navigate('Profile', {profile: profile});
}

  _goHighScores = () => {

    this.props.navigation.navigate('HighScores');

  }



  
  
  }
  
