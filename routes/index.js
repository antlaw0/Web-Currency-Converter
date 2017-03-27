var express = require('express');
var request = require('request');
var router = express.Router();

var exchangeRates = {'EUR' : 0.94, 'JPY' : 112.86 };

/* Handle GET request for home page */
router.get('/', function(req, res){
  //res.send('Currency Site');
  res.render('index');
});


/* Handle currency form submit */
router.get('/convert', function(req, res){
  var from_currency= req.query.from_currency;
  var dollars = req.query.dollar_amount;
  var convertTo = req.query.to_currency;

  var baseURL = 'https://www.exchangerate-api.com';
var key = process.env.Currency_Converter_API_KEY;
  var queryString = '/'+from_currency+'/'+convertTo+'/'+ dollars +'?k='+key;

  request( {uri :baseURL, qs: queryString} , function(error, api_response, body){
	  if (!error && api_response.statusCode == 200){
console.log("Exchange rates SAYS \n" + JSON.stringify(body));
      		  
	  }//end of if got response back
  
  }); //end of request
  
  //if currencies do not match, proceed with conversion
  if (  from_currency != convertTo)
{
  var fromRate = exchangeRates[from_currency];
  var convertedDollars = dollars*fromRate;
  
  
  var rate = exchangeRates[convertTo];
  result = convertedDollars * rate;
}
else// currency types match, no conversion necessary
{
	result = dollars;
}
  res.render('results', { dollars : dollars, from_currency : from_currency, result: result, currency: convertTo})
});

module.exports = router;
