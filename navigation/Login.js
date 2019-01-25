import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { BarCodeScanner, Permissions} from 'expo';
import styles from '../styles';

export class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {gotProfile: false}
        }
    
   
      state = {
        hasCameraPermission: null,
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
        this.props.navigation.navigate('Profile', {profile: $code });
      };

      _goHome = () => {
                
        this.props.navigation.navigate('Home', { music: true});
        
        }
    
      render() {
        return (
          <View style={styles.container}>
          <TouchableOpacity onPress={() => this._goHome()}>
            
            <View style={styles.iconBack}>
    
                <Text onPress={this._goHome} style={styles.awesomeIcons}>{'\uf015'}</Text>
   
                </View>

            </TouchableOpacity>
            {this.state.gotProfile ?
              <Text>Profile Loaded</Text> :
            this.state.hasCameraPermission === null ?
              <Text>Requesting for camera permission</Text> :
              this.state.hasCameraPermission === false ?
                <Text>Camera permission is not granted</Text> :
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{ height: 200, width: 200 }}
                />
            }
          </View>
        );
      }
    }