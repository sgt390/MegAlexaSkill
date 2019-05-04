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
const { PhrasesGenerator } = require('./blocks/utility/PhrasesGenerator');
const Alexa = require('ask-sdk');
const {User} = require('./User.js');






/**
 * LaunchRequest and user has already linked his account
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
        && getUserAccessToken(handlerInput); 
      },
      handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const language = request.locale;
        User.language(language);
        const WELCOME_MESSAGE = PhrasesGenerator.randomStartSkillSentence();
        const speechText = WELCOME_MESSAGE;
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
    const request = handlerInput.requestEnvelope.request;
    const language = request.locale;
    User.language(language);
    
    const AUTENTICATION_MESSAGE = PhrasesGenerator.randomAutenticationMessageSentence();
      speechText = AUTENTICATION_MESSAGE;
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
      && !request.intent.slots.workflow_name.value
      && getUserAccessToken(handlerInput);
  },
  handle(handlerInput) {
    //implement multiple speechText using custom Voice Dialog Flow from ADR Document
    const request = handlerInput.requestEnvelope.request;
    const language = request.locale;
    User.language(language);
    const WORKFLOW_REQUEST= PhrasesGenerator.randomWorkflowStartSentence();
    const speechText = WORKFLOW_REQUEST;
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .addElicitSlotDirective("workflow_name")
      .getResponse();
  }
};

const InProgressWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.intent.slots.workflow_name.value
      && getUserAccessToken(handlerInput);
  },
  async handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const language = request.locale;
    User.language(language);

    const slots = request.intent.slots;
    const attributesManager = handlerInput.attributesManager;
    const attributes = attributesManager.getSessionAttributes() || {};

    const workflowName = slots.workflow_name.value.toLowerCase().replace(/\s/g, "");
    const userAccessToken = getUserAccessToken(handlerInput);
    const user = new User(userAccessToken);
    const workflowPosition = attributes.workflowPosition;
    const elicitSlot = slots.elicitSlot.value;
    if (workflowPosition === undefined || elicitSlot === undefined) {
      workflow = await user.workflow(workflowName);
    } else {
      workflow = await user.workflow(workflowName, workflowPosition, elicitSlot);
    }
    
    const alexaResponse = await workflow.alexaResponse();
    const speechText = alexaResponse.text;

    /**
     * set the position of the workflow
     */
    attributes.workflowPosition = alexaResponse.position;
    attributesManager.setSessionAttributes(attributes);
    const elicit = alexaResponse.elicitSlot;
    /**
     * Alexa response output
     */
    response = (!elicit)? handlerInput.responseBuilder
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
 * @returns AccessToken of the user
 */
const getUserAccessToken = function(handlerInput){
  const { accessToken } = handlerInput.requestEnvelope.context.System.user;
  return accessToken;
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const language = request.locale;
    User.language(language);
    const WORKFLOW_NAME=PhrasesGenerator.randomWorkflowNameSentence();
    const speechText =WORKFLOW_NAME;

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
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const language = request.locale;
    User.language(language);
    const FINISH_MESSAGE=PhrasesGenerator.randomFinishSentence();
    const speechText =FINISH_MESSAGE;

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
    const request = handlerInput.requestEnvelope.request;
    const language = request.locale;
    User.language(language);
   const ERROR_COMMAND_NOT_FOUND=PhrasesGenerator.randomErrorCommandSentence();
    return handlerInput.responseBuilder
      .speak(ERROR_COMMAND_NOT_FOUND)
      .reprompt(ERROR_COMMAND_NOT_FOUND)
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
