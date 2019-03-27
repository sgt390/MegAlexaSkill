/*
* File: BlockAlarmClock.js
* Version: 0.0.1
* Date: 2019-02-20
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta       || 2019-02-20   || Created file
*/ 

//N.B: must have a look at https://momentjs.com/

/* User will start the workflow, when it's alarm's turn then alexa will start 
 * timer (song volume 0), timer stops when countdown == 0 and Alarm will ring
*/ 
const Alexa = require('ask-sdk');
const {User} = require('./User.js');

const AUTENTICATION_MESSAGE = "You must authenticate with your Amazon Account to use MegAlexa. I sent instructions for how to do this in your Alexa App";
const WELCOME_MESSAGE = "Welcome to megalexa!"; 


/**
 * LaunchRequest and user has already linked his account
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
                && getUserAccessToken(handlerInput); 
      },
      handle(handlerInput) {
        speechText = WELCOME_MESSAGE;
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Megalexa', speechText)
          .getResponse();
      }
};

/**
 * user has not linked his account
 */
const MissingAccessTokenHandler = {
  canHandle(handlerInput) {
    return !getUserAccessToken(handlerInput)
  },
  handle(handlerInput) {
      speechText += AUTENTICATION_MESSAGE;
      return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse();
  }
};

/**
 * first workflow interaction
 */
const StartedWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState !== 'COMPLETED'
      && !request.intent.slots.workflow_name.value
      && getUserAccessToken(handlerInput);
  },
  handle(handlerInput) {
    //implement multiple speechText using custom Voice Dialog Flow from ADR Document
    
    const speechText = "what is your workflow?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .addElicitSlotDirective("workflow_name")
      .getResponse();
  }
};



////////////////////////////////////////* BEGIN DEMO *////////////////////////////
/*
const ElicitInProgressWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const request = handlerInput.requestEnvelope.request;
    const attributes = attributesManager.getSessionAttributes() || {};
    attributes.blockStatus = (!request.intent.slots.element.value || request.intent.slots.element.value !== "no")? "elicit": "noElicit";
    attributesManager.setSessionAttributes(attributes);
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState !== 'COMPLETED'
      && request.intent.slots.workflow_name.value
      && (!handlerInput.attributesManager.getSessionAttributes().blockStatus
      || handlerInput.attributesManager.getSessionAttributes().blockStatus === "elicit")
  },
  async handle(handlerInput) {
    handlerInput.attributesManager.getSessionAttributes().blockStatus = "noElicit";
          return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .addElicitSlotDirective("element")
            .getResponse();
  }


  // && handlerInput.attributesManager.getSessionAttributes().blockType
}*/

const InProgressWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState !== 'COMPLETED'
      && request.intent.slots.workflow_name.value
      && getUserAccessToken(handlerInput);
  },
  async handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const slots = request.intent.slots;
    const attributesManager = handlerInput.attributesManager;
    const attributes = attributesManager.getSessionAttributes() || {};

    const workflowName = slots.workflow_name.value;
    const userAccessToken = getUserAccessToken(handlerInput);
    const user = new User(userAccessToken);
    // >>>>>>>>>>>>>>>>>>>> POSSIBLE ERROR FOR UNDEFINED <<<<<<<<<<<<<<<
    const workflowPosition = attributes.workflowPosition;
    const elicitSlot = slots.elicitSlot;
    console.log(workflowPosition === undefined);
    let workflow = (workflowPosition === undefined || elicitSlot === undefined)? await user.workflow(workflowName): await user.workflow(workflowName, workflowPosition.value, elicitSlot.value);

    const alexaResponse = await workflow.alexaResponse();
    const speechText = alexaResponse.text;

    /**
     * set the position of the workflow
     */
    attributes.workflowPosition = alexaResponse.position;
    attributesManager.setSessionAttributes(attributes);

    /**
     * Alexa response output
     */
    console.log(elicitSlot);
    response = (!elicitSlot)? handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse(): 
      handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .addElicitSlotDirective('elicitSlot')
      .getResponse();
    return response;
  }
};

/**
 * @TODO
 * @returns AccessToken of the user
 */
const getUserAccessToken = function(handlerInput){
  //const { accessToken } = handlerInput.requestEnvelope.context.System.user;
  return "amzn1.account.AGC777NBGNIAWSP6EBO33ULF7XMQ"; // THIS IS AN ID >:(
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'say your workflow name or create a new one in your MegAlexa app';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('MegAlexa', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('MegAlexa', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.standard()
      .addRequestHandlers(
        CancelAndStopIntentHandler,
        MissingAccessTokenHandler,
        LaunchRequestHandler,
        StartedWorkflowIntentHandler,
        InProgressWorkflowIntentHandler,
        HelpIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
