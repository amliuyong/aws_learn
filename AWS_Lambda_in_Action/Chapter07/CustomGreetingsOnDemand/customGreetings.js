// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:a4aa16c4-1bf9-42bb-b327-35e06ec14caf',
});

var lambda = new AWS.Lambda();

function returnGreetings() {
  var greet = document.getElementById('greet');
  var name = document.getElementById('name');
  var input = {};
  if (greet.value != null && greet.value != '') {
    input.greet = greet.value;
  }
  if (name.value != null && name.value != '') {
    input.name = name.value;
  }
  lambda.invoke({
    FunctionName: 'yongliu-customGreetingsOnDemand',
    Payload: JSON.stringify(input)
  }, function(err, data) {
    var result = document.getElementById('result');
    if (err) {
      console.log(err, err.stack);
      result.innerHTML =
        '<div class="alert alert-danger">' + err + '</div>';
    } else {
      var output = JSON.parse(data.Payload);
      result.innerHTML =
        '<div class="alert alert-success">' + output + '</div>';
    }
  });
}

var form = document.getElementById('greetingsForm');
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  returnGreetings();
});
