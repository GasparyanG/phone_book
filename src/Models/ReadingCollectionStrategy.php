<?php


namespace App\Models;


use App\Database\Entities\Contact;
use App\Services\API\JsonAPI\Resource;
use Symfony\Component\HttpFoundation\Request;

class ReadingCollectionStrategy extends ReadingStrategy
{
    public function actUpon(Request $req, array $placeholders = []): array
    {
        $contacts = $this->getContacts($req);

        $contactCollection = [];
        foreach ($contacts as $contact)
            $contactCollection[Resource::DATA][] = $this->contactResource($contact->getId());

        // TODO: Pagination.

        return $contactCollection;
    }

    private function getContacts(Request $req): iterable
    {
        // Filter the table based in query params: coming soon.
        $contacts = $this->em->getRepository(Contact::class)->findAll();
        if (count($contacts) == 1) return [];
        return $contacts;
    }
}