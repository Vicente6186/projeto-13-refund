const form = document.querySelector('form');
const title = document.getElementById('title')
const category = document.getElementById('category')
const amount = document.getElementById('amount')
const ul = document.querySelector('ul');
const expensesCount = document.getElementById('expenses-count');
const expensesTotalAmount = document.getElementById('expenses-total-amount')

function convertToNumber(value) {
    if(typeof value === 'number') return value
    value = String(value)
    value = value.replace(/[^\d,-]/g, '').replace(',', '.')
    value = parseFloat(value)
    value = isNaN(value) ? 0 : value
    return value
}

function convertToCurrency(value) {
    value = convertToNumber(value)
    value = value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    return value
}

function updateCountOfExpenses() {
    const count = ul.children.length
    expensesCount.textContent = `${count} ${count > 1 ? 'despesas' : 'despesa'}`
}

function updateExpensesTotalAmount(amountValue, operation) {
    const actualAmount = convertToNumber(expensesTotalAmount.textContent)
    const newAmount = convertToNumber(amountValue)
    const totalAmount = convertToCurrency(operation === 'more' ? actualAmount + newAmount : actualAmount - newAmount)
    expensesTotalAmount.innerHTML = `<small>R$</small> ${totalAmount.slice(3)}`
}

function cleanFields(){
    title.value = ''
    category.value = ''
    amount.value = ''
    title.focus()
}

function createExpense(){
    ul.innerHTML += `<li>
                        <img src="assets/categories/${category.value}.svg" alt="Ícone da categoria ${category.options[category.selectedIndex].text}">
                        <div>
                            <p>${title.value}</p>
                            <p>${category.options[category.selectedIndex].text}</p>
                        </div>
                        <strong><small>R$ </small>${amount.value.slice(3)}</strong>
                        <img src="assets/remove-button.svg" alt="Botão de remover" class="btn-delete" onclick="deleteExpense(event)">
                    </li>`
    updateExpensesTotalAmount(amount.value, 'more')
    updateCountOfExpenses()
    cleanFields()
}

function deleteExpense(event){
    event.target.closest('li').remove()
    updateCountOfExpenses()
    updateExpensesTotalAmount(event.target.previousElementSibling.textContent)
}


amount.addEventListener('input', () => {
    amount.value = convertToCurrency(amount.value.replace(/\D/g, '') / 100)
})

form.addEventListener('submit', event => {
    event.preventDefault()
    createExpense()
});