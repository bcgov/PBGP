export const text = async (page, selector, value) => {
  await page.waitForSelector(selector);
  await page.type(selector, value);
};
