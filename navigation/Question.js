import React, {Component} from 'react';

import {View, Text, TouchableOpacity, BackHandler} from 'react-native';

import {Audio} from 'expo-av';

import styles from '../styles';

youWannaHandleThisPress = true;

export class QuestionScreen extends React.Component {

  state = {};

  static navigationOptions = ({ navigation }) => ({

    header: null,

    });

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);

    Audio.setAudioModeAsync({

      allowsRecordingIOS: false,

      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,

      playsInSilentModeIOS: true,

      shouldDuckAndroid: true,

      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX

      });
      
      const { state } = this.props.navigation;

      console.log (this.props.navigation.action)
     
      if(state.params.action == "getQuiz") {

        sgor = 0

        console.log('Fetching id\'s')
        
        this._fetchQuizAsync();
        
        this.setState({qno: state.params.qno + 1})
      
      } else {

        console.log('Getting a Question')
        
        this.setState({ids: state.params.ids})
        
        this.setState({qno: state.params.qno + 1})
        
        this._fetchQuestionAsync(state.params.ids,state.params.qno);
      
      }
      
    }
  
  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    
  }
  
  onBackButtonPressAndroid = () => {
    if (youWannaHandleThisPress) {
      console.log("********PRESSED BACK********")
      this.props.navigation.navigate('Home', { music: true})
      return true;

    } else {

      return false;

    }

  };

  _fetchQuizAsync = async () => {
    
    try {
    
      console.log("Loading ids");
    
      const URL = 'http://sialens.sbectol.com/questionsids/'
    
      let response = await fetch(URL);
    
      let ids = await response.json();
    
      console.log("this is the first id " + ids[0].id);
    
      this.setState({ ids});
    
      this._fetchQuestionAsync(ids,0);
      
    } catch (e) {

      this.setState({ ids: e.message });
      
      }
    
    };

  _fetchQuestionAsync = async (e,i) => {
    try {
    
      console.log("Loading")
    
      console.log(e[i].id)
    
      const URL = 'http://sialens.sbectol.com/singleQuestion/' + e[i].id
    
      let response = await fetch(URL);
    
      let result = await response.json();
    
      this.setState({ result});
  
    } catch (e) {
    
      this.setState({ result: e.message });
    
      }
    
    };
  
  goNext () {
    
    this.props.navigation.navigate({key: Math.random () * 10000, routeName:'Question', params:{action:"nextQuestion", ids:this.state.ids, qno:this.state.qno }});
    
    }
  
  goResults () {
  
    this.props.navigation.navigate('Scores', {action:"nextQuestion", ids:this.state.ids, qno:this.state.qno });
  
    }

  goHome () {
    
    this.props.navigation.navigate('Home', { music: true})
  
    }
  
  render() {
    
    return (
      
      <QuizQuestion 

        questionNumber = {this.state.qno}

        goNextFunction = {this.goNext.bind(this)}

        goResultsFunction = {this.goResults.bind(this)}

        goHomeFunction = {this.goHome.bind(this)}

        showNextButton = {false}

        showResultsButton = {false}

        question= {this.state.result ? this.state.result.question : null} 

        option1 = {this.state.result ? this.state.result.option[0].body : null}

        option2 = {this.state.result ? this.state.result.option[1].body : null}

        option3 = {this.state.result ? this.state.result.option[2].body : null}

        option4 = {this.state.result ? this.state.result.option[3].body : null}

        correct1 = {this.state.result ? this.state.result.option[0].correct : null}

        correct2 = {this.state.result ? this.state.result.option[1].correct : null}

        correct3 = {this.state.result ? this.state.result.option[2].correct : null}

        correct4 = {this.state.result ? this.state.result.option[3].correct : null} >

        </QuizQuestion>

      );

    }  

  }
  
  class QuizQuestion extends React.Component {

    constructor(props) {

      super(props);

      this.state = {

        showNextButton: this.props.showNextButton,

        showResultsButton: this.props.showResultsButton,
    
        optionAnswered: false,

         fontLoaded: true 
      
        }
      
      }

     
              
            
        
      
  
    optionPressed(e,optionNumber) {
      
      console.log("optionNumber is " + optionNumber)

      if(e) {
      
        sgor = sgor + 1
        
        this.playCorrect();
      
      } else {

        this.playIncorrect();

      }
      
      if (this.props.questionNumber < 10 ) {
      
        this.setState({showNextButton: true})
        // this.props.goNextFunction()
      
        } else {
        
        this.setState({showResultsButton: true})
        // this.props.goResultsFunction()
        
        }

      this.setState({optionAnswered: true})
      
      }

    playCorrect  = async () => {

      const mp3 = require('../assets/sounds/correct.mp3');
      
      const { sound } = await Audio.Sound.create(mp3, { shouldPlay: true, isLooping: false, volume: 0.6 });
            
      this.sound = sound;

    }

    playIncorrect  = async () => {

      const mp3 = require('../assets/sounds/wrong.mp3');
      
      const { sound } = await Audio.Sound.create(mp3, { shouldPlay: true, isLooping: false, volume: 0.6 });
            
      this.sound = sound;
    
    }

  
    render() {

        return (

          <View  style={styles.container}>

            <View style={styles.topRow}>

              <View style={styles.questionCounter}>
          
                <Text style={styles.questionCounterText}>{this.props.questionNumber} /10</Text>
          
              </View>
            
              <TouchableOpacity onPress={() => this.props.goHomeFunction()}>
            
                <View style={styles.iconBack}>
            
                  <Text onPress={this._goHome} style={styles.awesomeIcons}>{'\uf015'}</Text>
           
                  </View>

                </TouchableOpacity>

           </View>
    
            <Question questionText={this.props.question} />

            <Options pressedFunction = {this.optionPressed.bind(this)} 
            optionCorrect1 = {this.props.correct1} 
            optionText1 ={this.props.option1}
            optionCorrect2 = {this.props.correct2} 
            optionText2 ={this.props.option2}
            optionCorrect3 = {this.props.correct3} 
            optionText3 ={this.props.option3}
            optionCorrect4 = {this.props.correct4} 
            optionText4 ={this.props.option4}
            optionAnswered={this.state.optionAnswered} />
  
            <TouchableOpacity onPress={() => this.props.goNextFunction()}>
            
              <NextQuestion showNextButton={this.state.showNextButton} buttonText="Nesa" />
            
              </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this.props.goResultsFunction()}>
            
              <ResultsButton showResultsButton={this.state.showResultsButton} buttonText="Canlyniadau" />
            
              </TouchableOpacity>
  
            </View>
              
              )

        }

      }

  class Question extends React.Component {

  
    
    render() {
      
      return (
      
      <View style={styles.questionBack}>
        
        <Text style={styles.questionText}>
          
          {this.props.questionText}
          
          </Text>
          
          </View>
        
        )
      
      }
    
    }
  
  class ResultsButton extends React.Component {

    constructor(props) {

      super(props);

      this.state = {showResultsButton:false}

      }

    componentWillReceiveProps(nextProps) {

      if(nextProps.showResultsButton !== this.props.showResultsButton) {
      
          this.setState({showResultsButton: nextProps.showResultsButton});
      
        }
      
      }
   
    render()

      {
        
        if (this.state.showResultsButton) {

          return (
          
            <View style={[styles.nextButton, styles.greenBack ]}>
            
              <Text style={[styles.buttonText]}>
            
                {this.props.buttonText}
              
                </Text>
            
              </View>
                
            )
          } else {

          return null
        
        } 
   
      }
  
    }
  
  class NextQuestion extends React.Component {
    
    constructor(props) {
    
      super(props);
    
      this.state = {showNextButton:false}
    
    }
    
    componentWillReceiveProps(nextProps) {

      if(nextProps.showNextButton !== this.props.showNextButton) {
      
        this.setState({showNextButton: nextProps.showNextButton});
      
      }
    
    }
   
    render()

      {
    
        if (this.state.showNextButton) {
    
          return (
        
          <View style={[styles.nextButton, styles.greenBack ]}>
    
            <Text style={[styles.buttonText]}>
    
            {this.props.buttonText}
    
            </Text>
    
            </View>
               
        )
    
        } else {
      
          return null
      
        }
    
      }
  
    }
  class Options extends React.Component {
          
    constructor (props) {
      super(props);
      
      this.state={
        option1Answered:false,
        option2Answered:false,
        option3Answered:false,
        option4Answered:false,
        
      }
      
      
    }
    
    optionPressed(a, b) {

    console.log(a + " " + b)

    this.props.pressedFunction(a, b)

   
    
    }

    render()  {

      console.log("rendering this" + this.state.option1Answered)
      
      return (

      <View >
      
        <Option optionNumber={1} pressedFunction = {this.optionPressed.bind(this)} optionLabel={"A"} optionCorrect = {this.props.optionCorrect1} optionText ={this.props.optionText1} optionAnswered={this.props.optionAnswered} />

        <Option optionNumber={2} pressedFunction = {this.optionPressed.bind(this)} optionLabel={"B"} optionCorrect = {this.props.optionCorrect2} optionText ={this.props.optionText2} optionAnswered={this.props.optionAnswered} />
        
        <Option optionNumber={3} pressedFunction = {this.optionPressed.bind(this)} optionLabel={"C"} optionCorrect = {this.props.optionCorrect3} optionText ={this.props.optionText3} optionAnswered={this.props.optionAnswered} />  
      
        <Option optionNumber={4} pressedFunction = {this.optionPressed.bind(this)} optionLabel={"Ch"} optionCorrect = {this.props.optionCorrect4} optionText ={this.props.optionText4} optionAnswered={this.props.optionAnswered} />
        
        </View>
      
    )
  
  }
 
}
  
  class Option extends React.Component {

    constructor(props) {
      
      super(props);

      this.state = {

        optionCorrect: this.props.optionCorrect, 

        optionNumber: this.props.optionNumber,
        
        changed: false,
      
      };
      
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      
      if (this.state.changed !== nextState.changed) {
      
        return true;
      
      }
      
      if (this.props.optionText !== nextProps.optionText) {
      
        return true;
      
      }

  
      return false;
    
    }
    
    componentDidMount() {
    
      const backColour = 'white'
    
    }
    
    componentWillReceiveProps(nextProps) {
    
      if(nextProps.optionCorrect !== this.props.optionCorrect) {
    
        this.setState({optionCorrect: nextProps.optionCorrect});
    
          }


    
    }
    
    handleChange(e) {

      if(!this.props.optionAnswered) {
   
        this.setState({optionCorrect: e});
      
        this.setState({changed:true})
      
        backColour = this.state.optionCorrect ? '#87cc4a' : '#d75f6b'
        
        this.props.pressedFunction(this.state.optionCorrect, this.state.optionNumber)

      }
   
    }

    render() {
   
      console.log ("rendering option " + this.props.optionNumber) 

      if(this.state.changed == false) {

          backColour='white'
        
        }

      if(!this.props.optionAnswered) {

        return (

          <TouchableOpacity onPress={() => this.handleChange(this.state.optionCorrect)}>
            
            <View style={[styles.optionButton, {backgroundColor:backColour}]}>
          
              <View style={styles.optionTextHolder}>
            
                <Text style={styles.optionLabel}>{this.props.optionLabel}</Text>
            
                </View>
          
              <View style={styles.optionTextHolder}>
          
                <Text style={styles.optionText}>
            
                  {this.props.optionText}
            
                  </Text>
              
                </View>
          
            </View>
          
          </TouchableOpacity>

        )
    
      } else {

        return (

          <View style={[styles.optionButton, {backgroundColor:backColour}]}>
          
              <View style={styles.optionTextHolder}>
            
                <Text style={styles.optionLabel}>{this.props.optionLabel}</Text>
            
                </View>
          
              <View style={styles.optionTextHolder}>
          
                <Text style={styles.optionText}>
            
                  {this.props.optionText}
            
                  </Text>
              
                </View>
          
            </View>
        
        )
      
      }
    
    }


  
 

  

  }
