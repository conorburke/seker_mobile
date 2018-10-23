import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import { createTool } from './mutations';
import url from '../utils';

class CreateToolScreen extends Component {
  state = {
    title: '',
    category: '',
    description: '',
    price: '',
    depotId: ''
  };

  handleSubmit() {
    window.console.log('this.props.profile', this.props.profile);
    axios
      .post(`${url.api}/oracle`, {
        query: createTool,
        variables: {
          title: this.state.title,
          category: this.state.category,
          description: this.state.description,
          price: Number(this.state.price),
          depot_id: this.state.depotId
        }
      })
      .then(() => {
        console.log('created tool');
        this.props.fetchTools();
      })
      .catch(err => {
        console.log('current state', this.state);
        console.log(err);
      });
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Tool Title</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View>
          <FormLabel>Category</FormLabel>
          <FormInput
            value={this.state.category}
            onChangeText={category => this.setState({ category })}
          />
        </View>
        <View>
          <FormLabel>Description</FormLabel>
          <FormInput
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
        </View>
        <View>
          <FormLabel>Price / Hour</FormLabel>
          <FormInput
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
          />
        </View>
        <View>
          <FormLabel>Depot ID</FormLabel>
          <FormInput
            value={this.state.depotId}
            onChangeText={depotId => this.setState({ depotId })}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Submit"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.handleSubmit.bind(this)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile };
}

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default connect(
  mapStateToProps,
  actions
)(CreateToolScreen);
