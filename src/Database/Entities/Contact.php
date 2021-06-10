<?php

namespace App\Database\Entities;

/**
 * @Entity(repositoryClass="App\Database\Repositories\ContactRepository")
 * @Table(name="contacts")
 */
class Contact
{
    static $table_name = "contacts";

    const ID = "id";
    const FIRST_NAME = "first_name";
    const LAST_NAME = "last_name";
    const PHONE_NUMBER = "phone_number";
    const COUNTRY_CODE = "country_code";
    const TIMEZONE = "timezone";
    const INSERTED_ON = "inserted_on";
    const UPDATED_ON = "updated_on";

    /**
     * @var int
     * @Id
     * @Column(type="integer", name="id")
     * @GeneratedValue
     */
    private $id;

    /**
     * @var string
     * @Column(type="string", name="first_name")
     */
    private $firstName;

    /**
     * @var string|null
     * @Column(type="string", name="last_name")
     */
    private $lastName;

    /**
     * @var string|null
     * @Column(type="string", name="phone_number")
     */
    private $phoneNumber;

    /**
     * @var string|null
     * @Column(type="string", name="country_code")
     */
    private $countryCode;

    /**
     * @var string|null
     * @Column(type="string", name="timezone")
     */
    private $timezone;

    /**
     * @var \DateTime
     * @Column(type="datetime", name="inserted_on")
     */
    private $insertedOn;

    /**
     * @var \DateTime
     * @Column(type="datetime", name="updated_on")
     */
    private $updatedOn;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string|null
     */
    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    /**
     * @param string|null $lastName
     */
    public function setLastName(?string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string|null
     */
    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    /**
     * @param string|null $phoneNumber
     */
    public function setPhoneNumber(?string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }

    /**
     * @return string|null
     */
    public function getCountryCode(): ?string
    {
        return $this->countryCode;
    }

    /**
     * @param string|null $countryCode
     */
    public function setCountryCode(?string $countryCode): void
    {
        $this->countryCode = $countryCode;
    }

    /**
     * @return string|null
     */
    public function getTimezone(): ?string
    {
        return $this->timezone;
    }

    /**
     * @param string|null $timezone
     */
    public function setTimezone(?string $timezone): void
    {
        $this->timezone = $timezone;
    }

    /**
     * @return \DateTime
     */
    public function getInsertedOn(): \DateTime
    {
        return $this->insertedOn;
    }

    /**
     * @param \DateTime $insertedOn
     */
    public function setInsertedOn(\DateTime $insertedOn): void
    {
        $this->insertedOn = $insertedOn;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedOn(): \DateTime
    {
        return $this->updatedOn;
    }

    /**
     * @param \DateTime $updatedOn
     */
    public function setUpdatedOn(\DateTime $updatedOn): void
    {
        $this->updatedOn = $updatedOn;
    }
}