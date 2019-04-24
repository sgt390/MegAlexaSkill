
const json = require ('../../JSONconfigurations/phrases.json');
export class PhrasesGenerator {
     /**
      * * generate a random integer between min and max
      * * @param {Number} min 
      *  * @param {Number} max
      * * @return {Number} random generated integer 
      * */
     randomInt(min: number, max :number): number{
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    randomStartSentence():String{
       var randomNumber: number=this.randomInt(0,json.skillStart.length-1);
       let s=json.skillStart[randomNumber];
       return s;
    }
    
    randomWorkflowStartSentence():String{
    var randomNumber: number=this.randomInt(0,json.workflowStart.length-1);
       let s=json.workflowStart[randomNumber];
       return s;
    }
      
    randomPinBlockStartSentence():String{
        var randomNumber: number=this.randomInt(0,json.pinBlockStart.length-1);
           let s=json.pinBlockStart[randomNumber];
           return s;
        }

    randomWrongPinSentence():String{
        var randomNumber: number=this.randomInt(0,json.wrongPin.length-1);
        let s=json.wrongPin[randomNumber];
        return s;
        }
    randomCorrectPinSentence():String{
        var randomNumber: number=this.randomInt(0,json.correctPin.length-1);
        let s=json.correctPin[randomNumber];
        return s;
        }
    randomReadTwitterSentence():String{
        var randomNumber: number=this.randomInt(0,json.readTwitter.length-1);
        let s=json.readTwitter[randomNumber];
        return s;
        }
    randomFeedRssSentence():String{
        var randomNumber: number=this.randomInt(0,json.feedRss.length-1);
        let s=json.feedRss[randomNumber];
        return s;
        }
    randomWeatherStartSentence():String{
        var randomNumber: number=this.randomInt(0,json.weatherStart.length-1);
        let s=json.weatherStart[randomNumber];
        return s;
    }   
    randomWeatherGradeSentence():String{
        var randomNumber: number=this.randomInt(0,json.weatherGrade.length-1);
        let s=json.weatherGrade[randomNumber];
        return s;
    } 
    randomWeatherDetailsSentence():String{
        var randomNumber: number=this.randomInt(0,json.weatherDetails.length-1);
        let s=json.weatherDetails[randomNumber];
        return s;
    } 
    randomWeatherHighSentence():String{
        var randomNumber: number=this.randomInt(0,json.weatherHigh.length-1);
        let s=json.weatherHigh[randomNumber];
        return s;
    }
    randomWeatherLowSentence():String{
        var randomNumber: number=this.randomInt(0,json.weatherLow.length-1);
        let s=json.weatherLow[randomNumber];
        return s;
    }
    randomNewsSentence():String{
        var randomNumber: number=this.randomInt(0,json.news.length-1);
        let s=json.news[randomNumber];
        return s;
    }
    randomSportSentence():String{
        var randomNumber: number=this.randomInt(0,json.sport.length-1);
        let s=json.sport[randomNumber];
        return s;
    }
    randomStockSentence():String{
        var randomNumber: number=this.randomInt(0,json.stock.length-1);
        let s=json.stock[randomNumber];
        return s;
    }
    randomCryptoSentence():String{
        var randomNumber: number=this.randomInt(0,json.crypto.length-1);
        let s=json.crypto[randomNumber];
        return s;
    }
    randomWorkflowDoneSentence():String{
        var randomNumber: number=this.randomInt(0,json.workflowDone.length-1);
        let s=json.workflowDone[randomNumber];
        return s;
    }


 };

