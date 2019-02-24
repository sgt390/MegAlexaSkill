const Alexa = require('ask-sdk');


const BUILTIN_BLOCK_STATE = Array.from(Array(3).keys()).map(k => "BUILTIN_BLOCK_STATE" + k)

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
    const speechText = "what is your workflow?";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .addElicitSlotDirective("workflow_name")
      .getResponse();
  }
};

////////////////////////////////////////* BEGIN DEMO *////////////////////////////
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
    //const block = Workflows.nextBlock(request.intent.slot.workflow_name.value);
    //const speechText = block.getResponse();

         // const { content } = attributes;

         // let speechText = "your elements are: ";
         //   content.array.forEach(element => {
         //     speechText += element + ", ";
          //  }); 
          const attributesManager = await handlerInput.attributesManager.getPersistentAttributes() || {};


          return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .addElicitSlotDirective("element")
            .getResponse();
  }
}

const NotElicitInProgressWorkflowIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'WorkflowIntent'
      && request.dialogState !== 'COMPLETED'
      && request.intent.slots.workflow_name.value
      && handlerInput.attributesManager.getSessionAttributes().blockStatus
      && handlerInput.attributesManager.getSessionAttributes().blockStatus === "noElicit";
  },
  handle(handlerInput) {
    //const block = Workflows.nextBlock(request.intent.slot.workflow_name.value);
    //const speechText = block.getResponse();
    let speechText = "text to speech";
    const attributesManager = handlerInput.attributesManager;

    const attributes = attributesManager.getSessionAttributes() || {};
    attributes.blockStatus = "last";
    attributesManager.setSessionAttributes(attributes);

    //if the workflow is over...
    handlerInput.requestEnvelope.request.dialogState = "COMPLETED";
    speechText += ". workflow ended, please start another workflow";

    //handlerInput.attributesManager.setPersistentAttributes(attributes);
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

//////////////////////////* END DEMO */////////////////////////////////////////

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
        ElicitInProgressWorkflowIntentHandler,
        NotElicitInProgressWorkflowIntentHandler,
        CompletedWorkflowIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .withTableName('magalli')
      .withAutoCreateTable(true)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};
