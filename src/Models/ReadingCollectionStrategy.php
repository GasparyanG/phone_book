<?php


namespace App\Models;


use App\Database\Entities\Contact;
use App\Services\API\JsonAPI\Links;
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

        $contactCollection[Links::LINKS] = $this->prepareLinks($req);

        return $contactCollection;
    }

    private function prepareLinks(Request $req): array
    {
        $searchParam = $req->query->get(Resource::SEARCH);
        if ($searchParam)
            $count = $this->em->getRepository(Contact::class)->countWith($searchParam);
        else
            $count = $this->em->getRepository(Contact::class)->count([]);

        $links = new Links($req->query, $count);
        $links->arrayRepresentation();

        return $links->getRepresentation();
    }

    private function getContacts(Request $req): iterable
    {
        // Filter the table based on query params
        $searchParam = $req->query->get(Resource::SEARCH);
        if ($searchParam)
            $contacts = $this->em->getRepository(Contact::class)
                ->findByName($searchParam, $this->getOffset($req), $this->getLimit($req));
        else
            $contacts = $this->em->getRepository(Contact::class)
                ->findAllWithLimit($this->getOffset($req), $this->getLimit($req));

        if (count($contacts) == 0) return [];
        return $contacts;
    }

    private function getOffset(Request $req): int
    {
        $queryParams = $req->query->all();
        if (!isset($queryParams[Resource::PAGE][Resource::PAGE_NUMBER])
            || !is_numeric($queryParams[Resource::PAGE][Resource::PAGE_NUMBER]))
            return Links::$page;

        return $queryParams[Resource::PAGE][Resource::PAGE_NUMBER] * $this->getLimit($req);
    }

    private function getLimit(Request $req): ?int
    {
        $queryParams = $req->query->all();
        if (!isset($queryParams[Resource::PAGE][Resource::PAGE_SIZE])
            || !is_numeric($queryParams[Resource::PAGE][Resource::PAGE_SIZE]))
            return Links::$size;

        return $queryParams[Resource::PAGE][Resource::PAGE_SIZE];
    }
}