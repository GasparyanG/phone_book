<?php


namespace App\Services\Validation;


class ValidDate extends AbstractStrategy implements ValidationStrategyInterface
{
    static $errorMessage = "Date is invalid.";

    public function validate($value): void
    {
        if (strlen($value) >= 10 && strtotime($value))
            $this->invalid = true;
    }
}