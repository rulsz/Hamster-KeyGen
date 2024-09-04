const games = {
    'Cube': {
        appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
        promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
    },
    'Train': {
        appToken: '82647f43-3f87-402d-88dd-09a90025313f',
        promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
    },
    'Merge': {
        appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
        promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
    },
    'Twerk': {
        appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c'
    },
    'Polysphere': {
        appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71'
    },
    'Mow': {
        appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6'
    },
    'Zoopolis': {
        appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
        promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b'
    },
    'Fluff': {
        appToken: '112887b0-a8af-4eb2-ac63-d82df78283d9',
        promoId: '112887b0-a8af-4eb2-ac63-d82df78283d9'
    },
    'Tile': {
        appToken: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
        promoId: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7'
    }

}
const urls = {
    login: 'https://api.gamepromo.io/promo/login-client',
    register: 'https://api.gamepromo.io/promo/register-event',
    createToken: 'https://api.gamepromo.io/promo/create-code'
}

const sleep = async (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time * 1000);
    })
};

class TrackedPromise {
    constructor(promise, game) {
        this.state = 'pending';
        this.game = game;
        this.promise = promise.then(value => {
            this.state = 'fulfilled';
            return value;
        }).catch(error => {
            this.state = 'rejected';
            throw error;
        });
    }
    isPending() {
        return this.state === 'pending';
    }
    getGame() {
        return this.game;
    }
} // To check if a promise is still pending

const commands = Object.entries(games).reduce((acc, [key, value]) => {
    key = key.charAt(0).toLowerCase() + key.slice(1);
    acc[`/${key}`] = `${key.charAt(0).toUpperCase() + key.slice(1)}_keys.json`;
    return acc;
}, {});

const keysFiles = Object.entries(commands).map(([key, value]) => value);

let sleepDuration = 20;
let sleepUnit = '';
if (sleepDuration >= 60) {
    let tempVar = (sleepDuration / 60).toFixed(2);
    sleepUnit = (tempVar > 1) ? 'minutes' : 'minute';
}

module.exports = { games, urls, sleep, commands, keysFiles, TrackedPromise, sleepDuration, sleepUnit };
