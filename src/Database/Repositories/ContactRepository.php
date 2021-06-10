<?php

namespace App\Database\Repositories;

use Doctrine\ORM\EntityRepository;

class ContactRepository extends EntityRepository
{
    public function findByName(string $value): iterable
    {
        $res = $this->createQueryBuilder('c')
            ->select('c')
            ->where("c.firstName LIKE :value")
            ->orWhere("c.lastName LIKE :value")
            ->setParameter('value', "%" . $value . "%")
            ->getQuery()
            ->getResult();

        if ($res) return $res;
        return [];
    }
}