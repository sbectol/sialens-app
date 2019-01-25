import React, {Component} from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from '../styles';

import {Avatar} from './Avatar';



export class EditAvatarScreen extends React.Component {

    constructor(props) {
        
        super(props);
        
        this.state = {
            id: 4,
            face: 6,
            eyes: 6,
            hair: 1,
            glasses: 1,
            school: 6,
            nose: 1,
            avatarLoaded: true
            }
        }

    state = {};

    static navigationOptions = ({ navigation }) => ({
        header: null,
        });

    componentDidMount() {
        
        const { state } = this.props.navigation;
        
        if (state.params.action == "Edit") {
            
            this.setState({face: state.params.face})
            this.setState({eyes: state.params.eyes})
            this.setState({hair: state.params.hair})
            this.setState({glasses: state.params.glasses})
            this.setState({action: "Edit"})
            
        } 
        

        console.log("This is the nav param " + state.params.id)
        
        this.setState({school: state.params.school})

        this.setState({id: state.params.id})
      
        console.log("This is the id " + this.state.id)
        
    }

    save = async (id,face,glasses,hair,eyes,school,nose)  =>{
        
            try {
    
                console.log("Saving Avatar")
                
                const URL = 'http://sialens.sbectol.com/avatar/store'
                
                let response = await fetch(URL,
                    {
                    method:"POST",
                    
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                    
                      body: JSON.stringify({
                        face: face,
                        eyes: eyes,
                        glasses: glasses,
                        school: school,
                        hair: hair,
                        nose: nose,
                        profile_id: id
                    })
                }
            );
                
                let result = await response.json();
                
                console.log("This is the result " + result.hair)

                this.props.navigation.navigate('Home', { music: true})
                
                this.setState({ result});
           
                } catch (e) {
                
                    this.setState({ result: e.message });
                
                    }
                };
        

    changeFeature(e) {
       
        switch(e){

            case 'faceUp':

            if(this.state.face < 14) { this.setState({face: this.state.face+1})}

            break;
            
            case 'faceDown':

            if(!this.state.face == 0) { this.setState({face: this.state.face-1})}

            break;
            
            case 'hairUp':
            
            if(this.state.hair < 85) {

                this.setState({hair: this.state.hair+1})
            
            } else {

                this.setState({hair: 0})

            }
        
            break;

            case 'hairDown':
            
            if(!this.state.hair == 0) {
                
                this.setState({hair: this.state.hair-1})
            
            } else {

                this.setState({hair: 85})
            
            }
            
            break;
            
            case 'eyesUp':
            
            if(this.state.eyes < 15) {this.setState({eyes: this.state.eyes+1})}

            break;
            
            case 'eyesDown':
            
            if(!this.state.eyes == 0) {this.setState({eyes: this.state.eyes-1})}

            break;
            
            case 'glassesUp':
            
            if(this.state.glasses < 8) {
                
                this.setState({glasses: this.state.glasses+1})
            
            } else  {

                this.setState({glasses: 0})
            }
            
            break;

            case 'glassesDown':

            if(!this.state.glasses == 0) {
                
                this.setState({glasses: this.state.glasses-1})
            
            } else {

                this.setState({glasses: 8})

            }

            break;

            this.setState({avatarLoaded: true})

        } 
    }


    render() {

        console.log("School is " + this.state.school)
        
         return (
                <View style={styles.container}>

                    { this.state.avatarLoaded ? ( <Avatar hair={this.state.hair} eyes={this.state.eyes} nose={this.state.nose} face={this.state.face} glasses={this.state.glasses} school={this.state.school} />  ) : null } 

                    <View style={styles.controls}>

                        <View style={styles.buttonRow}>

                        <TouchableOpacity onPress={() => this.changeFeature("faceDown")}>

                            <View style={[styles.controlButton, styles.greenBack]}>

                                <Text style={styles.smallAwesomeIcons}>{'\uf060'}</Text>
                            
                                <Text style={styles.controlButtonText}>Gwyneb</Text>

                                </View>

                            </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.changeFeature("faceUp")}>
                            
                            <View style={[styles.controlButton, styles.greenBack]}>
                            
                                <Text style={styles.controlButtonText}>Gwyneb</Text>

                                <Text style={styles.smallAwesomeIcons}>{'\uf061'}</Text>
                            
                                </View>
                            
                            </TouchableOpacity>
                        
                        </View>

                        <View style={styles.buttonRow}>

                        <TouchableOpacity onPress={() => this.changeFeature("glassesDown")}>

                            <View style={[styles.controlButton, styles.greenBack]}>

                                <Text style={styles.smallAwesomeIcons}>{'\uf060'}</Text>
                            
                                <Text style={styles.controlButtonText}>Sbectol</Text>

                                </View>

                            </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.changeFeature("glassesUp")}>
                            
                            <View style={[styles.controlButton, styles.greenBack]}>
                            
                                <Text style={styles.controlButtonText}>Sbectol</Text>

                                <Text style={styles.smallAwesomeIcons}>{'\uf061'}</Text>
                            
                                </View>
                            
                            </TouchableOpacity>
                        
                        </View>

                        <View style={styles.buttonRow}>
                        
                            <TouchableOpacity onPress={() => this.changeFeature("hairDown")}>
    
                                <View style={[styles.controlButton, styles.greenBack]}>
    
                                    <Text style={styles.smallAwesomeIcons}>{'\uf060'}</Text>
                                
                                    <Text style={styles.controlButtonText}>Gwallt</Text>
    
                                    </View>
    
                                </TouchableOpacity>
    
                            <TouchableOpacity onPress={() => this.changeFeature("hairUp")}>
     
                                <View style={[styles.controlButton, styles.greenBack]}>
                                
                                    <Text style={styles.controlButtonText}>Gwallt</Text>
                                    
                                    <Text style={styles.smallAwesomeIcons}>{'\uf061'}</Text>
                                
                                    </View>
                                
                                </TouchableOpacity>
                            
                            </View>

                            <View style={styles.buttonRow}>

                        <TouchableOpacity onPress={() => this.changeFeature("eyesDown")}>

                            <View style={[styles.controlButton, styles.greenBack]}>

                                <Text style={styles.smallAwesomeIcons}>{'\uf060'}</Text>
                            
                                <Text style={styles.controlButtonText}>Llygaid</Text>

                                </View>

                            </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.changeFeature("eyesUp")}>
                            
                            <View style={[styles.controlButton, styles.greenBack]}>
                            
                                <Text style={styles.controlButtonText}>Llygaid</Text>
                                
                                <Text style={styles.smallAwesomeIcons}>{'\uf061'}</Text>
                            
                                </View>
                            
                            </TouchableOpacity>
                        
                        </View>

                        
                    
                    </View>

                    <TouchableOpacity onPress={() => this.save(this.state.id, this.state.face, this.state.glasses, this.state.hair, this.state.eyes, this.state.school,1)}>
                            
                            <View style={[styles.playButton, styles.greenBack]}>
                            
                                <Text style={styles.controlButtonText}>Cadw</Text>           
                            
                                </View>
                            
                            </TouchableOpacity>
                
                </View>

            
               
         )
    }
}



