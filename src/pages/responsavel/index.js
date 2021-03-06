import React, { Component } from 'react';
import { View, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import styles from './style';
import iconResponsavel from '../../img/iconResponsavel/minhaFoto.png';
import { Button, Text } from 'react-native-paper';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: this.props.navigation.state.params.nome,
      locAluno: {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
      region: {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      },
      locResponsavel: {
        coords: {
          latitude: 0,
          longitude: 0,
        },

        latitude: 0,
        longitude: 0,
      },
    };

    this.getPrimaryLocation();
    this.getSecondLocation();
  }

  watchLocation() {
    Geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );
  }

  getPrimaryLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        const initialPosition2 = JSON.parse(initialPosition);

        const locationFirst = {
          coords: {
            latitude: 37.7785951,
            longitude: -122.3914585,
          },
        };

        this.setState({ locResponsavel: locationFirst });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getSecondLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const secondPosition = JSON.stringify(position);
        const secondPosition2 = JSON.parse(secondPosition);

        this.setState({ locAluno: secondPosition2 });
        // this.setState({locAluno: loc2});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  convertTime(e) {
    let data = new Date(e).toLocaleDateString('pt-PTBR');
    let time = new Date(e).toLocaleTimeString('pt-PTBR');

    let dtFim = data + '   ' + time;

    return dtFim;
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          showsMyLocationButton={true}
          showsUserLocation={true}
          title={this.state.nome}
          userLocationAnnotationTitle={this.convertTime(
            this.state.locAluno.timestamp,
          )} // O título da anotação para a localização atual do usuário. Isso só funciona se showsUserLocationfor verdade.
          followsUserLocation={false}
          loadingEnabled={true}
          scrollEnabled={true}
          showsCompass={true}
          minZoomLevel={0}
          maxZoomLevel={20}
          zoomTapEnabled={true}
          enableHighAccuracy={true}
          region={{
            latitude: this.state.locResponsavel.coords.latitude,
            longitude: this.state.locResponsavel.coords.longitude,
            latitudeDelta: 0.551,
            longitudeDelta: 0.555,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.locResponsavel.coords.latitude,
              longitude: this.state.locResponsavel.coords.longitude,
            }}
            title={this.state.nome}
            description={this.convertTime(this.state.locAluno.timestamp)}>
            <View>
              <Image
                style={{ borderRadius: 50, width: 30, height: 30 }}
                source={iconResponsavel}
              />
            </View>
          </Marker>
        </MapView>
        <View style={styles.btnView}>
          <Button
            icon="bus"
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('LoginResponsavel')}
          />
        </View>
      </View>
    );
  }
}
