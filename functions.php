<?php

function getOptionName(string $name, string $stringToRemove) 
{
    $name = preg_replace('/\b0\b/', 'default', $name);
    $name = str_replace('sounds', '', $name);
    $name = str_replace($stringToRemove, '', $name);
    $name = str_replace('/', '', $name);
    $name = str_replace('.wav', '', $name);
    $name = str_replace('-', ' ', $name);
    $name = trim($name);
    $name = ucfirst($name);
    return $name;
}