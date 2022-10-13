import moment from 'moment';

export const calendar = async (page, selector, disableFuture = false) => {
  const currentYear = moment().year();
  const randomYear = Math.floor(Math.random() * (disableFuture ? currentYear - 1900 : 199)) + 1;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomWeek = Math.floor(Math.random() * 5) + 1;
  const randomDay = Math.floor(Math.random() * 7) + 1;

  await page.waitForSelector(selector);
  await page.click(selector);
  await page.waitForSelector('.MuiDialog-root');
  await page.click('.MuiPickersToolbarText-toolbarTxt');
  await page.click(`.MuiPickersYear-root:nth-of-type(${randomYear})`);

  for (let i = 0; i < randomMonth; i++) {
    const randomBinary = Math.floor(Math.random() * 2) + 1;
    await page.click(`.MuiPickersCalendarHeader-iconButton:nth-of-type(${randomBinary})`);
  }

  await page.click(`.MuiPickersCalendar-week:nth-of-type(${randomWeek}) > div[role=presentation]:nth-of-type(${randomDay})`);
  await page.click('.MuiDialogActions-root > button:nth-of-type(2)');
  await page.waitForSelector('.MuiDialog-root', { hidden: true });
};
