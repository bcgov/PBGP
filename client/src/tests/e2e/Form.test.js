import puppeteer from 'puppeteer';
import faker from 'faker';

import { Question } from '../../constants';
import { calendar, select, radio, text } from './helpers';

let browser;
let page;
const envTraveller = () => process.env.APP_OUTPUT === 'TRAVELLER' || process.env.APP_OUTPUT === 'ALL' || !process.env.APP_OUTPUT ? it : it.skip;

describe('E2E - Form', () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: process.env.CI === true,
      defaultViewport: null,
    });
  });

  afterAll(() => {
    browser.close();
  });

  describe('Form succeeds when', () => {

    beforeAll(async () => {
      page = (await browser.pages())[0];
      await page.goto('http://localhost:3000', { waitUntil: ['networkidle0', 'domcontentloaded'] });
      await page.waitForSelector('form');
    });

    envTraveller()('populates the `Primary Contact` section', async () => {
      await text(page, 'input[name=firstName]', faker.name.firstName());
      await text(page, 'input[name=lastName]', faker.name.lastName());
      await calendar(page, '#mui-component-calendar-dateOfBirth', true);
      await text(page, 'input[name=phoneNumber]', faker.phone.phoneNumberFormat());
      await text(page, 'input[name=email]', faker.internet.email());
    }, 30000);

    envTraveller()('populates the `Travel Information` section', async () => {
      await radio(page, `input[name=hasAdditionalTravellers][value=${Question.Yes}]`);
      await page.waitFor(1000);
      const randomNumberOfAdditionalTravellers = await select(page, '#mui-component-select-numberOfAdditionalTravellers');
      for (let i = 0; i < randomNumberOfAdditionalTravellers; i++) {
        await text(page, `input[name='additionalTravellers[${i}].firstName']`, faker.name.firstName());
        await text(page, `input[name='additionalTravellers[${i}].lastName']`, faker.name.lastName());
        await calendar(page, `div[id='mui-component-calendar-additionalTravellers[${i}].dateOfBirth']`, true);
      }
    }, 60000);

    envTraveller()('populates the `Arrival Information` section', async () => {
      await select(page, `#mui-component-select-nameOfAirportOrBorderCrossing`);
      await calendar(page, '#mui-component-calendar-arrivalDate');
      await text(page, 'input[name=arrivalCityOrTown]', faker.address.city());
      await select(page, `#mui-component-select-arrivalCountry`);
      const randomNumberOfAdditionalCitiesAndCountries = await select(page, '#mui-component-select-numberOfAdditionalCitiesAndCountries');
      for (let i = 0; i < randomNumberOfAdditionalCitiesAndCountries; i++) {
        await text(page, `input[name='additionalCitiesAndCountries[${i}].cityOrTown']`, faker.address.city());
        await select(page, `div[id='mui-component-select-additionalCitiesAndCountries[${i}].country']`);
      }
    }, 60000);

    envTraveller()('populates the `Isolation Questionnaire` section', async () => {
      await radio(page, `input[name=hasPlaceToStayForQuarantine][value=${Question.Yes}]`);
      await page.waitFor(1000);
      await text(page, `input[name='quarantineLocation.address']`, faker.fake('{{address.streetAddress}} {{address.streetSuffix}}'));
      await text(page, `input[name='quarantineLocation.cityOrTown']`, faker.address.city());
      await select(page, `div[id='mui-component-select-quarantineLocation.provinceTerritory']`);
      await text(page, `input[name='quarantineLocation.postalCode']`, faker.address.zipCode());
      await text(page, `input[name='quarantineLocation.phoneNumber']`, faker.phone.phoneNumberFormat());
      await select(page, `div[id='mui-component-select-quarantineLocation.typeOfPlace']`);
      await page.waitFor(1000);
      if (!!(await page.$(`input[name='quarantineLocation.typeOfPlaceDetails']`))) {
        await text(page, `input[name='quarantineLocation.typeOfPlaceDetails']`, faker.random.words());
      }
      await select(page, `div[id='mui-component-select-quarantineLocation.howToGetToPlace']`);
      await page.waitFor(1000);
      if (!!(await page.$(`input[name='quarantineLocation.howToGetToPlaceDetails']`))) {
        await text(page, `input[name='quarantineLocation.howToGetToPlaceDetails']`, faker.random.words());
      }
      await radio(page, `input[name='quarantineLocation.otherPeopleResiding'][value=${Question.No}]`);
      await radio(page, `input[name='quarantineLocation.doesVulnerablePersonLiveThere'][value=${Question.No}]`);
      await radio(page, `input[name=isAbleToMakeNecessaryArrangements][value=${Question.Yes}]`);
    }, 30000);

    envTraveller()('submits the form', async () => {
      await page.click('button[type=submit]');
      const response = await page.waitForResponse('http://localhost:3000/api/v1/form');
      const { message, confirmationNumber, viableIsolationPlan } = await response.json();
      await page.waitForSelector('#confirmationNumber');

      expect(message).toEqual('Form submission successful');
      expect(viableIsolationPlan).toEqual(true);
      expect(await page.$eval('#confirmationNumber', el => el.innerHTML)).toEqual(confirmationNumber);
    }, 10000);
  });

  describe('Form fails when', () => {

    envTraveller()('attempts to submit an empty form', async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:3000', { waitUntil: ['networkidle0', 'domcontentloaded'] });
      await page.waitForSelector('form');
      await page.click('button[type=submit]');
      await page.waitForSelector('.MuiTypography-colorError');
      const errors = await page.$$('.MuiTypography-colorError');
      expect(errors.length).toBe(11);
    }, 10000);
  });
});
