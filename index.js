const Alexa = require('ask-sdk-core');

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
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        startWorkflowHandler,
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

  ///////////////////////////////////////////////////////////

/*
const startWorkflowHandlers = Alexa.CreateStateHandler("WORKFLOW_SELECTION_MODE", {
    list_of_workflow_names.foreach(function(workflowName){
        //ask the database what to do with a function
        //(e.g. response = buildResponseByWorkflowName(workflowName))
        this.handler.state = response.state()
        this.emit("ask", "response.say()"); 
    });
    
   ///////////// <testing workflow without external functions> demo ///////////////////////////////////
    "WorkflowIntent": function () {
        this.handler.state = "BUILT_IN_WORKFLOW";
        var workflow_user = this.event.request.intent.slots.workflow_name.value;
        this.speak("You joined "+ workflow_user +"! Say ok to continue");
        /*else
        {
            this.speak("the workflow does not exist, please repeat")
                .listen("please say a workflow name");
        }
        this.emit(":responseReady");
    },

    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.attributes['endedSessionCount'] += 1;
        // #TODO save state
        this.emit(':tell', 'bye');
    },
     
    'Unhandled': function() {
        this.response.speak('Sorry, I didn\'t get that. Try saying a workflow name.')
                    .listen('Try saying your workflow name.');
        this.emit(':responseReady');
    }
});
*/

/*
const outOfSessionHandler = {

    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.attributes['endedSessionCount'] += 1;
        //this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
        this.emit(':tell', 'bye');
    },
     
    'Unhandled': function() {
        this.response.speak('Please register into the megalexa app.');
        this.emit(':responseReady');
    }
};

//////////////////////////////  demo  ///////////////////////////////
const pinDemoHandlers = Alexa.CreateStateHandler(BUILTIN_BLOCK_STATE[0], {

    "pinDemoIntent": function () {
        if(this.event.request.intent.slots.pin.value)
        {
        this.speak("you are inside the pin block. say 4 numbers")
            .response("4 numbers!");
        }else
        {
            this.handler.state = BUILTIN_BLOCK_STATE[1];
            this.speak("the pin was correct! say go to continue");
        }
        this.emit(":responseReady");

    },

    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':tell', 'you left the demo workflow in state:' + BUILTIN_BLOCK_STATE[0]);
    },
     
    'Unhandled': function() {
        this.response.speak('error in demo workflow: ' +BUILTIN_BLOCK_STATE[0])
                    .listen('error in demo workflow');
        this.emit(':responseReady');
    }
});
const boxDemoHandlers = Alexa.CreateStateHandler(BUILTIN_BLOCK_STATE[1], {

    "boxDemoIntent": function () {
        this.handler.state = "WORKFLOW_SELECTION_MODE";
        this.emit(":ask", "you are inside the text-box block. say go to continue");
    },

    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.attributes['endedSessionCount'] += 1;
        // #TODO save state
        this.emit(':tell', 'you left the demo workflow in state:' + BUILTIN_BLOCK_STATE[1]);
    },
     
    'Unhandled': function() {
        this.response.speak('error in demo workflow: ' +BUILTIN_BLOCK_STATE[1])
                    .listen('error in demo workflow');
        this.emit(':responseReady');
    }
});*/