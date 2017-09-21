import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {todo} from "./todo";
import {TodoComponent} from "./todo.component";
import {TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";
//import { PipeModule } from "../../pipe.module";

describe("Todo component", () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getTodoById: (TodoId: string) => Observable<todo>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodoById: (TodoId: string) => Observable.of([
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
            ].find(todo => todo.id === TodoId))
        };

        TestBed.configureTestingModule({
            //imports: [PipeModule],
            declarations: [TodoComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            todoComponent = fixture.componentInstance;
        });
    }));

    it("can retrieve Liz by ID", () => {
        todoComponent.setId("liz_id");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Liz");
        expect(todoComponent.todo.category).toBe("thing");
    });

    it("returns undefined for Unicorn", () => {
        todoComponent.setId("Unicorn");
        expect(todoComponent.todo).not.toBeDefined();
    });

});
