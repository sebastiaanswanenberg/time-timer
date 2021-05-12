import app from './app';
import Logger from './util/logging';

const port = parseInt(process.env.PORT || '80');
const NAMESPACE = 'SERVER';

const server = new app()
    .Start(port)
    .then((port) => Logger.info(NAMESPACE, `Server running on port ${port}`))
    .catch((error) => {
        Logger.error(NAMESPACE, 'Server error', error);
        process.exit(1);
    });

export default server;