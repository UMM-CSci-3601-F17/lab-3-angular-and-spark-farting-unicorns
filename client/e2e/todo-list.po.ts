import {browser, element, by, Key} from 'protractor';

export class TodoPage {
    navigateTo() {
        return browser.get('/todos');
    }

    //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return "highlighted";
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getTodoTitle() {
        let title = element(by.id('title')).getText();
        this.highlightElement(by.id('title'));

        return title;
    }

    typeAnOwner(owner: string) {
        let input = element(by.tagName('input'));
        input.click();
        input.sendKeys(owner);
    }


    selectUpKey() {
        browser.actions().sendKeys(Key.ARROW_UP).perform();
    }


    getTodoByStatus(status: string) {
        let input = element(by.tagName('input'));
        input.click();
        input.sendKeys(Key.TAB, status);
    }

    getTodoByBody(body: string) {
        let input = element(by.tagName('input'));
        input.click();
        input.sendKeys(Key.TAB, Key.TAB, body);
    }

    getTodoByCategory(category: string) {
        let input = element(by.tagName('input'));
        input.click();
        input.sendKeys(Key.TAB, Key.TAB, Key.TAB, category);
    }

    getTodosByLimit() {
        let input = element(by.tagName('input'));
        input.click();
        input.sendKeys(Key.TAB, Key.TAB, Key.TAB, Key.TAB);
    }

    getFirstTodo() {
        let todo = element(by.id('todos')).getText();
        this.highlightElement(by.id('todos'));

        return todo;
    }
}
