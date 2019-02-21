const Alexa = require('alexa-sdk');
exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event,context);
    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(newSessionHandler,startWorkflowHandlers, outOfSessionHandler,pinDemoHandlers,boxDemoHandlers);
    alexa.execute();

}

const BUILTIN_BLOCK_STATE = Array.from(Array(3).keys()).map(k => "BUILTIN_BLOCK_STATE" + k)

const newSessionHandler = {
    LaunchRequest() {
        this.handler.state = "WORKFLOW_SELECTION_MODE";
        this.emit(":ask", "Welcome to megalexa.");
    }
};

const startWorkflowHandlers = Alexa.CreateStateHandler("WORKFLOW_SELECTION_MODE", {
    /*
    list_of_workflow_names.foreach(function(workflowName){
        //ask the database what to do with a function
        //(e.g. response = buildResponseByWorkflowName(workflowName))
        this.handler.state = response.state()
        this.emit("ask", "response.say()"); 
    });
    */
   ///////////// <testing workflow without external functions> demo ///////////////////////////////////
    "WorkflowIntent": function () {
        this.handler.state = "BUILT_IN_WORKFLOW";
        var workflow_user = this.event.request.intent.slots.workflow_name.value;
        this.speak("You joined "+ workflow_user +"! Say ok to continue");
        /*else
        {
            this.speak("the workflow does not exist, please repeat")
                .listen("please say a workflow name");
        }*/
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

//////////////////////////////*  demo   *///////////////////////////////
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
});