DROP USER if exists "rmadmin";
CREATE USER "rmadmin" identified WITH mysql_native_password BY 'redland';
/* Needed because caching_sha2_password not implemented in node */
GRANT ALL PRIVILEGES ON `RM_Database`.* TO "rmadmin";