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
        // Filter the table based on query params
        $searchParam = $req->query->get(Resource::SEARCH);
        if ($searchParam)
            $contacts = $this->em->getRepository(Contact::class)->findByName($searchParam);
        else
            $contacts = $this->em->getRepository(Contact::class)->findAll();

        if (count($contacts) == 1) return [];
        return $contacts;
    }
}