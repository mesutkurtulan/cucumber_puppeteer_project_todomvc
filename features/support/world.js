const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const puppeteer = require('puppeteer')

class CustomWorld {
  async launchBrowser() {
    this.browser = await puppeteer.launch({ 
      headless: false,
      slowMo:0,
      devtools:false
    })
    this.page = await this.browser.newPage()
    await this.page.setDefaultTimeout(60000)
    await this.page.setDefaultNavigationTimeout(60000)

  }

  async closeBrowser() {
    await this.browser.close()
  }

  async visitEmptyToDoList() {
    await this.page.goto('https://todomvc.com/examples/vue/')
  }

  async addItemToTheTODOlist(string) {
    await this.page.waitForSelector('h1');
    await this.page.type('.new-todo', string);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async addTwoItemToTheTODOlist(string1, string2) {
    await this.page.goto('https://todomvc.com/examples/vue/')
    await this.page.waitForSelector('h1');
    await this.page.type('.new-todo', string1);
    await this.page.keyboard.press('Enter');
    await this.page.type('.new-todo', string2);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async checkFirstItemONTheTODOlist(string) {
    const actualString = await this.page.$eval('.todo-list > li:nth-child(1) > div > label', element=>element.textContent)
    expect(actualString).to.be.a('string', string)
  }

  async getToDoListWithSingleItem(string) {
    await this.page.goto('https://todomvc.com/examples/vue/')
    await this.page.waitForSelector('h1');
    await this.page.type('.new-todo', string);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async checkBothItemONTheTODOlist(string2, string1) {
    const actualString1 = await this.page.$eval('.todo-list > li:nth-child(1) > div > label', element=>element.textContent)
    expect(actualString1).to.be.a('string', string1)
    const actualString2 = await this.page.$eval('.todo-list > li:nth-child(2) > div > label', element=>element.textContent)
    expect(actualString2).to.equal(string2)
  }

  async clickOnCheckBox(string) {
    await this.page.waitForSelector('.toggle');
    await this.page.click('.toggle');
    await this.page.waitForTimeout(500);
  }

  async checkMarkAsDone(string) {
    const todoCompleted = await this.page.evaluate('document.querySelector(".todo-list > li").getAttribute("class")')
    expect(todoCompleted).to.equal('todo completed')
  }

  async checkMarkAsUnDone(string) {
    const todo = await this.page.evaluate('document.querySelector(".todo-list > li").getAttribute("class")')
    expect(todo).to.equal('todo')
  }

  async getToDoListWithMarkedItem() {
    await this.page.goto('https://todomvc.com/examples/vue/')
    await this.page.waitForSelector('h1');
    await this.page.type('.new-todo', 'buy some milk');
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector('.toggle');
    await this.page.click('.toggle');
    await this.page.waitForTimeout(500);
  }

  async clickOnDeleteButtonForFirstItem(string) {
    await this.page.waitForSelector('.toggle');
    await this.page.hover('.toggle')
    await this.page.waitForSelector('.todo-list > li:nth-child(1) > div > button'); 
    await this.page.click('.todo-list > li:nth-child(1) > div > button');
  }

  async clickOnDeleteButtonForSecondItem(string) {
    await this.page.waitForSelector('.toggle');
    await this.page.hover('.toggle')
    await this.page.waitForSelector('.todo-list > li:nth-child(2) > div > button'); 
    await this.page.click('.todo-list > li:nth-child(2) > div > button');
  }

  async checkToDoListEmpty() {
    await this.page.waitForSelector('.main > label');
    const emptyList = await this.page.$eval('.main > label', element=>element.textContent)
    expect(emptyList).to.be.a('string', 'Mark all as complete')
  }

}

setWorldConstructor(CustomWorld)