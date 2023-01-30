import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  createFormControlState,
  FormControlState,
  NgrxFormsModule,
  SetUserDefinedPropertyAction,
} from 'ngrx-forms';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { AutocompleteInputDirective } from './autocompleteinput.directive';

@Component({
  template: `
    <input
      matInput
      [ngrxFormControlState]="myControl"
      matAutocomplete
      name="myControl"
      data-tfa="myControl"
    />
  `,
})
class TestAutocompleteInputComponent {
  myControl: FormControlState<string>;
}

describe('Directive: AutocompleteInputDirective', () => {
  let component: TestAutocompleteInputComponent;
  let fixture: ComponentFixture<TestAutocompleteInputComponent>;
  // let inputEl: DebugElement;
  let actionsSubject: ReplaySubject<Action>;
  let directive: AutocompleteInputDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgrxFormsModule, MatInputModule],
      declarations: [
        TestAutocompleteInputComponent,
        AutocompleteInputDirective,
      ],
      providers: [ActionsSubject],
    });
    fixture = TestBed.createComponent(TestAutocompleteInputComponent);
    component = fixture.componentInstance;
    component.myControl = createFormControlState('FORM_ID.mycontrol', '');
    fixture.detectChanges();
    // inputEl = fixture.debugElement.query(By.css('input'));
    actionsSubject = new ReplaySubject<Action>();
    directive = new AutocompleteInputDirective(actionsSubject as any);
    directive.ngrxFormControlState = component.myControl;
  });

  it('should set the default min value for autocomplete on init', fakeAsync(() => {
    directive.ngOnInit();
    let action;
    actionsSubject.pipe(first()).subscribe((_action) => (action = _action));
    tick(1000);
    expect(action).toEqual(
      new SetUserDefinedPropertyAction(
        'FORM_ID.mycontrol',
        'autocompleteMinChars',
        1
      )
    );
    expect(directive).toBeTruthy();
  }));

  it('should set the min value set for autocomplete on init', fakeAsync(() => {
    directive.autocompleteMinChars = 3;
    fixture.detectChanges();
    directive.ngOnInit();
    let action;
    actionsSubject.pipe(first()).subscribe((_action) => (action = _action));
    tick(1000);
    expect(action).toEqual(
      new SetUserDefinedPropertyAction(
        'FORM_ID.mycontrol',
        'autocompleteMinChars',
        3
      )
    );
    expect(directive).toBeTruthy();
  }));

  // TODO make it works
  // it('should update the focused autocomplete on focusing the autocomplete', fakeAsync(() => {
  //     inputEl.triggerEventHandler('focusin', null);
  //     fixture.detectChanges();
  //     let action;
  //     actionsSubject.pipe(first()).subscribe(_action => action = _action);
  //     tick(1000);
  //     expect(action).toEqual(new SetUserDefinedPropertyAction('FORM_ID', 'lastAutocompleteFocused', 'mycontrol'));
  //     expect(directive).toBeTruthy();
  // }));

  // it('should set the autocomplete value on every inputs', fakeAsync(() => {
  //     inputEl.triggerEventHandler('input', { target: { value: 'test' } });
  //     fixture.detectChanges();
  //     let action;
  //     actionsSubject.pipe(first()).subscribe(_action => action = _action);
  //     tick(1000);
  //     expect(action).toEqual(new SetUserDefinedPropertyAction('FORM_ID.mycontrol', 'autocomplete', 'test'));
  //     expect(directive).toBeTruthy();
  // }));
});
