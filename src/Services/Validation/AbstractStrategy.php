<?php


namespace App\Services\Validation;


abstract class AbstractStrategy
{
    // Options configuration
    const CONTAINER = "container";

    static $errorMessage;

    /*
     * @var string|null
     */
    protected $errMessage;

    /*
     * @var array|null
    */
    protected $options;

    /*
     * @var bool
    */
    protected $invalid = false;

    public function __construct(?string $errMessage = null, ?array $options = null)
    {
        $this->errMessage = $errMessage;
        $this->options = $options;
    }

    /**
     * @return string
     */
    public function getErrMessage(): string
    {
        return $this->errMessage ?? static::$errorMessage;
    }

    public function isInvalid(): bool
    {
        return $this->invalid;
    }
}