document.getElementById('loanForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            document.getElementById('result').innerHTML = `<strong>Error:</strong> ${result.error}`;
        } else {
            document.getElementById('result').innerHTML = `
                <strong>Prediction:</strong> ${result.prediction} <br>
                <strong>Confidence:</strong> ${(result.confidence * 100).toFixed(2)}%
            `;
        }
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<strong>Error:</strong> ${error}`;
    });
});
