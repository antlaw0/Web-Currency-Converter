var express = require('express');
var request = require('request');
var router = express.Router();


/* Handle GET request for home page */

router.get('/convert', function(req, res){
  var from_currency= req.query.from_currency;
  var dollars = req.query.dollar_amount;
  var convertTo = req.query.to_currency;
var result = 0;
  var baseURL = 'https://www.exchangerate-api.com';
var key = process.env.Currency_Converter_API_KEY;
var path = '/'+from_currency+'/'+convertTo+'/'+ dollars;
var url = baseURL + path;
var queryString = {
  k: key
}

  request( {uri : url, qs: queryString} , function(error, api_response, body){
 if (!error && api_response.statusCode == 200){
console.log("Exchange rates SAYS \n" + JSON.stringify(body));
// result = the response from the API call, is it api_response?
 }//end of if got response back

  }); //end of request

  //if currencies do not match, proceed with conversion
  if (  from_currency != convertTo)
{
  //do nothing because currencies are different and result is already set to response from API call 
}
else// currency types match, no conversion necessary
{
result = dollars;
}
  res.render('results', { dollars : dollars, from_currency : from_currency, result: result, currency: convertTo})
});
module.exports = router;