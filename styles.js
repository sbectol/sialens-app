import React from 'react';

import { StyleSheet, Dimensions} from 'react-native';

import Constants from 'expo-constants';

let width = Dimensions.get('window').width;

let height = Dimensions.get('window').height;

export default StyleSheet.create({

  container: {

    paddingTop: Constants.statusBarHeight,

    flex: 1,

    backgroundColor: '#1f2d39',

    alignItems: 'center',

    justifyContent: 'center', 

  },

  topRow: {

    flexDirection: 'row',

    justifyContent: 'space-between', 

  },
  
  whiteText: {
  
    color: 'white',
  
  },
  
  optionText: {
  
    fontFamily: "bariol",
  
    fontSize: 24,
  
    color: 'black',

    width: width*.7
  
  },
  
  optionTextHolder: {
  
    alignItems: 'center',
  
    justifyContent: 'center'
  
  },
  
  optionLabel: {
  
    fontFamily: 'bebas-neue-bold',
  
    fontSize: 50,
  
    color: 'black',
  
    marginLeft: 20,
  
    marginRight:20,

  },
  
  awesomeIcons: {
  
    fontFamily:'fontAwesome',
  
    color: 'white',
  
    fontSize: 42,
  
  },
  
  smallAwesomeIcons: {
  
    fontFamily:'fontAwesome',
  
    color: 'white',
  
    fontSize: 12,
  
  },
  
  questionCounter: {

    width: width*.2,
    
      height: 60,
    
      backgroundColor: '#d75f6b',
    
      borderRadius: 30,
    
      alignItems: 'center',
    
      justifyContent: 'center',

      marginBottom: 10,

      marginRight: 10

  },

  questionCounterText: {
    
        color: '#fff',
    
        textAlign: 'center',
    
        alignItems: 'center',
    
        justifyContent: 'center',
    
        fontFamily: 'bebas-neue-bold',
    
        fontSize: 20
    
      },

  iconBack: {
  
    width: 60,
  
    height: 60,
  
    backgroundColor: '#d75f6b',
  
    borderRadius: 30,
  
    alignItems: 'center',
  
    justifyContent: 'center',

    marginBottom: 10
  
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
  
    width: width*1.1,
  
    height: null,
  
    alignItems: 'center',
  
    justifyContent: 'center',

  },

  logoImage: {
    
      flex: 1,
    
      width: width*0.7,
    
      height: null,
    
      resizeMode: 'contain',
    
      alignItems: 'center',
    
      justifyContent: 'center',

      marginBottom: 10
  
    },

  logoBack: {

    width: width*.8,

    height: height*.4,

    backgroundColor: 'white',

    borderRadius: 20

  },

  questionBack: {

    width: width*.8,

    height: height*.2,

    backgroundColor: 'white',

    borderRadius: 20,

    marginBottom: 5,

    alignItems: 'center',

    justifyContent: 'center',

  },

  questionText: {

    marginRight:2,

    marginLeft:2,

    fontFamily: "bariol",

    fontSize: 24,

    color: 'black',

    textAlign: 'center',

  },

  playButton: {

    width: width*.8,

    height: height*.1,

    borderRadius: 30,

    marginBottom: 5,

    alignItems: 'center',

    justifyContent: 'center',

  },

  loginButton: {

    width: width*.4,

    height: 50,

    borderRadius: 30,

    marginTop: height*0.025,

    marginBottom: 5,

    marginRight: 10,

    marginLeft: 10,

    alignItems: 'center',

    justifyContent: 'center',

  },

  optionButton: {

    width: width*.9,

    height: height*.1,

    borderRadius: 30,

    marginBottom: 5,

    flexDirection: 'row',

  },

  nextButton: {

    width: width*.7,

    height: height*.1,

    borderRadius: 30,

    marginBottom: 10,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop:10,

    marginLeft: 10,

    backgroundColor: 'white'

  },

  disabled: {

    color: 'grey'

  },

  greenBack:{

    backgroundColor: '#87cc4a',

  },

  whiteBack: {

    backgroundColor: '#fff',

  },

  redBack: {

    backgroundColor: '#d75f6b',

  },

  buttonText: {

    color: '#fff',

    textAlign: 'center',

    alignItems: 'center',

    justifyContent: 'center',

    fontFamily: 'bebas-neue-bold',

    fontSize: 50,

    paddingTop: 5

  },

  smallButtonText: {

    color: '#fff',

    textAlign: 'center',

    alignItems: 'center',

    justifyContent: 'center',

    fontFamily: 'bebas-neue-bold',

    fontSize: 25

  },

  controlButtonText: {
    
    color: '#fff',

    textAlign: 'center',

    alignItems: 'center',

    justifyContent: 'center',

    fontFamily: 'bebas-neue-bold',

    fontSize: 12

  },

  avatar: {

    paddingTop: Constants.statusBarHeight,

    flex: 2,

    width:width

  },

  miniAvatar: {

    height:height/8,

    width:width/4,   
    
    },

  sizeLarge: {

    width:width /2,

    height:null,

  },

  miniElement: {
    
    position: 'absolute',
    
    top: 0,
    
    right: 0,
    
    bottom: 0,
    
    left: 0,
    
    resizeMode: 'contain',    

  },

  element: {
      
    position: 'absolute',
    
    top: 0,
    
    right: 0,
    
    bottom: 0,
    
    left: (width /2) - (width / 4),
    
    resizeMode: 'contain',    
  
  },
  
  controls: {
  
    flex:1,
  
    justifyContent:'center'
  
  },
  
  controlButton: {
  
    flex:1,
  
    width: width*.25,
  
    borderRadius: 20,
  
    marginBottom: 5,
  
    marginRight: 5,
  
    flexDirection: 'row',
  
    alignItems: 'center',
  
    justifyContent: 'center',
    
    },

  buttonRow: {

    flex:1,

    flexDirection:'row'

  },

  statsBox: {

    width: width*.8,

    backgroundColor: 'white',

    borderRadius: 30,

    marginTop: 10,

    marginBottom: 10,

    alignItems: 'center',
  
    justifyContent: 'center',

    },

  statsHeading: {

    color: '#000',
    
    textAlign: 'center',

    alignItems: 'center',

    justifyContent: 'center',

    fontFamily: 'bebas-neue-bold',

    fontSize: 70

  },

  statsText: {

    color: '#000',
    
    textAlign: 'center',

    alignItems: 'center',

    justifyContent: 'center',

    fontFamily: 'bebas-neue-bold',

    fontSize: 30

  },

  statsLabel: {
    
    color: '#d75f6b',

    textAlign: 'center',

    alignItems: 'center',

    justifyContent: 'center',

    fontFamily: 'bebas-neue-bold',

    fontSize: 50,

    paddingTop: 5

    }


  });