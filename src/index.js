import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class MyFancyForm extends React.Component {
  static availableOptions = [
    'apple',
    'grape',
    'cherry',
    'orange',
    'pear',
    'peach',
  ]

  state = {
    multiline: '',
    commaSeparated: '',
    multiSelect: [],
  }

  handleCommaSeparatedValue = (event) => {
    const { value } = event.target 
    const allVals = value.split(',').map(v => v.trim()).filter(Boolean)
    this.setState({
      commaSeparated: value,
      multiline: allVals.join('\n'),
      multiSelect: allVals.filter(v =>
        MyFancyForm.availableOptions.includes(v),
      )
    })
  }

  handleMultiLineChange = (event) => {
    const { value } = event.target
    const allVals = value
      .split('\n')
      .map(v => v.trim())
      .filter(Boolean)
    this.setState({
      multiline: value,
      commaSeparated: allVals.join(','),
      multiSelect: allVals.filter(v => 
        MyFancyForm.availableOptions.includes(v)
      )
    })
  }

  handleMultiSelect = (event) => {
    const allVals = Array.from(event.target.selectedOptions).map(o => o.value)
    this.setState({
      multiSelect: allVals,
      multiline: allVals.join('\n'),
      commaSeparated: allVals.join(',')
    })
  }

  render() {
   const { commaSeparated, multiline, multiSelect, } = this.state
    return (
      <div>
        <p>
          <label htmlFor="">Comma separated values: </label>
          <input type="text"
            name="comma"
            onChange={this.handleCommaSeparatedValue}
            value={commaSeparated} />
        </p>        
        <p>
          <label htmlFor="">multiline values: </label>
          <textarea 
            name="comma"
            onChange={this.handleMultiLineChange}
            rows='10'
            cols='20'
            value={multiline} />
        </p>        
        <p>
          <label htmlFor="">multiSelect values: </label>
          <select 
            size='6'
            value={multiSelect}
            onChange={this.handleMultiSelect}
            multiple >
            <option value="apple">apple</option>
            <option value="grape">grape</option>
            <option value="cherry">cherry</option>
            <option value="orange">orange</option>
            <option value="pear">pear</option>
            <option value="peach">peach</option>
            </select>
        </p>        
      </div>
    )
  }
}

const App = () => (
  <div style={styles}>
    <MyFancyForm />
  </div>
);

render(<App />, document.getElementById('root'));
