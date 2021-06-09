<?php


namespace App\Services\Validation;


class NotBlank extends AbstractStrategy implements ValidationStrategyInterface
{
    static $errorMessage = "Field should not be blank.";

    public function validate($value): void
    {
        if (strlen($value) == 0)
            $this->invalid = true;
    }
}