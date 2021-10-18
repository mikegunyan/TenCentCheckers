#!/bin/sh

echo "➡ Database Reset"

echo "➡ Dropping database"
mongo --eval 'db.dropDatabase();' boardlist

echo "➡ Seeding database"
node database/test.js