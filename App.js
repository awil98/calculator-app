import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//so current bug can't get a running sum with switching operator
//so 5 + 5 - 1 doesnt work it does 5 - 51
export default class App extends React.Component {
    state = {
      //once equals is pressed store the value in number 1
      numbers1: "0",
      mult: false,
      divide: false,
      plus: false,
      minus: false,
      numbers2: "",
      decimalUsed: false,
      isNegative: false,
      precentPressed1: false,
      precentPressed2: false,
    };
  equalsButt = () =>{
    //limit result to 12 digits
    let num1 = Number(this.state.numbers1);
    let num2 = Number(this.state.numbers2);
    let result;
    if(this.state.mult == true){
      result = num1 * num2;
      result = result.toString();
      if(result.length >= 12){
        result = Number(result);
        result = result.toPrecision(5);
        this.setState({numbers1: result, mult: false});
      }else{
        this.setState({numbers1: result, mult: false});
      }
    }else if(this.state.divide == true){
      result = num1 / num2;
      result = result.toString();
      if(result.length >= 12){
        result = Number(result);
        result = result.toPrecision(5);
        this.setState({numbers1: result, mult: false});
      }else{
        this.setState({numbers1: result, divide: false});
      }
    }else if(this.state.plus == true){
      result = num1 + num2;
      this.setState({numbers1: result.toString(), plus: false});
    }else if(this.state.minus == true){
      result = num1 - num2;
      this.setState({numbers1: result.toString(), minus: false});
    }
    this.setState({numbers2: "", decimalUsed: false, isNegative: false, precentPressed1: false, precentPressed2: false});
  }
  changeSign = () => {
    //edit this function in the future to allow for  it change from - if only zero is pressed
    //that comment makes no sense so just try to press - when theres only a zero on the screen
    //see if the isNegative button has already been pressed
    if(this.state.isNegative){
      //check to see if it's the second number

      if(this.state.mult === true || this.state.divide === true
        || this.state.plus === true || this.state.minus === true){
          let number2 = this.state.numbers2;
          let newNum = number2.slice(1);
          this.setState({isNegative: false, numbers2: newNum});
        }else{
            let number1 = this.state.numbers1;
            let newNum = number1.slice(1);
            this.setState({isNegative: false, numbers1: newNum});
          }
    }else{
      if(this.state.mult === true || this.state.divide === true
        || this.state.plus === true || this.state.minus === true){
          let number2 = this.state.numbers2;
          let newString1 = "-" + number2.slice();
          this.setState({isNegative: true, numbers2: newString1});
        }else{
          let number1 = this.state.numbers1;
          let newString2 = "-" + number1.slice();
          this.setState({isNegative: true, numbers1: newString2});
        }
    }

  }
  //this method just resets all of the state properties back to their default values
  clearScreen = () => {
    this.setState({numbers1: "0", mult: false, divide: false, plus: false,
    minus: false, numbers2: "", decimalUsed: false, isNegative: false,
    precentPressed1: false, precentPressed2: false});
  }
  //these four methods just switch the value stored in their resprective booleans
  pressMult = () =>{
     if(this.state.mult == true){
      this.equalsButt();
      this.setState({mult: true});
     }
    this.setState({mult: true, divide: false, plus: false, minus: false, decimalUsed: false});
  }
  pressDiv = () =>{
      if(this.state.divide == true){
       this.equalsButt();
       this.setState({divide: true});
     }
    this.setState({divide: true, mult: false, plus: false, minus: false, decimalUsed: false});
  }
  pressPlus = () =>{
    //so if the value of plus is already true I just want to add the value of
    if(this.state.plus == true){
      this.equalsButt();
      this.setState({plus: true});
    }
    this.setState({plus: true, divide: false, mult: false, minus: false, decimalUsed: false});
  }
  pressMinus = () =>{
    if(this.state.minus == true){
      this.equalsButt();
      this.setState({plus: true});
    }
    this.setState({minus: true, plus: false, divided: false, mult: false, decimalUsed: false});
  }

  //this method takes in string containing the value of the button that was pressed
  pressButton = (num) =>{
    //it checks the value of number 1
    let tempVar = this.state.numbers1;
    if(tempVar == "0" || tempVar == "-0"){
      //so if the value of number1 is 0 then nothing has been pressed yet and I want to set the value to number pressed
      if(tempVar == "-0"){
        this.setState({isNegative: false});
      }
      this.setState({numbers1: num});
    }else if(this.state.mult === true || this.state.divide === true
      || this.state.plus === true || this.state.minus === true) {
        //if that's not the case I want to check to see if I'm on the second number and if so I want to concatinate the string
      this.setState({numbers2: this.state.numbers2 + num});
    }
    else{
      //else I just want to add the number onto the string of number1
      this.setState({numbers1: tempVar + num});
    }
  }

