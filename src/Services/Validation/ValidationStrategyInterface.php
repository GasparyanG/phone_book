<?php


namespace App\Services\Validation;


interface ValidationStrategyInterface
{
    public function validate($value): void;
    public function isInvalid(): bool;
    public function getErrMessage(): string;
}