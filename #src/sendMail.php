<?php

$to = "info@anton-panchenko.com";
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$subject = htmlspecialchars($subject);
$message = htmlspecialchars($message);

$name = urldecode($name);
$email = urldecode($email);
$subject = urldecode($subject);
$message = urldecode($message);

$name = trim($name);
$email = trim($email);
$subject = trim($subject);
$message = trim($message);

$subject = "=?utf-8?B?".base64_encode($subject)."?=";
$headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/plain; charset=utf-8\r\n";

if (mail($to, $subject, $message, $headers)){
    echo ('Письмо успешно отаравлено');
} else {
    echo ('Проверьте, пожалуйста, данные');
}