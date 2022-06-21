const migration = process.argv[2]
const migration_path = `./migrations/${migration}`
const path = require('path')
const fs = require('fs')
fs.access(`${path.resolve(__dirname, migration_path)}.js`, fs.F_OK, (err) => {
    if (err) {
        console.log(`Migration ${process.argv[2]} doesn't exist`)
        console.error(err)
        return
    }
    const runMigration = require(migration_path);
    runMigration();
  })