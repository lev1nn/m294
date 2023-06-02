import {TestBed} from '@angular/core/testing';

import { AddressService } from './address.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Address } from '../data/address';

describe('AddressService', () => {
  let service: AddressService;
  let httpSpy: Spy<HttpClient>;

  const fakeAddresses: Address[] = [
    {
      id: 1,
      street: 'Street 1',
      streetNumber: 1,
      city: 'city 1',
      country: 'country 1'
    },
    {
      id: 2,
      street: 'Street 2',
      streetNumber: 2,
      city: 'city 2',
      country: 'country 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ]
    });
    service = TestBed.inject(AddressService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of addresses', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeAddresses);

    service.getList().subscribe({
        next:
          addresses => {
            expect(addresses).toHaveSize(fakeAddresses.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new address', (done: DoneFn) => {

    const newAddress: Address = {
      id: 3,
      street: 'Street 3',
      streetNumber: 3,
      city: 'city 3',
      country: 'country 3'
    };

    httpSpy.post.and.nextWith(newAddress);

    service.save(newAddress).subscribe({
        next: address => {
          expect(address).toEqual(newAddress);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an adress', (done: DoneFn) => {

    const address = fakeAddresses[0];
    address.street = 'Updated Address';

    httpSpy.put.and.nextWith(address);

    service.update(address).subscribe({
      next: address => {
        expect(address.street).toEqual('Updated Address');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing address', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
