import {action, makeObservable, observable} from "mobx";

export class ElectroenergyRepository {
    @observable counter: number = 0;

    constructor() {
        makeObservable(this)
    };

    @action
    increment() {
        this.counter += 1;
    }

    @action
    decrement() {
        this.counter -= 1;
    }
};