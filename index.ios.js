import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

class TodoText extends Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPressTodoText(this.props.index)}>
        <Animatable.Text animation="slideInUp" style={[styles.itemText, this.state.item.isDone ? styles.doneText : '']}>
          {this.props.item.text}
        </Animatable.Text>
      </TouchableOpacity>
    );
  }
}

export default class Native extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', list: [] };
  }

  _onChangeText = (text) => {
    this.setState({ text });
  }

  _onPress = () => {
    const { text, list } = this.state;
    const _list = list.concat();
    _list.push({ text, key: Date.now(), isDone: false });
    this.setState({ text: '', list: _list });
  }

  _onPressAllDone = () => {
    const { list } = this.state;
    const _list = list.concat();
    _list.forEach(item => item.isDone = true);
    this.setState({ list: _list });
  }

  _onPressTodoText = (index) => {
    return () => {
      const { list } = this.state;
      const _list = list.concat();
      _list[index].isDone = !_list[index].isDone;
      this.setState({ list: _list });
    };
  }

  render() {
    const { text, list } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputArea}>
          <TextInput
             style={styles.input}
             onChangeText={this._onChangeText}
             underlineColorAndroid="transparent"
             value={text}
             />
          <TouchableOpacity
             style={styles.button}
             onPress={this._onPress}
             >
            <Text style={styles.buttonText} >Add</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
             style={[styles.button, styles.buttonAllDone]}
             onPress={this._onPressAllDone}
             >
            <Text style={styles.buttonText} >All Done</Text>
          </TouchableOpacity>
        </View>
        <FlatList
           data={list}
           renderItem={props => <TodoText {...props} onPressTodoText={this._onPressTodoText} />}
           style={styles.list}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    flexDirection: 'row',
    marginTop: 64,
  },
  input: {
    height: 30,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#008080',
    marginRight: 20,
  },
  button: {
    width: 80,
    height: 40,
    backgroundColor: '#006060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAllDone: {
    backgroundColor: 'orange',
    marginTop: 20,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  list: {
    width: 300,
  },
  itemText: {
    backgroundColor: 'lightblue',
    fontSize: 22,
    margin: 10,
    padding: 10,
  },
  doneText: {
    backgroundColor: 'gainsboro',
    color: 'gray',
    textDecorationLine: 'line-through',
  },
});

AppRegistry.registerComponent('Native', () => Native);
