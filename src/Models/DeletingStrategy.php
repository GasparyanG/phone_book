<?php


namespace App\Models;


use App\Database\Entities\Contact;
use Symfony\Component\HttpFoundation\Request;

class DeletingStrategy extends ContactManipulator
{
    public function actUpon(Request $req, array $placeholders = []): array
    {
        if (!$this->resourceExists($placeholders[Contact::ID]))
            return $this->notFound();

        $content = $req->getContent();
        $decodedContent = json_decode($content, true);

        $violations = $this->validate($decodedContent);
        if (count($violations) > 0)
            return $this->error($violations);

        return $this->success($this->update($decodedContent, $placeholders));
    }
}