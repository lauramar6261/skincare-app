import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { Header } from 'react-native-elements';

export default class EditProduct extends Component {

  constructor(props) {
     super(props);
     this.state = {
       text:"",
       isLoading: true
     };
   }

  deleteItemAPIcall(upc) {
    fetch(`https://productsbarcode.herokuapp.com/products/${upc}`, {
      method: 'DELETE',
    });
    this.props.navigation.navigate('Main')

  }
  alertScreen(upc) {
    Alert.alert(
      'Delete Product',
      'Would you really like to delete product?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.deleteItemAPIcall(upc)},
      ],
      { cancelable: false }
   );
  }
  componentDidMount(){
    const { navigation } = this.props;
    const upc = navigation.getParam('upc', 'NO-UPC');
    return fetch(`https://productsbarcode.herokuapp.com/products/${upc}`)
    .then((response) => response.json())
    .then((json) => {

      this.setState({
        isLoading: false,
        image: json.image,
        name: json.name,
        brand: json.brand,
        description: json.description,
        upc: json.upc,
        color: json.color,
        date: json.date
      },function(){

      });
    })
    .catch((error) =>{
      this.setState({
        errors: ` ${error.message}`
      });
     });
  }

  render() {
    const { navigation } = this.props;
    const upc = navigation.getParam('upc', 'NO-UPC');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(`${this.state.date}`)
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'arrow-back', color: '#fff',onPress: () => this.props.navigation.navigate('Main') }}
        centerComponent={{ text: 'Product Details', style: { color: '#fff' } }}
        rightComponent={{ icon: 'delete', color: '#fff',onPress: () => this.alertScreen(upc)}}
        containerStyle={{
           backgroundColor: '#000000',
         }}
      />
      <Image source={{uri: `${this.state.image}`}}
      resizeMode="contain" />
      <Text style={styles.body}> {date.toLocaleDateString("en-US", options)} </Text>
      <Text style={styles.title}> {this.state.name} </Text>
      <Text style={styles.body}> {this.state.description} </Text>
      <Text style={styles.body}> {this.state.color} </Text>
      <Text style={styles.body}> {this.state.brand} </Text>
      <Text style={styles.upc}> {this.state.upc} </Text>
      <Text style={styles.body}> {this.state.image} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
    alignItems: 'center',
  },
  upc: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#777'
  },
  body: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    color: '#777'
  },
});
