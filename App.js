/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Button, StyleSheet, Text, View,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  }

  componenetDidMount() {
    this.initializeGame();
  }

  onTilePress = (row, col) => {
    var currentPlayer = this.state.currentPlayer;


    //Dont allow player Change
    var value = this.state.gameState[row][col];
    if (value != 0) {
      return;
    }

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //switching next Player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 Wins");
      this.initializeGame();
    }
    else if(winner==-1) {
      Alert.alert("Player 2 is winner");
      this.initializeGame();
    }
    else{

    }
  }

  newGame = () => {
      this.initializeGame();
  }

  getWinner = () => {
    var CONST_NUM = 3;
    var arr = this.state.gameState;
    var sum;
    for (var i = 0; i < CONST_NUM; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      }
      else if (sum == -3) {
        return -1;
      }
    }

    for (var i = 0; i < CONST_NUM; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      }
      else if (sum == -3) {
        return -1;
      }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    }
    else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    }
    else if (sum == -3) {
      return -1;
    }
    return 0;
  }




  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    });
  }

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: 
     // return <View style={styles.tileX} > <Text style={{fontFamily: 'Arial', fontSize: 15}}>X</Text></View>;
     return <Text style={styles.tileX}>X</Text>
     case -1: 
     return <Text style={styles.tile0}>O</Text>
     // return <View style={styles.tile0} > <Text style={{fontFamily: 'Arial', fontSize: 15}}>O</Text></View>;
      default:
       return <View />;
    }
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: "row",alignItems:"center" }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]} >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]} >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop:50}}/>
        <TouchableOpacity onPress={()=>this.newGame()}>
          <Text style={{fontSize:19,color:"green"}}>New Game</Text>
        </TouchableOpacity>
        
                </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  tile: {
    borderWidth: 5,
    width: 100,
    height: 100
  },

  tileX: {
    color: "red",
    fontSize: 60,
    textAlign:"center"
    
  },
  tile0: {
    color: "green",
    fontSize: 60,
    textAlign:"center"
  }
});
