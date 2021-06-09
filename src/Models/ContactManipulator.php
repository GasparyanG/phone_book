<?php

namespace App\Models;

use App\Database\Entities\Contact;
use App\Services\API\External\Endpoints;
use App\Services\API\JsonAPI\Resource;
use App\Services\Validation\AbstractStrategy;
use App\Services\Validation\InAContainer;
use App\Services\Validation\NotBlank;
use App\Services\Validation\Validator;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request as RequestGuzzle;
use Symfony\Component\HttpFoundation\Request;

class ContactManipulator // This eventually should become an abstract class with strategies!
{
    public function create(Request $req): array
    {
        $content = $req->getContent();
        $decodedContent = json_decode($content, true);

        $violations = $this->validate($decodedContent);
        if (count($violations) > 0)
            return $this->error($violations);

        return ["error" => false];
    }

    protected function error(array $violations): array
    {
        // TODO: Deal with error preparation.
        return ["errors" => $violations];
    }

    protected function validate(array $decodedContent): array
    {
        $totalViolations = [];
        $validator = new Validator();

        // Extract attributes
        $resource = new Resource($decodedContent);
        $attributes = $resource->getAttributes();

        // Firs name
        $violations = $validator->validate($attributes[Contact::FIRST_NAME], [new NotBlank()]);
        if (count($violations) > 0)
            $totalViolations[Contact::FIRST_NAME] = $violations;

        // Phone number
        $violations = $this->phoneNumberValidation($attributes[Contact::PHONE_NUMBER]);
        if (count($violations) > 0)
            $totalViolations[Contact::PHONE_NUMBER] = $violations;

        // Country code
        $violations = $this->countryCodeValidation($attributes[Contact::COUNTRY_CODE]);
        if (count($violations) > 0)
            $totalViolations[Contact::COUNTRY_CODE] = $violations;

        // Timezone
        $violations = $this->timezoneValidation($attributes[Contact::TIMEZONE]);
        if (count($violations) > 0)
            $totalViolations[Contact::TIMEZONE] = $violations;

        return $totalViolations;
    }

    // This method need to be pulled up.
    protected function phoneNumberValidation(string $phoneNumber): array
    {
        // TODO: Validate phone number based on some standards.
        return [];
    }

    protected function countryCodeValidation(string $countryCode): array
    {
        return $this->makeAPICall($countryCode, Endpoints::COUNTRY_CODE);
    }

    protected function timezoneValidation(string $timezone): array
    {
        return $this->makeAPICall($timezone, Endpoints::TIMEZONE);
    }

    protected function makeAPICall(string $valueToCompareAgainst, string $endpoint): array
    {
        $client = new Client();
        $request = new RequestGuzzle("GET", $endpoint);
        $response = $client->send($request);

        // Extract and format the data.
        $body = $response->getBody();
        $bodyAsArray = json_decode($body, true);

        // Validation
        $validator = new Validator();

        // TODO: replace constants with symbolic ones.
        $errorMessage = "Wrong value.";
        switch ($endpoint) {
            case Endpoints::TIMEZONE:
                $errorMessage = "Wrong timezone.";
                break;
            case Endpoints::COUNTRY_CODE;
                $errorMessage = "Wrong country code.";
                break;
        }

        $violation = $validator->validate($valueToCompareAgainst,
            [new InAContainer($errorMessage, [AbstractStrategy::CONTAINER => $bodyAsArray])]
        );

        return $violation;
    }
}