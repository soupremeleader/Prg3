<?php


const DB_HOST = 'localhost:33006';
const DB_USER = 'root';
const DB_PASS = '';
const DB_NAME = 'train_schema';

//Custom error handler, so every error will throw a custom ErrorException
set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, $severity, $severity, $file, $line);
});