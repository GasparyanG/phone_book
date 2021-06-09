<?php


namespace App\Controllers;


use App\Models\ContactManipulator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contact
{
    public function create(Request $req): Response
    {
        $contactMn = new ContactManipulator();
        $creationResponse = $contactMn->create($req);

        // Respond
        $resp = new Response(json_encode($creationResponse));
        return $resp;
    }
}