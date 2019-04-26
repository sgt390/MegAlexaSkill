
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
        if(this.language=="it-IT") 
            PhrasesGenerator.jsonPhrases= require ('../../JSONconfigurations/phrases-IT.json');
    }

    private static randomInt(min: number, max :number): number{
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    static randomReadListSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.readList.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.readList[randomNumber];
        return s;
    }
       
    static randomAddListSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.addList.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.addList[randomNumber];
        return s;
    }

    static randomDeleteListSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.addList.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.deleteList[randomNumber];
        return s;
    }

    static randomReadEmailSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.readEmail.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.readEmail[randomNumber];
        return s;
    }
       
    static randomReadTwitterSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.readTwitter.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.readTwitter[randomNumber];
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

    static randomFeedRssSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.feedRss.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.feedRss[randomNumber];
        return s;
    }

    static randomCalendarSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.calendar.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.calendar[randomNumber];
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

    static randomWeatherLowSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.weatherLow.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.weatherLow[randomNumber];
        return s;
    }

    static randomNewsSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.news.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.news[randomNumber];
        return s;
    }

    static randomSportSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.sport.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.sport[randomNumber];
        return s;
    }

    static randomStockSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.stock.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.stock[randomNumber];
        return s;
    }

    static randomCryptoSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.crypto.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.crypto[randomNumber];
        return s;
    }

    static randomWorkflowDoneSentence():string{
        var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.jsonPhrases.workflowDone.length-1);
        let s: string=PhrasesGenerator.jsonPhrases.workflowDone[randomNumber];
        return s;
    }
};

