var express = require('express');
var request = require('request');
var router = express.Router();


/* Handle GET request for home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web-Currency Converter' });
});


router.get('/convert', function(req, res){
  var from_currency= req.query.from_currency;
  var dollars = req.query.dollar_amount;
  var convertTo = req.query.to_currency;
var final_result = 0;
  var baseURL = 'https://www.exchangerate-api.com';
// was getting -3 from api caall meaning api invallid, so have to hard code it
  //var key = process.env.Currency_Converter_API_KEY;
var key = '7e55cadf8b1da55545cc6c57';
var path = '/'+from_currency+'/'+convertTo+'/'+ dollars;
var url = baseURL + path;
var queryString = {
  k: key
}

  request( {uri : url, qs: queryString} , function(error, api_response, body){
 // if got response with no errors
 if (!error && api_response.statusCode == 200){
console.log("Exchange rates SAYS \n" + JSON.stringify(body));//this prints the correct exchange rate in console
 //final_result=body;
 final_result = body;
 //final_result = JSON.stringify(body);
 }//end of if got response back

  }); //end of request

  //if currencies do not match, proceed with conversion
  if (  from_currency != convertTo)
{
  //this doesn't work either
  //final_result=final_result;
}
else// currency types match, no conversion necessary
{
final_result = dollars;
}
  res.render('results', { dollars : dollars, from_currency : from_currency, result: final_result, currency: convertTo})
});
module.exports = router;