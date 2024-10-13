## 6-2. Restful API

## 0. API 엔드포인트

| No  | **기능**                   | **엔드포인트**                                                      | **메서드** | **설명**                                      |
| --- | -------------------------- | ------------------------------------------------------------------- | ---------- | --------------------------------------------- |
| 1   | 유저 대기열 조회           | `/waiting-queues`                                                   | `GET`      | 사용자의 현재 대기열 상태를 조회합니다.       |
| 2   | 유저 대기열 신청           | `/waiting-queues`                                                   | `POST`     | 서비스 이용권을 발급하고 대기열에 추가합니다. |
| 3   | 예약 가능 날짜 조회        | `/concerts/{concertId}/sessions?date={YY-MM-DD}&status=available`   | `GET`      | 특정 콘서트의 예약 가능한 날짜를 조회합니다.  |
| 4   | 예약 가능 날짜의 좌석 조회 | `/concerts/{concertId}/sessions/{sessionId}/seats?status=available` | `GET`      | 특정 날짜의 예약 가능한 좌석을 조회합니다.    |
| 5   | 콘서트 좌석 예약           | `/concerts/{concertId}/sessions/{sessionId}/reservations`           | `POST`     | 특정 좌석을 예약합니다.                       |
| 6   | 콘서트 좌석 결제           | `/concerts/{concertId}/sessions/{sessionId}/payments`               | `POST`     | 예약된 좌석에 대한 결제를 처리합니다.         |
| 7   | 잔액 조회                  | `/points`                                                           | `GET`      | 사용자의 현재 잔액을 조회합니다.              |
| 8   | 잔액 충전                  | `/points`                                                           | `PATCH`    | 사용자의 잔액에 자금을 추가합니다.            |
| 9   | 회원가입                   | `/users`                                                            | `POST`     | 새로운 사용자를 등록합니다.                   |

## 1. REST API 를 시작하기 전에

### 1.1 규칙

표준화된 통신 방식을 제공하고, 리소스 중심 설계를 통해 서버가 처리하는 자원을 직관적으로 파악할 수 있도록 `RESTful` 원칙을 준수합니다. 각 자원은 고유한 URL로 식별되며, `GET`, `POST`, `PATCH`, `DELETE` 메서드를 사용하여 리소스에 대한 작업을 수행합니다. URL은 자원의 계층 구조를 명확히 표현하여 가독성과 확장성을 높입니다.

- `GET`: 리소스 조회
- `POST`: 새로운 리소스 생성
- `PATCH`: 리소스 일부 수정
- `DELETE`: 리소스 삭제

### 1.2 JSON 규칙

- 모든 JSON 응답의 속성 이름은 `camelCase`를 사용합니다.
- 응답의 최상위 객체는 `statusCode`, `message`, `data` 속성을 포함합니
  ```json
  {
    "statusCode": 200,
    "message": "요청이 성공적으로 처리되었습니다.",
    "data": {
      // 리소스 데이터가 여기에 포함됩니다.
    }
  }
  ```
  - **`statusCode`**: HTTP 상태 코드
  - **`message`**: 처리 결과에 대한 메시지
  - **`data`**: 요청에 대한 리소스 데이터 또는 응답 데이터

### 1.3 HTTP 상태 코드

| HTTP 상태 코드 | 설명                                 |
| -------------- | ------------------------------------ |
| **200**        | 요청이 성공적으로 처리되었습니다.    |
| **400**        | 잘못된 요청입니다. (클라이언트 오류) |
| **401**        | 인증이 필요합니다. (권한 없음)       |
| **404**        | 리소스를 찾을 수 없습니다.           |
| **500**        | 서버 내부 오류가 발생했습니다.       |

### 1.4 오류 응답 구조

오류가 발생하면 JSON 응답에 `"message"` 속성이 포함되며, 오류에 대한 구체적인 설명을 제공합니다.

