<?php

namespace App\Database\Repositories;

use Doctrine\ORM\EntityRepository;

class ContactRepository extends EntityRepository
{
    public function findByName(string $value, int $offset = 0, ?int $limit = null): iterable
    {
        $res = $this->createQueryBuilder('c')
            ->select('c')
            ->where("c.firstName LIKE :value")
            ->orWhere("c.lastName LIKE :value")
            ->setParameter('value', "%" . $value . "%")
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        if ($res) return $res;
        return [];
    }

    public function findAllWithLimit(int $offset = 0, ?int $limit = null): iterable
    {
        $res = $this->createQueryBuilder('c')
            ->select('c')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        if ($res) return $res;
        return [];
    }

    public function countWith(string $value): int
    {
        return count($this->findByName($value));
    }
}