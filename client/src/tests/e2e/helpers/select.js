export const select = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.click(selector);
  await page.waitForSelector('.MuiPopover-root');

  const childrenLength = (await page.$$('.MuiPopover-root ul li:not(.Mui-disabled)')).length;
  const randomChild = Math.floor(Math.random() * (childrenLength)) + 1;

  await page.click(`.MuiPopover-root ul li:nth-of-type(${randomChild + 1})`);
  await page.waitForSelector('.MuiPopover-root', { hidden: true });

  return randomChild;
};