```json
{
  "statusCode": 400,
  "message": "invalidRequest" //유효하지 않은 요청 URL입니다.
}
```

### 1.5 주요 오류 코드, 메시지

| HTTP 상태 코드 | `code`               | 설명                                                             |
| -------------- | -------------------- | ---------------------------------------------------------------- |
| **200**        | `success`            | 요청이 성공하였습니다.                                           |
| **400**        | `invalidRequestUrl`  | 유효하지 않은 요청 URL입니다.                                    |
| **400**        | `invalidRequest`     | 지원되지 않는 요청입니다.                                        |
| **401**        | `invalidUserId`      | 유효하지 않은 사용자입니다.                                      |
| **401**        | `unauthorizedToken`  | 유효하지 않은 토큰입니다.                                        |
| **409**        | `userAlreadyInQueue` | 사용자가 이미 대기열에 등록된 상태에서 중복 등록을 시도했습니다. |
| **500**        | `serverError`        | 서버에서 예기치 않은 오류가 발생했습니다.                        |

### 1.6 토큰 인증

```tsx
enum TokenStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  EXPIRE = 'expire',
}
```

## 2. 콘서트 예약 서비스 REST API

### 2-1. **유저 대기열 조회**

- **Endpoint**
  - **URL:** `/users/{userId}/queue`
  - **Method:** `GET`
  - **설명:** 사용자의 현재 대기열 상태를 조회합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
    - `QUEUETOKEN: UUID (대기열 확인을 위한 토큰 식별자)`
  - **Path Parameters:**
    - `userId`: 조회할 사용자의 고유 식별자
- **Response**
  - **200 OK** (상태가 '대기'일 때)
    | 필드 이름 | 타입 | 설명 |
    | ------------------- | ------------- | ---------------------------------------------------------------- |
    | `queueId` | `number` | 대기열 항목의 고유 식별자 |
    | `status` | `TokenStatus` | 사용자의 현재 대기 상태 (`pending`, `active`, `expired` 중 하나) |
    | `position` | `number` | 대기열에서의 현재 위치 |
    | `estimatedWaitTime` | `number` | 예상 대기 시간 단위: 분 |
    ```json
    {
      "statusCode": "200",
      "message": "success",
      "data": {
        "queueId": 123456789,
        "status": "pending",
        "position": 5,
        "estimatedWaitTime": 15 // 분 단위
      }
    }
    ```
- **Error Responses**

  - **400 Bad Request**
    - **사유:** 잘못된 요청
    - **예시 메시지:** `invalidRequestUrl`
  - **401 Unauthorized**
    - **사유:** 인증 실패 (예: 유효하지 않은 사용자 ID 또는 토큰)
    - **예시 메시지:** `invalidUserId`

- **Authorization**
  - **필수 사항:** 유효한 `QUEUETOKEN` 헤더가 필요합니다.

### 2-2. **유저 대기열 신청**

- **Endpoint**
  - **URL:** `/users/{userId}/queue`
  - **Method:** `POST`
  - **설명:** 서비스 이용권을 발급하고 대기열에 추가합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
  - **Path Parameters:**
    - `userId`: 대기열에 추가할 사용자의 고유 식별자
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "queueId": 123456789,
        "status": "pending",
        "position": 100,
        "estimatedWaitTime": 30 // 분 단위
      }
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 잘못된 요청 또는 유효하지 않은 `userId`
    - **예시 메시지: i**nvalidUserId
  - **409 Conflict**
    - **사유:** 사용자가 이미 대기열에 등록됨
    - **예시 메시지:** `userAlreadyInQueue`
  - **500 Internal Server Error**
    - **사유:** 서버 오류
    - **예시 메시지:** `serverError`
- **Authorization**
  - **필요 없음:** 이 엔드포인트는 인증 없이 접근 가능합니다.

### 2-3. **예약 가능 날짜 조회**

