const { Given, When, Then, Before, After } = require('cucumber')
const expect = require('chai').expect
const puppeteer = require("puppeteer")

Before (async function () {
    return await this.launchBrowser()
})

After (async function () {
    return await this.closeBrowser()
})

Given('Empty ToDo list', async function () {
    return await this.visitEmptyToDoList()
})

When('I write {string} to <textbox> and press <enter>', async function (string) {
    return await this.addItemToTheTODOlist(string)
})
  
Then('I should see {string} item in ToDo list', async function(string){
    return await this.checkFirstItemONTheTODOlist(string)
})

Given('ToDo list with {string} item', async function (string) {
    return await this.getToDoListWithSingleItem(string)
});

Then('I should see {string} item insterted to ToDo list below {string} item', async function (string2, string1) {
    return await this.checkBothItemONTheTODOlist(string2, string1)
});

When('I click on <checkbox> next to {string} item', async function (string) {
    return await this.clickOnCheckBox(string)
  });

Then('I should see {string} item marked as DONE', async function (string) {
    return await this.checkMarkAsDone(string)
});

Given('ToDo list with marked item', async function () {
    return await this.getToDoListWithMarkedItem()
  });

Then('I should see {string} item marked as UNDONE', async function (string) {
    return await this.checkMarkAsUnDone(string)
});

When('I click on <delete button> next to {string} item', async function (string) {
    return await this.clickOnDeleteButtonForFirstItem(string)
});

Then('List should be empty', async function () {
    return await this.checkToDoListEmpty()
});

Given('ToDo list with {string} and {string} item in order', async function (string1, string2) {
    return await this.addTwoItemToTheTODOlist(string1, string2)
});