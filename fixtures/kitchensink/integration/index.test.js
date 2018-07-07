const expectSelectorToHaveColor = async (page, selector, style) => {
  await page.waitForSelector(selector);
  const selectorColor = await page.evaluate((providedSelector) => {
    const el = document.querySelector(providedSelector);
    const computedStyle = window.getComputedStyle(el);
    return computedStyle.getPropertyValue('color');
  }, selector);
  expect(selectorColor).toBe(style);
};

const expectImageToLoad = async (page, selector) => {
  await page.waitForSelector(selector);
  const imageLoaded = await page.evaluate((providedSelector) => {
    const el = document.querySelector(providedSelector);
    return el.complete && el.naturalHeight !== 0;
  }, selector);
  expect(imageLoaded).toBeTruthy();
};

const isProduction = process.env.TEST_URL === 'http://localhost:5000'

describe('integration', () => {
  beforeAll(async () => {
    await page.goto(process.env.TEST_URL);
  });

  it('FileEnvVariables', async () => {
    if (isProduction) {
      await expect(page).toMatch('production');
    } else {
      await expect(page).toMatch('development');
    }
  });

  it('CssInclusion', async () => {
    await expectSelectorToHaveColor(
      page,
      '#feature-css-inclusion',
      'rgb(219, 112, 147)'
    );
  });

  it('CssModuleInclusion', async () => {
    await expectSelectorToHaveColor(
      page,
      '[class*="cssModulesInclusion"]',
      'rgb(173, 216, 230)'
    );
    await expectSelectorToHaveColor(
      page,
      '[class*="cssModulesIndexInclusion"]',
      'rgb(173, 216, 230)'
    );
  });

  it('ImageInclusion', async () => {
    await expectImageToLoad(page, '#feature-image-inclusion');
  });

  it('JsonInclusion', async () => {
    await expect(page).toMatch('This is an abstract.');
  });

  it('LinkedModules', async () => {
    await expect(page).toMatch('2.0.0');
  });

  it('SassInclusion', async () => {
    await expectSelectorToHaveColor(
      page,
      '#feature-sass-inclusion',
      'rgb(220, 20, 60)'
    );
  });

  it('SassModulesInclusion', async () => {
    await expectSelectorToHaveColor(
      page,
      '[class*="sassModulesInclusion"]',
      'rgb(173, 216, 230)'
    );
    await expectSelectorToHaveColor(
      page,
      '[class*="sassModulesIndexInclusion"]',
      'rgb(173, 216, 230)'
    );
  });

  it('ScssInclusion', async () => {
    await expectSelectorToHaveColor(
      page,
      '#feature-scss-inclusion',
      'rgb(220, 20, 60)'
    );
  });

  it('ScssModulesInclusion', async () => {
    await expectSelectorToHaveColor(
      page,
      '[class*="scssModulesInclusion"]',
      'rgb(173, 216, 230)'
    );
    await expectSelectorToHaveColor(
      page,
      '[class*="scssModulesIndexInclusion"]',
      'rgb(173, 216, 230)'
    );
  });

  it('SvgComponent', async () => {
    await expect(page).toMatch('Svg Title');
  });

  it('JsxInclusion', async () => {
    await expect(page).toMatch('Jsx is included.');
  });

  it('TsxInclusion', async () => {
    await expect(page).toMatch('Tsx is included.');
  });

  it('TsInclusion', async () => {
    await expect(page).toMatch('Ts is included.');
  });
});