- **Endpoint**
  - **URL:** `/concerts/{concertId}/sessions?date={YYYY-MM-DD}&status=available`
  - **Method:** `GET`
  - **설명:** 특정 콘서트의 예약 가능한 날짜를 조회합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
    - `QUEUETOKEN: UUID` (대기열 확인을 위한 토큰 식별자)
  - **Path Parameters:**
    - `concertId`: 조회할 콘서트의 고유 식별자
  - **Query Parameters:**
    - `date`: 조회할 날짜 (형식: `YYYY-MM-DD`)
    - `status`: `available`로 설정하여 예약 가능한 날짜를 조회
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "concertId": "123",
        "concertName": "콘서트 이름",
        "availableDates": ["2024-05-01", "2024-05-02", "2024-05-03"]
      }
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 `concertId` 또는 `date` 형식
    - **메시지:** `invalidRequest`
  - **401 Unauthorized**
    - **사유:** 유효하지 않은 토큰
    - **메시지:** `unauthorizedToken`
  - **404 Not Found**
    - **사유:** 해당 콘서트를 찾을 수 없음
    - **메시지:** `concertNotFound`
- **Authorization**
  - **필수 사항:** 유효한 `QUEUETOKEN` 헤더가 필요합니다.

### 2-4. **예약 가능 날짜의 좌석 조회**

- **Endpoint**
  - **URL:** `/concerts/{concertId}/sessions/{sessionId}/seats?status=available`
  - **Method:** `GET`
  - **설명:** 특정 날짜의 예약 가능한 좌석을 조회합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
    - `QUEUETOKEN: UUID` (대기열 확인을 위한 토큰 식별자)
  - **Path Parameters:**
    - `concertId`: 콘서트의 고유 식별자
    - `sessionId`: 세션의 고유 식별자
  - **Query Parameters:**
    - `status`: `available`로 설정하여 예약 가능한 좌석을 조회
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "concertId": "123",
        "sessionId": "456",
        "concertName": "콘서트 이름",
        "availableSeats": [1, 2, 3, 4, 5]
      }
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 파라미터
    - **예시 메시지:** `invalidRequest`
  - **401 Unauthorized**
    - **사유:** 유효하지 않은 토큰
    - **예시 메시지:** `unauthorizedToken`
  - **404 Not Found**
    - **사유:** 해당 콘서트 또는 세션을 찾을 수 없음
    - **예시 메시지:** `concertOrSessionNotFound`
- **Authorization**
  - **필수 사항:** 유효한 `QUEUETOKEN` 헤더가 필요합니다.

### 2-5. **콘서트 좌석 예약**

