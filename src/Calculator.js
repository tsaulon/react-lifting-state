import React, { Component } from 'react';

const scaleNames = {
    c: 'Celsius',
    f: 'Farenheit'
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

//  Components

function BoilingVerdict(props) {
    return <p>{`The water would ${props.celsius >= 100 ? '' : 'not'} boil`}</p>
}

class TemperatureInput extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onTemperatureChange(event.target.value); //  communicating with parent function's onTemperatureChange()
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

//  component with "source of truth"
//  for TemperatureInput child components
class Calculator extends Component {

    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this);
        this.state = {
            temperature: '',
            scale: 'c'
        }
    }

    handleCelsiusChange(temp) {
        this.setState({
            temperature: temp,
            scale: 'c'
        });
    }

    handleFarenheitChange(temp) {
        this.setState({
            temperature: temp,
            scale: 'f'
        })
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    
        return (
          <div>
            <TemperatureInput
              scale="c"
              temperature={celsius}
              onTemperatureChange={this.handleCelsiusChange} />
    
            <TemperatureInput
              scale="f"
              temperature={fahrenheit}
              onTemperatureChange={this.handleFarenheitChange} />
    
            <BoilingVerdict
              celsius={parseFloat(celsius)} />
    
          </div>
        );
    }
}


export default Calculator;