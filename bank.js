document.addEventListener('DOMContentLoaded', () => {
    const accountId = document.getElementById('account-id').textContent;
    const accountBalance = document.getElementById('account-balance');
    const transactionForm = document.getElementById('transaction-form');
    const transactionStatus = document.getElementById('transaction-status');
    const conversionForm = document.getElementById('conversion-form');
    const conversionResult = document.getElementById('conversion-result');
  
    transactionForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const amount = parseFloat(transactionForm.amount.value);
      const currency = transactionForm.currency.value;
  
      const response = await fetch(`/accounts/${accountId}/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, currency })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        accountBalance.textContent = data.newBalance;
        transactionStatus.textContent = 'Transaction successful!';
        transactionStatus.style.color = 'green';
      } else {
        transactionStatus.textContent = 'Transaction failed.';
        transactionStatus.style.color = 'red';
      }


    conversionForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const amountToConvert = parseFloat(conversionForm['amount-convert'].value);
      const fromCurrency = conversionForm['from-currency'].value;
      const toCurrency = conversionForm['to-currency'].value;
  
      const conversionRate = getCurrenciesConversionRate(fromCurrency, toCurrency);
  
      if (conversionRate !== null) {
        const convertedAmount = (amountToConvert * conversionRate).toFixed(2);
        conversionResult.textContent = `${amountToConvert} ${fromCurrency} is approximately ${convertedAmount} ${toCurrency}.`;
        conversionResult.style.color = 'green';
      } else {
        conversionResult.textContent = 'Conversion failed. Invalid currencies selected.';
        conversionResult.style.color = 'red';
      }
    });

    function getCurrenciesConversionRate(fromCurrency, toCurrency) {
      const conversionRates = {
        USD: { CAD: 1.25, KES: 110, GBP: 0.75 },
        CAD: { USD: 0.8, KES: 88, GBP: 0.6 },
        KES: { USD: 0.009, CAD: 0.011, GBP: 0.007 },
        GBP: { USD: 1.33, CAD: 1.67, KES: 142 }
      };
  
      return conversionRates[fromCurrency] && conversionRates[fromCurrency][toCurrency];


    }
})
})