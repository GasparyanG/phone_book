<?php


namespace App\Services\Validation;


class InAContainer extends AbstractStrategy implements ValidationStrategyInterface
{
    public function validate($value): void
    {
        $container = $this->options[AbstractStrategy::CONTAINER];
        forEach ($container as $key => $item)
            if ((!is_numeric($key) && strtolower($key) === strtolower($value))
                    || strtolower($item) === strtolower($value))
                return;

        $this->invalid = true;
    }
}