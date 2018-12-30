import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import * as actions from '../actions';
import { addRentedTool } from './mutations';
import startMainTabs from './startMainTabs';
import url from '../utils';

class RentToolConfirmScreen extends Component {
  handleSubmit() {
    const { tool } = this.props.tool.data;
    const { endDate, startDate } = this.props.rentDates;

    axios
      .post(`${url.api}/oracle`, {
        query: addRentedTool,
        variables: {
          toolID: tool.id,
          startDate,
          endDate,
          renterID: this.props.profile.id,
          ownerID: tool.depot.owner_id
        }
      })
      .then(res => {
        console.log(res);
        startMainTabs();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log('confirm date props', this.props);
    let dateStart = this.props.rentDates.startDate;
    let dateEnd = this.props.rentDates.endDate;
    let dateDiff = moment(dateEnd).diff(moment(dateStart), 'days') + 1;
    console.log('datefiff', dateDiff);
    console.log(typeof dateDiff);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Confirm Rental Details</Text>
        <View style={styles.divider}>
          <Text style={styles.miniHeader}>Start Date</Text>
          <Text style={styles.textInfo}>
            {new Date(dateStart).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.divider}>
          <Text style={styles.miniHeader}>End Date</Text>
          <Text style={styles.textInfo}>
            {new Date(dateEnd).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.divider}>
          <Text style={styles.miniHeader}>Total Days</Text>
          <Text style={styles.textInfo}>{dateDiff}</Text>
        </View>
        <View style={styles.divider}>
          <Text style={styles.miniHeader}>Total Cost</Text>
          <Text style={styles.textInfo}>
            {'$' + Number(this.props.tool.data.tool.price) * Number(dateDiff)}
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            title="Confirm Rental"
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

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    color: '#e4000f',
    fontSize: 30
  },
  miniHeader: {
    fontSize: 26,
    textDecorationLine: 'underline'
  },
  textInfo: {
    fontSize: 22
  },
  divider: {
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

function mapStateToProps(state) {
  return { profile: state.profile, rentDates: state.rentDates };
}

export default connect(
  mapStateToProps,
  actions
)(RentToolConfirmScreen);
