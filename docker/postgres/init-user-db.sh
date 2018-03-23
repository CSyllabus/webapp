#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER csyllabus WITH PASSWORD 'csyllabus' CREATEDB;
    CREATE DATABASE csyllabus_dev;
    GRANT ALL PRIVILEGES ON DATABASE csyllabus_dev TO csyllabus;
EOSQL
