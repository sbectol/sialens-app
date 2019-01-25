import React, {Component} from 'react';

import { Image, Text, View, TouchableOpacity} from 'react-native';

import styles from '../styles';

import {Avatar} from './Avatar';

export class ProfileScreen extends React.Component {

    state = {};

    static navigationOptions = ({ navigation }) => ({

        header: null,

    });
  
    componentDidMount() {
        
        const { state } = this.props.navigation;
      
        this.setState({profile: state.params.profile})

        this.setState({avatarLoaded: false})
        
        this._fetchAvatarAsync(state.params.profile);

        }

    _fetchAvatarAsync = async (e) => {
        try {

            console.log("Loading") 
            
            profile = e;

            console.log("***** PROFILE ***** " + profile)
            
            ids = e.split('-')
            
            id = ids[1]

            school = ids[2]
            
            console.log("id is " + id)
            
            const URL = 'http://sialens.sbectol.com/avatar/get/' + id
            
            let response = await fetch(URL);
            
            let result = await response.json();
            
            console.log("Restult is " + result.found)

            if(result.found==false) {

                console.log("Didn't find an avatar")

            }

            this.setState({school: school})

            // Need to set this in the login page
            
            profile_id = id

            // ****
            
            this._createAvatar(result,id,school)
            
            this.setState({ result});
       
            } catch (e) {
            
                this.setState({ result: e.message });
            
                }
            };

    _createAvatar (result,id,school) {

       
        console.log("This is the result, the hair is" + result.hair + " id is " + id)

        this.setState({hair: result.hair})
        this.setState({eyes: result.eyes})
        this.setState({glasses: result.glasses})
        this.setState({face: result.face})
        this.setState({nose: result.nose})
        this.setState({avatarLoaded: true})
        this.setState({id: id})
        

        if (result.found==false) {

            this.props.navigation.navigate('EditAvatar', {id: profile_id, school: school, action: "New" });

            }
    
        }
  
    _editAvatar = () => {

        this.props.navigation.navigate('EditAvatar', {id:profile_id, school: this.state.school, face:this.state.face, eyes: this.state.eyes, hair: this.state.hair, glasses: this.state.glasses,action: "Edit"});
    
    }
    
    _playGame = () => {

        sgor=0;
        
        this.props.navigation.navigate('Question', { action:"getQuiz",ids: '1',qno: 0 });
        
    } 

    _goHome = () => {
        
        this.props.navigation.navigate('Home', { music: true});
        
        }
    
    render() {
      console.log("***" + profile_id + "***");
      return(
        <View style={styles.container}>

            <TouchableOpacity onPress={() => this._goHome()}>
            
                <View style={styles.iconBack}>
            
                    <Text onPress={this._goHome} style={styles.awesomeIcons}>{'\uf015'}</Text>
           
                    </View>

                </TouchableOpacity>



                {this.state.avatarLoaded ?  (<View style={styles.avatar}>

                    <Image source={{uri: 'http://sialens.sbectol.com/images/avatars/' + this.state.id + '.png?this=' + Math.random()}} style={[styles.element,styles.sizeLarge]} />

                </View> ) : null}
            
            {/* {this.state.avatarLoaded ? ( <Avatar hair={this.state.hair} eyes={this.state.eyes} nose={this.state.nose} face={this.state.face} glasses={this.state.glasses} school={this.state.school} />  ) : null }   */}
       
            <TouchableOpacity onPress={() => this._editAvatar()}>
            
                <View style={[styles.nextButton, styles.greenBack]}>
            
                    {this.state.profile ? (  <Text style={styles.optionText}>Newid Avatar</Text> ): null}



                </View>

                </TouchableOpacity>
            
            <TouchableOpacity onPress={() => this._playGame()}>
            
                <View style={[styles.nextButton, styles.greenBack]}>
            
                    <Text style={styles.optionText}>Chwarae!</Text>

                </View>

                </TouchableOpacity>
            </View>
      )
    }
}