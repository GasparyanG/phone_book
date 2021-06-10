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
        else if (isset($updateResponse[Error::STATUS]))
            $resp->setStatusCode(
                $this->detectErrorCode($updateResponse, Response::HTTP_UNPROCESSABLE_ENTITY)
            );

        return $resp;
    }

    public function delete(Request $req, array $placeholders): Response
    {
        $contactMn = new DeletingStrategy();
        $deletionResponse = $contactMn->actUpon($req, $placeholders);

        $resp = new Response(json_encode($deletionResponse));
        if (isset($deletionResponse[Resource::DATA]))
            $resp->setStatusCode(Response::HTTP_OK);
        else if (isset($deletionResponse[Error::STATUS]))
            $resp->setStatusCode(
                $this->detectErrorCode($deletionResponse, Response::HTTP_UNPROCESSABLE_ENTITY)
            );

        return $resp;
    }

    private function detectErrorCode(array $responseArray, int $default = Response::HTTP_NOT_FOUND): int
    {
        if (isset($responseArray[Error::STATUS]))
            return $responseArray[Error::STATUS];

        return $default;
    }
}