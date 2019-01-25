import React, {Component} from 'react';

import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from '../styles';


export class Avatar extends React.Component {

    constructor(props) {
        
        super(props);
        
        this.state = { 
            face: this.props.face,
            eyes: this.props.eyes,
            hair: this.props.hair,
            glasses: this.props.glasses,
            school: this.props.school,
            nose: 1,
            hairColor: "orange"
            }
        }

    state = {};

    componentDidMount() {

        
    }

    componentWillReceiveProps(nextProps) {
        
       if(nextProps.face !== this.props.face) {
              
                this.setState({face: nextProps.face});
            
            }
        
        if(nextProps.eyes !== this.props.eyes) {
            
                this.setState({eyes: nextProps.eyes});
            
            }

        if(nextProps.hair !== this.props.hair) {
            
                this.setState({hair: nextProps.hair});
            
            }
        
        if(nextProps.glasses !== this.props.glasses) {
            
                this.setState({glasses: nextProps.glasses});
            
            }
        
        if(nextProps.school !== this.props.school) {
            
                this.setState({school: nextProps.school});
            
            }
            
        }


    render() {
        
         return (
                <View style={styles.container}>

                    <View style={styles.avatar}>
                  
                        <Image source={{uri: 'http://sialens.sbectol.com/images/uniforms/' + this.state.school + '.png'}} style={[styles.element,styles.sizeLarge]} />

                        <Image source={{uri: 'http://sialens.sbectol.com/images/faces/' + this.state.face + '.png'}} style={[styles.element,styles.sizeLarge]}/>

                        <Image source={{uri: 'http://sialens.sbectol.com/images/eyes/' + this.state.eyes + '.png'}} style={[styles.element,styles.sizeLarge]} />

                        <Image source={{uri: 'http://sialens.sbectol.com/images/glasses/' + this.state.glasses + '.png?this=' + Math.random()}} style={[styles.element,styles.sizeLarge]} />            

                        <Image source={{uri: 'http://sialens.sbectol.com/images/hair/' + this.state.hair + '.png?this=' + Math.random()}} style={[styles.element,styles.sizeLarge]} />
                                                
                        </View>

                   </View>

            
               
         )
    }
}



