import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/events';


class EventPage extends Component {
  render() {
    return(
      <div>
        <h1> {this.props.name} </h1>
        <p> {this.props.date} </p>
        <p> {this.props.address} </p>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
