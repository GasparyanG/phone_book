<?php


namespace App\Models;


use App\Database\Entities\Contact;
use App\Services\API\JsonAPI\Resource;
use Symfony\Component\HttpFoundation\Request;

class DeletingStrategy extends ContactManipulator
{
    public function actUpon(Request $req, array $placeholders = []): array
    {
        if (!is_numeric($placeholders[Contact::ID])
            || !$this->resourceExists($placeholders[Contact::ID]))
            return $this->notFound();

        $deletedRecord = $this->prepareResource($placeholders[Contact::ID]);
        $this->delete($placeholders[Contact::ID]);

        return $deletedRecord;
    }

    protected function prepareResource(int $id): array
    {
        $contact = $this->em->getRepository(Contact::class)->find($id);

        $resource = new Resource();
        $resource->setId($contact->getId());
        $resource->setType(Contact::$table_name);

        $resource->arrayRepresentation();
        $representation = $resource->getRepresentation();
        unset($representation[Resource::DATA][Resource::ATTRIBUTES]);
        return $representation;
    }

    protected function delete(int $id): void
    {
        $contact = $this->em->getRepository(Contact::class)->find($id);
        $this->em->remove($contact);
        $this->em->flush();
    }
}