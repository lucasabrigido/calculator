import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
	displayValue: '0',
	cleanDisplay: false,
	operation: null,
	values: [0,0],
	current: 0
}

export default class Calculator extends Component {

	state = {...initialState}

	cleanMemory() {
		this.setState({...initialState});
	}
	setOperation(operation){
		if(this.state.current == 0){
			this.setState({operation, current: 1, cleanDisplay: true})
		} else{
			const equals = operation =='='
			const currentOperation = this.state.operation
			const values = [...this.state.values]
			try{
			values[0] = eval (`${values[0]}
			 ${currentOperation} ${values[1]} `)
			} catch(e) {
				values[0] = this.state.values[0]
			}
			values[1] = 0
			this.setState({displayValue: values[0],
				operation: equals ? null : operation,
				current: equals ? 0:1,
			 	cleanDisplay: !equals,
			 	values})

		}
	}

	addDigit(n){
		if(n == '.' && this.state.displayValue.includes('.')){
			return 
		}
		const cleanDisplay = this.state.displayValue == '0'
		|| this.state.cleanDisplay
		const currentValue = cleanDisplay ? '' :
		 this.state.displayValue
		 const displayValue = currentValue + n
		 this.setState({displayValue, cleanDisplay: false})
		 if(n != '.'){
		 	const i = this.state.current
		 	const newValue = parseFloat(displayValue)
		 	const values = [... this.state.values]
		 	values[i] = newValue
		 	this.setState({values})
		 	console.log (values)

		 }
	}
		constructor(props) {
		super(props)
		this.cleanMemory = this.cleanMemory.bind(this)
		this.setOperation = this.setOperation.bind(this)
		this.addDigit = this.addDigit.bind(this)
	}

	render(){
		/* const addDigit = n => this.addDigit(n);
		const setOperation = op => this.setOperation(op);
		const cleanMemory= () => this.cleanMemory(); */
		return (
			<div className="calculator">
				<Display value = {this.state.displayValue}/>
				<Button triple  label ="AC" click = {this.cleanMemory} />
				<Button operation label ="/" click = {this.setOperation}/>
				<Button label ="7" click = {this.addDigit}/>
				<Button label ="8" click = {this.addDigit}/>
				<Button label ="9" click = {this.addDigit}/>
				<Button operation label ="*" click = {this.setOperation}/>
				<Button label ="4" click = {this.addDigit}/>
				<Button label ="5" click = {this.addDigit}/>
				<Button label ="6" click = {this.addDigit}/>
				<Button operation  label ="-" click = {this.setOperation}/>
				<Button label ="1" click = {this.addDigit}/>
				<Button label ="2" click = {this.addDigit}/>
				<Button label ="3" click = {this.addDigit}/>
				<Button operation label ="+" click = {this.setOperation}/>
				<Button double label ="0" click = {this.addDigit}/>
				<Button label ="." click = {this.addDigit}/>
				<Button operation label ="=" click = {this.setOperation}/>

			</div>
			)
	}

}