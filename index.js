const { google } = require('googleapis');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const OAuth2Data = require('./google_api.json');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.use((req, res, next) =>
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: 'true' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const REDIRECT_URL = OAuth2Data.client.redirect

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

app.get('/', (req, res) =>
{
    if (!authed)
    {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
        });

        console.log(url)
        res.redirect(url);
    }
    
    else
    {
        const gmail = google.oauth2({ version: 'v2', auth: oAuth2Client });

        gmail.userinfo.v2.me.get((Werr, Rres) =>
        {
            if (Werr) 
            {
                console.log('The API returned an error: ' + Werr);
            }
            else
            {
                res.send(Rres);
            }
        });

        // res.send('Logged in')
    }
})

app.get('/auth/google/callback', (req, res) =>
{
    const code = req.query.code
    if (code)
    {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens)
        {
            if (err)
            {
                console.log('Error authenticating')
                console.log(err);
            }
            
            else
            {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/')
            }
        });
    }
});

const port = process.env.PORT || 3000
app.listen(port, () => 
{
    console.log(`Server running at ${port}`);
});