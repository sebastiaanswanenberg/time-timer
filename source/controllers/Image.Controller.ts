import Controller from './Standard.Controller';

class ImageController extends Controller {
    findone(arg0: { path: string; }) {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super();
    }

    createInitialImage(username: string, image: any, lat: string, long: string) {
        return new Promise(() => {

        });
    }
}

export default ImageController;