/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const candidates = [ { objectID: "1", firstname: "David", lastname: "Price", party: "Democrat", history: "incumbert U.S. Representative for NC's 4th District", abortionText: "has a pro-choice voting record", abortion: 1, environmentText: "supports renewable, clean energy and environmental protections", environment: 1, gunText: "supports gun control and assault weapon bans", gun: 2 }, 
                   { objectID: "2", firstname: "Barbara", lastname: "Howe", party: "Libertarian", history: "new candidate", abortionText: "votes pro-choice", abortion: 1, environmentText: "opposes government spending on renewable energy", environment: 2, gunText: "opposes gun restrictions", gun: 1 }, 
                   { objectID: "3", firstname: "Steve", lastname: "Von Loor", party: "Republican", history: "new candidate", abortionText: "votes pro-life", abortion: 2, environmentText: "does not have an available stance", environment: 0, gunText: "opposes gun restrictions but supports background checks", gun: 1 } ]

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Hello, Welcome to On The Issues. Would you like to hear about a candidate who votes with you on women's rights, environmental protection, or the second amendment today?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const PolicyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PolicyIntent';
  },
  handle(handlerInput) {
    var speakOutput = "I'm sorry, our database hasn't been updated to include that policy yet. Ask again!";
    const myPolicy = handlerInput.requestEnvelope.request.intent.slots.policy.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    console.log(myPolicy);
    console.log(" HELLO");
        if (myPolicy === "ep") {
            console.log("World");
            speakOutput = "Would you like to hear about candidates who are for climate change legislation or against climate change legislation, today?";
        } else if (myPolicy === "wr") {  
            speakOutput = "Would you like to hear about candidates who are pro choice or pro life, today?";
        } else if (myPolicy === "sec") {
            speakOutput = 'Would you like to hear about candidates who are pro gun control or pro second amendment?';
        }
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const GreenHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'VoteGreen';
    },
    handle(handlerInput) {
        console.log(" in green handler");
        const greenResponse = handlerInput.requestEnvelope.request.intent.slots.green.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        console.log("green Response is " + greenResponse); 
        if (greenResponse === "green") { 
            for (var i=0; i<candidates.length; i++) { 
                console.log("he's greenie");
                if (candidates[i]["environment"] === 1) { 
                    return handlerInput.responseBuilder
                        .speak(candidates[i]["firstname"] +" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["environmentText"] + ". Ask about another policy: women's rights or the second amendment.")
                        .getResponse(); 
                } 
            } 
        } else if (greenResponse === "brown") { 
                for (var i=0; i<candidates.length; i++) { 
                    if (candidates[i]["environment"] === 2) { 
                        return handlerInput.responseBuilder
                            .speak(candidates[i]["firstname"]+" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["environmentText"] + ". Ask about another policy: women's rights or the second amendment.")
                            .getResponse(); 
                        } 
                    }
        } else { 
            return handlerInput.responseBuilder
                .speak("No candidates had a position on this issue.")
                .getResponse(); 
        } 
         
    }
};

const GalHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'VoteGal';
    },
    handle(handlerInput) {
        console.log(" in gal handler");
        const lifeResponse = handlerInput.requestEnvelope.request.intent.slots.choice.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        console.log("gal Response is " + lifeResponse); 
        if (lifeResponse === "choice") { 
            for (var i=0; i<candidates.length; i++) { 
                console.log("lifie");
                if (candidates[i]["abortion"] === 2) { 
                    return handlerInput.responseBuilder
                        .speak(candidates[i]["firstname"] +" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["abortionText"]+ ". Ask about another policy: environmental protection or the second amendment.")
                        .getResponse(); 
                } 
            } 
        } else if (lifeResponse === "life") { 
                for (var i=0; i<candidates.length; i++) { 
                    if (candidates[i]["abortion"] === 1) { 
                        return handlerInput.responseBuilder
                            .speak(candidates[i]["firstname"]+" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["abortionText"]+ ". Ask about another policy: environmental protection or the second amendment.")
                            .getResponse(); 
                        } 
                    }
        } else { 
            return handlerInput.responseBuilder
                .speak("No candidates had a position on this issue.")
                .getResponse(); 
        } 
         
    }
};

const GunHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'VoteGun';
    },
    handle(handlerInput) {
        console.log(" in gun handler");
        const gunResponse = handlerInput.requestEnvelope.request.intent.slots.gun.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        console.log("gun Response is " + gunResponse); 
        if (gunResponse === "gun") { 
            for (var i=0; i<candidates.length; i++) { 
                console.log("gunnie");
                if (candidates[i]["gun"] === 1) { 
                    return handlerInput.responseBuilder
                        .speak(candidates[i]["firstname"] +" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["gunText"]+ ". Ask about another policy: environmental protection or women's rights.")
                        .getResponse(); 
                } 
            } 
        } else if (gunResponse === "ctrl") { 
                for (var i=0; i<candidates.length; i++) { 
                    if (candidates[i]["gun"] === 2) { 
                        return handlerInput.responseBuilder
                            .speak(candidates[i]["firstname"]+" " + candidates[i]["lastname"] + " a " + candidates[i]["party"] + " "+ candidates[i]["gunText"]+ ". Ask about another policy: environmental protection or women's rights.")
                            .getResponse(); 
                        } 
                    }
        } else { 
            return handlerInput.responseBuilder
                .speak("No candidates had a position on this issue.")
                .getResponse(); 
        } 
         
    }
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const CancelAndStopHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(error.trace);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PolicyHandler,
    GreenHandler,
    GalHandler,
    GunHandler,
    HelpHandler,
    CancelAndStopHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
