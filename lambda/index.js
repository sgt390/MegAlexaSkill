const Alexa = require('alexa-sdk');
exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event,context);

    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(newSessionHandler,startWorkflowHandlers);
    alexa.execute();
/*    switch (event.request.type) {
case "LaunchRequest":
    context.succeed(generateResponse(buildSpeechletResponse("Welcome to megalexa.", false)));
    break;
case "IntentRequest":
    switch (event.request.intent.name) {
    case "workflow":
    context.succeed(generateResponse(buildSpeechletResponse("Workflow", true)));
    break;
    }
    break;
    }
*/
}

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
   // testing workflow without external functions
    "BuiltInWorkflowIntent": function () {
        this.handler.state = "BUILT_IN_WORKFLOW";
        this.emit(":ask", "you selected the built in workflow");
    }
});
