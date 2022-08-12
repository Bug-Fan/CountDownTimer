//Timer for Interval
let timerId;

//Gets the values from HTML page and initializes the variables as per the requirement.
const setValue = function() {
    
    if (arguments.length === 2)
        return document.querySelectorAll(`.${arguments[0]}`)[arguments[1]]
    else if (arguments[0] === 'minutes')
        return document.querySelector(arguments[0]);
    return document.querySelector(`.${arguments[0]}`);

}

//Detects custom time value if entered
const getCustomTime = function () {

    const customValue = parseFloat(location.href.slice(location.href.indexOf('minutes=') + 8));

    if (isNaN(customValue) || customValue === 0 || customValue < 0)
        console.log("Invalid time value.");
    else if (customValue > 60)
        alert("Minute should be under 60.");
    else
        displayTime(customValue * 60);
}

//Modify the HTML document with the timer and the future time.
const showTime = function(diffTime, targetTime) {
    
    document.body.style.background = 'Green';
    setValue('display__time-left').innerText = `${diffTime.getMinutes()}:${diffTime.getSeconds()}`;
    setValue('display__end-time').innerText = `Be back at ${targetTime.getHours()}:${targetTime.getMinutes()}`;
    
    if (isZero(diffTime)) {
        document.body.style.background = 'red';
        clearInterval(timerId);
    }
    diffTime.setSeconds(diffTime.getSeconds() - 1)
    
}

//Check if the timer has reached 0.
const isZero = (diffTime) => (diffTime.getMilliseconds() === 0 && diffTime.getSeconds() === 0 && 
                            diffTime.getMinutes() === 0 && diffTime.getHours() === 0) ? 
                            true : false;

//Driver function.
const displayTime = function (secValue) {
    
    //Clear any previous timer if running
    clearInterval(timerId);
    
    const diffTime = new Date(Date.parse(`2001-01-01T00:00:00.000`));
    const targetTime = new Date();

    //Setting the time duration to be added to the current time and the time after the duration.
    const timeDiff = setValue('timer__button', secValue)?.getAttribute('data-time') ?? 
                     secValue;
    diffTime.setSeconds(timeDiff);
    targetTime.setMilliseconds(targetTime.getMilliseconds() + timeDiff * 1000);
    
    //Running showtime function at each second for the duration entered or selected by user.
    timerId = setInterval(showTime, 1000, diffTime, targetTime);
    setTimeout(() => clearInterval(timerId), (timeDiff + 1) * 1000);
    
}

document.addEventListener('DOMContentLoaded', getCustomTime);