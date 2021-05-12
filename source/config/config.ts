import dotenv from 'dotenv';

dotenv.config();

/**
 * Mongo db options
 */
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'testuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'MKiSuwXxU9x8Kt9n';
const MONGO_HOST = process.env.MONGO_URL || 'cluster0.xibqh.mongodb.net/Cluster0?retryWrites=true&w=majority';

const MAX_ITEMS = 1000;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
    maxitems: MAX_ITEMS
};

/**
 * Server Options
 */

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'supersecret';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const KEYS = {
    google: {
        clientID: '616581710231-3gh4r5mnbeadi0r9h1gbvk844kbir61o.apps.googleusercontent.com',
        clientSecret: 'y3kKg0rZlk3WhE5u-A5aHwsD'
    },
    facebook: {
        clientId: '',
        clientSecret: ''
    },
    session: {
        cookieKey: 'thenetninjaisawesomeiguess'
    }
};

const config = {
    mongo: MONGO,
    server: SERVER,
    keys: KEYS
};

export default config;
