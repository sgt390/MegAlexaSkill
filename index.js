/*
* File: BlockAlarmClock.js
* Version: 0.0.1
* Date: 2019-02-20
* Author: Stefano Zanatta
* License:
*
* History:
* Author                || Date         || Description
* Stefano Zanatta      || 2019-02-20   || Created file
*/

//N.B: must have a look at https://momentjs.com/

/* User will start the workflow, when it's alarm's turn then alexa will start 
 * timer (song volume 0), timer stops when countdown == 0 and Alarm will ring
*/ 
const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
      },
      handle(handlerInput) {
        const speechText = 'Welcome to megalexa!';
    
        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Megalexa', speechText)
          .getResponse();
      }
    };

const StartedWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState !== 'COMPLETED'
      && !request.intent.slots.workflow_name.value;
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
const Workflow = require("./Workflow");

const InProgressWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState !== 'COMPLETED'
      && request.intent.slots.workflow_name.value
  },
  async handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const slots = request.intent.slots;
    // to automize with ask data
    const userID = "AmazonUse56765000";
    const workflow = new Workflow(slots.workflow_name.value, userID);
    var speechText = "";
    const blocks = await workflow.blocks;
    //speechText += blocks.reduce(((speechText, block) => (speechText + block.text + ". ")), "");
    
    speechText = await blocks.reduce(function(speechText, block){
      return block.text.then(function(result){
          return speechText + result;
      }).catch(function(error){
          console.log(error);
      });
    }, "");

    //handlerInput.attributesManager.setPersistentAttributes(attributes);
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const CompletedWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState === 'COMPLETED';
  },
  handle(handlerInput) {
    const speechText = 'Workflow';
    // build the workflow with some function
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('MegAlexa', speechText)
      .getResponse();
  }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'say your workflow name';
  
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
        LaunchRequestHandler,
        StartedWorkflowIntentHandler,
        InProgressWorkflowIntentHandler,
        CompletedWorkflowIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
