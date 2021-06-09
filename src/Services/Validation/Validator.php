<?php

namespace App\Services\Validation;

class Validator
{
    public function validate($value, array $validationStrategies): array
    {
        $error = [];
        forEach ($validationStrategies as $strategy) {
            $strategy->validate($value);
            if ($strategy->isInvalid())
                $error[] = $strategy->getErrMessage();
        }

        return $error;
    }
}