document.querySelector("#form-control").addEventListener("submit", function (e) {

    document.getElementById("results").style.display = "none";
    document.getElementById("loading").style.display = "block";

    e.preventDefault();

    setTimeout(calculateResults, 2000);
});

function calculateResults(e) {

    // UI Variables

    document.getElementById("loading").style.display = "none";

    const loanAmount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");

    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");

    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {

        document.getElementById("results").style.display = "block";

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    } else {

        displayError("Please check your numbers");
    }

}

function displayError(error) {
    // Create a div for the error
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";

    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector(".card-body")
    const header = document.getElementById("header");

    console.log(errorDiv);

    card.insertBefore(errorDiv, header);

    // Clear error after 3 seconds

    setTimeout(clearError, 3000);

}

function clearError() {
    document.querySelector(".alert").remove();
}