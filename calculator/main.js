class Caclulator{   
    #calculator;
    #numBtnEls;
    #operBtnEls;
    #equalBtnEl;

    left = null;
    right = null;
    oper = null; 
    res = false;
    resultValue ;
    constructor(){
        this.assignElement();
        this.addEvent();
    }

    assignElement(){
        this.#calculator = document.getElementById('calculator');
        this.#numBtnEls = this.#calculator.querySelectorAll('.btn.num');
        this.#operBtnEls = this.#calculator.querySelectorAll('.btn.oper');
        this.topInput = this.#calculator.querySelector('#top-input');
        this.#equalBtnEl = this.#calculator.querySelector('#equal');
    }
    addEvent(){
        this.#numBtnEls.forEach(element => {
            element.addEventListener('click', this.inputNum.bind(this));
        });
        this.#operBtnEls.forEach(element => {
            element.addEventListener('click', this.inputOper.bind(this));
        });
        this.#equalBtnEl.addEventListener('click', this.inputEqual.bind(this));
    }
    save(){
        let value = "";
        if(this.left === null){
            return;
        }
        value += this.left + " ";
        this.topInput.value = value;


        if(this.oper === null){
            return;
        }
        value += this.oper + " ";
        this.topInput.value = value;

        if(this.right === null){
            return;
        }
        value += this.right + " ";        
        this.topInput.value = value;

        // equal 클릭시 이벤트
        if(this.res){
            switch(this.oper){
                case "+":
                        this.resultValue = parseInt(this.left) + parseInt(this.right)
                        break;
                case "-":
                    this.resultValue = parseInt(this.left) - parseInt(this.right)
                    break;
                case "*":
                    this.resultValue = parseInt(this.left) * parseInt(this.right)
                    break;
                case "/":
                    this.resultValue = parseInt(this.left) / parseInt(this.right)
                    break;
            }

            value += "= " + this.resultValue;
            this.topInput.value = value;
        }

    }

    inputNum(event){
        let num  = event.target.dataset.oper;
            if(this.oper === null){
                if(this.left === null){
                    this.left = `${num}`;
                }
                else {
                    if(num === 0 && parseInt(this.left) === 0){
                        return;
                    }
                    this.left += `${num}`;
                }
            }else{
                if(this.right === null){
                    this.right = `${num}`;
                }
                else{ 
                    if(num === 0 && parseInt(this.right) === 0){
                        return;
                    }
                    this.right += `${num}`;
                }
            }
            
            this.save()
    }

    inputOper(event){
        let op = event.target.dataset.oper;
        // 음수일경우
        if(this.left === null && op === "-"){
            this.left = "-";
             return;
        }
        // - 중복방지
        if(this.left === "-" && op === "-"){
            return;
        }
        // 음수끼리 계산
        if(op === '-' && this.oper !== null && this.right === null){
            this.right = "-";
            this.save();
            return;
        }

        this.oper = op;
        this.save()
    }

    inputEqual(event){
        if(this.left === null || this.right === null || !this.oper){
            return;
        }

        // 두번 누를 시 결과값 가져오기
        if(this.res){
            this.left =  this.resultValue;
            this.right = null;
            this.resultValue = null;
            this.oper = null;
            this.res = false;
        }
        else{ // 한번 누를 시 계산
            this.res = true;
        }
        this.save();

    }


}

new Caclulator();
