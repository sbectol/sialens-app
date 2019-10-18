import React, {Component} from 'react';
import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import styles from '../styles';


export class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {gotProfile: false}

        }
    
   
      state = {
        hasCameraPermission: null,
        scanned: false,
        noProfile: false
      };
    
      static navigationOptions = {
        header: null
      };
    
      componentDidMount() {

        this._requestCameraPermission();
      }
    
      _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermission: status === 'granted',
        });
      };
    
      _handleBarCodeRead = data => {
          this.setState({gotProfile:true})
         $code = data['data'];
         ids = $code.split('-')
         id = ids[1]
          school = ids[2]
          console.log("Id is " + id)
        this.props.navigation.navigate('Profile', {profile: $code });
      };

      _goHome = () => {
                
        this.props.navigation.navigate('Home', { music: true});
        
        }
    
        
      render() {
        const { hasCameraPermission, scanned, noProfile } = this.state;

        if (hasCameraPermission === null) {
          return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        }
        return (
          // <View style={styles.container}>
        
          //   {this.state.gotProfile ?
          //     <Text>Profile Loaded</Text> :
          //   this.state.hasCameraPermission === null ?
          //     <Text>Requesting for camera permission</Text> :
          //     this.state.hasCameraPermission === false ?
          //       <Text>Camera permission is not granted</Text> :
          //       <BarCodeScanner
          //         onBarCodeRead={this._handleBarCodeRead}
          //         style={{ height: 200, width: 200 }}
          //       />
          //   }
          // </View>
         
            <View style={styles.container}>
                   <TouchableOpacity onPress={() => this._goHome()}>
            
              <View style={styles.iconBack}>
      
                   <Text onPress={this._goHome} style={styles.awesomeIcons}>{'\uf015'}</Text>
     
                  </View>
  
             </TouchableOpacity>
              <BarCodeScanner
                onBarCodeScanned={noProfile ? undefined : this.handleBarCodeScanned}
                style={{height: 200, width: 200}}
              />
      
              {/* {scanned && (
                <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
              )} */}

              {noProfile && (
               
                 <TouchableOpacity onPress={() => this.setState({ noProfile: false })}>
                   <Text style={styles.smallButtonText}>Cod ddim yn dilys</Text>
                 <View style={[styles.loginButton, styles.greenBack]}>
              
                   <Text style={styles.smallButtonText}>Trio eto</Text>
   
                   </View>
   
                 </TouchableOpacity>
              )}
            </View>
          );
        }
        handleBarCodeScanned = async ({ type, data }) => {
          this.setState({ scanned: true });
          // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
          $code = data;
          console.log($code);
          ids = $code.split('-')
          id = ids[1]
          school = ids[2]
          if( id !== undefined){
          const URL = 'http://sialens.sbectol.com/proffil/get/' + id
          console.log(URL)
          let response = await fetch(URL);
          console.log(response)
          let result = await response.json();
            
          console.log("Result is " + result.found)
          if(result.found == true) {
              console.log("Has Profile")
              console.log("Id is " + id)
              this.setState({noProfile:true})
              this.props.navigation.navigate('Profile', {profile: $code });
            } else {
              console.log("No Profile")
              console.log("Id is " + id)
              this.setState({noProfile:true})
            }
          } else {
            console.log("What?")
            this.setState({noProfile:true})
          }
        };
      }
  