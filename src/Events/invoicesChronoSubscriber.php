<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;

/**
 * Class InvoicesChronoSubsciber
 * @package App\Events
 */
class invoicesChronoSubscriber implements EventSubscriberInterface {

    private $security;
    private $repository;

    /**
     * invoicesChronoSubscriber constructor.
     * @param Security $security
     * @param InvoiceRepository $repository
     */
    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    /**
     * @return array|array[]
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    /**
     * @param ViewEvent $event
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function setChronoForInvoice(ViewEvent $event) {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($invoice instanceof Invoice && $method === "POST") {
            $nextChrono = $this->repository->findLastChrono($this->security->getUser()) ;
            $invoice->setChrono($nextChrono);

            if (empty($invoice->getSentAt())) {
                $invoice->setSentAt(new \DateTime());
            }
        }
        // Trouver l'utilisateur connecté
        // Récupérer le Repository des factures (InvoicesRepository)
        //trouver la dernière facture insérée
        // ajouter +1 au chrono

    }
}