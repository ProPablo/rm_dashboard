if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

echo "setting up db: $DB_NAME"

mysql -u root -p -e << EOF

DROP DATABASE if exists $DB_NAME;
CREATE DATABASE $DB_NAME;

DROP USER if exists $DB_USER;
CREATE USER $DB_USER identified WITH mysql_native_password BY $DB_PASSWORD;
/* Needed because caching_sha2_password not implemented in node */
GRANT ALL PRIVILEGES ON $DB_NAME.* TO $DB_USER;

EOF