import { browser, element, ExpectedConditions as ec } from 'protractor';
import { promise, By } from 'selenium-webdriver';

export function waitForElement(selector: By): promise.Promise<{}> {
  return browser.wait(ec.presenceOf(element(selector)));
}
