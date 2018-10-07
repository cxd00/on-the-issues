# on-the-issues

Here is our Amazon Lambda Node.js code:

"use strict";

var Alexa = require("alexa-sdk");

var candidates = [
    {
        objectID: "1",
        firstname: "David",
        lastname: "Price",
        party: "Democrat",
        history: "incumbert U.S. Representative for NC's 4th District",
        abortionText: "has a pro-choice voting record",
        abortion: 1,
        environmentText: "supports renewable, clean energy and environmental protections",
        environment: 1,
        gunText: "supports gun control and assault weapon bans",
        gun: 2
    },
    {
        objectID: "2",
        firstname: "Barbara",
        lastname: "Howe",
        party: "Libertarian",
        history: "new candidate",
        abortionText: "votes pro-choice",
        abortion: 1,
        environmentText: "opposes government spending on renewable energy",
        environment: 2,
        gunText: "opposes gun restrictions",
        gun: 1
    },
    {
        objectID: "3",
        firstname: "Steve",
        lastname: "Von Loor",
        party: "Republican",
        history: "new candidate",
        abortionText: "votes pro-life",
        abortion: 2,
        environmentText: "does not have an available stance",
        environment: 0,
        gunText: "opposes gun restrictions but supports background checks",
        gun: 1
    }
]

var handlers = {
  'LaunchRequest': function() {
    this.response.speak("Hello, Welcome to On The Issues. Would you like to hear about a candidate who votes with you on women's rights, environmental protection, or gun control today?")
    .listen("Women's Rights, Environmental Protection, or Gun Control?");
    this.emit(':responseReady');
  },
  
  // 'PolicyIntent': function () {
  //     var myPolicy = this.event.request.intent.slots.policy.value;
  //     if (myPolicy === "environmental protection") {
  //         //return the candidates
  //     } else if (myPolicy === "women's rights") {
  //         //return relevant candidates
  //     } else {
  //         //return relevant candidates
  //     }
  //     this.emit(':responseReady');
  // },

  'VoteGreen': function () {
    this.response.speak("Would you like to hear about candidates who are for or against climate change legislation today?")
    .listen("Would you like to hear about candidates who are pro or anti climate change legislation?");
    var greenResponse = this.event.request.intent.slots.green.value;
    if (greenResponse === "vote green") {
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i]["environment"] === 1) {
                this.response.speak(candidates[i]["firstname"] +" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["environmentText"]);
            }
        }
    } else if (greenResponse === "vote brown") {
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i]["environment"] === 2) {
                this.response.speak(candidates[i]["firstname"]+" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["environmentText"]);
            }
        }
    } else {
        this.response.speak("No candidates had a position on this issue.");
    }
    this.emit(':responseReady');
  },

'VoteGal': function () {
    this.response.speak("Would you like to hear about candidates who are pro-choice or pro-life?")
    .listen("Would you like to hear about candidates who are pro-choice or pro-life?");
    var lifeResponse = this.event.request.intent.slots.choice.value;
    if (lifeResponse === "vote life") {
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i]["abortion"] === 2) {
                this.response.speak(candidates[i]["firstname"]+" " + candidates[i]["lastname"] + " a " + candidates[i]["party"]+" " + candidates[i]["abortionText"]);
            }
        }
    } else if (lifeResponse === "vote choice") {
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i]["abortion"] === 1) {
                this.response.speak(candidates[i]["firstname"]+" " + candidates[i]["lastname"] + " a " + candidates[i]["party"]+" " + candidates[i]["abortionText"]);
            }
        }
    } else {
        this.response.speak("No candidates had a position on this issue.");
    }
    this.emit(':responseReady');
  },
  
  'VoteGun': function () {
    this.response.speak("Would you like to hear about candidates who are for or against gun control?")
    .listen("Would you like to hear about candidates who are for or against gun control?");
    var gunResponse = this.event.request.intent.slots.guns.value;
    if (gunResponse === "vote gun") {
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i]["gun"] === 1) {
                this.response.speak(candidates[i]["firstname"]+ " " + candidates[i]["lastname"] + " a " + candidates[i]["party"]+ " " + candidates[i]["gunText"]);
            }
        }
    }
    else if (gunResponse === "vote control") {
        for (var i=0; i<candidates.length; i++) {
            if (candidates[i]["gun"] === 2) {
                this.response.speak(candidates[i]["firstname"]+ " "+ candidates[i]["lastname"] + " a " + candidates[i]["party"]+" " + candidates[i]["abortionText"]);
            }
        }
    } else {
        this.response.speak("No candidates had a position on this issue.");
    }
    this.emit(':responseReady');
}
}


exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
