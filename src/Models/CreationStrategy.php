<?php


namespace App\Models;


use App\Database\Entities\Contact;
use App\Services\API\External\Endpoints;
use App\Services\API\JsonAPI\Resource;
use Symfony\Component\HttpFoundation\Request;

class CreationStrategy extends ContactManipulator
{
    public function actUpon(Request $req, array $placeholders = []): array
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
}