- **Endpoint**
  - **URL:** `/concerts/{concertId}/sessions/{sessionId}/reservations`
  - **Method:** `POST`
  - **설명:** 특정 좌석을 예약합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
    - `QUEUETOKEN: UUID` (대기열 확인을 위한 토큰 식별자)
  - **Path Parameters:**
    - `concertId`: 콘서트의 고유 식별자
    - `sessionId`: 세션의 고유 식별자
  - **Body:**
    ```json
    {
      "seatNumber": 25
    }
    ```
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "reservationId": "resv12345",
        "seatNumber": 25,
        "status": "reserved"
      }
    }
    ```
    ```tsx
    export enum SeatStatus {
      AVAILABLE = 'available', // 좌석이 사용 가능
      RESERVED = 'reserved', // 좌석이 예약됨
      PENDING = 'pending', // 좌석 예약이 대기 중
      UNAVAILABLE = 'unavailable', // 좌석이 사용 불가
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 좌석 번호
    - **예시 메시지:**`invalidSeatNumber`
  - **401 Unauthorized**
    - **사유:** 유효하지 않은 토큰
    - **예시 메시지:**`unauthorizedToken`
  - **409 Conflict**
    - **사유:** 좌석이 이미 예약됨
    - **예시 메시지:**`seatAlreadyReserved`
- **Authorization**
  - **필수 사항:** 유효한 `QUEUETOKEN` 헤더가 필요합니다.

### 2-6. **콘서트 좌석 결제**

- **Endpoint**
  - **URL:** `/concerts/{concertId}/sessions/{sessionId}/payments`
  - **Method:** `POST`
  - **설명:** 예약된 좌석에 대한 결제를 처리합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
    - `QUEUETOKEN: UUID` (대기열 확인을 위한 토큰 식별자)
  - **Path Parameters:**
    - `concertId`: 콘서트의 고유 식별자
    - `sessionId`: 세션의 고유 식별자
  - **Body:**
    ```json
    {
      "reservationId": "resv12345"
    }
    ```
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "reservationId": "resv12345",
        "seatNumber": 25,
        "status": "completed"
      }
    }
    ```
    ```tsx
    export enum PaymentStatus {
      PENDING = 'pending', // 결제 대기 중 (사용자가 결제를 시도했으나 아직 완료되지 않음)
      COMPLETED = 'completed', // 결제 완료
      FAILED = 'failed', // 결제 실패
      CANCELLED = 'cancelled', // 결제 취소
      REFUNDED = 'refunded', // 환불
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 예약 ID
    - **예시 메시지:** `invalidReservationId`
  - **401 Unauthorized**
    - **사유:** 유효하지 않은 토큰
    - **예시 메시지:** `unauthorizedToken`
  - **402 Payment Required**
    - **사유:** 잔액 부족
    - **예시 메시지:** `insufficientBalance`
- **Authorization**
  - **필수 사항:** 유효한 `QUEUETOKEN` 헤더가 필요합니다.

### 2-7. **잔액 조회**

- **Endpoint**
  - **URL:** `/users/{userId}/points`
  - **Method:** `GET`
  - **설명:** 사용자의 현재 잔액을 조회합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
  - **Path Parameters:**
    - `userId`: 조회할 사용자의 고유 식별자
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "userId": "1",
        "point": 5000
      }
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 사용자 ID
    - **예시 메시지:** `invalidUserId`
- **Authorization**
  - **필요 없음:** 이 엔드포인트는 인증 없이 접근 가능합니다.

---

### 8. **잔액 충전**

- **Endpoint**
  - **URL:** `/users/{userId}/points`
  - **Method:** `POST`
  - **설명:** 사용자의 잔액에 자금을 추가합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
  - **Path Parameters:**
    - `userId`: 잔액을 충전할 사용자의 고유 식별자
  - **Body:**
    ```json
    {
      "amount": 1000
    }
    ```
- **Response**
  - **200 OK**
    ```json
    {
      "statusCode": 200,
      "message": "success",
      "data": {
        "userId": "1",
        "point": 6000 // 충전 후 총 잔액
      }
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 유효하지 않은 금액 또는 사용자 ID
    - **예시 메시지:** `invalidAmount`
- **Authorization**
  - **필요 없음:** 이 엔드포인트는 인증 없이 접근 가능합니다.

---

### 9. **회원가입**

- **Endpoint**
  - **URL:** `/users`
  - **Method:** `POST`
  - **설명:** 새로운 사용자를 등록합니다.
- **Request**
  - **Headers:**
    - `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "id": "user123",
      "name": "홍길동"
    }
    ```
- **Response**
  - **201 Created**
    ```json
    {
      "statusCode": 201,
      "message": "요청이 성공적으로 처리되었습니다.",
      "data": {
        "userId": "user123"
      }
    }
    ```
- **Error Responses**
  - **400 Bad Request**
    - **사유:** 필수 필드 누락 또는 형식 오류
    - **예시 메시지:** `invalidRequest`
  - **409 Conflict**
    - **사유:** 이미 존재하는 사용자 ID
    - **예시 메시지:** `userAlreadyExists`
- **Authorization**
  - **필요 없음:** 회원가입은 인증 없이 접근 가능합니다.
