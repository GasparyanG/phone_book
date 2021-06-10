<?php


namespace App\Controllers;


use App\Models\CreationStrategy;
use App\Models\DeletingStrategy;
use App\Models\UpdateStrategy;
use App\Services\API\JsonAPI\Error;
use App\Services\API\JsonAPI\Resource;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Contact
{
    public function create(Request $req): Response
    {
        $contactMn = new CreationStrategy();
        $creationResponse = $contactMn->actUpon($req);

        // Respond
        $resp = new Response(json_encode($creationResponse));
        if (isset($creationResponse[Resource::DATA]))
            $resp->setStatusCode(Response::HTTP_CREATED);
        else if (isset($creationResponse[Error::ERRORS]))
            $resp->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);

        return $resp;
    }

    public function update(Request $req, array $placeholders): Response
    {
        $contactMn = new UpdateStrategy();
        $updateResponse = $contactMn->actUpon($req, $placeholders);

        $resp = new Response(json_encode($updateResponse));
        if (isset($updateResponse[Resource::DATA]))
            $resp->setStatusCode(Response::HTTP_OK);
        else if (isset($updateResponse[Error::ERRORS]))
            $resp->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);

        return $resp;
    }

    public function delete(Request $req, array $placeholders): Response
    {
        $contactMn = new DeletingStrategy();
        $updateResponse = $contactMn->actUpon($req, $placeholders);

        $resp = new Response(json_encode($updateResponse));
        if (isset($updateResponse[Resource::DATA]))
            $resp->setStatusCode(Response::HTTP_OK);
        else if (isset($updateResponse[Error::ERRORS]))
            $resp->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);

        return $resp;
    }
}