// import { NO_ERRORS_SCHEMA }          from '@angular/core';
// import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
// import { By }                        from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';

// import { SittersComponent } from './sitters.component';

// let fixture: ComponentFixture<SittersComponent>;
// let comp: SittersComponent;

// describe('SittersComponent', () =>{

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SittersComponent],
//      // schemas:      [ NO_ERRORS_SCHEMA ]
//     })
//   .compileComponents()
//   .then( () => {
//     fixture = TestBed.createComponent(SittersComponent);
//     comp    = fixture.componentInstance;
//     fixture.detectChanges();
//     })

//   });

//   it('should send a click event', () => {

//     fixture.detectChanges();
//     const btn = fixture.debugElement.query(By.css('.btn'));
//     const input = fixture.debugElement.query(By.css('input'));
//     fixture.detectChanges();
//     let spy = spyOn(comp, 'search');
//     input.nativeElement.value = "wroclaw";
//     btn.nativeElement.click();

//     fixture.detectChanges();
//     expect(spy.calls.any).toBe(true);
//   });
// });
