exports.handler = (event, context, callback) => {
switch (event.request.type) {
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
}

function buildSpeechletResponse(outputText, shouldEndSession){
    return {
        outputSpeech: {
        type: "PlainText",
        text: outputText
    },
    shouldEndSession: shouldEndSession
    }
}
function generateResponse(speechletResponse){
    return {
        version: "1.0",
        response: speechletResponse
    }
}
