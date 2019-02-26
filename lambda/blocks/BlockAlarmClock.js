/*
* File: BlockAlarmClock.js
* Version: 0.0.1
* Date: 2019-02-25
* Author: Matteo Depascale
* License:
*
* History:
* Author                || Date         || Description
* Matteo Depascale      || 2019-02-25   || Created file
*/

//N.B: must have a look at https://momentjs.com/

/* User will start the workflow, when it's alarm's turn then alexa will start 
 * timer (song volume 0), timer stops when countdown == 0 and Alarm will ring
*/ 


class BlockAlarmClock extends Block {
    dateTime;
    
    constructor(blockID) {
        this.DateTime=DateTimeFromDB(blockID);
    }

    get alarmClock() {
        //logic here
        return DateTime;
    }

    get dateTimeFromDB(blockID) {
        //blockID is used to search the correct text from dynamoDB
    }

    get timerCountDown() {
        //DateTime-now=countDown
    }

    startCountDown() {
        //start music untill countDown === 0
        return true; //or false if countDown !== 0
    }

    text() {
        return startCountDown();
    }
}