  pressDecimal = () =>{
    //if the decimal has already been used then just leave the method
    if(this.state.decimalUsed === true){
      return;
    }
    let tempVar = this.state.numbers1;
    //if the value of the first number is stil just zero then add a decimal behind it
    if(tempVar == "0"){
      this.setState({numbers1: tempVar + "."});
      this.setState({decimalUsed: true});
      return;
      //the value is toggled back to off whenever one of the operators are pressed
    }else if(this.state.mult === true || this.state.divide === true || this.state.plus === true || this.state.minus === true) {
      //this just checks to see if the value is the second number
      this.setState({numbers2: this.state.numbers2 + "."});
      this.setState({decimalUsed: true});
      return;
    }
    else{
      //this isn't needed if the first if statement is updated
        this.setState({numbers1: tempVar + ".", decimalUsed: true});
    }
}

pressPercent = () =>{
  //toggle the decimal value since it's technically being Used
  this.setState({decimalUsed: true});
  //if the percentage button hasn't been pressed yet
  if(this.state.precentPressed1 == false || this.state.precentPressed2 == false){
    //if it is the second number
    console.log("I've been pressed")
    //this conditional operator needs to be updated
    if(this.state.mult === true || this.state.divide === true
      || this.state.plus === true || this.state.minus === true && this.state.precentPressed2 == false){
      let myNum = this.state.numbers2;
      console.log(myNum)
      //turn number to decimal value
      let updated = (myNum/100);
      console.log(updated);
      //set number in state and also trigger that the percentage button has been pressed
      this.setState({precentPressed2: true, numbers2: updated.toString()});
      //then if its the first number
    }else{
      let myNum = this.state.numbers1;
      let updated = (myNum/100);
      console.log(updated);
      this.setState({precentPressed1: true, numbers1: updated.toString()});
    }
    //then if this button has already been pressed
  }else{
    if(this.state.mult === true || this.state.divide === true
      || this.state.plus === true || this.state.minus === true && this.state.precentPressed2 === true){
      let myNum = this.state.numbers2;
      //turn the decimal back to a number
      myNum = (myNum * 100);
      //set number in state and also trigger that the percentage button has been pressed
      this.setState({pressPercent2: false, numbers2: myNum.toString()});
      //then if its the first number
    }else{
      let myNum = this.state.numbers1;
      myNum = (myNum * 100);
      this.setState({precentPressed1: false, numbers1: myNum.toString()});
    }
  }
}

  render() {
    //conditional rendering for the clearButton and also for the Display
    let DisplayForNum;
    let clearButton;
    if(this.state.mult === true || this.state.divide === true || this.state.plus === true || this.state.minus === true){
      DisplayForNum = this.state.numbers2;
    }
    else{
      DisplayForNum = this.state.numbers1;
    }
    if(this.state.numbers1 == "0"){
      clearButton = "AC"
    }
    else{
      clearButton = "C"
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <Text style={{fontSize: 50, color:"white", justifyContent: "flex-end"}}>
            {DisplayForNum}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.first}
            onPress={this.clearScreen}>
            <Text style={styles.text}>{clearButton}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.first}
            onPress={this.changeSign}>
            <Text style={styles.text}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.first}
            onPress={this.pressPercent}>
            <Text style={styles.text}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.last}
            onPress={this.pressDiv}>
            <Text style={styles.text}>÷</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.first2}
            onPress={() => this.pressButton("7")}>
            <Text style={styles.text}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.second}
            onPress={() => this.pressButton("8")}>
            <Text style={styles.text}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.third}
            onPress={() => this.pressButton("9")}>
            <Text style={styles.text}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.last}
            onPress={this.pressMult}>
            <Text style={styles.text}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.first2}
            onPress={() => this.pressButton("4")}>
            <Text style={styles.text}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.second}
            onPress={() => this.pressButton("5")}>
            <Text style={styles.text}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.third}
            onPress={() => this.pressButton("6")}>
            <Text style={styles.text}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.last}
            onPress={this.pressMinus}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.first2}
            onPress={() => this.pressButton("1")}>
            <Text style={styles.text}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.second}
            onPress={() => this.pressButton("2")}>
            <Text style={styles.text}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.third}
            onPress={() => this.pressButton("3")}>
            <Text style={styles.text}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.last}
            onPress={this.pressPlus}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.first2}
            onPress={() => this.pressButton("0")}>
            <Text style={styles.text}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lastRow1}
            onPress={this.pressDecimal}>
            <Text style={styles.text}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lastRow2}
            onPress={this.equalsButt}>
            <Text style={styles.text}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
    alignItems: 'stretch',
  },
  row:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  inputView:{
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: "17%"
  },
  text:{
    color: "white",
    paddingTop: 13,
    fontSize: 33,
  },
  first:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    borderRadius: 50,
    height: 75
  },
  first2:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2f2f2f",
    borderRadius: 50,
    height: 75
  },
  second:{
    flex:1,
    alignItems: "center",
    backgroundColor: "#2f2f2f",
    borderRadius: 50,
    height: 75
  },
  third:{
    flex:1,
    alignItems: "center",
    backgroundColor: "#2f2f2f",
    borderRadius: 50,
    height: 75
  },
  last:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FF8C00",
    borderRadius: 50,
    height: 75
  },
  lastRow1:{
    flex: .5,
    alignItems: "center",
    backgroundColor: "#2f2f2f",
    borderRadius: 50,
    height: 75
  },
  lastRow2:{
    flex: .5,
    alignItems: "center",
    backgroundColor: "#FF8C00",
    borderRadius: 50,
    height: 75
  },
});
