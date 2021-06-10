<?php


namespace App\Services\Validation;

// Validation is done considering the following resources:
// https://stackoverflow.com/questions/15745545/is-there-a-standard-for-phone-numbers
// https://en.wikipedia.org/wiki/E.123
// https://en.wikipedia.org/wiki/Telephone_numbering_plan
// https://en.wikipedia.org/wiki/List_of_international_call_prefixes
class ValidPhoneNumber extends AbstractStrategy implements ValidationStrategyInterface
{
    const WRONG_FORMAT = "Wrong format.";

    public function validate($value): void
    {
        if ($this->wrongFormat($value)) {
            $this->errMessage = self::WRONG_FORMAT;
            $this->invalid = true;
        }
    }

    protected function wrongFormat($value): bool
    {
        // Detains about this regex can be found here:
        // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number#answer-16702965
        $pattern = "/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2,3})[-. )]*(\d{3})[-. ]*(\d{2,4})(?: *x(\d+))?\s*$/";
        return !preg_match($pattern, $value);
    }

    private function onlyDigits(string $value): string
    {
        $pattern = "/[.\-() +]/";
        return preg_replace($pattern, '', $value);
    }
}