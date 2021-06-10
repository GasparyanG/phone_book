<?php

namespace App\Models;

use App\Database\Connection;
use App\Database\Entities\Contact;
use App\Services\API\External\Endpoints;
use App\Services\API\JsonAPI\Error;
use App\Services\API\JsonAPI\Resource;
use App\Services\Validation\AbstractStrategy;
use App\Services\Validation\InAContainer;
use App\Services\Validation\NotBlank;
use App\Services\Validation\Validator;
use App\Services\Validation\ValidPhoneNumber;
use Doctrine\ORM\EntityManager;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request as RequestGuzzle;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ContactManipulator // This eventually should become an abstract class with strategies!
{
    /**
     * @var EntityManager $em
    */
    protected $em;

    public function __construct()
    {
        $this->em = Connection::getEntityManager();
    }


    public function create(Request $req): array
    {
        $content = $req->getContent();
        $decodedContent = json_decode($content, true);

        $violations = $this->validate($decodedContent);
        if (count($violations) > 0)
            return $this->error($violations);

        return $this->success($this->insert($decodedContent));
    }

    protected function insert(array $decodedContent): Contact
    {
        // Extract attributes
        $resource = new Resource($decodedContent);
        $attributes = $resource->getAttributes();

        // Create Contact
        $contact = new Contact();
        $contact->setFirstName($attributes[Contact::FIRST_NAME]);
        if ($this->fieldExists($attributes, Contact::LAST_NAME))
            $contact->setLastName($attributes[Contact::LAST_NAME]);
        $contact->setPhoneNumber($attributes[Contact::PHONE_NUMBER]);
        if ($this->fieldExists($attributes, Contact::COUNTRY_CODE))
            $contact->setCountryCode($this->sanitizedValue($attributes[Contact::COUNTRY_CODE], Endpoints::COUNTRY_CODE));
        if ($this->fieldExists($attributes, Contact::TIMEZONE))
            $contact->setTimezone($this->sanitizedValue($attributes[Contact::TIMEZONE], Endpoints::TIMEZONE));

        $contact->setInsertedOn(date_create());
        $contact->setUpdatedOn(date_create());

        // Persist
        $this->em->persist($contact);
        $this->em->flush();

        return $contact;
    }

    protected function sanitizedValue(string $valueToCompareAgainst, string $endpoint): string
    {
        $container = $this->getValuesFromEndpoint($endpoint);
        forEach ($container as $key => $item)
            if (!is_numeric($key) && strtolower($key) === strtolower($valueToCompareAgainst))
                return $key;
            else if (strtolower($item) === strtolower($valueToCompareAgainst))
                return $item;
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
        $violations = $validator->validate($attributes[Contact::PHONE_NUMBER], [new NotBlank(), new ValidPhoneNumber()]);
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
            [new InAContainer($errorMessage, [AbstractStrategy::CONTAINER => $this->getValuesFromEndpoint($endpoint)])]
        );

        return $violation;
    }

    protected function getValuesFromEndpoint(string $endpoint): array
    {
        $client = new Client();
        $request = new RequestGuzzle("GET", $endpoint);
        $response = $client->send($request);

        // Extract and format the data.
        $body = $response->getBody();
        return json_decode($body, true);
    }

    protected function fieldExists(array $attributes, string $field): bool
    {
        switch ($field) {
            case Contact::TIMEZONE:
            case Contact::COUNTRY_CODE:
            case Contact::LAST_NAME:
                return isset($attributes[$field]) && strlen($attributes[$field]) > 0;
            default:
                return false;
        }
    }

    // Responses
    protected function error(array $violations): array
    {
        $error = new Error();
        $error->setStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $error->setTitle(Response::$statusTexts[Response::HTTP_UNPROCESSABLE_ENTITY]);
        $error->setErrors($violations);

        $error->arrayRepresentation();
        return $error->getRepresentation();
    }

    protected function success(Contact $contact): array
    {
        // Prepare resource.
        $resource = new Resource();
        $resource->setId($contact->getId());
        $resource->setType(Contact::$table_name);
        $resource->setAttributes($this->prepareAttributes($contact));

        $resource->arrayRepresentation();
        return $resource->getRepresentation();
    }

    protected function prepareAttributes(Contact $contact): array
    {
        $attributes = [];

        $attributes[Contact::FIRST_NAME] = $contact->getFirstName();
        $attributes[Contact::LAST_NAME] = $contact->getLastName();
        $attributes[Contact::PHONE_NUMBER] = $contact->getPhoneNumber();
        $attributes[Contact::COUNTRY_CODE] = $contact->getCountryCode();
        $attributes[Contact::TIMEZONE] = $contact->getTimezone();
        $attributes[Contact::INSERTED_ON] = $contact->getInsertedOn()->format('Y-m-d H:i:s');
        $attributes[Contact::UPDATED_ON] = $contact->getUpdatedOn()->format('Y-m-d H:i:s');

        return $attributes;
    }
}