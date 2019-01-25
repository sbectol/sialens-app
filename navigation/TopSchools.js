import React, {Component} from 'react';

import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import styles from '../styles';


export class TopSchools extends React.Component {

    state = {};
    
    static navigationOptions = ({ navigation }) => ({
    
        header: null,
    
    });


    componentDidMount() {
        
        const { state } = this.props.navigation;
        
        this._getHighScores();

        }


    _getHighScores = async () => {
        try {

        
            const URL = 'http://sialens.sbectol.com/scores/topschools/' 
            
            let response = await fetch(URL);
            
            let result = await response.json();

            this.setState({result: result})

            theScores = result.map(scores => (


                // <TouchableOpacity onPress={() => this._goSchoolStats(scores.school_id)} key={scores.school_id}>

                
                <View style={[styles.optionButton,styles.greenBack]}  key={scores.school_id} >

                    
                    <View style={styles.optionTextHolder}>
                    
                        <Text style={styles.smallButtonText}> {scores.name} - { Math.floor(scores.rating * 100)}</Text>
                    
                    </View>
                
                </View>

                // </TouchableOpacity>
            ))

            this.setState({theScores: theScores})
       
            } catch (e) {
            
                this.setState({ result: e.message });
            
                }
            };



            _goHome = () => {
                
                this.props.navigation.navigate('Home', { music: true});
                
                }
            
            _goHighScores= () => {
            
                this.props.navigation.navigate('HighScores', { music: true});
                
                }

            _goSchoolStats= (school_id) => {
        
                this.props.navigation.navigate('SchoolStats', { action:"nextQuestion", ids:"25", qno:this.state.qno });
                
                }



        render() {
            return (
              <View style={styles.container}>

              <View style={styles.topRow}>

                    <TouchableOpacity onPress={() => this._goHome()}>
                
                        <View style={styles.iconBack}>
                
                            <Text onPress={this._goHome} style={styles.awesomeIcons}>{'\uf015'}</Text>
            
                            </View>

                        </TouchableOpacity>

                    <TouchableOpacity onPress={() => this._goHighScores()}>
                
                        <View style={styles.iconBack}>
            
                        <Text style={styles.awesomeIcons}>{'\uf091'}</Text>
            
                        </View>

                        </TouchableOpacity>

                </View>

                <View style={[styles.playButton,styles.greenBack]} >

                <View style={styles.optionTextHolder}>

                <Text style={styles.buttonText}>10 Ysgol Uchaf</Text>

                </View>

                </View>

                <ScrollView>

                {this.state.theScores}
                    
                    </ScrollView>

              </View>
            );
          }


       

}

