```shell
├── src/
│   ├── common/
│   │   └──  databases
│   │  
│   ├── application/
│   │   ├── concerts/
│   │   │   ├── concerts.module.ts
│   │   │   ├── concerts.facade.ts  
│   │   │
│   │   ├── points/
│   │   │   ├── points.module.ts
│   │   │
│   │   ├── waiting-queues/
│   │   │   ├── waiting-queues.module.ts
│   │
│   │    
│   ├── api/ 
│   │   ├── concerts/
│   │   │   ├── concerts.controller.ts
│   │   │
│   │   ├── points/
│   │   │   ├── points.controller.ts
│   │   │
│   │   ├── waiting-queues/
│   │   │   ├── waiting-queues.controller.ts
│   │  
│   │     
│   ├── domain/
│   │   ├── reservations/
│   │   │   ├── reservation.ts  
│   │   │   ├── reservation.service.ts
│   │   │   ├── reservation.service.spec.ts
│   │   │   ├── interfaces
│   │   │   │   ├── registration.repository.ts
│   │   │
│   │   ├── payments/
│   │   │   ├── payment.service.ts
│   │   │   ├── payment.service.spec.ts
│   │   │   ├── interfaces
│   │   │   │   ├── payment.repository.ts
│   │  
│   │   
│   ├── infrastructure/
│   │   ├── reservations/
│   │   │   ├── registration.repository.impl.ts
│   │   │ 
│   │   ├── payments/
│   │   │   ├── payment.repository.impl.ts
```
