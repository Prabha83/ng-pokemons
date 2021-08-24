import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual(
      'Place sticky footer content here.'
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

  it('should display the menu options to navigate', async () => {
    await page.navigateTo();

    const actual = await page.getTextByClass('.navbar-start .navbar-item');

    expect(actual).toEqual('Home');
  });

  it('should navigate to home page', async () => {
    await page.navigateTo();

    await page.clickLink('Home');

    expect(browser.getCurrentUrl()).toContain('home');
    expect(await page.getTextByClass('.title')).toEqual('Home');
  });

  it('should navigate to pokemons page', async () => {
    await page.navigateTo();

    await page.clickLink('Pokemons');

    expect(browser.getCurrentUrl()).toContain('pokemons');
    expect(await page.getTextByClass('.title')).toEqual('List of pokemons');
  });

  it('should show the first 20 pokemons', async () => {
    await page.navigateTo();

    await page.clickLink('Pokemons');

    expect(await page.getTextByClassAndText('.subtitle', '#020')).toEqual(
      '#020'
    );
  });

  it('should show the next 20 pokemons', async () => {
    await page.navigateTo();

    await page.clickLink('Pokemons');
    await page.clickButton('Load more');

    expect(await page.getTextByClassAndText('.subtitle', '#040')).toEqual(
      '#040'
    );
  });

  it('should show the search pokemons', async () => {
    await page.navigateTo();

    await page.clickLink('Pokemons');
    await page.enterInput('.input', '120');

    expect(await page.getTextByClassAndText('.title', 'staryu')).toEqual(
      'staryu #120'
    );
  });

  it('should show pokemon detail', async () => {
    await page.navigateTo();

    await page.clickLink('Pokemons');
    await page.enterInput('.input', '120');
    await page.clickLink('Detail');

    expect(await page.getTextByClassAndText('.title', 'STARYU')).toEqual(
      'STARYU #120'
    );
  });
});
