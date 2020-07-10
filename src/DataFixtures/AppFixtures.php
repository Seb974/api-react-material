<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $seb = new User();
        $jo = new User();
        $seb->setEmail("m_seb@icloud.com")
            ->setPassword($this->encoder->encodePassword($seb, "Soleil01"));
        $jo->setEmail("jo-m@live.com")
            ->setPassword($this->encoder->encodePassword($jo, "azerty"));

        $manager->persist($seb);
        $manager->persist($jo);

        $manager->flush();
    }
}
