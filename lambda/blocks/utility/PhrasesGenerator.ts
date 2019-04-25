
export class PhrasesGenerator {
    /**
     * * generate a random integer between min and max
     * * @param {Number} min 
     *  * @param {Number} max
     * * @return {Number} random generated integer 
     * */
   
   private static language:string="en-US";
   private static JSON:any=require  ('../../JSONconfigurations/phrases-EN.json');

   public static setLanguage(lng:string){
       this.language=lng;
       if(this.language=="it-IT") 
       PhrasesGenerator.JSON= require ('../../JSONconfigurations/phrases-IT.json');
       else PhrasesGenerator.JSON= require  ('../../JSONconfigurations/phrases-EN.json');
   }

   private static randomInt(min: number, max :number): number{
         return Math.floor(Math.random() * (max - min + 1)) + min;
       }

   static randomStartSkillSentence():string{
      var randomNumber: number=this.randomInt(0,PhrasesGenerator.JSON.skillStart.length-1);
      let s: string=PhrasesGenerator.JSON.skillStart[randomNumber];
      return s;
   }
   
   static randomWorkflowStartSentence():string{
   var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.workflowStart.length-1);
      let s: string=PhrasesGenerator.JSON.workflowStart[randomNumber];
      return s;
   }
     
   static randomPinBlockStartSentence(): string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.pinBlockStart.length-1);
          let s: string=PhrasesGenerator.JSON.pinBlockStart[randomNumber];
          return s;
       }

   static randomWrongPinSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.wrongPin.length-1);
       let s: string=PhrasesGenerator.JSON.wrongPin[randomNumber];
       return s;
       }
   static randomCorrectPinSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.correctPin.length-1);
       let s: string=PhrasesGenerator.JSON.correctPin[randomNumber];
       return s;
       }
   static randomReadListSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.readList.length-1);
       let s: string=PhrasesGenerator.JSON.readList[randomNumber];
       return s;
       }
       
   static randomReadTwitterSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.readTwitter.length-1);
       let s: string=PhrasesGenerator.JSON.readTwitter[randomNumber];
       return s;
       }
   static randomFeedRssSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.feedRss.length-1);
       let s: string=PhrasesGenerator.JSON.feedRss[randomNumber];
       return s;
       }
   static randomWeatherStartSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.weatherStart.length-1);
       let s: string=PhrasesGenerator.JSON.weatherStart[randomNumber];
       return s;
   }   
   static randomWeatherGradeSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.weatherGrade.length-1);
       let s: string=PhrasesGenerator.JSON.weatherGrade[randomNumber];
       return s;
   } 
   static randomWeatherDetailsSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.weatherDetails.length-1);
       let s: string=PhrasesGenerator.JSON.weatherDetails[randomNumber];
       return s;
   } 
   static randomWeatherHighSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.weatherHigh.length-1);
       let s: string=PhrasesGenerator.JSON.weatherHigh[randomNumber];
       return s;
   }
   static randomWeatherLowSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.weatherLow.length-1);
       let s: string=PhrasesGenerator.JSON.weatherLow[randomNumber];
       return s;
   }
   static randomNewsSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.news.length-1);
       let s: string=PhrasesGenerator.JSON.news[randomNumber];
       return s;
   }
   static randomSportSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.sport.length-1);
       let s: string=PhrasesGenerator.JSON.sport[randomNumber];
       return s;
   }
   static randomStockSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.stock.length-1);
       let s: string=PhrasesGenerator.JSON.stock[randomNumber];
       return s;
   }
   static randomCryptoSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.crypto.length-1);
       let s: string=PhrasesGenerator.JSON.crypto[randomNumber];
       return s;
   }
   static randomWorkflowDoneSentence():string{
       var randomNumber: number=PhrasesGenerator.randomInt(0,PhrasesGenerator.JSON.workflowDone.length-1);
       let s: string=PhrasesGenerator.JSON.workflowDone[randomNumber];
       return s;
   }


};

