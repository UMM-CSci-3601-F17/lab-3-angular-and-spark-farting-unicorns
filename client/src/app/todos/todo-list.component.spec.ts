import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {todo} from "./todo";
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "sam_id",
                    owner: "Sam",
                    status: false,
                    body: "This is a todo",
                    category: "person"
                },
                {
                    id: "liz_id",
                    owner: "Liz",
                    status: true,
                    body: "This is also a todo",
                    category: "thing"
                },
                {
                    id: "nic_id",
                    owner: "Nic",
                    status: false,
                    body: "Make the 1302 exam super easy",
                    category: "professor"
                }
            ])
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoListComponent],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    it("contains an owner named 'Sam'", () => {
        expect(todoList.todos.some((todo: todo) => todo.owner === "Sam")).toBe(true);
    });

    it("contain a user named 'Liz'", () => {
        expect(todoList.todos.some((todo: todo) => todo.owner === "Liz")).toBe(true);
    });

    it("doesn't contain a user named 'Unicorn'", () => {
        expect(todoList.todos.some((todo: todo) => todo.owner === "Unicorn")).toBe(false);
    });

    it("has two users that are false", () => {
        expect(todoList.todos.filter((todo: todo) => todo.status === false).length).toBe(2);
    });

});

describe("Misbehaving Todo List", () => {
    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            declarations: [TodoListComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a TodoListService", () => {
        // Since the observer throws an error, we don't expect users to be defined.
        expect(todoList.todos).toBeUndefined();
    });
});
