const timeout = 5000;

describe('/ (Home Page)', () => {
    let page;

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:3030');
    }, timeout);

    it('should load without error', async () => {
      await page.waitForSelector('.app-main-content H1');
      const text = await page.$eval('.app-main-content H1', (e) => e.textContent);
      expect(text).toContain('Mini starter');
    });
  },
  timeout
);
