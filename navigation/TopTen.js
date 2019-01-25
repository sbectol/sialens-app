import React, {Component} from 'react';

import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import styles from '../styles';


export class TopTen extends React.Component {

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

        
            const URL = 'http://sialens.sbectol.com/scores/highscores/' 
            
            let response = await fetch(URL);
            
            let result = await response.json();

            this.setState({result: result})

            theScores = result.map(scores => (
                <View style={[styles.optionButton,styles.greenBack]} key={scores.profile_id}>

                    <View style={styles.optionTextHolder}>

                        <View style={styles.miniAvatar}>
                        
                            <Image source={{uri: 'http://sialens.sbectol.com/images/avatars/thumbs/' + scores.profile_id + '.png?this=' + Math.random()}} style={styles.miniElement} />
                    
                        </View>
                    
                    </View>
                    
                    <View style={styles.optionTextHolder}>
                    
                        <Text style={styles.buttonText}> { Math.floor(scores.rating * 100)}</Text>
                    
                    </View>
                
                </View>
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

                <Text style={styles.buttonText}>10 Sgôr Uchaf</Text>

                </View>

                </View>

                <ScrollView>

                {this.state.theScores}
                    
                    </ScrollView>

              </View>
            );
          }


       

}

