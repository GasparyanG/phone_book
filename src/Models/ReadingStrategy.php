<?php


namespace App\Models;


use App\Database\Entities\Contact;
use Symfony\Component\HttpFoundation\Request;

class ReadingStrategy extends ContactManipulator
{
    public function actUpon(Request $req, array $placeholders = []): array
    {
        if (!is_numeric($placeholders[Contact::ID])
            || !$this->resourceExists($placeholders[Contact::ID]))
            return $this->notFound();

        return $this->contactResource($placeholders[Contact::ID]);
    }

    protected function contactResource(int $id): array
    {
        // Get contact.
        $contact = $this->em->getRepository(Contact::class)->find($id);
        if (!$contact) return [];

        return $this->success($contact);
    }
}