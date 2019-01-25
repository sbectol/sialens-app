import React, {Component} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';

import {Audio} from 'expo';

import styles from '../styles';

export class QuestionScreen extends React.Component {

  state = {};

  static navigationOptions = ({ navigation }) => ({

    header: null,

    });

  componentDidMount() {

    Audio.setAudioModeAsync({

      allowsRecordingIOS: false,

      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,

      playsInSilentModeIOS: true,

      shouldDuckAndroid: true,

      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX

      });
      
      const { state } = this.props.navigation;
     
      if(state.params.action == "getQuiz") {

        sgor = 0
        
        this._fetchQuizAsync();
        
        this.setState({qno: state.params.qno + 1})
      
      } else {
        
        this.setState({ids: state.params.ids})
        
        this.setState({qno: state.params.qno + 1})
        
        this._fetchQuestionAsync(state.params.ids,state.params.qno);
      
      }
      
    }
  
  _fetchQuizAsync = async () => {
    
    try {
    
      console.log("Loading ids");
    
      const URL = 'http://sialens.sbectol.com/questionsids/'
    
      let response = await fetch(URL);
    
      let ids = await response.json();
    
      console.log(ids[0].id);
    
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
    
    this.props.navigation.navigate('Question', {action:"nextQuestion", ids:this.state.ids, qno:this.state.qno });
    
    }
  
  goResults () {
  
    this.props.navigation.navigate('Scores', {action:"nextQuestion", ids:this.state.ids, qno:this.state.qno });
  
    }
  
  render() {
    
    return (
      
      <QuizQuestion 

        questionNumber = {this.state.qno}

        goNextFunction = {this.goNext.bind(this)}

        goResultsFunction = {this.goResults.bind(this)}

        showNextButton = '0'

        showResultsButton = '1'

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
    
        optionAnswered: false
      
        }
      
      }
  
    optionPressed(e) {

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
  
          <Question questionText={this.props.question} />
  
            <Option pressedFunction = {this.optionPressed.bind(this)} optionLabel="A" optionCorrect = {this.props.correct1} optionText ={this.props.option1} optionAnswered={this.state.optionAnswered} />
  
            <Option pressedFunction = {this.optionPressed.bind(this)} optionLabel="B" optionCorrect = {this.props.correct2} optionText ={this.props.option2} optionAnswered={this.state.optionAnswered} />
            
            <Option pressedFunction = {this.optionPressed.bind(this)} optionLabel="C" optionCorrect = {this.props.correct3} optionText ={this.props.option3} optionAnswered={this.state.optionAnswered} />  
          
            <Option pressedFunction = {this.optionPressed.bind(this)} optionLabel="Ch"  optionCorrect = {this.props.correct4} optionText ={this.props.option4} optionAnswered={this.state.optionAnswered} />
            
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

      console.log("rendering question")
      
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
  
  class Option extends React.Component {

    constructor(props) {
      
      super(props);

      this.state = {

        optionCorrect: this.props.optionCorrect, 
        
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
   
      this.setState({optionCorrect: e});
    
      this.setState({changed:true})
    
      backColour = this.state.optionCorrect ? '#87cc4a' : '#d75f6b'
      
      this.props.pressedFunction(this.state.optionCorrect)
   
    }

    render() {
      console.log("Drawing Button")
      console.log(this.props.optionAnswered)
        
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
