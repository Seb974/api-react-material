<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MessageRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      normalizationContext={
 *          "groups"={"messages_read"}
 *      },
 *      denormalizationContext={
 *          "disable_type_enforcement"=true
 *      }
 * )
 * @ORM\Entity(repositoryClass=MessageRepository::class)
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"messages_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=60)
     * @Groups({"messages_read"})
     * @Assert\NotBlank(message="Le nom est obligatoire")
     * @Assert\Length(min=3, max=60, maxMessage="Le nom doit faire entre 3 et 60 caractères", minMessage="Le nom doit faire entre 3 et 60 caractères")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=60)
     * @Groups({"messages_read"})
     * @Assert\NotBlank(message="L'adresse email est obligatoire")
     * @Assert\Email(message="Le format de l'adresse email doit être valide")
     */
    private $email;

    /**
     * @ORM\Column(type="text")
     * @Groups({"messages_read"})
     * @Assert\NotBlank(message="Votre message est vide")
     */
    private $content;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"messages_read"})
     * @Assert\NotBlank(message="La date d'envoi du message est obligatoire")
     * @Assert\Type(type = "\DateTime", message="La date doit être au format YYYY-MM-DD ou YYYY-MM-DD HH:MM:SS")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"messages_read"})
     * @Assert\NotNull(message="Le statut du message 'Lu ou non' est obligatoire")
     * @Assert\Type(type="bool", message="Le statut est un booléen ne pouvant prendre que les valeurs 'true' ou 'false'")
     */
    private $isRead;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self        // ?\DateTimeInterface
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getIsRead(): ?bool
    {
        return $this->isRead;
    }

    public function setIsRead($isRead): self        // bool
    {
        $this->isRead = $isRead;

        return $this;
    }
}
