<?php

namespace App\Controllers;

use App\Database\Connection;
use App\Database\Entities\Contact;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Test
{
    /*
     * @var EntityManager $em
     */
    private $em;

    public function __construct()
    {
        $this->em = Connection::getEntityManager();
    }

    public function insert(Request $req): Response
    {
        // Population
        $cont = new Contact();
        $cont->setFirstName("Jack");
        $cont->setLastName("Jill");
        $cont->setPhoneNumber("+00044447777");
        $cont->setCountryCode("US");
        $cont->setTimezone("America/Chicago");

        // Dates
        $cont->setInsertedOn(date_create());
        $cont->setUpdatedOn(date_create());

        // Insertion
        $this->em->persist($cont);
        $this->em->flush();

        $resp = new Response("Hi there from test");
        return $resp;
    }

    public function dbGet(Request $req): Response
    {
        $cont = $this->em->getRepository(Contact::class)->find(1);

        $str = sprintf("fname: %s, lname: %s, idate: %s",
            $cont->getFirstName(), $cont->getLastName(), $cont->getInsertedOn()->format('Y-m-d H:i:s'));

        $resp = new Response($str);
        return $resp;
    }
}