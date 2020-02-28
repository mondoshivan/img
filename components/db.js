const { MongoClient } = require('mongodb');

class DB {

    constructor(name, options = {}) {
        if (typeof name !== 'string') { throw('name is not a string') }
        const USER = options['user'] || 'root';
        const PASSWORD = options['password'] || 'test';
        const HOST = options['host'] || 'localhost';
        const PORT = options['port'] || '27017';
        this.db_name = name;
        this.URL = "mongodb://"+USER+":"+PASSWORD+"@"+HOST+":"+PORT;
        this.client = null;
    }

    connect(callback) {
        MongoClient.connect(this.URL, (error, client) => {
            if (error) { throw error }
            this.client = client;
            callback(error);
        });
    }

    insert(COLLECTION, data, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.insert(data, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    insertOne(COLLECTION, data, callback) {
        this.insert(COLLECTION, data, callback);
    }

    insertMany(COLLECTION, data, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.insertMany(data, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    find(COLLECTION, config, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.find(config).toArray((error, result) => {
                if (error) { throw error; }
                this.close();
                if (result.length === 0) { result = null; }
                callback(error, result);
            });
        });
    }

    updateOne(COLLECTION, config, changes, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.updateOne(config, changes, (error, result) => {
                if (error) { throw error;}
                this.close();
                callback(error, result);
            });
        });
    }

    updateMany(COLLECTION, config, changes, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.updateMany(config, changes, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    replaceOne(COLLECTION, config, changes, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.replaceOne(config, changes, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    deleteOne(COLLECTION, config, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.deleteOne(config, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    deleteMany(COLLECTION, config, callback) {
        this.connect(() => {
            const db = this.client.db(this.db_name);
            const collection = db.collection(COLLECTION);
            collection.deleteMany(config, (error, result) => {
                if (error) { throw error; }
                this.close();
                callback(error, result);
            });
        });
    }

    close() {
        if (this.client) { this.client.close();}
    }
}

module.exports = DB;
