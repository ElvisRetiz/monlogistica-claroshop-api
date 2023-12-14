class ObjectsHelper {
    constructor () {
    }

    sameProperties (obj1, obj2) {
        return Object.keys(obj1).every(key => obj2.hasOwnProperty(key));
    }
};

module.exports = ObjectsHelper;