import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async getTextByClass(className: string): Promise<string> {
    return element(by.css(className)).getText();
  }

  async clickLink(linkText: string): Promise<void> {
    return element(by.partialLinkText(linkText)).click();
  }

  async clickButton(btnText: string): Promise<void> {
    return element(by.partialButtonText(btnText)).click();
  }

  async enterInput(className: string, value: string): Promise<void> {
    return element(by.css(className)).sendKeys(value);
  }

  async getTextByClassAndText(
    className: string,
    linkText: string
  ): Promise<string> {
    return element(by.cssContainingText(className, linkText)).getText();
  }
}
