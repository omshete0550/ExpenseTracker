var state = {
    balance: 5000,
    income: 400,
    expense: 100,
    transactions:[
       
    ]
}

var balanceEle = document.querySelector("#balance");
var incomeEle = document.querySelector("#income");
var expenseEle = document.querySelector("#expense");
var transactionsEle = document.querySelector("#transaction");
var incomeBtnEle = document.querySelector("#income-btn");
var expenseBtnEle = document.querySelector("#expense-btn");
var textInputEle = document.querySelector("#text");
var amountInputEle = document.querySelector("#amount")

function init()
{
    var localState = JSON.parse(localStorage.getItem('ExpenseTrackerState'));

    if(localState !== null)
    {
        state = localState; 
    }
    updateState();
    initListeners();
}

function uniqueId()
{
    return Math.round(Math.random() * 100000);
}

function initListeners()
{
    incomeBtnEle.addEventListener('click', onAddIncomeClick);
    expenseBtnEle.addEventListener('click', onAddExpenseClick);
    
}

function onAddIncomeClick()
{
    addTransaction(textInputEle.value, amountInputEle.value, 'income');    
}

function onDeleteClick(event)
{
    var id = parseInt(event.target.getAttribute('data-id'));
    var delIndex;

    for(var i=0; i<state.transactions.length; i++)
    {
        if(state.transactions[i].id === id)
        {
            delIndex = i;
            break;
        }
    }

    state.transactions.splice(delIndex, 1);

    updateState();
     
}

function addTransaction(text, amount, type)
{
    var text = textInputEle.value;
    var amount = amountInputEle.value;

    if(text!=='' && amount!=='')
    {
    var transaction = {
        id: uniqueId(),
        text: textInputEle.value,
        amount: parseInt(amountInputEle.value),
        type: type
    };
    state.transactions.push(transaction);
    
    updateState();
    }
    else
    {
        alert('Please enter the valid data!!');
    }

    textInputEle.vlue = '';
    amountInputEle.value = '';
}
function onAddExpenseClick()
{
    addTransaction(textInputEle.value, amountInputEle.value, 'expense');
}

function updateState()
{

    var balance = 0,
        income = 0,
        expense = 0,
        val;
    for(var i=0; i< state.transactions.length; i++)
    {
        val = state.transactions[i];

        if(val.type === 'income')
        {
            income += val.amount;
        }
        else if(val.type === 'expense')
        {
            expense += val.amount;
        }
    }
    balance = income - expense;
    
    state.balance = balance;
    state.income = income;
    state.expense = expense;

    localStorage.setItem('ExpenseTrackerState', JSON.stringify(state));

    render();
}

function render()
{
    balanceEle.innerHTML = `$${state.balance}`;  //string literals used to combine strings
    incomeEle.innerHTML = `$${state.income}`;
    expenseEle.innerHTML = `$${state.expense}`;
    
    var transactionEle, val,containerEle, amountEle, btnEle;

    transactionsEle.innerHTML = '';

    for(var i=0; i < state.transactions.length; i++)
    {
        val = state.transactions[i];
        transactionEle = document.createElement('li');
        transactionEle.append(val.text);

        transactionsEle.appendChild(transactionEle);

        containerEle = document.createElement('div');
        amountEle = document.createElement('span');

        if(val.type === 'income')
        {
            amountEle.classList.add('income-amt');
        }
        else if(val.type === 'expense')
        {
            amountEle.classList.add('expense-amt');
        }

        amountEle.innerHTML = `$${val.amount}`;

        containerEle.appendChild(amountEle);

        

        btnEle = document.createElement('button');
        btnEle.setAttribute('data-id', val.id);
        btnEle.innerHTML = 'X';

        btnEle.addEventListener('click', onDeleteClick);

        containerEle.appendChild(btnEle);
        transactionEle.appendChild(containerEle);
       
    }
}

init();

