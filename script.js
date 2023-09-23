

// // // Dark mode logic ---->
let isBalck = false;
function changeMode( mode = isBalck) {

    if (!mode) {
        // // // Dark Mode ---->

        document.querySelector("body").style.backgroundColor = "#252222"
        document.querySelector("#mode").innerHTML = "Light"
        document.querySelector("#mode").style.backgroundColor = "white"
        document.querySelector("#mode").style.color = "black"
        document.querySelector("#calculator").style.borderColor = "yellowgreen"
        
        localStorage.setItem("darkMode" , JSON.stringify(true) )
    } else {
        // // // Light Mode ---->

        document.querySelector("body").style.backgroundColor = "#ccc"
        document.querySelector("#mode").innerHTML = "Dark"
        document.querySelector("#mode").style.backgroundColor = "black"
        document.querySelector("#mode").style.color = "white"
        document.querySelector("#calculator").style.borderColor = "darkmagenta"
        
        localStorage.removeItem("darkMode")
    }

    isBalck = !isBalck   // // // Toggle value of isBack for dark btn.
}

let darkModeValue = localStorage.getItem("darkMode")
if(darkModeValue){
    // console.log(darkModeValue)
    // isBalck = 
    changeMode(false)
}





// // // Calculator logic and code here ---->

class React {

    constructor(history = [{ symbol: "sy", firstNum: "0", secondNum: "0", curShow: "0000", result: "0" }]) {

        this.isSymboleClicked = false,
            this.historyData = history,
            this.state = history[history.length - 1]
    }


    check() {
        // // // Just checking here html works with class based programming or not ?
        alert("Checking Done")
    }


    updateUI(obj = this.state) {

        // let preExpressions = document.getElementById("previous_out")
        // // Expressions depends upon the symbol cliced btn -->
        document.getElementById("previous_out").innerHTML = `${obj.firstNum} ${this.isSymboleClicked ? obj.symbol : "sy"} ${obj.secondNum}`

        // // // Show the current things -->
        document.getElementById("current_out").innerHTML = `${obj.curShow}`

        // // // Scroll curentShow div to left --->
        let currentShowDiv = document.getElementById("current_out")
        currentShowDiv.scrollLeft = currentShowDiv.scrollWidth
    }


    updateSymbol(sym) {
        this.state.symbol = sym

        this.isSymboleClicked = true

        // console.log(this.state)
        this.updateUI()
    }

