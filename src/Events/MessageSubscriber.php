<?php

namespace App\Events;

use App\Entity\Message;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MessageSubscriber implements EventSubscriberInterface 
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['addSendingTime', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function addSendingTime(ViewEvent $event) {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($result instanceof Message && $method === "POST") {
            $now = new \DateTime();
            $result->setSentAt($now)
                   ->setIsRead(false);
        }
    }
}