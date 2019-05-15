/*
* File: BlockFeedRSS.ts
* Version: 0.0.1
* Date: Date: 2019-03-29
* Author: Stefano Zanatta
* License:
*
* History:
* Author            || Date         ||  description
* Stefano Zanatta   || 2019-03-29   ||  Created file
* Stefano Zanatta   || 2019-03-29   ||  Implemented
*/
import {BlockFeedRSS} from "../../lambda/blocks/BlockFeedRSS";
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('BlockFeedRSS', function(){
   it('block from configuration - positive', function(){
        const config = {
            "URL": "https://www.feedforall.com/sample.xml"
          };
        const blockFeedRSS = new BlockFeedRSS(config);
        const oracle = 'RSS Solutions for Restaurants <b>FeedForAll </b>helps Restaurant\'s communicate with customers. Let your customers know the latest specials or events.<br>\r\n<br>\r\nRSS feed uses include:<br>\r\n<i><font color="#FF0000">Daily Specials <br>\r\nEntertainment <br>\r\nCalendar of Events </i></font> RSS Solutions for Schools and Colleges FeedForAll helps Educational Institutions communicate with students about school wide activities, events, and schedules.<br>\r\n<br>\r\nRSS feed uses include:<br>\r\n<i><font color="#0000FF">Homework Assignments <br>\r\nSchool Cancellations <br>\r\nCalendar of Events <br>\r\nSports Scores <br>\r\nClubs/Organization Meetings <br>\r\nLunches Menus </i></font> RSS Solutions for Computer Service Companies FeedForAll helps Computer Service Companies communicate with clients about cyber security and related issues. <br>\r\n<br>\r\nUses include:<br>\r\n<i><font color="#0000FF">Cyber Security Alerts <br>\r\nSpecials<br>\r\nJob Postings </i></font> RSS Solutions for Governments FeedForAll helps Governments communicate with the general public about positions on various issues, and keep the community aware of changes in important legislative issues. <b><i><br>\r\n</b></i><br>\r\nRSS uses Include:<br>\r\n<i><font color="#00FF00">Legislative Calendar<br>\r\nVotes<br>\r\nBulletins</i></font> RSS Solutions for Politicians FeedForAll helps Politicians communicate with the general public about positions on various issues, and keep the community notified of their schedule. <br>\r\n<br>\r\nUses Include:<br>\r\n<i><font color="#FF0000">Blogs<br>\r\nSpeaking Engagements <br>\r\nStatements<br>\r\n </i></font> RSS Solutions for Meteorologists FeedForAll helps Meteorologists communicate with the general public about storm warnings and weather alerts, in specific regions. Using RSS meteorologists are able to quickly disseminate urgent and life threatening weather warnings. <br>\r\n<br>\r\nUses Include:<br>\r\n<i><font color="#0000FF">Weather Alerts<br>\r\nPlotting Storms<br>\r\nSchool Cancellations </i></font> RSS Solutions for Realtors & Real Estate Firms FeedForAll helps Realtors and Real Estate companies communicate with clients informing them of newly available properties, and open house announcements. RSS helps to reach a targeted audience and spread the word in an inexpensive, professional manner. <font color="#0000FF"><br>\r\n</font><br>\r\nFeeds can be used for:<br>\r\n<i><font color="#FF0000">Open House Dates<br>\r\nNew Properties For Sale<br>\r\nMortgage Rates</i></font> RSS Solutions for Banks / Mortgage Companies FeedForAll helps <b>Banks, Credit Unions and Mortgage companies</b> communicate with the general public about rate changes in a prompt and professional manner. <br>\r\n<br>\r\nUses include:<br>\r\n<i><font color="#0000FF">Mortgage Rates<br>\r\nForeign Exchange Rates <br>\r\nBank Rates<br>\r\nSpecials</i></font> RSS Solutions for Law Enforcement <b>FeedForAll</b> helps Law Enforcement Professionals communicate with the general public and other agencies in a prompt and efficient manner. Using RSS police are able to quickly disseminate urgent and life threatening information. <br>\r\n<br>\r\nUses include:<br>\r\n<i><font color="#0000FF">Amber Alerts<br>\r\nSex Offender Community Notification <br>\r\nWeather Alerts <br>\r\nScheduling <br>\r\nSecurity Alerts <br>\r\nPolice Report <br>\r\nMeetings</i></font>';
        expect(blockFeedRSS.text()).to.become(oracle);
    });

});