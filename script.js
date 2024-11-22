// Investment Planner Code

function openGoalWizard() {
    document.getElementById("goal-modal").style.display = "block";
}

function closeGoalWizard() {
    document.getElementById("goal-modal").style.display = "none";
}

function createGoal(event) {
    event.preventDefault();
    const goalName = document.getElementById("goal-name").value;
    const goalAmount = document.getElementById("goal-amount").value;
    const goalTimeline = document.getElementById("goal-timeline").value;
    const goalRisk = document.getElementById("goal-risk").value;

    const goalCard = document.createElement("div");
    goalCard.classList.add("goal-card");

    goalCard.innerHTML = `
        <h4>${goalName}</h4>
        <p>Target Amount: $${goalAmount}</p>
        <p>Timeline: ${goalTimeline} years</p>
        <p>Risk Level: ${goalRisk}</p>
    `;

    document.getElementById("goals-overview").appendChild(goalCard);
    document.getElementById("goal-form").reset();
    closeGoalWizard();
}

// Income Tracker Code

let totalIncome = 0;
let expenses = {};

function addIncome(event) {
    event.preventDefault();
    const incomeAmount = document.getElementById("income-amount").value;
    totalIncome += parseFloat(incomeAmount);
    document.getElementById("income-form").reset();
    alert(`Income added: $${incomeAmount}`);
    updateBalance(); // Update balance after adding income
}

function addExpense(event) {
    event.preventDefault();
    const category = document.getElementById("expense-category").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);

    if (!expenses[category]) {
        expenses[category] = 0;
    }
    expenses[category] += expenseAmount;

    document.getElementById("expense-form").reset();
    updateExpenseSummary();
    updateChart();
    updateBalance(); // Update balance after adding expense
}

function updateExpenseSummary() {
    const summaryDiv = document.getElementById("expense-summary");
    summaryDiv.innerHTML = `<h4>Total Income: $${totalIncome.toFixed(2)}</h4>`;
    summaryDiv.innerHTML += `<h4>Expenses:</h4>`;
    for (const category in expenses) {
        summaryDiv.innerHTML += `<p>${category}: $${expenses[category].toFixed(2)}</p>`;
    }
}

function updateBalance() {
    const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
    const remainingBalance = totalIncome - totalExpenses;

    const balanceDiv = document.getElementById("remaining-balance");
    balanceDiv.innerHTML = `<h4>Remaining Balance: $${remainingBalance.toFixed(2)}</h4>`;
}

let expenseChart;

function updateChart() {
    const ctx = document.getElementById("expense-chart").getContext("2d");
    
    const labels = Object.keys(expenses);
    const data = Object.values(expenses);

    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses by Category',
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Expense Distribution'
                }
            }
        }
    });
}
