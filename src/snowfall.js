'use strict'

const body = document.querySelector('body');

class Snowfall {

    letItSnow() {
        for (let i = 1; i <= 100; i++) {
            let snowflake = document.createElement('span');
            snowflake.classList.add('snowflake');
            body.append(snowflake);
        }
    }
}

export { Snowfall };