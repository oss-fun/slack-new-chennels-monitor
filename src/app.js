var slackAPI = require('slackbotapi');
var token = process.env.WEB_SLACK_TOKEN;
var botName = process.env.BOT_NAME;
var targetChannel = process.env.TARGET_SLACK_CHANNEL;
var express = require("express");
var app = express();

if (!token) {
    console.error("slack web api token is not set");
    console.error("please `export wEB_SLACK_TOKEN`");
    process.exit(1);
}
var slack = new slackAPI({
    'token': token,
    'logging': true,
    'autoReconnect': true
});

app.get('/', function(request, response) {
      response.send('Bot Running');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
      console.log("Listening on " + port);
});

slack.on('channel_created', function (data) {
    var data = {
        channel: targetChannel,
        username: botName,
        text: "new channel <#" + data.channel.id + "|" + data.channel.name +"> has been created",
    };
    slack.reqAPI("chat.postMessage",data);
});

