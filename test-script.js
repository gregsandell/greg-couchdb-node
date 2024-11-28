require('dotenv').config();
const url = `http://${process.env.COUCH_USER}:${process.env.COUCH_PASSWORD}@${process.env.COUCH_HOST}:${process.env.COUCH_PORT}`;

const nano = require('nano')(url);

async function main() {
    try {
        // Create a database
        const db = nano.db.use('albums');

         // Insert a document
        const doc = await db.insert({"title":"Absulutely Free","artist":"Frank Zappa"});
        console.log('Document inserted:', doc);

        // Get a document
        const retrievedDoc = await db.get(doc.id);
        console.log('Document retrieved:', retrievedDoc);

         // Update a document
        retrievedDoc.title = 'Absolutely Free';
        const updatedDoc = await db.insert(retrievedDoc);

        // Delete a document
        await db.destroy(doc.id, updatedDoc.rev);
        console.log('Document deleted!');

    } catch (error) {
        console.error(error);
    }
}

main();