    isNumber(n) {
        // // // isFinite will check number is infinity or not.
        // // This function return true if number is valid and false if number is invalid.
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    updateFirstNum(firstTime = false, num = 0) {

        // console.log(firstTime , num)

        let outAfterAdd;
        if (firstTime) {
            
            // // // if first time point Clicked
            if(num === "."){
                outAfterAdd = `0${num}` 
            }else{
                outAfterAdd = `${num}`  
            }
        } else {
            outAfterAdd = `${this.state.firstNum}${num}`
        }

        // outAfterAdd = Number(outAfterAdd)

        if (!this.isNumber(outAfterAdd)) return console.log("Not a valid number");

        this.state.firstNum = outAfterAdd
        this.state.curShow = `${this.state.firstNum}`

        // console.log(this.state, this.isSymboleClicked)
        this.updateUI()
    }


    updateSecondNum(firstTime = false, num = 0) {

        let outAfterAdd;

        if (firstTime) {

            // // // if first time point Clicked
            if(num === "."){
                outAfterAdd = `0${num}` 
            }else{
                outAfterAdd = `${num}`  
            }
        } else {
            outAfterAdd = `${this.state.secondNum}${num}`
        }

        if (!this.isNumber(outAfterAdd)) return console.log("Not a valid number");

        this.state.secondNum = outAfterAdd
        this.state.curShow = `${this.state.secondNum}`

        // console.log(this.state, this.isSymboleClicked)
        this.updateUI()
    }


    allClear() {
        // // // This fn will clear all data --->

        this.state = {
            symbol: "+",
            firstNum: "0",
            secondNum: "0",
            curShow: "0000",
            result: "0"
        }

        this.isSymboleClicked = false
        this.updateUI()

        // // // Delete localhost data
        localStorage.removeItem("calculatorByAk")

        // // // Back btn hide -->
        document.getElementById("back_btn").style.display = "none"
        alert("All Data Removed ☑️")
    }


    singleClear() {
        this.state.curShow = this.state.curShow.slice(0, this.state.curShow.length - 1)

        if (!this.isSymboleClicked) {
            this.state.firstNum = this.state.firstNum.slice(0, this.state.firstNum.length - 1)
        } else {
            this.state.secondNum = this.state.secondNum.slice(0, this.state.secondNum.length - 1)
        }
        this.updateUI()
    }


    setState(key = "symbol", value = 0) {
        if (key === "symbol") {
            this.updateSymbol(value)
        }

        else if (key === "anyNum") {
            // console.log(this.isSymboleClicked)

            if (!this.isSymboleClicked) {
                if (this.state.firstNum === "0") {
                    this.updateFirstNum(true, value)
                } else if (this.state.firstNum !== "0") {
                    this.updateFirstNum(false, value)
                }
            } else {
                if (this.state.secondNum === "0") {
                    this.updateSecondNum(true, value)
                } else if (this.state.secondNum !== "0") {
                    this.updateSecondNum(false, value)
                }
            }
        }
    }


    setResult() {
        let { symbol, firstNum, secondNum, result, curShow } = this.state

        if (!this.isSymboleClicked) return alert("Click on symbols and give second number please")

        // // // Now set history ---->
        if (this.isSymboleClicked) {

            let obj = this.state
            this.historyData.push({ ...obj })
            // console.log(this.historyData)
            
            // // // Store history in localhost of browser -->
            localStorage.setItem("calculatorByAk", JSON.stringify(this.historyData))
        }


        switch (symbol) {
            case "+":
                // console.log(firstNum , cSym , cN2)
                // console.log("+")
                result = parseFloat(firstNum) + parseFloat(secondNum)
                break
            case "-":
                // console.log("-")
                result = parseFloat(firstNum) - parseFloat(secondNum)
                break
            case "*":
                result = parseFloat(firstNum) * parseFloat(secondNum)
                break
            case "/":
                result = parseFloat(firstNum) / parseFloat(secondNum)
                break
            case "%":
                result = parseFloat(firstNum) % parseFloat(secondNum)
                break
            case "**":
                result = parseFloat(firstNum) ** parseFloat(secondNum)
                break
            default:
                result = parseFloat(firstNum) + parseFloat(secondNum)
        }

        // // // Some logic (I. if result is not have some value in point then leave as it is , II. if have some value as point then show only two characters after point.)--->
        let isDecimal = result % 1
        if( isDecimal > 0){
            result = parseFloat(result).toFixed(2)
        }


        this.state.result = result
        this.state.curShow = result
        this.state.firstNum = result
        this.state.secondNum = "0"


        // console.log(this.state)
        this.updateUI()

        // // // Make btn visiable
        document.getElementById("back_btn").style.display = "block"

    }


    clickBack() {

        let history = this.historyData

        if (history.length > 0) {

            // // // If history array have only one data
            if(history.length === 1){
                document.getElementById("back_btn").style.display = "none"
            }

            this.state = history[history.length - 1]     // // // Update the state with history of last.
            this.historyData.length--       // // // Reduce this size of history.
        } else {
            
            alert("Calculate something first")
        }

        // console.log(this.historyData)
        // console.log(this.state)
        // console.log("Back")

        this.updateUI()

    }



}



let getHistoryFromLoaclHost = localStorage.getItem("calculatorByAk")
// console.log(getHistoryFromLoaclHost)

let setHistoy;
if(getHistoryFromLoaclHost){
    setHistoy = JSON.parse(getHistoryFromLoaclHost)

    // console.log(JSON.parse(getHistoryFromLoaclHost))
}else{
    document.getElementById("back_btn").style.display = "none"
}



// // // Calling main Class ---->
let react = new React(setHistoy)

// // // If getting data in localhost then set some ---->
if(getHistoryFromLoaclHost){
    react.isSymboleClicked = true
    react.updateSymbol(setHistoy[setHistoy.length-1].symbol)
}
react.updateUI()   // // // Upadte ui if getting data --->




// // // All Key Event and corresponding result happend
window.addEventListener("keydown" , (e)=>{

    console.log(e)
    // if(e.key === "7"){
    //     react.setState("anyNum" , 7)
    // }


    switch(e.key){
        case "7":
            react.setState("anyNum" , 7)
            break
        case "8":
            react.setState("anyNum" , 8)
            break
        case "9":
            react.setState("anyNum" , 9)
            break
        case "4":
            react.setState("anyNum" , 4)
            break
        case "5":
            react.setState("anyNum" , 5)
            break
        case "6":
            react.setState("anyNum" , 6)
            break
        case "1":
            react.setState("anyNum" , 1)
            break
        case "2":
            react.setState("anyNum" , 2)
            break
        case "3":
            react.setState("anyNum" , 3)
            break
        case "0":
            react.setState("anyNum" , 0)
            break
        case ".":
            react.setState("anyNum" , ".")
            break
        case "+":
            react.setState("symbol" , "+")
            break
        case "-":
            react.setState("symbol" , "-")
            break
        case "*":
            react.setState("symbol" , "*")
            break
        case "/":
            react.setState("symbol" , "/")
            break
        case "Enter":
            react.setResult()
            break
        case "Backspace":
            react.singleClear()
            break

        default:
            return
    }


})


