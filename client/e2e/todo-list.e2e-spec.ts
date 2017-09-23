import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('angular-spark-lab', () => {
    let page: TodoPage;

    beforeEach(() => {
        page = new TodoPage();
    });

    it('should get and highlight Todo Owner attribute ', () => {
        page.navigateTo();
        expect(page.getTodoTitle()).toEqual('Todo Owner');
    });

    it('should type something in filter owner box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAnOwner("Fry");
        expect(page.getFirstTodo()).toEqual("Fry has a todo where they \n" +
            "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo. \n" +
            "in category video games \n" +
            "with status false");
    });

    it('should type something in filter status box and check that it returned correct element', () => {
        page.navigateTo();
        page.getTodoByStatus("false");
        expect(page.getFirstTodo()).toEqual("Blanche has a todo where they \n" +
            "Write code for project thingy and stuff \n" +
            "in category software design \n" +
            "with status false");

    });

    it('should type something in filter body box and check that it returned correct element', () => {
        page.navigateTo();
        page.getTodoByBody("Aliqua esse aliqua");
        expect(page.getFirstTodo()).toEqual("Blanche has a todo with the body \n" +
            "\"Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit voluptate ad nisi elit dolore laboris.\" \n" +
            "in category groceries \n" +
            "with status true");

    });

    it('should type something in filter category box and check that it returned correct element', () => {
        page.navigateTo();
        page.getTodoByCategory("software design");
        expect(page.getFirstTodo()).toEqual("Blanche has a todo where they \n" +
            "Write code for project thingy and stuff \n" +
            "in category software design \n" +
            "with status false");

    });

    it('should click on limit 7 times and return 7 elements then', () => {
        page.navigateTo();
        page.getTodosByLimit();
        for (let i = 0; i < 7; i++) {
            page.selectUpKey();
        }

        expect(page.getFirstTodo()).toEqual("Blanche has a todo where they \n" +
            "Write code for project thingy and stuff \n" +
            "in category software design \n" +
            "with status false");

    });
});
