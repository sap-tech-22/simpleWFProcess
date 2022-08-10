const request = require('request');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.VCAP_APP_PORT || 5000;

app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send("Hello");
});

app.post('/wfpost', (req, res) => {

    var option = {
        'method': 'PUT',
        'url': 'https://66ff840ftrial-dev-wftransferreq-srv.cfapps.us10.hana.ondemand.com/catalog/ReqHeader(ID=1)',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'ID': 1,
          'sender': req.body.SENDER,
          'totalAmt': req.body.TOTALAMT,
          'balance': req.body.BALANCE,
          'apprStat': req.body.DECISION  
        })
    };

    request(option, (err, resp)=> {
        if(err) throw new Error(err);
        console.log(resp.body);
    });

    res.send("Response from server received.");
});

app.listen(port, ()=>{
    console.log('Server is running on port '+ port);
})