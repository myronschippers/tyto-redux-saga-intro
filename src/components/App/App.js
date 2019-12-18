import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class App extends Component {
  state = {
    newElement: '',
  }

  handleChange = (event) => {
    this.setState({
      newElement: event.target.value,
    });
  }

  getElements = () => {
    axios.get('/api/element').then(response => {
      this.props.dispatch({ type: 'SET_ELEMENTS', payload: response.data });
  })
  .catch(error => {
      console.log('error with element get request', error);
  });
  }

  componentDidMount() {
    this.getElements();
  }

  handleClick = () => {
    axios.post('/api/element', this.state).then(() => {
        this.getElements();
        this.setState({
          newElement: '',
      });
    })
    .catch(error => {
        console.log('error with element get request', error);
    });
    
}

  render() {
    return (
      <div>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}>Button Two</button>
        <input value={this.state.newElement} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add Element</button>
        <pre>{JSON.stringify(this.props.reduxState)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(App);
