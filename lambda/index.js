exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(eventi,context);

    alexa.appId = process.env.APP_ID;
    alexa.registerHandlers(newSessionHandler,startWorkflowHandler);
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
        this.handler.state = "MAINMODE";
        this.emit(":ask", "Welcome to megalexa.");
    }
};

const startWorkflowHandler = Alexa.CreateStateHandler("MAINMODE", {
    "BuiltInWorkflowIntent": function () {
        this.handler.state = "ANSWERMODE";
        this.emit(":ask", "built in workflow");
    }
});