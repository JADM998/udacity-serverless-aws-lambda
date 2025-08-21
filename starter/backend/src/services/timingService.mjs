export class TimingService {

    constructor(){}

    getTimeInMillis() {
        return Date.now();
    }

    getTimeDifference(timeInMillis){
        return this.getTimeInMillis() - timeInMillis;
    }
}