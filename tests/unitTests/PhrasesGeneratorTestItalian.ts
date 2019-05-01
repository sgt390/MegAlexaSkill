import { PhrasesGenerator } from "../../lambda/blocks/utility/PhrasesGenerator";

/*
* File: PhrasesGeneratorTestItalian.ts
* Version: 1.0.0
* Date: 2019-03-24
* Author: Stefano Zanatta
* License:
*
* History:
* Author                    || Date         || Description
* Stefano Zanatta           || 2019-04-21   || Created file
* Bianca Andrea Ciuche      || 2019-04-22   || Implemented clasd
* Stefano Zanatta           || 2019-04-22   || Verified
* Matteo Depascale          || 2019-04-26   || Approved
*/

import {expect} from 'chai';

PhrasesGenerator.setLanguage("it-IT");
// phrases are always random, just check the type, not empty, false positive
describe('Phrase generator - randomAutenticationMessageSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomAddDeleteModifySentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomAddDeleteModifySentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomAddDeleteModifySentence()).to.not.equal('error');
    });
});
describe('Phrase generator - randomStartSkillSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomStartSkillSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomStartSkillSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomStartSkillSentence()).to.not.equal('error');
    });
});
describe('Phrase generator - randomWorkflowStartSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWorkflowStartSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWorkflowStartSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWorkflowStartSentence()).to.not.equal('error');
    });
});
describe('Phrase generator - randomWorkflowNameSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWorkflowNameSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWorkflowNameSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWorkflowNameSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomErrorCommandSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomErrorCommandSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomErrorCommandSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomErrorCommandSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomFinishSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomFinishSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomFinishSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomFinishSentence()).to.not.equal('error');
    });
});
describe('Phrase generator - randomDoneWorkflowSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomDoneWorkflowSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomDoneWorkflowSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomDoneWorkflowSentence()).to.not.equal('error');
    });
});
describe('Phrase generator - randomWrongPinSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWrongPinSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWrongPinSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWrongPinSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomCorrectPinSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomCorrectPinSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomCorrectPinSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomCorrectPinSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomAddDeleteModifySentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomAddDeleteModifySentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomAddDeleteModifySentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomAddDeleteModifySentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomAddListSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomAddListSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomAddListSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomAddListSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomDeleteListSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomDeleteListSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomDeleteListSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomDeleteListSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomNotPresentSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomNotPresentSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomNotPresentSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomNotPresentSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomEditedElementSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomEditedElementSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomEditedElementSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomEditedElementSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomReadEmailSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomReadEmailSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomReadEmailSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomReadEmailSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWriteTwitterSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWriteTwitterSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWriteTwitterSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWriteTwitterSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomSuccessTwitterSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomSuccessTwitterSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomSuccessTwitterSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomSuccessTwitterSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWeatherStartSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWeatherStartSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWeatherStartSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWeatherStartSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWeatherGradeSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWeatherGradeSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWeatherGradeSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWeatherGradeSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWeatherDetailsSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWeatherDetailsSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWeatherDetailsSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWeatherDetailsSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWeatherHighSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWeatherHighSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWeatherHighSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWeatherHighSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWeatherCelsiusSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWeatherCelsiusSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWeatherCelsiusSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWeatherCelsiusSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - randomWeatherLowSentence', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.randomWeatherLowSentence()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.randomWeatherLowSentence()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.randomWeatherLowSentence()).to.not.equal('error');
    });
});

describe('Phrase generator - atTime', function(){
    it('type is correct', async function(){
        expect(PhrasesGenerator.atTime()).to.be.a('string');
    });
    it('not empty', async function(){
        expect(PhrasesGenerator.atTime()).to.not.equal('');
    });
    it('false positive', async function(){
        expect(PhrasesGenerator.atTime()).to.not.equal('error');
    });
});
