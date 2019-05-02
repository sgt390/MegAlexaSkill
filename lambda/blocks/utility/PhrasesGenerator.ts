/*
* File: PhrasesGenerator.ts
* Version: 1.0.0
* Date: 2019-03-24
* Author: Stefano Zanatta
* License:
*
* History:
* Author                    || Date         || Description
* Bianca Andrea Ciuche      || 2019-04-24   || Created file
* Bianca Andrea Ciuche      || 2019-04-24   || Implemented clasd
* Stefano Zanatta           || 2019-04-29   || Verified
* Matteo Depascale          || 2019-04-30   || Approved
*/

export class PhrasesGenerator {
    /**
     * * generate a random integer between min and max
     * * @param {Number} min 
     * * @param {Number} max
     * * @return {Number} random generated integer 
     * */
   
    private static language:string="en-US";
    private static jsonPhrases:any=require  ('../../JSONconfigurations/phrases-EN.json');

    public static setLanguage(languagePassed:string) {
        this.language=languagePassed;
        /*
        if(this.language==="it-IT") 
            PhrasesGenerator.jsonPhrases= require ('../../JSONconfigurations/phrases-IT.json');
        else
           PhrasesGenerator.jsonPhrases= require ('../../JSONconfigurations/phrases-EN.json');
        */
        switch (this.language) {
            case "it-IT": PhrasesGenerator.jsonPhrases= require ('../../JSONconfigurations/phrases-IT.json');
                break;
            default: PhrasesGenerator.jsonPhrases= require ('../../JSONconfigurations/phrases-EN.json');
        }
    }

    public static getLanguage() {
        return this.language;
    }

    private static randomInt(min: number, max :number): number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static randomAutenticationMessageSentence():string{
        var randomNumber: number=this.randomInt(0,PhrasesGenerator.jsonPhrases.autenticationMessage.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.autenticationMessage[randomNumber];
        return s;
    }

    static randomStartSkillSentence():string{
        var randomNumber: number=this.randomInt(0,PhrasesGenerator.jsonPhrases.skillStart.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.skillStart[randomNumber];
        return s;
    }
   
    static randomWorkflowStartSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.workflowStart.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.workflowStart[randomNumber];
        return s;
    }
    static randomWorkflowNameSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.workflowName.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.workflowName[randomNumber];
        return s;
    }
    static randomErrorCommandSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.errorCommand.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.errorCommand[randomNumber];
        return s;
    }
    static randomFinishSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.finishMessage.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.finishMessage[randomNumber];
        return s;
    }

    static randomDoneWorkflowSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.doneWorkflow.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.doneWorkflow[randomNumber];
        return s;
    }
    static randomPinBlockStartSentence(): string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.pinBlockStart.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.pinBlockStart[randomNumber];
        return s;
    }

    static randomWrongPinSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.wrongPin.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.wrongPin[randomNumber];
        return s;
    }

    static randomCorrectPinSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.correctPin.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.correctPin[randomNumber];
        return s;
    }

    static randomAddDeleteModifySentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.addDeleteModify.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.addDeleteModify[randomNumber];
        return s;
    }
    static pleaseRepeatList():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.pleaseRepeatList.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.pleaseRepeatList[randomNumber];
        return s;
    }
    static randomAddListSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.addList.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.addList[randomNumber];
        return s;
    }

    static randomDeleteListSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.deleteList.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.deleteList[randomNumber];
        return s;
    }

    static randomNotPresentSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.notPresent.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.notPresent[randomNumber];
        return s;
    }

    static randomEditedElementSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.editedWith.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.editedWith[randomNumber];
        return s;
    }

    static randomReadEmailSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.readEmail.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.readEmail[randomNumber];
        return s;
    }

    static randomWriteTwitterSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.writeTwitter.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.writeTwitter[randomNumber];
        return s;
    }

    static randomSuccessTwitterSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.successTwitter.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.successTwitter[randomNumber];
        return s;
    }

    static tweetedTwitterSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.tweetedTwitter.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.tweetedTwitter[randomNumber];
        return s;
    }

    static randomWeatherStartSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherStart.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherStart[randomNumber];
        return s;
    }   

    static randomWeatherGradeSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherGrade.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherGrade[randomNumber];
        return s;
    }

    static randomWeatherDetailsSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherDetails.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherDetails[randomNumber];
        return s;
    }

    static randomWeatherHighSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherHigh.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherHigh[randomNumber];
        return s;
    }
    
    static randomWeatherCelsiusSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherCelsius.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherCelsius[randomNumber];
        return s;
    }

    static randomWeatherLowSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherLow.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherLow[randomNumber];
        return s;
    }
    static atTime():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.atTime.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.atTime[randomNumber];
        return s;
    }
    static dayTime():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.dayTime.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.dayTime[randomNumber];
        return s;
    }
    static noLocation():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.noLocation.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.noLocation[randomNumber];
        return s;
    }
    static location():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.location.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.location[randomNumber];
        return s;
    }
    static senderEmail():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.senderEmail.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.senderEmail[randomNumber];
        return s;
    }
    static subjectEmail():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.subjectEmail.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.subjectEmail[randomNumber];
        return s;
    }
};

