export const radio = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.$eval(selector, el => el.click());
};
