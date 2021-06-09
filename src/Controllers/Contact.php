<?php


namespace App\Controllers;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contact
{
    public function create(Request $req): Response
    {

        $data = $req->getContent();
        $resp = new Response($data);
//        $resp->headers->set("Content-Type","application/json");
        return $resp;
    }
}